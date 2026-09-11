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
  const stage = useRef(null)
  /* The frame box is cut to the shape of the work rather than to a house
     ratio: a 1600x1000 capture of a 3D tool and a 720x1600 phone screen want
     opposite boxes, and one box for both pillar-boxes whichever it was not
     built for. So the box follows the beat, and is animated between them —
     which also means an act can mix a wide screenshot with a tall one
     instead of the frames having to be chosen for their shape. */
  const shots = beats.map((b) => asset(b.key))
  const first = shots[0]
  /* Column split is decided once, from the whole set: flipping the stage
     layout beat to beat would move the caption out from under the reader. */
  const tall = shots.some((a) => a.w / a.h < 1)
  const frames = useRef(null)

  const track = useRef(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce || !frames.current) return
    /* Keyed off beats, not the derived array: that is rebuilt on every render
       and would run this on every render for no reason. */
    const a = asset(beats[i].key)
    frames.current.style.aspectRatio = `${a.w} / ${a.h}`
    frames.current.dataset.tall = a.w / a.h < 1 ? 'true' : 'false'
  }, [reduce, i, beats])

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
      const exact = p * beats.length
      const idx = clamp(Math.floor(exact), 0, beats.length - 1)
      /* Progress inside the current beat, written straight to the DOM rather
         than held in state. It drives the filling tick and a few pixels of
         drift on the frame, which is the whole answer to a pinned section
         reading as a frozen one: between two beats nothing was moving, so
         the page felt stuck rather than held. It also cannot go through
         React — this changes every frame and the beat index does not. */
      stage.current.style.setProperty('--sub', clamp(exact - idx, 0, 1).toFixed(3))
      setI(idx)
    })
  }, [reduce, beats.length])

  if (reduce) {
    return (
      <section className={`film film--static${tall ? ' film--tall' : ''}`} aria-label={label}>
        {beats.map((b, n) => {
          const a = shots[n]
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
      className={`film${tall ? ' film--tall' : ''}`}
      ref={track}
      aria-label={label}
      style={{ '--n': beats.length, '--r': `${first.w} / ${first.h}` }}
    >
      <div className="film__stage" data-i={i} ref={stage}>
        <div
          className="film__frames"
          ref={frames}
          data-tall={first.w / first.h < 1 ? 'true' : 'false'}
        >
          {beats.map((b, n) => {
            const a = shots[n]
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
            {beats.map((b, n) => (
              <li key={b.key} data-on={n === i ? 'true' : 'false'} data-done={n < i ? 'true' : 'false'} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* --- drifting marks ------------------------------------------------------
   Each act drifts its own project's mark, not a house ornament: a spike
   rising from a court location is Court Vision's entire encoding in one
   shape, the octagon is the Kaleidoscope block, the hanger is the hung-or-
   folded choice the laundry flow turns on. Decorative, so they are hidden
   from the tree and absent entirely under reduced motion. */
const GLYPHS = {
  spike: {
    box: '0 0 12 46',
    art: (
      <>
        <path d="M6 44 V6" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <ellipse cx="6" cy="44" rx="5" ry="1.8" fill="currentColor" opacity="0.5" />
        <circle cx="6" cy="5" r="2.6" fill="currentColor" />
      </>
    ),
  },
  octagon: {
    box: '0 0 40 40',
    art: (
      <>
        <polygon
          points="11.7,0.7 28.3,0.7 39.3,11.7 39.3,28.3 28.3,39.3 11.7,39.3 0.7,28.3 0.7,11.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <circle cx="20" cy="20" r="2.2" fill="currentColor" opacity="0.7" />
      </>
    ),
  },
  box: {
    box: '0 0 36 30',
    art: (
      <>
        <rect x="0.7" y="6.7" width="34.6" height="22.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M0.7 6.7 6 0.7h24l5.3 6M12 6.7v22.6M24 6.7v22.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </>
    ),
  },
  pin: {
    box: '0 0 26 36',
    art: (
      <>
        <path d="M13 34.5C13 34.5 24.3 22.6 24.3 13.3A11.3 11.3 0 1 0 1.7 13.3C1.7 22.6 13 34.5 13 34.5Z"
          fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="13" cy="13" r="3.4" fill="currentColor" opacity="0.75" />
      </>
    ),
  },
  window: {
    box: '0 0 40 30',
    art: (
      <>
        <rect x="0.7" y="0.7" width="38.6" height="28.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M0.7 8.4h38.6M12 8.4v20.9" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="4.6" cy="4.5" r="1.1" fill="currentColor" />
      </>
    ),
  },
  ring: {
    box: '0 0 36 36',
    art: (
      <>
        <circle cx="18" cy="18" r="17.3" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="18" cy="18" r="11" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
        <circle cx="18" cy="18" r="4.8" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      </>
    ),
  },
  wheel: {
    box: '0 0 34 34',
    art: (
      <>
        <circle cx="17" cy="17" r="16.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="17" cy="17" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M17 0.7v11.7M17 21.6v11.7M0.7 17h11.7M21.6 17h11.7" stroke="currentColor" strokeWidth="1.1" />
      </>
    ),
  },
  chevron: {
    box: '0 0 28 34',
    art: (
      <>
        <path d="M2 2l12 9 12-9M2 15l12 9 12-9" fill="none" stroke="currentColor" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 28l12 5 12-5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  frame: {
    box: '0 0 40 28',
    art: (
      <>
        <rect x="0.7" y="0.7" width="38.6" height="26.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6.5 0.7v26.6M33.5 0.7v26.6" stroke="currentColor" strokeWidth="1.1" />
        <path d="M2.6 4.5h2M2.6 11h2M2.6 17.5h2M2.6 24h2M35.4 4.5h2M35.4 11h2M35.4 17.5h2M35.4 24h2"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  pair: {
    box: '0 0 38 22',
    art: (
      <>
        <rect x="0.7" y="0.7" width="16" height="20.6" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect x="21.3" y="0.7" width="16" height="20.6" fill="currentColor" opacity="0.45" />
      </>
    ),
  },
  hanger: {
    box: '0 0 44 30',
    art: (
      <>
        <path
          d="M22 12c0-3.2 4-2.6 4-5.6A4 4 0 0 0 18 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path d="M22 12 5 25.5h34z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </>
    ),
  },
}

export function Motes({ count = 7, glyph = 'spike' }) {
  const reduce = useReduced()
  if (reduce) return null
  const g = GLYPHS[glyph] || GLYPHS.spike
  /* Kept to the right of the headline, which is capped at 17ch: a mark
     crossing the words reads as dirt on the screen rather than as depth. */
  const seeds = Array.from({ length: count }, (_, n) => ({
    x: [89, 95, 91, 86, 62, 74, 97][n % 7],
    y: [12, 30, 62, 84, 88, 76, 48][n % 7],
    s: [1, 0.7, 0.85, 0.55, 1.1, 0.65, 0.8][n % 7],
    r: [0.16, 0.09, 0.22, 0.06, 0.13, 0.19, 0.1][n % 7],
  }))
  return (
    <div className="motes" data-g={glyph} aria-hidden="true">
      {seeds.map((m, n) => (
        <Drift key={n} rate={m.r} className="motes__m">
          <svg viewBox={g.box} style={{ left: `${m.x}%`, top: `${m.y}%`, '--s': m.s }}>
            {g.art}
          </svg>
        </Drift>
      ))}
    </div>
  )
}
