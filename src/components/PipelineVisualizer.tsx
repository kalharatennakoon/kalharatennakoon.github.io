import { useState, useEffect } from 'react'
import { FaRedo, FaCheck, FaShieldAlt, FaCodeBranch } from 'react-icons/fa'
import { SiTekton, SiDocker, SiArgo } from 'react-icons/si'
import { soundFx } from '../utils/sound'

interface PipelineStage {
  id: string
  name: string
  tool: string
  icon: React.ReactNode
  description: string
  duration: number
}

const stages: PipelineStage[] = [
  {
    id: 'git',
    name: 'Git Trigger',
    tool: 'GitHub Actions',
    icon: <FaCodeBranch className="text-sky-400" />,
    description: 'Commit pushed to origin/main',
    duration: 1200,
  },
  {
    id: 'test',
    name: 'Behave BDD',
    tool: 'Automated Tests',
    icon: <FaCheck className="text-emerald-400" />,
    description: '39 test suites executed (~30% debug cut)',
    duration: 1600,
  },
  {
    id: 'build',
    name: 'Container Build',
    tool: 'Tekton & Docker',
    icon: <SiDocker className="text-blue-400" />,
    description: 'Multi-stage non-root image packaging',
    duration: 1800,
  },
  {
    id: 'sec',
    name: 'CVE Scan',
    tool: 'Trivy Scanner',
    icon: <FaShieldAlt className="text-purple-400" />,
    description: 'Security & policy validation: 0 critical',
    duration: 1400,
  },
  {
    id: 'deploy',
    name: 'GitOps Sync',
    tool: 'ArgoCD & K8s',
    icon: <SiArgo className="text-orange-400" />,
    description: 'Cluster rollout to production: Healthy',
    duration: 1500,
  },
]

export function PipelineVisualizer() {
  const [activeStage, setActiveStage] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [completed, setCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (!isRunning) return

    const current = stages[activeStage]
    const timer = setTimeout(() => {
      if (activeStage < stages.length - 1) {
        setActiveStage((prev) => prev + 1)
        soundFx.click()
      } else {
        setIsRunning(false)
        setCompleted(true)
        soundFx.success()
      }
    }, current.duration)

    return () => clearTimeout(timer)
  }, [activeStage, isRunning])

  const restartPipeline = () => {
    soundFx.click()
    setActiveStage(0)
    setCompleted(false)
    setIsRunning(true)
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl relative overflow-hidden shimmer-hover">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center text-base">
            <SiTekton />
          </div>
          <div>
            <div className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>Cloud-Native Delivery Pipeline (Tekton & ArgoCD)</span>
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            </div>
            <div className="text-[11px] font-mono text-[var(--text-secondary)]">
              Workflow: k8s-production-release.yaml • Status: {completed ? 'SUCCESS' : isRunning ? 'RUNNING STAGES' : 'PAUSED'}
            </div>
          </div>
        </div>

        <button
          onClick={restartPipeline}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/25 hover:bg-sky-500 hover:text-white transition-all cursor-pointer shadow-sm"
        >
          <FaRedo className="text-[10px]" />
          <span>Re-run Pipeline</span>
        </button>
      </div>

      {/* Interactive Pipeline Stages Grid / Horizontal Rail */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative z-10">
        {stages.map((stg, idx) => {
          const isPast = idx < activeStage || completed
          const isCurrent = idx === activeStage && isRunning

          return (
            <div
              key={stg.id}
              className={`p-3.5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-sky-500/15 border-sky-500 shadow-md shadow-sky-500/20 scale-[1.03]'
                  : isPast
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-color)] opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm">
                    {stg.icon}
                  </span>
                  <span className="text-[10px] font-mono font-bold">
                    {isCurrent ? (
                      <span className="text-amber-400 animate-pulse">Running</span>
                    ) : isPast ? (
                      <span className="text-emerald-400 font-bold">✓ Pass</span>
                    ) : (
                      <span className="text-slate-500">Wait</span>
                    )}
                  </span>
                </div>

                <div className="text-xs font-bold text-[var(--text-primary)]">
                  {stg.name}
                </div>
                <div className="text-[10px] text-sky-400 font-medium mb-1">
                  {stg.tool}
                </div>
                <div className="text-[10.5px] text-[var(--text-secondary)] leading-tight">
                  {stg.description}
                </div>
              </div>

              {/* Progress bar inside active stage */}
              <div className="mt-3 h-1 w-full bg-slate-700/40 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isCurrent
                      ? 'bg-sky-400 animate-pulse w-full'
                      : isPast
                      ? 'bg-emerald-400 w-full'
                      : 'w-0'
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-5 pt-3 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <FaCheck className="text-[10px]" />
          <span>Zero security vulnerabilities • Automated GitOps validation</span>
        </span>
        <span className="text-[11px] opacity-75">Tekton Pipeline Engine 4.0</span>
      </div>
    </div>
  )
}

export default PipelineVisualizer
