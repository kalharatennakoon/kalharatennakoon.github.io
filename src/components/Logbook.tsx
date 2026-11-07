import {
  useCallback, useEffect, useMemo, useRef, useState,
  type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode,
} from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import useMediaQuery from '../hooks/useMediaQuery'

/* --------------------------------------------------------------------------
   Pages
   Every fact here comes from the CV. Pages are listed in reading order; on
   wide screens they are bound in pairs onto leaves (front = right-hand page,
   back = the next left-hand page). On phones each page gets its own leaf.
   -------------------------------------------------------------------------- */

type FaceKind = 'cover' | 'endpaper' | 'page' | 'blank'
type Side = 'left' | 'right'

interface Face {
  id: string
  kind: FaceKind
  /** Short name used in the page indicator and the contents list. */
  title: string
  /** Printed page number for content pages. */
  folio?: number
  render?: (side: Side) => ReactNode
}

const TURN_MS = 900
const RIFFLE_MS = 130
const GOTO_EVENT = 'logbook:goto'

/** Ask the book to riffle to a page (used by the contents page). */
function requestPage(page: number) {
  window.dispatchEvent(new CustomEvent(GOTO_EVENT, { detail: { page } }))
}

function PageFrame({ side, run, folio, children }: {
  side: Side
  run: string
  folio?: number
  children: ReactNode
}) {
  return (
    <>
      <div className={`page-run mb-5 ${side === 'right' ? 'text-right' : ''}`}>{run}</div>
      <div className="flex-1 min-h-0">{children}</div>
      {folio !== undefined && (
        <div className={`page-folio ${side === 'right' ? 'text-right' : ''}`}>{folio}</div>
      )}
    </>
  )
}

function Facts({ rows }: { rows: [string, string][] }) {
  return (
    <ul className="page-list mt-5">
      {rows.map(([k, v]) => (
        <li key={k}>
          <span>{k}</span>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  )
}

/** Index of each content page in reading order, for the contents list. */
const CONTENTS: { title: string; page: number }[] = [
  { title: 'Education', page: 3 },
  { title: 'Final year project', page: 4 },
  { title: 'Ascentic AI Launch Pad', page: 5 },
  { title: 'DevOps at IFS', page: 6 },
  { title: 'Software engineering at IFS', page: 7 },
  { title: 'KubeCon scholarships', page: 8 },
  { title: 'Technical writing', page: 9 },
  { title: 'Earlier honours', page: 10 },
  { title: 'Next chapter', page: 11 },
]

const faces: Face[] = [
  {
    id: 'cover',
    kind: 'cover',
    title: 'Cover',
    render: () => (
      <div className="flex h-full flex-col items-center justify-between text-center py-4 font-serif">
        <p className="text-[0.9375rem] italic opacity-80">Engineering logbook</p>
        <div>
          <p className="text-[2.5rem] leading-[1.05] font-medium tracking-[-0.01em] [text-shadow:0_1px_0_rgb(0_0_0/0.35)]">
            Kalhara
            <br />
            Tennakoon
          </p>
          <hr className="foil-rule w-14 mx-auto my-6" />
          <p className="text-[0.9375rem] opacity-90">Software, DevOps &amp; AI/ML engineer</p>
        </div>
        <p className="text-[0.875rem] opacity-75">2017 to 2026</p>
      </div>
    ),
  },
  {
    id: 'bookplate',
    kind: 'endpaper',
    title: 'Inside cover',
    render: () => (
      <div className="flex h-full items-center justify-center p-6">
        <div className="w-full max-w-[15rem] bg-[#fbfaf6] px-5 py-6 text-center font-serif shadow-[0_1px_2px_rgb(0_0_0/0.12)] outline outline-1 outline-offset-[-6px] outline-[#22396f]/40">
          <p className="text-[0.8125rem] italic text-[#5f6470]">This logbook belongs to</p>
          <p className="mt-2 text-[1.375rem] leading-tight text-[#22252b]">Kalhara Tennakoon</p>
          <hr className="mx-auto my-3 w-10 border-[#22396f]/30" />
          <p className="text-[0.8125rem] text-[#5f6470]">Kurunegala, Sri Lanka</p>
        </div>
      </div>
    ),
  },
  {
    id: 'contents',
    kind: 'page',
    title: 'Contents',
    folio: 1,
    render: (side) => (
      <PageFrame side={side} run="Logbook" folio={1}>
        <h4 className="page-title">Contents</h4>
        <ol className="mt-3 font-serif text-[0.9375rem] leading-snug">
          {CONTENTS.map((entry, i) => (
            <li key={entry.title}>
              <button
                type="button"
                onClick={() => requestPage(entry.page)}
                className="group flex w-[calc(100%-2.75rem)] items-baseline gap-2 py-[0.1875rem] text-left"
              >
                <span className="group-hover:underline underline-offset-2">{entry.title}</span>
                <span className="flex-1 border-b border-dotted border-[var(--page-rule)] translate-y-[-0.2rem]" />
                <span className="tabular-nums text-[var(--page-muted)]">{i + 2}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="page-note mt-3 pr-10 text-[0.875rem]">
          Drag or click a page edge to turn. Arrow keys work too.
        </p>
      </PageFrame>
    ),
  },
  {
    id: 'education',
    kind: 'page',
    title: 'Education',
    folio: 2,
    render: (side) => (
      <PageFrame side={side} run="Education" folio={2}>
        <h4 className="page-title">BSc (Hons) Computer Science, Software Engineering</h4>
        <p className="page-body mt-3">
          Kingston University, London. Studied in Sri Lanka through ESU, Kandy.
        </p>
        <Facts
          rows={[
            ['Classification', 'First Class Honours'],
            ['Cohort standing', 'Batch Top'],
            ['Final year project', 'Grade A, 76%'],
            ['Graduated', '2026'],
          ]}
        />
      </PageFrame>
    ),
  },
  {
    id: 'fyp',
    kind: 'page',
    title: 'Final year project',
    folio: 3,
    render: (side) => (
      <PageFrame side={side} run="Final year project" folio={3}>
        <h4 className="page-title">VetCare One</h4>
        <p className="page-note mt-1">Veterinary clinic management, 2025 to 2026</p>
        <div className="page-body mt-4">
          <p>
            Appointments, records, billing and inventory for a working clinic, plus a SwiftUI
            companion app.
          </p>
          <p>
            A local assistant pairs semantic search with exact SQL, and asks before it writes
            to the database.
          </p>
        </div>
        <p className="mt-4 font-sans text-[0.8125rem] text-[var(--page-muted)]">
          React, Node.js, PostgreSQL, pgvector, Ollama
        </p>
      </PageFrame>
    ),
  },
  {
    id: 'ascentic',
    kind: 'page',
    title: 'Ascentic AI Launch Pad',
    folio: 4,
    render: (side) => (
      <PageFrame side={side} run="Ascentic AI Launch Pad, 2026" folio={4}>
        <p className="font-serif text-[3.5rem] leading-none tracking-[-0.02em]">Top 10</p>
        <p className="page-note mt-2">of more than 700 applicants</p>
        <div className="page-body mt-6">
          <p>
            VetCare One was selected for the final round of the Ascentic AI Launch Pad and
            presented at Demo Day.
          </p>
          <p>
            The pitch: a clinic assistant that keeps patient data on the premises, with
            forecasting for disease, sales and inventory demand.
          </p>
        </div>
      </PageFrame>
    ),
  },
  {
    id: 'ifs-devops',
    kind: 'page',
    title: 'DevOps at IFS',
    folio: 5,
    render: (side) => (
      <PageFrame side={side} run="IFS R&D International" folio={5}>
        <h4 className="page-title">DevOps Engineering Intern</h4>
        <p className="page-note mt-1">Colombo, July to October 2024</p>
        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-serif text-[2.75rem] leading-none">~30%</span>
          <span className="font-serif text-[0.9375rem] leading-snug text-[var(--page-muted)]">
            less manual debugging after adding Behave tests to Tekton pipelines
          </span>
        </div>
        <ul className="page-body mt-5 list-disc pl-5 marker:text-[var(--page-muted)] space-y-1.5 text-[0.9688rem]">
          <li>Automated Kubernetes-native CI/CD workflows with Tekton</li>
          <li>Fixed recurring build and deployment failures</li>
          <li>Ran knowledge-sharing sessions on testing practice</li>
        </ul>
      </PageFrame>
    ),
  },
  {
    id: 'ifs-swe',
    kind: 'page',
    title: 'Software engineering at IFS',
    folio: 6,
    render: (side) => (
      <PageFrame side={side} run="IFS R&D International" folio={6}>
        <h4 className="page-title">Software Engineering Intern</h4>
        <p className="page-note mt-1">Colombo, July to December 2020</p>
        <ul className="page-body mt-5 list-disc pl-5 marker:text-[var(--page-muted)] space-y-2 text-[0.9688rem]">
          <li>Built a Docker and Kubernetes security scanner for container images and cluster configuration</li>
          <li>Wired vulnerability scanning into CI/CD pipelines</li>
          <li>Diagnosed deployment and runtime issues, and wrote the onboarding documentation</li>
        </ul>
        <p className="mt-5 font-sans text-[0.8125rem] text-[var(--page-muted)]">
          Go, Kubernetes, Docker, Argo CD, Rancher, Azure DevOps
        </p>
      </PageFrame>
    ),
  },
  {
    id: 'kubecon',
    kind: 'page',
    title: 'KubeCon scholarships',
    folio: 7,
    render: (side) => (
      <PageFrame side={side} run="Cloud Native Computing Foundation" folio={7}>
        <h4 className="page-title">Dan Kohn Scholarship, twice</h4>
        <p className="page-body mt-3">
          Awarded to attend KubeCon + CloudNativeCon Europe, in recognition of contributions to
          the cloud-native ecosystem.
        </p>
        <Facts
          rows={[
            ['First award', '2022'],
            ['Second award', '2025'],
          ]}
        />
      </PageFrame>
    ),
  },
  {
    id: 'writing',
    kind: 'page',
    title: 'Technical writing',
    folio: 8,
    render: (side) => (
      <PageFrame side={side} run="Technical writing" folio={8}>
        <div className="flex gap-8">
          <div>
            <p className="font-serif text-[2.75rem] leading-none">50+</p>
            <p className="page-note mt-1 not-italic">articles</p>
          </div>
          <div>
            <p className="font-serif text-[2.75rem] leading-none">150K+</p>
            <p className="page-note mt-1 not-italic">views</p>
          </div>
        </div>
        <p className="page-body mt-6">
          Writing on Medium since December 2021 about Kubernetes, Tekton, Docker, Go and CI/CD,
          with pieces published in Level Up Coding and FAUN.dev.
        </p>
        <a
          href="https://kalharatennakoon.medium.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-sans text-[0.875rem] font-medium text-[#22396f] underline underline-offset-4"
        >
          Read on Medium
        </a>
      </PageFrame>
    ),
  },
  {
    id: 'honours',
    kind: 'page',
    title: 'Earlier honours',
    folio: 9,
    render: (side) => (
      <PageFrame side={side} run="Earlier honours" folio={9}>
        <h4 className="page-title">Before the degree</h4>
        <ul className="page-list mt-5">
          <li><span>Hack:Bit Hackathon, first runner-up</span><span>2019</span></li>
          <li><span>HaXmas Hackathon, top 15 of 75+ teams</span><span>2018</span></li>
          <li><span>Cisco Packet Riders, national finalist</span><span>2018</span></li>
          <li><span>Cisco NetRiders, 4th in Sri Lanka, 118th in Asia Pacific</span><span>2017</span></li>
          <li><span>STEMUp Educational Foundation, volunteer</span><span>2018–20</span></li>
        </ul>
      </PageFrame>
    ),
  },
  {
    id: 'next',
    kind: 'page',
    title: 'Next chapter',
    folio: 10,
    render: (side) => (
      <PageFrame side={side} run="Next chapter" folio={10}>
        <h4 className="page-title">The pages that come next</h4>
        <p className="page-body mt-4">
          I'm looking for roles in software engineering, DevOps, cloud and MLOps, building
          software systems that are reliable, scalable and intelligent.
        </p>
        <div className="mt-6 flex flex-col gap-2 font-sans text-[0.875rem] font-medium">
          <a href="mailto:kalhara@kalharatennakoon.com" className="text-[#22396f] underline underline-offset-4">
            kalhara@kalharatennakoon.com
          </a>
          <a href="/Kalhara_Tennakoon_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-[#22396f] underline underline-offset-4">
            Download the CV (PDF)
          </a>
        </div>
      </PageFrame>
    ),
  },
  {
    id: 'colophon',
    kind: 'endpaper',
    title: 'Inside back cover',
    render: () => (
      <div className="flex h-full items-end justify-center p-8 text-center font-serif text-[0.8125rem] italic text-[#5f6470]">
        <p>Set in Newsreader and IBM Plex.<br />Bound in React and TypeScript.</p>
      </div>
    ),
  },
  {
    id: 'back-cover',
    kind: 'cover',
    title: 'Back cover',
    render: () => (
      <div className="flex h-full flex-col items-center justify-end pb-6 font-serif text-center">
        <p className="text-[0.875rem] opacity-80">kalharatennakoon.com</p>
      </div>
    ),
  },
]

const LAST_PAGE = faces.length - 1
const BLANK: Face = { id: 'blank', kind: 'blank', title: '' }

/* --------------------------------------------------------------------------
   The book
   -------------------------------------------------------------------------- */

interface Leaf {
  front: Face
  back: Face
}

interface Drag {
  leaf: number
  dir: 'fwd' | 'back'
  startX: number
  angle: number
  moved: number
}

function faceClass(kind: FaceKind) {
  if (kind === 'cover') return 'cover'
  if (kind === 'endpaper') return 'endpaper'
  return 'page'
}

export function Logbook() {
  const single = useMediaQuery('(max-width: 719px)')

  // `pos` is the reading position: the index of the right-hand (front) page in view.
  const [pos, setPos] = useState(0)
  const [flying, setFlying] = useState<Record<number, 'fwd' | 'back'>>({})
  const [shade, setShade] = useState<{ side: Side; key: number } | null>(null)
  const [drag, setDrag] = useState<Drag | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const posRef = useRef(pos)

  useEffect(() => {
    posRef.current = pos
  }, [pos])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const leaves: Leaf[] = useMemo(() => {
    if (single) return faces.map((f) => ({ front: f, back: BLANK }))
    const out: Leaf[] = []
    for (let i = 0; i < faces.length; i += 2) {
      out.push({ front: faces[i], back: faces[i + 1] ?? BLANK })
    }
    return out
  }, [single])

  const toTurned = useCallback((p: number) => (single ? p : Math.ceil(p / 2)), [single])
  const toPos = useCallback((t: number) => Math.min(single ? t : t * 2, LAST_PAGE), [single])

  const turned = toTurned(pos)
  const maxTurned = single ? LAST_PAGE : leaves.length

  const markFlying = useCallback((leaf: number, dir: 'fwd' | 'back', withShade: boolean) => {
    setFlying((prev) => ({ ...prev, [leaf]: dir }))
    if (withShade) setShade({ side: dir === 'fwd' ? 'right' : 'left', key: Date.now() + leaf })
    timers.current.push(window.setTimeout(() => {
      setFlying((prev) => {
        const next = { ...prev }
        delete next[leaf]
        return next
      })
    }, TURN_MS + 40))
  }, [])

  const flip = useCallback((dir: 'fwd' | 'back') => {
    const t = toTurned(posRef.current)
    if (dir === 'fwd' && t < maxTurned) {
      markFlying(t, 'fwd', true)
      const p = toPos(t + 1)
      posRef.current = p
      setPos(p)
    } else if (dir === 'back' && t > 0) {
      markFlying(t - 1, 'back', true)
      const p = toPos(t - 1)
      posRef.current = p
      setPos(p)
    }
  }, [toTurned, toPos, maxTurned, markFlying])

  /** Riffle through several leaves to reach a page, one leaf at a time. */
  const goTo = useCallback((page: number) => {
    const target = toTurned(page)
    const steps = target - toTurned(posRef.current)
    const dir = steps > 0 ? 'fwd' : 'back'
    for (let k = 0; k < Math.abs(steps); k++) {
      timers.current.push(window.setTimeout(() => flip(dir), k * RIFFLE_MS))
    }
  }, [toTurned, flip])

  useEffect(() => {
    const onGoTo = (e: Event) => goTo((e as CustomEvent<{ page: number }>).detail.page)
    window.addEventListener(GOTO_EVENT, onGoTo)
    return () => window.removeEventListener(GOTO_EVENT, onGoTo)
  }, [goTo])

  /* ---- Dragging a page by its edge ---- */

  const pageWidth = () => {
    const w = stageRef.current?.getBoundingClientRect().width ?? 700
    return single ? w : w / 2
  }

  const onPointerDown = (dir: 'fwd' | 'back') => (e: PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return
    const leaf = dir === 'fwd' ? turned : turned - 1
    if (leaf < 0 || leaf >= leaves.length || (single && dir === 'fwd' && turned >= LAST_PAGE)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ leaf, dir, startX: e.clientX, angle: dir === 'fwd' ? 0 : 180, moved: 0 })
  }

  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!drag) return
    const span = single ? pageWidth() : pageWidth() * 2
    const dx = e.clientX - drag.startX
    const progress = Math.max(0, Math.min(1, (drag.dir === 'fwd' ? -dx : dx) / span))
    const angle = drag.dir === 'fwd' ? progress * 180 : 180 - progress * 180
    setDrag({ ...drag, angle, moved: Math.max(drag.moved, Math.abs(dx)) })
  }

  const onPointerUp = () => {
    if (!drag) return
    const { dir, leaf, angle, moved } = drag
    setDrag(null)
    if (moved < 6) {
      flip(dir)
      return
    }
    const progress = dir === 'fwd' ? angle / 180 : (180 - angle) / 180
    if (progress > 0.3) {
      markFlying(leaf, dir, false)
      const p = toPos(dir === 'fwd' ? turned + 1 : turned - 1)
      posRef.current = p
      setPos(p)
    } else {
      // Let it fall back where it was.
      markFlying(leaf, dir === 'fwd' ? 'back' : 'fwd', false)
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      flip('fwd')
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      flip('back')
    } else if (e.key === 'Home') {
      e.preventDefault()
      goTo(0)
    }
  }

  /* ---- What is showing ---- */

  const state = turned === 0 ? 'closed-front' : !single && turned === leaves.length ? 'closed-back' : 'open'

  const visible: Face[] = single
    ? [faces[pos]]
    : [faces[2 * turned - 1], faces[2 * turned]].filter((f): f is Face => Boolean(f))

  const folios = visible.map((f) => f.folio).filter((n): n is number => n !== undefined)
  const indicator =
    folios.length === 2
      ? `Pages ${folios[0]}–${folios[1]} of 10`
      : folios.length === 1
        ? `Page ${folios[0]} of 10`
        : visible.map((f) => f.title).find((t) => t !== 'Inside cover' && t !== 'Inside back cover') ??
          visible[0]?.title ?? ''

  const zFor = (i: number) => {
    const dir = flying[i] ?? (drag?.leaf === i ? drag.dir : undefined)
    if (dir) return 100 + (dir === 'fwd' ? i : leaves.length - i)
    return i < turned ? i + 1 : leaves.length - i + 1
  }

  const atStart = turned === 0
  const atEnd = turned >= maxTurned

  return (
    <div className="flex flex-col items-center">
      <div
        ref={stageRef}
        className="book-stage outline-none"
        tabIndex={0}
        role="group"
        aria-roledescription="book"
        aria-label="Engineering logbook. Use the left and right arrow keys to turn pages."
        onKeyDown={onKeyDown}
      >
        <div className="book" data-state={state}>
          <div className="book-block is-left" />
          <div className="book-block is-right" />

          {shade && (
            <div
              key={shade.key}
              className={`book-shadow is-active is-${shade.side}`}
              style={{ zIndex: 50 }}
              aria-hidden="true"
            />
          )}

          {leaves.map((leaf, i) => {
            const isTurned = i < turned
            const dragging = drag?.leaf === i
            const style: CSSProperties = { zIndex: zFor(i) }
            if (dragging) {
              style.transform = `rotateY(${-drag.angle}deg)`
              ;(style as Record<string, string | number>)['--drag-shade'] =
                Math.sin((drag.angle * Math.PI) / 180) * 0.9
            }
            const classes = [
              'leaf',
              isTurned && 'is-turned',
              flying[i] && !dragging && 'is-turning',
              dragging && 'is-dragging',
              !single && i === turned && 'can-peek',
              !single && i === turned - 1 && 'can-peek-back',
            ].filter(Boolean).join(' ')

            // Only the leaves near the open spread need their content rendered.
            const near = Math.abs(i - turned) <= 2 || flying[i] !== undefined
            const hidden = !(i === turned || i === turned - 1)

            return (
              <div key={`${single ? 's' : 'd'}-${i}`} className={classes} style={style} aria-hidden={hidden}>
                <div className={`leaf-face is-front ${faceClass(leaf.front.kind)}`}>
                  {near && leaf.front.render?.('right')}
                </div>
                <div className={`leaf-face is-back ${faceClass(leaf.back.kind)}`}>
                  {near && leaf.back.render?.('left')}
                </div>
              </div>
            )
          })}

          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="turn-zone is-prev"
            disabled={atStart}
            onPointerDown={onPointerDown('back')}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => setDrag(null)}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="turn-zone is-next"
            disabled={atEnd}
            onPointerDown={onPointerDown('fwd')}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => setDrag(null)}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2">
        <button
          type="button"
          onClick={() => flip('back')}
          disabled={atStart}
          className="icon-btn disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Previous page"
        >
          <FaChevronLeft className="text-sm" />
        </button>
        <p className="min-w-[11rem] text-center text-sm text-muted tabular-nums" aria-live="polite">
          {indicator}
        </p>
        <button
          type="button"
          onClick={() => (atEnd ? goTo(0) : flip('fwd'))}
          className="icon-btn"
          aria-label={atEnd ? 'Back to the cover' : 'Next page'}
        >
          {atEnd ? <span className="text-sm font-medium px-1">Restart</span> : <FaChevronRight className="text-sm" />}
        </button>
      </div>
    </div>
  )
}

export default Logbook
