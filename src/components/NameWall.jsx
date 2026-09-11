import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/* ==========================================================================
   NameWall: the photography opening.

   The name is set large enough to be architecture rather than a title, and it
   sits behind everything: the photographs are the foreground, the name is the
   wall they are hung on. Nothing is ever drawn over a photograph, which is
   both the composition and the reason the type never has to fight an image
   for contrast.

   Depth is carried by a parallax rate per frame on scroll and a small lean
   towards the pointer. Each frame has its own rate, so the wall opens out as
   you scroll into it rather than sliding as one sheet.

   Clicking a frame pops it: the same element grows from its slot to the
   middle of the screen and shrinks back into the slot when dismissed. It is a
   FLIP — measure, move, invert, release — performed on the element that was
   already there, not a second copy of it in a modal, so the photograph never
   leaves the wall it belongs to.

   prefers-reduced-motion: the composition is kept and the travel is not. The
   pop still happens, it just arrives.
   ========================================================================== */

/* Percentages of the wall, so the composition holds at any width. The top and
   bottom rows run into the name from either side and stop short of its middle,
   so the letters are read across their waist while the frames take the tops
   and the feet. `r` is the parallax rate. */
const SLOTS = [
  { x: 3,  y: 6,  w: 15.5, h: 37, r: 0.10 },
  { x: 25, y: 10, w: 16.5, h: 34, r: 0.17 },
  { x: 51, y: 5,  w: 15,   h: 36, r: 0.06 },
  { x: 75, y: 9,  w: 16,   h: 33, r: 0.20 },
  { x: 6,  y: 52, w: 16,   h: 42, r: 0.13 },
  { x: 29, y: 56, w: 15,   h: 40, r: 0.08 },
  { x: 54, y: 51, w: 16.5, h: 43, r: 0.18 },
  { x: 77, y: 55, w: 15.5, h: 39, r: 0.11 },
]

/* The popped size: as big as the viewport comfortably allows, at the
   photograph's own proportions so nothing is cropped to fit a box. */
function popRect(p) {
  const maxH = innerHeight * 0.76
  const maxW = innerWidth * 0.84
  const ratio = p.w / p.h
  let h = maxH
  let w = h * ratio
  if (w > maxW) { w = maxW; h = w / ratio }
  return { w, h, left: (innerWidth - w) / 2, top: (innerHeight - h) / 2 }
}

export default function NameWall({ name, items, onZoom }) {
  const wall = useRef(null)
  const cells = useRef([])
  const [pop, setPop] = useState(-1)
  const from = useRef(null)

  /* --- parallax ---------------------------------------------------------- */
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = wall.current
    let raf = 0
    const ptr = { x: 0, seen: false }

    const paint = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > innerHeight + 200) return
      /* Measured from the middle of the viewport so each frame sits where it
         was laid out when the wall is centred, and opens either side of that. */
      const mid = r.top + r.height / 2 - innerHeight / 2
      for (let i = 0; i < cells.current.length; i++) {
        const c = cells.current[i]
        /* The popped frame is driven by the FLIP, not by this. */
        if (!c || c.dataset.pop === 'true') continue
        const s = SLOTS[i % SLOTS.length]
        const lean = ptr.seen ? ((ptr.x - innerWidth / 2) / innerWidth) * s.r * 60 : 0
        c.style.transform =
          `translate3d(${lean.toFixed(1)}px, ${(-mid * s.r).toFixed(1)}px, 0)`
      }
    }
    const wake = () => { if (!raf) raf = requestAnimationFrame(paint) }
    const onMove = (e) => { ptr.x = e.clientX; ptr.seen = true; wake() }
    const onLeave = () => { ptr.seen = false; wake() }

    paint()
    addEventListener('scroll', wake, { passive: true })
    addEventListener('resize', wake, { passive: true })
    addEventListener('pointermove', onMove, { passive: true })
    addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('scroll', wake)
      removeEventListener('resize', wake)
      removeEventListener('pointermove', onMove)
      removeEventListener('pointerleave', onLeave)
    }
  }, [items])

  /* --- the pop, as a FLIP ------------------------------------------------- */
  useLayoutEffect(() => {
    const i = pop
    const c = i >= 0 ? cells.current[i] : from.current?.el
    if (!c || !from.current) return
    const first = from.current.rect
    const last = c.getBoundingClientRect()
    from.current = i >= 0 ? from.current : null

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dx = first.left - last.left
    const dy = first.top - last.top
    const sx = first.width / last.width
    const sy = first.height / last.height
    c.style.transition = 'none'
    c.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
    /* Two frames: one for the browser to paint the inverted state, one to
       leave it. A single rAF lands in the same frame and nothing animates. */
    let b = 0
    const a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => {
        c.style.transition = ''
        c.style.transform = i >= 0 ? 'none' : ''
      })
    })
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b) }
  }, [pop])

  const open = useCallback((i) => {
    const c = cells.current[i]
    if (!c) return
    from.current = { el: c, rect: c.getBoundingClientRect() }
    setPop(i)
    onZoom?.(true)
  }, [onZoom])

  const close = useCallback(() => {
    const c = cells.current[pop]
    if (c) from.current = { el: c, rect: c.getBoundingClientRect() }
    setPop(-1)
    onZoom?.(false)
    /* Send focus back to the frame that was opened, not to the top of the page. */
    requestAnimationFrame(() => cells.current[pop]?.focus())
  }, [pop, onZoom])

  useEffect(() => {
    if (pop < 0) return
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); close() } }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [pop, close])

  const rect = pop >= 0 ? popRect(items[pop].p) : null

  return (
    <section
      className="namewall"
      ref={wall}
      data-pop={pop >= 0 ? 'true' : 'false'}
      aria-labelledby="namewall-h"
    >
      <h1 className="namewall__type" id="namewall-h">{name}</h1>

      {/* Only present while something is popped, so it cannot swallow clicks
          the rest of the time. */}
      {pop >= 0 && (
        <button type="button" className="namewall__scrim" onClick={close} aria-label="Close photograph" />
      )}

      {items.map((it, i) => {
        const s = SLOTS[i % SLOTS.length]
        const on = i === pop
        return (
          <button
            type="button"
            key={it.p.src}
            className="namewall__cell"
            data-pop={on ? 'true' : 'false'}
            ref={(n) => { cells.current[i] = n }}
            style={
              on
                ? { left: rect.left, top: rect.top, width: rect.w, height: rect.h, position: 'fixed' }
                : { left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%` }
            }
            onClick={() => (on ? close() : open(i))}
            aria-expanded={on}
            aria-label={on ? `Close ${it.p.title}` : `Enlarge ${it.p.title}`}
          >
            <img src={it.p.src} alt={on ? it.p.alt : ''} width={it.p.w} height={it.p.h} decoding="async" />
            <span className="namewall__cap">{it.p.title}</span>
          </button>
        )
      })}
    </section>
  )
}
