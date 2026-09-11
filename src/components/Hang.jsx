import { useEffect, useRef } from 'react'

/* ==========================================================================
   Hang: objects suspended from a rail, the way a set piece is flown.

   The About page is about a designer who came out of theatre, and the page
   says so in as many words ("designing a set is spatial design under hard
   constraint"). So the page is built as a rig rather than a stack: a rail
   across the top of each band, hairline wires dropping from it, and the
   content hanging off the wires with weight.

   Everything hangs from two or more wires of equal length, which is a
   parallel linkage: the object stays level and slides sideways rather than
   tilting. That is both the truthful behaviour for a picture on a batten and
   the only one this page has room for — see reach() for why a single-point
   pivot had to go.

   Motion is a damped pendulum integrated per frame, not a CSS keyframe: a
   keyframe cannot be pushed, caught or thrown, and being able to grab the
   portrait and swing it is the whole point.

   Drivers: dragging (direct), pointer speed passing nearby (a draught), and
   scroll (the rig being jostled). Each item carries its own phase so they
   never swing in unison — a real mobile never does.

   prefers-reduced-motion: the rig still draws — rails, wires, pins, depth —
   but nothing moves and nothing can be dragged. The spatial reading survives
   without the motion, which is the point of the whole treatment.
   ========================================================================== */

const items = new Set()
let frame = 0
let prev = 0
const ptr = { x: 0, y: 0, vx: 0, seen: false }

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)

function step(now) {
  const dt = Math.min((now - prev) / 1000, 1 / 30) || 1 / 60
  prev = now
  let moving = false

  for (const it of items) {
    const rig = it.rig.current
    if (!rig) continue

    /* The wire length in metres decides the period. Pixels are divided by a
       constant rather than treated as metres: at 1px = 1mm a 60px wire swings
       about twice a second, which reads as a twitch. This lands near 1.4s. */
    const L = Math.max(it.len, 24) / 120
    const w2 = 9.81 / L

    if (it.grab) {
      moving = true
    } else {
      const acc = -w2 * Math.sin(it.a) - it.damp * it.v
      it.v += acc * dt
      it.a += it.v * dt

      /* A draught: the pointer moving quickly past an object pushes it. The
         falloff is on distance from the object's own box, so a pointer on the
         far side of the page does nothing. */
      if (ptr.vx && it.box) {
        const cx = it.box.left + it.box.width / 2
        const cy = it.box.top + it.box.height / 2
        const d = Math.hypot(ptr.x - cx, ptr.y - cy)
        const near = clamp(1 - d / (it.box.width + 320), 0, 1)
        if (near > 0) it.v += clamp(ptr.vx, -2600, 2600) * 2.2e-5 * near * it.give
      }

      if (Math.abs(it.a) > 1e-4 || Math.abs(it.v) > 1e-4) moving = true
      else { it.a = 0; it.v = 0 }
    }

    it.a = clamp(it.a, -it.max, it.max)

    /* Depth: a small tilt towards the pointer, so the object reads as a plate
       hanging in front of the page rather than printed on it.

       Both the target and the easing matter. Until the pointer has actually
       been seen the target is flat — otherwise a page that has only ever been
       scrolled, or a touch screen with no pointer at all, would load with
       every object already leaning three degrees at nothing. And the value is
       eased rather than assigned, so crossing the page tips the plate over
       instead of snapping it. */
    let tx = 0, ty = 0
    if (it.box && it.tilt && ptr.seen) {
      const cx = it.box.left + it.box.width / 2
      const cy = it.box.top + it.box.height / 2
      tx = clamp((ptr.x - cx) / (it.box.width || 1), -1, 1) * it.tilt
      ty = clamp((cy - ptr.y) / (it.box.height || 1), -1, 1) * it.tilt * 0.7
    }
    it.ry += (tx - it.ry) * 0.11
    it.rx += (ty - it.rx) * 0.11
    if (Math.abs(tx - it.ry) > 0.01 || Math.abs(ty - it.rx) > 0.01) moving = true
    const ry = Math.abs(it.ry) < 0.01 ? 0 : it.ry
    const rx = Math.abs(it.rx) < 0.01 ? 0 : it.rx

    /* The body rides the ends of the wires, so it drops slightly as it swings
       out — that vertical component is what stops a slide reading as a slide. */
    const px = it.len * Math.sin(it.a)
    const py = it.len * (1 - Math.cos(it.a))
    rig.style.transform = `translate3d(${px}px, ${py}px, 0) rotateY(${ry}deg) rotateX(${rx}deg)`
    for (const w of it.wires.current) {
      if (w) w.style.transform = `rotate(${it.a}rad)`
    }
  }

  /* The draught is a per-frame impulse, so it has to be spent each frame or a
     single flick would push forever. */
  ptr.vx *= 0.82
  if (Math.abs(ptr.vx) < 1) ptr.vx = 0

  frame = moving || ptr.vx ? requestAnimationFrame(step) : 0
}

function wake() {
  if (!frame) { prev = performance.now(); frame = requestAnimationFrame(step) }
}

/* How far this object can travel before it leaves the window.

   The page gutter is the wall, and on the left there is no scroll to escape
   into: anything that overhangs is simply cut off by the window edge. That is
   what killed the single-point pivot this started as. A plate on one pivot
   sweeps an arc set by its height, not its width, so the 340x490 portrait
   threw its bottom corner about 220px past its own column — against a 40px
   gutter, the largest honest swing left was four degrees. On parallel wires
   the same plate only slides, so its reach is the wire length times the sine
   of the angle, and there is room for a swing worth looking at.

   The limit is still computed per object from where it actually sits, rather
   than fixed at some constant timid enough for a laptop: wide windows get a
   real swing, narrow ones a sway. */
function reach(it) {
  const wrap = it.wrap.current
  if (!wrap) return 0.62

  /* Measured on the wrapper, never on the rig: the rig carries the transform,
     so its own rect grows as it swings, and feeding that back in would ratchet
     the limit down a little further on every pass until nothing could move. */
  const r = wrap.getBoundingClientRect()
  const half = r.width / 2
  const mid = r.left + half
  const m = 4
  const vw = document.documentElement.clientWidth
  const room = Math.min(mid - m, vw - m - mid)
  let best = 0.04
  for (let a = 0.04; a <= 0.62; a += 0.02) {
    if (half + it.len * Math.sin(a) > room) break
    best = a
  }
  return best
}

function measure() {
  for (const it of items) {
    const body = it.body.current
    if (body) it.box = body.getBoundingClientRect()
    it.max = reach(it)
    /* Read the wire rather than trusting the prop: CSS shortens the drop at
       narrow widths, and the period and the sideways travel both depend on
       the length that actually rendered. */
    const w = it.wires.current[0]
    if (w && w.offsetHeight) it.len = w.offsetHeight
  }
}

let bound = false
function bind() {
  if (bound) return
  bound = true

  let lastX = 0, lastT = 0
  addEventListener('pointermove', (e) => {
    const now = e.timeStamp
    const dt = now - lastT
    if (dt > 0 && dt < 120) ptr.vx = ((e.clientX - lastX) / dt) * 1000
    lastX = e.clientX; lastT = now
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.seen = true
    wake()
  }, { passive: true })

  let lastY = scrollY
  addEventListener('scroll', () => {
    const d = scrollY - lastY
    lastY = scrollY
    /* Out of phase: alternating sign per item, scaled by how freely each one
       hangs, so the rig shivers rather than swinging as one block. */
    let i = 0
    for (const it of items) {
      it.v += d * 3.4e-4 * (i++ % 2 ? -1 : 1) * it.give
    }
    measure()
    wake()
  }, { passive: true })

  /* Pointer gone from the window: let everything settle back to flat rather
     than freezing mid-lean. */
  addEventListener('pointerleave', () => { ptr.seen = false; ptr.vx = 0; wake() }, { passive: true })
  addEventListener('blur', () => { ptr.seen = false; ptr.vx = 0; wake() }, { passive: true })

  addEventListener('resize', () => { measure(); wake() }, { passive: true })
}

/**
 * @param {number} len     wire length in px; sets both the period and the reach.
 * @param {number} give    how freely it takes a push. A heavy plank is < 1.
 * @param {number[]} pins  wire positions across the object, 0..1.
 * @param {boolean} drag   allow grabbing and throwing it.
 * @param {number} tilt    degrees of perspective lean towards the pointer.
 */
export default function Hang({
  len = 56,
  give = 1,
  damp = 1.15,
  pins = [0.18, 0.82],
  drag = false,
  tilt = 3,
  rail = true,
  className = '',
  children,
}) {
  const rig = useRef(null)
  const body = useRef(null)
  const wires = useRef([])
  const wrap = useRef(null)
  const pinKey = pins.join(',')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) return

    const it = { rig, body, wires, wrap, len, give, damp, tilt,
                 a: 0, v: 0, rx: 0, ry: 0, max: 0.62, grab: null, box: null }
    items.add(it)
    bind()
    measure()
    wake()

    let release = null
    if (drag) {
      const el = body.current
      const down = (e) => {
        if (e.button != null && e.button !== 0) return
        const r = rig.current.getBoundingClientRect()
        /* The pivot is the pin: top of the rig, at the wire's x. */
        /* Referenced to the middle of the object: with a parallel hang there
           is no single pivot to measure the angle from. */
        it.grab = { px: r.left + r.width / 2, py: r.top, a: it.a, t: e.timeStamp }
        it.v = 0
        /* Capture keeps the swing tracking once the pointer leaves the frame,
           which it will — the object moves out from under it. It throws on a
           pointer id the element never saw, so a failure here is not fatal. */
        try { el.setPointerCapture(e.pointerId) } catch { /* not capturable */ }
        el.classList.add('is-held')
        wake()
      }
      const move = (e) => {
        if (!it.grab) return
        e.preventDefault()
        const dx = e.clientX - it.grab.px
        const dy = Math.max(e.clientY - it.grab.py, 8)
        const a = clamp(Math.atan2(dx, dy), -it.max, it.max)
        const dt = (e.timeStamp - it.grab.t) / 1000
        if (dt > 0) it.v = (a - it.grab.a) / dt
        it.grab.a = a; it.grab.t = e.timeStamp
        it.a = a
        wake()
      }
      const up = () => {
        if (!it.grab) return
        it.grab = null
        el.classList.remove('is-held')
        /* Keep the velocity built up while dragging: letting go of a swing
           should throw it, not park it. */
        it.v = clamp(it.v, -6, 6)
        wake()
      }
      el.addEventListener('pointerdown', down)
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerup', up)
      el.addEventListener('pointercancel', up)
      release = () => {
        el.removeEventListener('pointerdown', down)
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerup', up)
        el.removeEventListener('pointercancel', up)
      }
    }

    return () => { items.delete(it); release?.() }
  }, [len, give, damp, tilt, drag, pinKey])

  return (
    <div className={`hang ${drag ? 'hang--grab' : ''} ${className}`} ref={wrap} style={{ '--hang-len': `${len}px` }}>
      {rail && <span className="hang__rail" aria-hidden="true" />}
      {pins.map((p) => (
        <span className="hang__pin" key={p} style={{ left: `${p * 100}%` }} aria-hidden="true" />
      ))}
      <div className="hang__rig" ref={rig} style={{ '--pivot': `${pins[0] * 100}%` }}>
        {pins.map((p, i) => (
          <span
            className="hang__wire"
            key={p}
            style={{ left: `${p * 100}%` }}
            ref={(n) => { wires.current[i] = n }}
            aria-hidden="true"
          />
        ))}
        <div className="hang__body" ref={body}>{children}</div>
      </div>
    </div>
  )
}
