import { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import useScrollReveal from '../hooks/useScrollReveal'
import { completableNames, parse, resolve } from '../terminal/commands'
import { displayPath } from '../terminal/filesystem'
import { hint, line, s } from '../terminal/format'
import type { Line, Segment, TermColor } from '../terminal/types'

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

/** Chips shown under the terminal so visitors who won't type still get value. */
const quickCommands = [
  'whoami',
  'ls',
  'cd projects',
  'pipeline run',
  'pipeline run --inject-exploit',
  'kubectl get projects',
  'git log',
  'help',
]

const bootSequence: { text: string; color?: TermColor; delay: number }[] = [
  { text: 'Booting portfolio-sh 4.0 …', color: 'dim', delay: 180 },
  { text: '✓ Connected to cluster: kalhara-portfolio (context: production)', color: 'green', delay: 260 },
  { text: '✓ Loaded 6 projects, 11 certifications, 2 deployments', color: 'green', delay: 220 },
  { text: '✓ All systems healthy', color: 'green', delay: 200 },
]

function Terminal() {
  const { theme, toggleTheme } = useTheme()

  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  /** Working directory as path segments below the home directory. */
  const [cwd, setCwd] = useState<string[]>([])

  /** The terminal sits below the fold, so hold the boot animation until it is seen. */
  const [shellRef, inView] = useScrollReveal<HTMLDivElement>(0.15)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef(false)
  /** Per-instance so ids stay in step with `lines` across hot reloads. */
  const lineIdRef = useRef(0)
  /** Mirrors `history` so command handlers read a fresh value, not a closure. */
  const historyRef = useRef<string[]>([])

  const append = useCallback((kind: Line['kind'], rows: Segment[][]) => {
    setLines((prev) => [
      ...prev,
      ...rows.map((segments) => ({ id: ++lineIdRef.current, kind, segments })),
    ])
  }, [])

  /* Boot animation — runs once, the first time the terminal scrolls into view. */
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
          append('output', [line(step.text, step.color)])
        }, elapsed),
      )
    })

    timers.push(
      window.setTimeout(() => {
        if (cancelled) return
        append('output', [
          [],
          [s('Welcome. ', 'white', true), s("This portfolio runs a real shell — type a command to explore.", 'dim')],
          hint("Try `help` for everything, or `whoami` to start. Tab completes, ↑ recalls."),
          [],
        ])
        setBooted(true)
      }, elapsed + 320),
    )

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [append, inView])

  /* Keep the newest output in view. */
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

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

      /* Update the ref synchronously: a state updater would not have run by
         the time the command below reads `history`. */
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

  const submit = useCallback(async () => {
    if (busy) return
    const value = input
    setInput('')
    setHistoryIndex(null)
    await runCommand(value)
  }, [busy, input, runCommand])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    /* Ctrl+C aborts a streaming command; Ctrl+L clears. */
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      /* With text selected, Ctrl+C means copy — same as a real terminal. */
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
      void submit()
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

  /** Complete the command name, or the first argument when one is expected. */
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
    const options = command?.completions?.(cwd) ?? []
    if (!options.length) return

    const prefix = parts[parts.length - 1]
    const matches = options.filter((o) => o.startsWith(prefix))
    if (matches.length === 1) {
      setInput([...parts.slice(0, -1), matches[0]].join(' ') + ' ')
    } else if (matches.length > 1) {
      append('output', [[s(matches.join('   '), 'dim')]])
      setInput([...parts.slice(0, -1), commonPrefix(matches)].join(' '))
    }
  }

  const focusInput = () => {
    /* Don't steal focus mid-selection — the user may be copying output. */
    if (window.getSelection()?.toString()) return
    /* preventScroll: focusing an off-screen input would otherwise make the
       browser scroll the page to it. The shell never moves the page. */
    inputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="terminal-shell" ref={shellRef}>
      {/* Title bar */}
      <div className="terminal-titlebar">
        <div className="terminal-title">
          {PROMPT_USER} — zsh — {busy ? 'running…' : '80×24'}
        </div>
        <div className="terminal-badge">
          <span className={`terminal-status-dot${busy ? ' is-busy' : ''}`} />
          {busy ? 'busy' : 'ready'}
        </div>
      </div>

      {/* Scrollback */}
      <div
        ref={scrollRef}
        className="terminal-body"
        onClick={focusInput}
        role="log"
        aria-live="polite"
        aria-label="Interactive portfolio terminal output"
      >
        {lines.map((l) => (
          <div key={l.id} className="terminal-line">
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

        {/* Prompt */}
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
              /* Deliberately not `disabled` while busy: a disabled input
                 receives no key events, which would make Ctrl+C unable to
                 abort a running command. `submit` guards against re-entry. */
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Terminal command input"
              placeholder={busy ? '' : 'type a command…'}
            />
          </div>
        )}
      </div>

      {/* Quick commands for visitors who would rather click than type */}
      <div className="terminal-chips">
        <span className="terminal-chips-label">Try:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            className="terminal-chip"
            disabled={busy}
            onClick={() => {
              setInput('')
              setHistoryIndex(null)
              void runCommand(cmd)
              inputRef.current?.focus({ preventScroll: true })
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Longest shared prefix across matches, used for partial tab completion. */
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
