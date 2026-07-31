/**
 * A parameterised CI/CD pipeline simulation.
 *
 * The point is the failure path: with `--inject-exploit`, Trivy finds real
 * CVEs and the SecOps gate decides whether the ArgoCD sync happens at all.
 * A pipeline that only ever succeeds shows you can wire tools together; one
 * that blocks a deploy shows you understand why the gate is there.
 */

import { blank, error, hint, line, s, table } from './format'
import type { CommandContext, Segment } from './types'

export type Cluster = 'aks' | 'gke' | 'eks' | 'rancher'
export type Gate = 'fail-on-high' | 'log-and-continue'

export interface PipelineConfig {
  cluster: Cluster
  gate: Gate
  injectExploit: boolean
}

export const defaultConfig: PipelineConfig = {
  cluster: 'aks',
  gate: 'fail-on-high',
  injectExploit: false,
}

const clusters: Cluster[] = ['aks', 'gke', 'eks', 'rancher']
const gates: Gate[] = ['fail-on-high', 'log-and-continue']

/** Each managed platform pushes to its own registry. */
const registries: Record<Cluster, string> = {
  aks: 'registry.azurecr.io',
  gke: 'gcr.io/kalhara-platform',
  eks: 'public.ecr.aws/kalhara',
  rancher: 'registry.rancher.io/kalhara',
}

const clusterLabels: Record<Cluster, string> = {
  aks: 'Azure Kubernetes Service',
  gke: 'Google Kubernetes Engine',
  eks: 'Amazon Elastic Kubernetes Service',
  rancher: 'Rancher-managed cluster',
}

export const imageTag = (c: PipelineConfig) => `${registries[c.cluster]}/k8s-scanner:v1.5.0`

/* ────────────────────────────────────────────────────────────────────────────
 * Flags
 * ──────────────────────────────────────────────────────────────────────────*/

export interface ParsedFlags {
  config: PipelineConfig
  dryRun: boolean
  errors: Segment[][]
}

/** Parse `--cluster=gke --gate=log-and-continue --inject-exploit --dry-run`. */
export function parseFlags(args: string[]): ParsedFlags {
  const config: PipelineConfig = { ...defaultConfig }
  const errors: Segment[][] = []
  let dryRun = false

  for (const arg of args) {
    if (arg === 'run') continue

    if (arg === '--inject-exploit') {
      config.injectExploit = true
    } else if (arg === '--dry-run') {
      dryRun = true
    } else if (arg.startsWith('--cluster=')) {
      const value = arg.slice('--cluster='.length).toLowerCase() as Cluster
      if (clusters.includes(value)) config.cluster = value
      else errors.push(error(`unknown cluster "${value}" — expected one of: ${clusters.join(', ')}`))
    } else if (arg.startsWith('--gate=')) {
      const value = arg.slice('--gate='.length).toLowerCase() as Gate
      if (gates.includes(value)) config.gate = value
      else errors.push(error(`unknown gate "${value}" — expected one of: ${gates.join(', ')}`))
    } else {
      errors.push(error(`unknown flag "${arg}"`))
    }
  }

  return { config, dryRun, errors }
}

export const pipelineCompletions = () => [
  'run',
  '--cluster=aks',
  '--cluster=gke',
  '--cluster=eks',
  '--cluster=rancher',
  '--gate=fail-on-high',
  '--gate=log-and-continue',
  '--inject-exploit',
  '--dry-run',
]

/* ────────────────────────────────────────────────────────────────────────────
 * Tekton manifest
 * ──────────────────────────────────────────────────────────────────────────*/

/** `key:` at an indent. */
const k = (indent: number, key: string): Segment[] => [s(' '.repeat(indent) + key + ':', 'cyan')]

/** `key: "value"` at an indent. */
const kv = (indent: number, key: string, value: string): Segment[] => [
  s(' '.repeat(indent) + key + ': ', 'cyan'),
  s(value, 'yellow'),
]

/** `- name: x` list entries. */
const item = (indent: number, key: string, value: string): Segment[] => [
  s(' '.repeat(indent) + '- ' + key + ': ', 'cyan'),
  s(value, 'yellow'),
]

const param = (indent: number, name: string, value: string): Segment[][] => [
  item(indent, 'name', name),
  kv(indent + 2, 'value', `"${value}"`),
]

/** The resolved Tekton PipelineRun for a given configuration. */
export function renderPipelineYaml(config: PipelineConfig): Segment[][] {
  return [
    line('# Resolved Tekton PipelineRun — mirrors the flags passed to `pipeline run`.', 'dim'),
    blank,
    kv(0, 'apiVersion', 'tekton.dev/v1beta1'),
    kv(0, 'kind', 'PipelineRun'),
    k(0, 'metadata'),
    kv(2, 'name', 'kalhara-release-pipeline'),
    k(2, 'labels'),
    kv(4, 'release', '"v1.5.0"'),
    kv(4, 'target-cluster', `"${config.cluster}"`),
    k(0, 'spec'),
    k(2, 'pipelineSpec'),
    k(4, 'tasks'),

    item(6, 'name', 'fetch-repository'),
    k(8, 'taskRef'),
    kv(10, 'name', 'git-clone'),

    item(6, 'name', 'build-and-push'),
    k(8, 'taskRef'),
    kv(10, 'name', 'kaniko-builder'),
    k(8, 'params'),
    ...param(10, 'CONTEXT_DIR', './app'),
    ...param(10, 'IMAGE_TAG', imageTag(config)),

    item(6, 'name', 'devsecops-vulnerability-scan'),
    k(8, 'taskRef'),
    kv(10, 'name', 'trivy-scanner'),
    k(8, 'params'),
    ...param(10, 'SEVERITY_GATE', 'HIGH,CRITICAL'),
    ...param(10, 'FAIL_ON_CVE', String(config.gate === 'fail-on-high')),
    ...param(10, 'INJECT_MOCK_EXPLOIT', String(config.injectExploit)),

    item(6, 'name', 'argocd-cluster-sync'),
    k(8, 'runAfter'),
    [s('          - devsecops-vulnerability-scan', 'yellow')],
    k(8, 'taskRef'),
    kv(10, 'name', 'argocd-sync'),
    k(8, 'params'),
    ...param(10, 'CLUSTER', config.cluster),
    ...param(10, 'APP_NAME', 'k8s-security-scanner'),
  ]
}

/* ────────────────────────────────────────────────────────────────────────────
 * Simulated run
 * ──────────────────────────────────────────────────────────────────────────*/

/** Findings Trivy reports when `--inject-exploit` is set. */
const findings = [
  ['CVE-2021-44228', 'log4j-core', '2.14.1', 'CRITICAL', 'Remote code execution (Log4Shell)'],
  ['CVE-2024-21626', 'runc', '1.1.11', 'HIGH', 'Container breakout via leaked file descriptor'],
]

const stage = (name: string) => [s('  ┌─ ', 'dim'), s(name, 'cyan', true)]
const step = (text: string, colour: 'green' | 'red' | 'yellow' = 'green') => [
  s('  │  ', 'dim'),
  s(colour === 'green' ? '✓ ' : colour === 'red' ? '✗ ' : '! ', colour),
  s(text, 'dim'),
]
const endStage = (label: string, colour: 'green' | 'red' | 'yellow') => [
  s('  └─ ', 'dim'),
  s(label, colour),
]

export async function runPipeline(
  config: PipelineConfig,
  { print, sleep, aborted }: Pick<CommandContext, 'print' | 'sleep' | 'aborted'>,
): Promise<void> {
  const cancelled = () => {
    print([blank, [s('✗ Pipeline cancelled (SIGINT)', 'red', true)]])
  }

  print([
    [
      s('▶ ', 'green', true),
      s('Pipeline started', 'white', true),
      s('  kalhara-release-pipeline · main', 'dim'),
    ],
    [
      s('  target: ', 'dim'),
      s(config.cluster.toUpperCase(), 'cyan'),
      s(`  (${clusterLabels[config.cluster]})`, 'dim'),
    ],
    [s('  gate:   ', 'dim'), s(config.gate, config.gate === 'fail-on-high' ? 'yellow' : 'dim')],
    blank,
  ])

  /* 1 — checkout */
  print([stage('fetch-repository')])
  await sleep(280)
  if (aborted()) return cancelled()
  print([step('Cloning kalharatennakoon/k8s-security-scanner')])
  await sleep(240)
  if (aborted()) return cancelled()
  print([step('HEAD is now at d9f2e1a — verified signature, author Kalhara Tennakoon'), endStage('passed', 'green')])

  /* 2 — build */
  await sleep(200)
  if (aborted()) return cancelled()
  print([stage('build-and-push')])
  await sleep(320)
  if (aborted()) return cancelled()
  print([step('kaniko: building ./app')])
  await sleep(340)
  if (aborted()) return cancelled()
  print([step(`Pushed ${imageTag(config)}`), endStage('passed', 'green')])

  /* 3 — scan */
  await sleep(200)
  if (aborted()) return cancelled()
  print([stage('devsecops-vulnerability-scan')])
  await sleep(360)
  if (aborted()) return cancelled()
  print([step('trivy image — scanning OS packages and language deps')])
  await sleep(420)
  if (aborted()) return cancelled()

  const blocked = config.injectExploit && config.gate === 'fail-on-high'

  if (!config.injectExploit) {
    print([
      step('0 CRITICAL, 0 HIGH, 3 LOW'),
      endStage('passed', 'green'),
    ])
  } else {
    print([
      [
        s('  │  ', 'dim'),
        s(blocked ? '✗ ' : '! ', blocked ? 'red' : 'yellow'),
        s('2 vulnerabilities above the severity gate', blocked ? 'red' : 'yellow'),
      ],
      blank,
      ...table(
        [
          { header: 'cve', color: 'cyan' },
          { header: 'package' },
          { header: 'installed', color: 'dim' },
          { header: 'severity', color: 'red' },
          { header: 'description' },
        ],
        findings,
      ),
      blank,
      /* Only a blocking gate turns findings into a stage failure. */
      blocked ? endStage('failed', 'red') : endStage('passed with warnings', 'yellow'),
    ])
  }

  /* 4 — the gate decides whether the deploy happens at all */
  await sleep(220)
  if (aborted()) return cancelled()

  if (config.injectExploit) {
    print([stage('secops-gate')])
    await sleep(300)
    if (blocked) {
      print([
        [s('  │  ', 'dim'), s('✗ ', 'red'), s('FAIL_ON_CVE=true — severity gate HIGH,CRITICAL breached', 'red')],
        [s('  │  ', 'dim'), s('✗ ', 'red'), s('Blocking promotion to ' + config.cluster.toUpperCase(), 'red')],
        endStage('blocked', 'red'),
      ])
    } else {
      print([
        [s('  │  ', 'dim'), s('! ', 'yellow'), s('FAIL_ON_CVE=false — findings logged, promotion allowed', 'yellow')],
        [s('  │  ', 'dim'), s('! ', 'yellow'), s('Risk accepted and recorded against release v1.5.0', 'yellow')],
        endStage('warning', 'yellow'),
      ])
    }
  }

  /* 5 — deploy */
  await sleep(200)
  if (aborted()) return cancelled()

  if (blocked) {
    print([
      [s('  ┌─ ', 'dim'), s('argocd-cluster-sync', 'dim', true)],
      [s('  │  ', 'dim'), s('- ', 'dim'), s('skipped — upstream task failed', 'dim')],
      endStage('skipped', 'red'),
      blank,
      [
        s('✗ ', 'red', true),
        s('Pipeline failed', 'red', true),
        s('  2/5 stages passed · deploy blocked by SecOps gate', 'dim'),
      ],
      [s('  exit code: ', 'dim'), s('1', 'red')],
      blank,
      hint('Re-run with `--gate=log-and-continue` to accept the risk and ship anyway.'),
    ])
    return
  }

  print([stage('argocd-cluster-sync')])
  await sleep(340)
  if (aborted()) return cancelled()
  print([step(`Syncing app k8s-security-scanner → ${config.cluster}`)])
  await sleep(360)
  if (aborted()) return cancelled()
  print([step('Rollout complete — 3/3 replicas healthy'), endStage('passed', 'green')])

  await sleep(200)
  print([
    blank,
    config.injectExploit
      ? [
          s('! ', 'yellow', true),
          s('Pipeline succeeded with warnings', 'yellow', true),
          s('  5/5 stages · deployed with 2 CVEs accepted', 'dim'),
        ]
      : [
          s('✓ ', 'green', true),
          s('Pipeline succeeded', 'green', true),
          s('  4/4 stages · commit d9f2e1a', 'dim'),
        ],
    [s('  exit code: ', 'dim'), s('0', 'green')],
    blank,
    hint(
      config.injectExploit
        ? 'Try `--gate=fail-on-high` to see the gate block the deploy instead.'
        : 'Try `pipeline run --inject-exploit` to watch the SecOps gate block a deploy.',
    ),
  ])
}
