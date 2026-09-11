import { useEffect, useRef } from 'react'

/* ==========================================================================
   NameWall: the photography opening.

   The name is set large enough to be architecture rather than a title, and
   the photographs are hung in front of and behind it, so the letterforms are
   interrupted by some frames and pass over others. That crossing is the whole
   effect: two planes at different depths, with the type in between, which is
   what makes it read as a space rather than a heading with pictures around it.

   Depth is carried three ways — the z-order above and below the type, a
   parallax rate per frame on scroll, and a small lean towards the pointer.
   Each frame gets its own rate, so the wall opens out as you scroll into it
   instead of sliding as one sheet.

   Clicking a frame hands it to the lightbox with the rectangle it was
   occupying, so the photograph grows out of where it was rather than
   appearing on top of it.

   prefers-reduced-motion: the composition is kept and the motion is not. The
   depth still reads, because most of it was never motion.
   ========================================================================== */

/* Percentages of the wall, so the composition holds at any width. `z` puts a
   frame behind (0) or in front of (2) the type, which sits at 1. */
const SLOTS = [
  /* Top and bottom rows run into the name from either side and stop short of
     its middle. That band is what keeps thirteen letters readable through
     eight photographs — the frames clip the tops and feet of the letterforms,
     which is enough to interleave the planes, and leave the waist alone. */
  /* The two frames over the first letter go behind it: an M loses more to a
     clipped top than any other letter here, and it is the letter that has to
     carry the name. */
  { x: 3,  y: 6,  w: 15.5, h: 37, z: 0, r: 0.10 },
  { x: 25, y: 10, w: 16.5, h: 34, z: 2, r: 0.17 },
  { x: 51, y: 5,  w: 15,   h: 36, z: 0, r: 0.06 },
  { x: 75, y: 9,  w: 16,   h: 33, z: 2, r: 0.20 },
  { x: 6,  y: 52, w: 16,   h: 42, z: 0, r: 0.13 },
  { x: 29, y: 56, w: 15,   h: 40, z: 0, r: 0.08 },
  { x: 54, y: 51, w: 16.5, h: 43, z: 2, r: 0.18 },
  { x: 77, y: 55, w: 15.5, h: 39, z: 0, r: 0.11 },
]

export default function NameWall({ name, items, onOpen }) {
  const wall = useRef(null)
  const cells = useRef([])

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = wall.current
    let raf = 0
    const ptr = { x: 0, y: 0, seen: false }

    const paint = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      if (r.bottom < -200 || r.top > innerHeight + 200) return
      /* Measured from the middle of the viewport so each frame sits where it
         was laid out when the wall is centred, and opens either side of that. */
      const mid = r.top + r.height / 2 - innerHeight / 2
      for (let i = 0; i < cells.current.length; i++) {
        const c = cells.current[i]
        if (!c) continue
        const s = SLOTS[i % SLOTS.length]
        const lean = ptr.seen ? ((ptr.x - innerWidth / 2) / innerWidth) * s.r * 60 : 0
        c.style.transform =
          `translate3d(${lean.toFixed(1)}px, ${(-mid * s.r).toFixed(1)}px, 0)`
      }
    }
    const wake = () => { if (!raf) raf = requestAnimationFrame(paint) }

    const onMove = (e) => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.seen = true; wake() }
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

  return (
    <section className="namewall" ref={wall} aria-labelledby="namewall-h">
      <h1 className="namewall__type" id="namewall-h">{name}</h1>

      {items.map((it, i) => {
        const s = SLOTS[i % SLOTS.length]
        return (
          <button
            type="button"
            key={it.p.src}
            className="namewall__cell"
            ref={(n) => { cells.current[i] = n }}
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: `${s.w}%`, height: `${s.h}%`,
              zIndex: s.z,
            }}
            onClick={(e) => onOpen(it.i, e.currentTarget.getBoundingClientRect())}
            aria-label={`Open ${it.p.title}`}
          >
            <img src={it.p.src} alt="" width={it.p.w} height={it.p.h} decoding="async" />
            <span className="namewall__cap" aria-hidden="true">{it.p.title}</span>
          </button>
        )
      })}
    </section>
  )
}
