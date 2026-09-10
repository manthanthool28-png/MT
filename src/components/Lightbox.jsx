import { useCallback, useEffect, useRef, useState } from 'react'

/* ==========================================================================
   Lightbox with zoom and pan.

   The previous version sized the image with `max-height: 100%` inside a `1fr`
   grid row. A percentage height on a grid item's child does not resolve there,
   so the constraint computed to none and a 1600px-tall photograph rendered at
   full size inside a 671px stage — the bottom two thirds were simply clipped.
   The stage is now a positioned box and the image is absolutely filled into it
   with object-fit, which cannot overflow whatever the row height turns out to be.

   Zoom is a transform on top of that fit, so 1x always means "the whole frame".
   ========================================================================== */

const STEPS = [1, 1.75, 2.75, 4]

export default function Lightbox({ items, index, onClose, onMove }) {
  const dialogRef = useRef(null)
  const stageRef = useRef(null)
  const [step, setStep] = useState(0)
  const [off, setOff] = useState({ x: 0, y: 0 })
  const drag = useRef(null)
  const item = items[index]
  const scale = STEPS[step]

  /* A new photograph always starts fitted, otherwise you arrive somewhere
     arbitrary inside the next image. */
  useEffect(() => { setStep(0); setOff({ x: 0, y: 0 }) }, [index])

  const clamp = useCallback((next, s) => {
    const el = stageRef.current
    if (!el || s <= 1) return { x: 0, y: 0 }
    const r = el.getBoundingClientRect()
    const maxX = (r.width * (s - 1)) / 2
    const maxY = (r.height * (s - 1)) / 2
    return {
      x: Math.max(-maxX, Math.min(maxX, next.x)),
      y: Math.max(-maxY, Math.min(maxY, next.y)),
    }
  }, [])

  const zoomTo = useCallback((i) => {
    const s = Math.max(0, Math.min(STEPS.length - 1, i))
    setStep(s)
    setOff((o) => clamp(o, STEPS[s]))
  }, [clamp])

  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onMove(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); onMove(-1) }
      else if (e.key === '+' || e.key === '=') { e.preventDefault(); zoomTo(step + 1) }
      else if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomTo(step - 1) }
      else if (e.key === '0') { e.preventDefault(); zoomTo(0) }
      else if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll('button:not([disabled])')
        if (!f?.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (prevFocus instanceof HTMLElement) prevFocus.focus()
    }
  }, [onClose, onMove, zoomTo, step])

  if (!item) return null

  const onWheel = (e) => {
    if (!e.ctrlKey && Math.abs(e.deltaY) < 2) return
    e.preventDefault()
    zoomTo(step + (e.deltaY < 0 ? 1 : -1))
  }

  const onPointerDown = (e) => {
    if (scale <= 1) return
    drag.current = { x: e.clientX, y: e.clientY, ox: off.x, oy: off.y }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const d = drag.current
    setOff(clamp({ x: d.ox + (e.clientX - d.x), y: d.oy + (e.clientY - d.y) }, scale))
  }
  const endDrag = () => { drag.current = null }

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}. Image ${index + 1} of ${items.length}`}
      ref={dialogRef}
      tabIndex={-1}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lb__bar">
        <p className="lb__count">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          <span className="lb__title"> · {item.title}</span>
        </p>
        <button type="button" className="lb__btn" onClick={onClose} aria-label="Close viewer">✕</button>
      </div>

      <div
        className={`lb__stage${scale > 1 ? ' lb__stage--zoomed' : ''}`}
        ref={stageRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => zoomTo(step >= STEPS.length - 1 ? 0 : step + 1)}
      >
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          style={{ transform: `translate(${off.x}px, ${off.y}px) scale(${scale})` }}
        />
      </div>

      <div className="lb__nav">
        <button type="button" className="lb__btn" onClick={() => onMove(-1)} aria-label="Previous image">←</button>

        <span className="lb__zoom">
          <button
            type="button" className="lb__btn" onClick={() => zoomTo(step - 1)}
            disabled={step === 0} aria-label="Zoom out"
          >−</button>
          <span className="lb__level" aria-live="polite">{scale === 1 ? 'Fit' : `${scale}×`}</span>
          <button
            type="button" className="lb__btn" onClick={() => zoomTo(step + 1)}
            disabled={step === STEPS.length - 1} aria-label="Zoom in"
          >+</button>
        </span>

        <button type="button" className="lb__btn" onClick={() => onMove(1)} aria-label="Next image">→</button>
      </div>

      <p className="lb__hint">
        {scale > 1 ? 'Drag to pan · double-click to zoom out' : 'Double-click or scroll to zoom · ← → for the next photograph'}
      </p>
    </div>
  )
}
