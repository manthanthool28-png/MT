import { Fragment, useEffect, useRef, useState } from 'react'
import { asset } from '../data/assets.js'

/* ==========================================================================
   Cinema: the scroll-driven opening act.

   A written case study answers questions in order. It does not put the thing
   in front of you. This act does that first — four beats, each one screen,
   each holding a single frame from the live build while the argument moves
   underneath it — and then hands over to the written study, which is left
   exactly as it was. Nothing here says anything the case study does not; the
   lines are its own sentences cut to length.

   Everything is driven by one shared scroll loop rather than a library. The
   page already carries a 3D prototype; adding a scroll framework on top of it
   to move some text around would be the wrong trade.

   prefers-reduced-motion is not a degraded path here. The pinned sequence
   becomes an ordinary stack of four captioned frames, headings render as
   plain headings, and the counters render their final value. That version is
   the whole content, in order, with nothing withheld.
   ========================================================================== */

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

/* --- one shared scroll loop ---------------------------------------------
   Every drifting object and every pinned film registers here. One listener,
   one rAF, one pass over the registry per painted frame — rather than each
   component installing its own scroll handler and racing the others. */
const watchers = new Set()
let frame = 0

function pass() {
  frame = 0
  for (const fn of watchers) fn()
}
function onScroll() {
  if (!frame) frame = requestAnimationFrame(pass)
}
let bound = false
function watch(fn) {
  watchers.add(fn)
  if (!bound) {
    bound = true
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll, { passive: true })
  }
  fn()
  return () => watchers.delete(fn)
}

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v)

/* --- oversized heading that assembles as it arrives ---------------------- */
export function SplitHeading({ as: Tag = 'h2', text, className = '', id }) {
  const reduce = useReduced()
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduce || shown) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(ref.current)
    /* Same failsafe the rest of the site uses: nothing stays invisible just
       because an observer never fired. */
    const t = setTimeout(() => setShown(true), 2500)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [reduce, shown])

  if (reduce) return <Tag id={id} className={`cine-h ${className}`}>{text}</Tag>

  const words = text.split(' ')
  return (
    <Tag id={id} ref={ref} className={`cine-h ${className}`} data-in={shown ? 'true' : 'false'}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="cine-h__w" style={{ '--i': i }}><span>{w}</span></span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}

/* --- a number that counts up once ---------------------------------------- */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', label }) {
  const reduce = useReduced()
  const ref = useRef(null)
  const out = useRef(null)
  /* Grouped the way the case study writes the same figure: it says 1,025
     shots, so the headline number cannot say 1025. */
  const fmt = new Intl.NumberFormat('en-IE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  const final = fmt.format(value)

  useEffect(() => {
    if (reduce) return
    const node = out.current
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const run = (t) => {
        const p = clamp((t - t0) / 1100, 0, 1)
        /* Ease out: the last tenth of a count is the part people read. */
        const e2 = 1 - Math.pow(1 - p, 3)
        node.textContent = fmt.format(value * e2)
        if (p < 1) raf = requestAnimationFrame(run)
      }
      raf = requestAnimationFrame(run)
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [reduce, value, decimals])

  return (
    <div className="fact" ref={ref}>
      <p className="fact__v">
        {prefix}
        <span ref={out}>{reduce ? final : fmt.format(0)}</span>
        {suffix}
      </p>
      <p className="fact__l">{label}</p>
    </div>
  )
}

/* --- parallax float ------------------------------------------------------- */
export function Drift({ rate = 0.08, className = '', children }) {
  const reduce = useReduced()
  const ref = useRef(null)
  useEffect(() => {
    if (reduce) return
    const el = ref.current
    return watch(() => {
      const r = el.getBoundingClientRect()
      /* Measured from the middle of the viewport, so an element sits at its
         laid-out position when it is centred and drifts either side of that.
         Anything offscreen is skipped rather than transformed for nobody. */
      if (r.bottom < -200 || r.top > innerHeight + 200) return
      const mid = r.top + r.height / 2 - innerHeight / 2
      el.style.transform = `translate3d(0, ${(-mid * rate).toFixed(1)}px, 0)`
    })
  }, [reduce, rate])
  return <div ref={ref} className={`drift ${className}`}>{children}</div>
}

/* --- the pinned sequence -------------------------------------------------- */
export function ScrollFilm({ beats, label }) {
  const reduce = useReduced()
  const track = useRef(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const el = track.current
    return watch(() => {
      const r = el.getBoundingClientRect()
      const travel = r.height - innerHeight
      if (travel <= 0) return
      const p = clamp(-r.top / travel, 0, 1)
      /* The last beat needs its own screen at the end of the track, so the
         index is taken across n stops rather than n-1 boundaries. */
      setI(clamp(Math.floor(p * beats.length), 0, beats.length - 1))
    })
  }, [reduce, beats.length])

  if (reduce) {
    return (
      <section className="film film--static" aria-label={label}>
        {beats.map((b) => {
          const a = asset(b.key)
          return (
            <figure className="film__still" key={b.key}>
              <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
              <figcaption>
                <p className="film__kicker">{b.kicker}</p>
                <p className="film__line">{b.line}</p>
              </figcaption>
            </figure>
          )
        })}
      </section>
    )
  }

  return (
    <section
      className="film"
      ref={track}
      aria-label={label}
      style={{ '--n': beats.length }}
    >
      <div className="film__stage" data-i={i}>
        <div className="film__frames">
          {beats.map((b, n) => {
            const a = asset(b.key)
            return (
              <img
                key={b.key}
                src={a.src}
                alt={n === i ? a.alt : ''}
                aria-hidden={n === i ? undefined : 'true'}
                width={a.w}
                height={a.h}
                className="film__frame"
                data-on={n === i ? 'true' : 'false'}
                loading={n === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            )
          })}
        </div>

        <div className="film__caption">
          {/* All four are rendered and only one is shown: swapping text nodes
              on scroll makes a screen reader announce a moving target, and it
              reflows the caption box on every change. */}
          {beats.map((b, n) => (
            <div className="film__cap" key={b.key} data-on={n === i ? 'true' : 'false'}>
              <p className="film__kicker">{b.kicker}</p>
              <p className="film__line">{b.line}</p>
            </div>
          ))}
          <ol className="film__ticks" aria-hidden="true">
            {beats.map((b, n) => <li key={b.key} data-on={n === i ? 'true' : 'false'} />)}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* --- drifting spike glyphs ------------------------------------------------
   The project's own mark: a spike rising from a court location, which is the
   whole encoding in one shape. Decorative, so it is hidden from the tree and
   absent entirely under reduced motion. */
export function Motes({ count = 7 }) {
  const reduce = useReduced()
  if (reduce) return null
  /* Kept to the right of the headline, which is capped at 17ch: a spike
     crossing the words reads as dirt on the screen rather than as depth. */
  const seeds = Array.from({ length: count }, (_, n) => ({
    x: [89, 95, 91, 86, 62, 74, 97][n % 7],
    y: [12, 30, 62, 84, 88, 76, 48][n % 7],
    s: [1, 0.7, 0.85, 0.55, 1.1, 0.65, 0.8][n % 7],
    r: [0.16, 0.09, 0.22, 0.06, 0.13, 0.19, 0.1][n % 7],
  }))
  return (
    <div className="motes" aria-hidden="true">
      {seeds.map((m, n) => (
        <Drift key={n} rate={m.r} className="motes__m">
          <svg viewBox="0 0 12 46" style={{ left: `${m.x}%`, top: `${m.y}%`, '--s': m.s }}>
            <path d="M6 44 V6" stroke="currentColor" strokeWidth="1.4" fill="none" />
            <ellipse cx="6" cy="44" rx="5" ry="1.8" fill="currentColor" opacity="0.5" />
            <circle cx="6" cy="5" r="2.6" fill="currentColor" />
          </svg>
        </Drift>
      ))}
    </div>
  )
}
