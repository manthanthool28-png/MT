import { useCallback, useEffect, useRef, useState } from 'react'

/* ==========================================================================
   Drum: the vault as an object you turn.

   A grid shows everything at once and asks you to choose. This shows one
   thing, in front, with the rest of the set visibly present around it — the
   eight pieces are mounted on the faces of a cylinder and you turn it. That
   is a different proposition from the rest of the site's spatial work: the
   case studies move you through a fixed sequence, the photography wall is one
   composition held still, and this is the only thing on the site you can pick
   up and rotate.

   Real perspective rather than a scaled carousel: the faces are placed with
   rotateY + translateZ inside a preserve-3d parent, so the side faces are
   genuinely turned away and foreshortened rather than drawn smaller.

   Every face is a real link or button in source order, so tabbing works; a
   face that receives focus turns itself to the front rather than being
   operated invisibly from the back of the drum. Faces pointing away are taken
   out of the tab order and made unclickable, because a link you cannot see is
   a link you cannot mean to press.

   prefers-reduced-motion: no drum. The same items render as a plain grid,
   which is what they were before this existed.
   ========================================================================== */

const EASE = 0.14

function useReduced() {
  const [reduce, set] = useState(
    () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => set(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

export default function Drum({ items, render, label }) {
  const reduce = useReduced()
  const n = items.length
  const step = 360 / n
  const stage = useRef(null)
  const ring = useRef(null)
  const faces = useRef([])
  const angle = useRef(0)
  const target = useRef(0)
  const drag = useRef(null)
  const [front, setFront] = useState(0)

  const paint = useCallback(() => {
    const r = ring.current
    if (!r) return
    r.style.transform = `translateZ(calc(var(--drum-r) * -1)) rotateY(${angle.current}deg)`
    for (let i = 0; i < n; i++) {
      const f = faces.current[i]
      if (!f) continue
      /* 1 dead ahead, 0 edge-on, negative behind. Drives how present a face
         looks and whether it can be reached at all. */
      const facing = Math.cos(((angle.current + i * step) * Math.PI) / 180)
      const away = facing < 0.25
      /* The fade goes on the media, not the whole face: fading a caption to
         18% leaves readable-looking text at about 2:1, which is worse than
         not showing it. Captions are carried by the front face alone, and the
         title under the drum names it again. */
      f.style.setProperty('--face', (0.2 + Math.max(facing, 0) * 0.8).toFixed(3))
      f.style.pointerEvents = away ? 'none' : 'auto'
      f.tabIndex = away ? -1 : 0
      f.setAttribute('aria-hidden', away ? 'true' : 'false')
    }
  }, [n, step])

  /* One loop, running only while the drum is actually moving. */
  const raf = useRef(0)
  const spin = useCallback(() => {
    raf.current = 0
    const d = target.current - angle.current
    if (drag.current) {
      paint()
      raf.current = requestAnimationFrame(spin)
      return
    }
    if (Math.abs(d) < 0.02) {
      angle.current = target.current
      paint()
      return
    }
    angle.current += d * EASE
    paint()
    raf.current = requestAnimationFrame(spin)
  }, [paint])
  const wake = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(spin)
  }, [spin])

  const goTo = useCallback((i) => {
    /* Turn the short way round: snapping from face 7 to face 0 should be one
       step forward, not seven steps back. */
    const want = -i * step
    const delta = ((want - target.current + 540) % 360) - 180
    target.current += delta
    setFront(((i % n) + n) % n)
    wake()
  }, [n, step, wake])

  useEffect(() => { paint() }, [paint])

  useEffect(() => {
    const el = stage.current
    if (!el) return

    const down = (e) => {
      if (e.button != null && e.button !== 0) return
      drag.current = { x: e.clientX, a: angle.current, moved: 0 }
      el.setPointerCapture?.(e.pointerId)
      el.classList.add('is-held')
      wake()
    }
    const move = (e) => {
      const d = drag.current
      if (!d) return
      const dx = e.clientX - d.x
      d.moved = Math.max(d.moved, Math.abs(dx))
      /* Degrees per pixel tuned so one face is about a thumb's width of
         travel rather than a whole swipe of the trackpad. */
      angle.current = d.a + dx * 0.32
      target.current = angle.current
      wake()
    }
    const up = () => {
      const d = drag.current
      if (!d) return
      drag.current = null
      el.classList.remove('is-held')
      const i = Math.round(-angle.current / step)
      goTo(((i % n) + n) % n)
      /* A drag that moved is not a click: suppress the face's activation. */
      el.dataset.dragged = d.moved > 6 ? 'true' : 'false'
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
      cancelAnimationFrame(raf.current)
    }
  }, [goTo, n, step, wake])

  /* No drum at all under reduced motion: a cylinder you turn is the motion,
     so there is no version of it to tone down. The same eight items render as
     a grid, which is what they were before this existed. */
  if (reduce) {
    return (
      <ul className="drum__grid" aria-label={label}>
        {items.map((it) => <li key={it.key}>{render(it, true)}</li>)}
      </ul>
    )
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(front + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(front - 1) }
  }

  return (
    <div className="drum" aria-roledescription="carousel" aria-label={label}>
      <div
        className="drum__stage"
        ref={stage}
        onKeyDown={onKey}
        role="group"
        tabIndex={0}
        aria-label={`${label}. Drag, or use the left and right arrow keys.`}
      >
        <div className="drum__ring" ref={ring}>
          {items.map((it, i) => (
            <div
              className="drum__face"
              key={it.key}
              ref={(node) => { faces.current[i] = node }}
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--drum-r))` }}
              onFocusCapture={() => goTo(i)}
              onClickCapture={(e) => {
                if (stage.current?.dataset.dragged === 'true') { e.preventDefault(); e.stopPropagation() }
                else if (i !== front) { e.preventDefault(); e.stopPropagation(); goTo(i) }
              }}
            >
              {render(it, i === front)}
            </div>
          ))}
        </div>
      </div>

      <div className="drum__bar">
        <button type="button" className="drum__nudge" onClick={() => goTo(front - 1)} aria-label="Previous">←</button>
        <ol className="drum__pips">
          {items.map((it, i) => (
            <li key={it.key}>
              <button
                type="button"
                data-on={i === front ? 'true' : 'false'}
                onClick={() => goTo(i)}
                aria-label={it.name}
                aria-current={i === front}
              />
            </li>
          ))}
        </ol>
        <button type="button" className="drum__nudge" onClick={() => goTo(front + 1)} aria-label="Next">→</button>
      </div>

      <p className="drum__now" aria-live="polite">
        <span className="drum__now-n">{items[front].name}</span>
        <span className="drum__now-k">{items[front].kind}</span>
      </p>
    </div>
  )
}
