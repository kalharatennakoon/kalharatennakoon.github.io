/** Core types for the interactive shell. */

export type TermColor =
  | 'green'
  | 'cyan'
  | 'blue'
  | 'yellow'
  | 'red'
  | 'magenta'
  | 'dim'
  | 'white'

/** One styled run of text inside a line. */
export interface Segment {
  text: string
  color?: TermColor
  bold?: boolean
  /** Renders the segment as an anchor opening in a new tab. */
  href?: string
}

/** A rendered terminal row: either the echoed command or command output. */
export interface Line {
  id: number
  kind: 'input' | 'output'
  segments: Segment[]
}

export interface CommandContext {
  /** Arguments after the command name. */
  args: string[]
  /** The full raw input, untrimmed of inner spacing. */
  raw: string
  /** Append output rows. */
  print: (rows: Segment[][]) => void
  /** Wipe the scrollback. */
  clear: () => void
  /** Smooth-scroll the page to a section id. */
  navigate: (sectionId: string) => void
  /** Current working directory, as path segments below the home directory. */
  cwd: string[]
  /** Change the working directory. */
  setCwd: (segments: string[]) => void
  /** Flip light/dark. */
  toggleTheme: () => void
  /** Current theme, for `theme` with no args. */
  theme: 'light' | 'dark'
  /** Commands entered this session, oldest first. */
  history: string[]
  /** Await a delay — used by commands that stream output. */
  sleep: (ms: number) => Promise<void>
  /** True once the user aborts with Ctrl+C. */
  aborted: () => boolean
}

export type CommandCategory = 'devops' | 'system' | 'navigation' | 'fun'

export interface Command {
  name: string
  usage: string
  description: string
  category: CommandCategory
  /** Extra names that resolve to this command. */
  aliases?: string[]
  /** Hidden from `help` and tab completion, but still runnable. */
  hidden?: boolean
  /** Values suggested for tab completion of the first argument. */
  completions?: (cwd: string[]) => string[]
  run: (ctx: CommandContext) => void | Promise<void>
}
