import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

export interface ViewerPhoto {
  src: string
  width: number
  height: number
  alt: string
  caption?: string
}

interface Props {
  photos: ViewerPhoto[]
  startIndex: number
  /** Names the dialog for screen readers, e.g. the achievement title. */
  label: string
  onClose: () => void
}

const NAV_BTN =
  'absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white bg-black/45 hover:bg-black/70 border border-white/20 backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white'

/**
 * Full-screen photo viewer: arrow keys or swipe to move, Escape or the backdrop to close.
 * Portalled to <body> like the project dialog, above the navbar (z-[999]).
 */
function PhotoViewer({ photos, startIndex, label, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const count = photos.length
  const photo = photos[index]

  const go = useCallback((step: number) => setIndex((i) => (i + step + count) % count), [count])

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' && count > 1) go(1)
      else if (e.key === 'ArrowLeft' && count > 1) go(-1)
      else if (e.key === 'Tab' && panelRef.current) {
        // Keep Tab inside the viewer.
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus()
    }
  }, [onClose, go, count])

  // Load the neighbours so moving between photos is instant.
  useEffect(() => {
    if (count < 2) return
    for (const step of [1, -1]) {
      const img = new Image()
      img.src = photos[(index + step + count) % count].src
    }
  }, [index, photos, count])

  return createPortal(
    <div
      className="project-dialog-backdrop fixed inset-0 z-[1100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${label}: photos`}
        className="project-dialog-panel relative flex flex-col items-center max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null || count < 2) return
          const dx = e.changedTouches[0].clientX - touchX.current
          touchX.current = null
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        }}
      >
        <div className="relative w-full flex items-center justify-center">
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            decoding="async"
            className="block max-w-full max-h-[78vh] w-auto h-auto rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] object-contain select-none"
            draggable={false}
          />

          {count > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${NAV_BTN} left-2 sm:-left-14`}>
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${NAV_BTN} right-2 sm:-right-14`}>
                <FaChevronRight aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 w-full flex items-start justify-between gap-4 text-white/85 text-sm">
          <p className="m-0 leading-relaxed" aria-live="polite">
            {photo.caption ?? ''}
          </p>
          {count > 1 && (
            <span className="flex-shrink-0 tabular-nums text-white/60">
              {index + 1} / {count}
            </span>
          )}
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photos"
          className="absolute -top-2 right-0 sm:-top-4 sm:-right-14 w-10 h-10 rounded-full flex items-center justify-center text-white bg-black/45 hover:bg-black/70 border border-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <FaTimes aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  )
}

export default PhotoViewer
