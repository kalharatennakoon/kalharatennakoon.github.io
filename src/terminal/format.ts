import type { Segment, TermColor } from './types'

/** Columns the terminal can currently show; prose wraps to this on narrow screens. */
let columns = 80

/** Called by the terminal whenever its visible width changes. */
export function setColumns(count: number): void {
  columns = Math.max(20, count)
}

export const getColumns = (): number => columns

/**
 * Mark a row as prose: on a screen narrower than the row it wraps onto the
 * next line, where preformatted rows (tables, ASCII art) scroll sideways.
 */
export function flow(row: Segment[]): Segment[] {
  return row.length ? [{ ...row[0], flow: true }, ...row.slice(1)] : row
}

/** A styled run of text. */
export function s(text: string, color?: TermColor, bold = false): Segment {
  return { text, color, bold }
}

/** A clickable run of text. */
export function link(text: string, href: string): Segment {
  return { text, href, color: 'cyan' }
}

/** A line made of a single plain segment. */
export function line(text = '', color?: TermColor, bold = false): Segment[] {
  return [s(text, color, bold)]
}

/** An empty spacer row. */
export const blank: Segment[] = []

/** A section heading, e.g. `SKILLS`. */
export function heading(text: string): Segment[] {
  return [s(text.toUpperCase(), 'yellow', true)]
}

export interface Column {
  header: string
  /** Fixed width; when omitted the column sizes to its widest cell. */
  width?: number
  color?: TermColor
}

/**
 * Render a kubectl-style table: uppercase headers, space-padded columns.
 * The final column is never padded, so long values can run to the edge.
 */
export function table(columns: Column[], rows: string[][]): Segment[][] {
  const widths = columns.map((col, i) => {
    if (col.width) return col.width
    const longest = rows.reduce((max, row) => Math.max(max, (row[i] ?? '').length), col.header.length)
    return longest + 3
  })

  const headerRow: Segment[] = [
    s(columns.map((c, i) => (i === columns.length - 1 ? c.header.toUpperCase() : c.header.toUpperCase().padEnd(widths[i]))).join(''), 'dim', true),
  ]

  const bodyRows = rows.map((row) =>
    columns.map((col, i) => {
      const cell = row[i] ?? ''
      const isLast = i === columns.length - 1
      return s(isLast ? cell : cell.padEnd(widths[i]), col.color)
    }),
  )

  return [headerRow, ...bodyRows]
}

/**
 * Break `text` into rows no wider than `width` (or the terminal, when that is
 * narrower), prefixing every row with `indent`. Long unbreakable tokens are
 * allowed to overflow rather than split.
 */
export function wrap(text: string, width = 76, indent = '  '): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const rows: string[] = []
  const limit = Math.min(width, columns) - indent.length
  let current = ''

  for (const word of words) {
    if (!current) {
      current = word
    } else if ((current + ' ' + word).length <= limit) {
      current += ' ' + word
    } else {
      rows.push(indent + current)
      current = word
    }
  }
  if (current) rows.push(indent + current)

  return rows
}

/** Wrapped paragraph as output rows. */
export function paragraph(text: string, color?: TermColor, width = 76, indent = '  '): Segment[][] {
  return wrap(text, width, indent).map((row) => line(row, color))
}

/** `[ok] message` in green. */
export function ok(text: string): Segment[] {
  return flow([s('✓ ', 'green', true), s(text)])
}

/** `error: message` in red — the standard shape for command failures. */
export function error(text: string): Segment[] {
  return flow([s('error: ', 'red', true), s(text)])
}

/** A dim hint row, used for "try X next" nudges. */
export function hint(text: string): Segment[] {
  return flow(line(text, 'dim'))
}
