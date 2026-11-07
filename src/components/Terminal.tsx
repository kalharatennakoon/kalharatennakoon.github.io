import { useCallback, useEffect, useRef, useState } from 'react'
import { FaCopy, FaCheck, FaTrash } from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'
import useScrollReveal from '../hooks/useScrollReveal'
import { completableNames, parse, resolve } from '../terminal/commands'
import { displayPath } from '../terminal/filesystem'
import { flow, hint, line, s, setColumns } from '../terminal/format'
import type { Line, Segment, TermColor } from '../terminal/types'
import { soundFx } from '../utils/sound'

/** ANSI-ish palette tuned for the dark navy terminal body. */
const palette: Record<TermColor, string> = {
  green: '#4ade80',
  cyan: '#22d3ee',
  blue: '#60a5fa',
  yellow: '#fbbf24',
  red: '#f87171',
  magenta: '#c084fc',
  dim: '#7c8db5',
  white: '#e2e8f0',
}

const PROMPT_USER = 'kalhara@portfolio'

/** Categorized chips for quick execution */
const quickCommands = [
  { label: 'whoami', cmd: 'whoami' },
  { label: 'pipeline run', cmd: 'pipeline run' },
  { label: 'kubectl get projects', cmd: 'kubectl get projects' },
  { label: 'git log', cmd: 'git log' },
  { label: 'ls -la', cmd: 'ls' },
  { label: 'cat skills.txt', cmd: 'cd ~/ && cat skills.txt' },
  { label: 'help', cmd: 'help' },
]

const bootSequence: { text: string; color?: TermColor; delay: number }[] = [
  { text: 'Booting portfolio-sh 4.0 [Kubernetes Context: production] …', color: 'dim', delay: 180 },
  { text: '✓ Connected to cluster: kalhara-k8s (Node: worker-01)', color: 'green', delay: 240 },
  { text: '✓ Loaded 9 projects, 13 certifications, Tekton pipelines', color: 'green', delay: 200 },
  { text: '✓ All systems healthy & ready', color: 'green', delay: 180 },
]

const isTouchDevice = () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export function Terminal() {
  const { theme, toggleTheme } = useTheme()
  const [touch] = useState(isTouchDevice)

  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [cwd, setCwd] = useState<string[]>([])

  const [shellRef, inView] = useScrollReveal<HTMLDivElement>(0.1)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef(false)
  const lineIdRef = useRef(0)
  const historyRef = useRef<string[]>([])

  const append = useCallback((kind: Line['kind'], rows: Segment[][]) => {
    setLines((prev) => [
      ...prev,
      ...rows.map((segments) => ({ id: ++lineIdRef.current, kind, segments })),
    ])
  }, [])

  /* Measure columns */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const measure = () => {
      const probe = document.createElement('span')
      probe.textContent = '0'.repeat(50)
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre'
      el.appendChild(probe)
      const charWidth = probe.getBoundingClientRect().width / 50
      probe.remove()

      const style = getComputedStyle(el)
      const inner = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      if (charWidth > 0) setColumns(Math.floor(inner / charWidth))
    }

    measure()
    void document.fonts.ready.then(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* Boot animation */
  useEffect(() => {
    if (!inView) return
    let cancelled = false
    const timers: number[] = []
    let elapsed = 0

    bootSequence.forEach((step) => {
      elapsed += step.delay
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return
          append('output', [flow(line(step.text, step.color))])
        }, elapsed),
      )
    })

    timers.push(
      window.setTimeout(() => {
        if (cancelled) return
        append('output', [
          [],
          flow([
            s('Welcome to Kalhara\'s Interactive Cloud Shell. ', 'white', true),
            s('Type a command or click a chip below to run pipelines, query cluster resources, or explore projects.', 'dim'),
          ]),
          hint(touch ? 'Tap a command below to explore.' : 'Type `help` to list available commands.'),
          [],
        ])
        setBooted(true)
      }, elapsed + 300),
    )

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [inView, append, touch])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    historyRef.current = history
  }, [history])

  const sleep = useCallback(
    (ms: number) => new Promise<void>((resolve_) => setTimeout(resolve_, ms)),
    [],
  )

  const runCommand = useCallback(
    async (rawInput: string) => {
      const trimmed = rawInput.trim()

      append('input', [
        [
          s(PROMPT_USER, 'green', true),
          s(':', 'dim'),
          s(displayPath(cwd), 'blue', true),
          s('$ ', 'dim'),
          s(trimmed),
        ],
      ])

      if (!trimmed) return

      historyRef.current = [...historyRef.current, trimmed]
      setHistory(historyRef.current)

      const { name, args } = parse(trimmed)
      const command = resolve(name)

      if (!command) {
        append('output', [
          [s('command not found: ', 'red', true), s(name)],
          hint('Run `help` to see what this shell understands.'),
        ])
        return
      }

      abortRef.current = false
      setBusy(true)
      try {
        await command.run({
          args,
          raw: trimmed,
          print: (rows) => append('output', rows),
          clear: () => setLines([]),
          cwd,
          setCwd,
          toggleTheme,
          theme,
          history: historyRef.current,
          sleep,
          aborted: () => abortRef.current,
        })
      } catch (err) {
        append('output', [
          [s('internal error: ', 'red', true), s(err instanceof Error ? err.message : String(err))],
        ])
      } finally {
        setBusy(false)
      }
    },
    [append, cwd, sleep, theme, toggleTheme],
  )

  // Listen to external command palette events
  useEffect(() => {
    const handleCustomExec = (e: Event) => {
      const customEvent = e as CustomEvent<{ command: string }>
      if (customEvent.detail?.command) {
        void runCommand(customEvent.detail.command)
      }
    }
    window.addEventListener('portfolio:terminal-exec', handleCustomExec)
    return () => window.removeEventListener('portfolio:terminal-exec', handleCustomExec)
  }, [runCommand])

  const copyScrollback = () => {
    soundFx.success()
    const text = lines
      .map((l) => l.segments.map((s) => s.text).join(''))
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearScreen = () => {
    soundFx.click()
    setLines([])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundFx.terminalKey()

    if (e.key === 'c' && e.ctrlKey) {
      if (window.getSelection()?.toString()) return
      e.preventDefault()
      abortRef.current = true
      append('output', [[s('^C', 'red')]])
      setInput('')
      return
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault()
      setLines([])
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (busy) return
      const cmd = input
      setInput('')
      setHistoryIndex(null)
      void runCommand(cmd)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const idx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(idx)
      setInput(history[idx])
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === null) return
      const idx = historyIndex + 1
      if (idx >= history.length) {
        setHistoryIndex(null)
        setInput('')
      } else {
        setHistoryIndex(idx)
        setInput(history[idx])
      }
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      completeInput()
    }
  }

  const completeInput = () => {
    const parts = input.split(/\s+/)
    const isFirstWord = parts.length <= 1

    if (isFirstWord) {
      const prefix = parts[0] ?? ''
      const matches = completableNames().filter((n) => n.startsWith(prefix))
      if (matches.length === 1) return setInput(matches[0] + ' ')
      if (matches.length > 1) {
        append('output', [[s(matches.join('   '), 'dim')]])
        setInput(commonPrefix(matches))
      }
      return
    }

    const command = resolve(parts[0])
    const prefix = parts[parts.length - 1]
    const options = command?.completions?.(cwd, parts.slice(1, -1), prefix) ?? []
    if (!options.length) return

    const matches = options.filter((o) => o.startsWith(prefix))
    if (matches.length === 1) {
      setInput([...parts.slice(0, -1), matches[0]].join(' ') + (matches[0].endsWith('/') ? '' : ' '))
    } else if (matches.length > 1) {
      append('output', [[s(matches.join('   '), 'dim')]])
      setInput([...parts.slice(0, -1), commonPrefix(matches)].join(' '))
    }
  }

  const focusInput = () => {
    if (window.getSelection()?.toString()) return
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="terminal-shell" ref={shellRef}>
      {/* Title bar with macOS traffic lights & action buttons */}
      <div className="terminal-titlebar flex items-center justify-between">
        {/* Left: Window Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearScreen}
            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-sm cursor-pointer"
            title="Clear output"
            aria-label="Clear terminal"
          />
          <button
            onClick={() => void runCommand('pipeline run')}
            className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-sm cursor-pointer"
            title="Run pipeline"
            aria-label="Run pipeline"
          />
          <button
            onClick={() => void runCommand('help')}
            className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors shadow-sm cursor-pointer"
            title="Show help"
            aria-label="Show help"
          />
          <span className="ml-3 text-xs font-mono text-slate-400 font-semibold hidden sm:inline">
            kalhara@cluster-prod : zsh
          </span>
        </div>

        {/* Center / Right: Status & Quick Controls */}
        <div className="flex items-center gap-3">
          <div className="terminal-badge hidden xs:inline-flex">
            <span className={`terminal-status-dot${busy ? ' is-busy' : ''}`} />
            <span>{busy ? 'executing…' : 'cluster ready'}</span>
          </div>

          <button
            onClick={copyScrollback}
            className="p-1.5 text-xs text-slate-400 hover:text-white rounded bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Copy entire terminal text"
            aria-label="Copy terminal text"
          >
            {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
            <span className="text-[11px] font-mono hidden sm:inline">
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>

          <button
            onClick={clearScreen}
            className="p-1.5 text-xs text-slate-400 hover:text-white rounded bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Clear screen"
            aria-label="Clear screen"
          >
            <FaTrash />
            <span className="text-[11px] font-mono hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Scrollback Body */}
      <div
        ref={scrollRef}
        className="terminal-body"
        onClick={focusInput}
        role="log"
        aria-live="polite"
        aria-label="Interactive portfolio terminal output"
      >
        {lines.map((l) => (
          <div
            key={l.id}
            className={`terminal-line${l.kind === 'input' || l.segments[0]?.flow ? ' is-flow' : ''}`}
          >
            {l.segments.length === 0 ? (
              <span>&nbsp;</span>
            ) : (
              l.segments.map((seg, i) =>
                seg.href ? (
                  <a
                    key={i}
                    href={seg.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terminal-link"
                    style={{ color: palette[seg.color ?? 'cyan'] }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {seg.text}
                  </a>
                ) : (
                  <span
                    key={i}
                    style={{
                      color: seg.color ? palette[seg.color] : palette.white,
                      fontWeight: seg.bold ? 700 : 400,
                    }}
                  >
                    {seg.text}
                  </span>
                ),
              )
            )}
          </div>
        ))}

        {/* Input Prompt */}
        {booted && (
          <div className="terminal-prompt-row">
            <span style={{ color: palette.green, fontWeight: 700 }}>{PROMPT_USER}</span>
            <span style={{ color: palette.dim }}>:</span>
            <span style={{ color: palette.blue, fontWeight: 700 }}>{displayPath(cwd)}</span>
            <span style={{ color: palette.dim }}>$&nbsp;</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Terminal command input"
              placeholder={busy ? '' : touch ? 'tap a command below or type…' : 'type a command (try: pipeline run)…'}
            />
          </div>
        )}
      </div>

      {/* Quick Command Chips */}
      <div className="terminal-chips">
        <span className="terminal-chips-label">{touch ? 'Tap:' : 'Quick:'}</span>
        {quickCommands.map((item) => (
          <button
            key={item.label}
            type="button"
            className="terminal-chip flex items-center gap-1.5"
            disabled={busy}
            onClick={() => {
              soundFx.click()
              setInput('')
              setHistoryIndex(null)
              void runCommand(item.cmd)
              if (!touch) inputRef.current?.focus({ preventScroll: true })
            }}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function commonPrefix(items: string[]): string {
  if (!items.length) return ''
  let prefix = items[0]
  for (const item of items.slice(1)) {
    while (!item.startsWith(prefix)) {
      prefix = prefix.slice(0, -1)
      if (!prefix) return ''
    }
  }
  return prefix
}

export default Terminal
