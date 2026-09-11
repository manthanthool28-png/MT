import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../components/Reveal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import NameWall from '../components/NameWall.jsx'
import { CATEGORIES, STORIES, photos, posters } from '../data/photos.js'

/* ==========================================================================
   Photography.

   The page opens on the name at architectural size with eight frames hung in
   front of and behind it, then settles into a masonry wall.

   The lightbox is a real modal: focus moves into it, Escape and the arrow
   keys work, the page behind it cannot scroll, and focus returns to the
   thumbnail you opened it from. A gallery that traps you or loses your place
   is worse than no gallery. Opening from anywhere on the page hands it the
   rectangle that was clicked, so the photograph grows out of the frame you
   pointed at.
   ========================================================================== */

export default function Photography() {
  useReveal()
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState(-1)
  /* Kept separately from the index: it is the rectangle the lightbox grows
     out of, and it is only meaningful for the click that set it. */
  const [origin, setOrigin] = useState(null)

  const shown = useMemo(
    () => (cat === 'all' ? photos : photos.filter((p) => p.cat === cat)),
    [cat],
  )
  /* Split the two kinds apart. The wall holds single frames in its fixed row
     track; sequences get their own full-width block below it, where their
     height is free. Every frame keeps its index into `shown` so the viewer
     still walks the whole set. */
  const loose = useMemo(
    () => shown.map((p, i) => ({ p, i })).filter(({ p }) => !p.story),
    [shown],
  )
  const stories = useMemo(() => {
    const seen = []
    for (const [i, p] of shown.entries()) {
      if (!p.story || seen.some((s) => s.key === p.story)) continue
      seen.push({
        key: p.story,
        story: STORIES[p.story],
        frames: shown.map((q, j) => ({ ...q, i: j })).filter((q) => q.story === p.story),
      })
      void i
    }
    return seen
  }, [shown])

  /* Eight frames spread evenly across the whole set rather than the first
     eight, so the opening is not four stage shots in a row. Sequence frames
     are skipped: they only mean anything next to each other. */
  const wallPicks = useMemo(() => {
    const pool = photos.map((p, i) => ({ p, i })).filter(({ p }) => !p.story)
    const step = Math.max(1, Math.floor(pool.length / 8))
    const out = []
    for (let k = 0; out.length < 8 && k < pool.length; k += step) out.push(pool[k])
    return out.slice(0, 8)
  }, [])

  const counts = useMemo(() => {
    const c = { all: photos.length }
    for (const k of CATEGORIES) if (k.id !== 'all') c[k.id] = photos.filter((p) => p.cat === k.id).length
    return c
  }, [])

  /* Wrap rather than dead-end at either edge. */
  const move = useCallback(
    (d) => setOpen((i) => (i < 0 ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  )
  const close = useCallback(() => { setOpen(-1); setOrigin(null) }, [])
  const openAt = useCallback((i, rect) => { setOrigin(rect || null); setOpen(i) }, [])

  return (
    <>
      <NameWall
        name="Manthan Thool"
        items={wallPicks}
        onOpen={(i, rect) => { if (cat !== 'all') setCat('all'); openAt(i, rect) }}
      />

      <section className="section wrap">
        <p className="tech tech--accent">[ Photography ]</p>
        <h2 className="matrix-title" style={{ marginTop: '0.7rem', maxWidth: '20ch' }}>
          Light, mostly borrowed
        </h2>
        <div className="prose" style={{ marginTop: '1.25rem' }}>
          <p>
            Shot on a phone, almost all of it. A stage lighting rig does the hard work in
            half of these and the weather does it in the other half; the only decision left
            is where to stand and when to press. Which is most of photography anyway.
          </p>
          <p>
            The stage work is from touring with <strong>Folk Lok</strong>, a Marathi folk
            ensemble. If you want moving pictures instead, the{' '}
            <Link to="/work/videography">videography case study</Link> covers the film side.
          </p>
        </div>

        <ul className="filters" role="group" aria-label="Filter photographs" style={{ marginTop: '2rem' }}>
          {CATEGORIES.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                className="filter snap"
                aria-pressed={cat === f.id}
                onClick={() => { setCat(f.id); setOpen(-1) }}
              >
                [ {f.label} ]<span className="filter__count">{counts[f.id]}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap" aria-label="Photographs">
        <div className="wall">
          {loose.map(({ p, i }) => (
            <button
              type="button"
              key={p.src}
              className={`wall__cell${p.span === 'tall' ? ' wall__cell--tall' : ''}`}
              onClick={(e) => openAt(i, e.currentTarget.getBoundingClientRect())}
              aria-label={`Open ${p.title}, image ${i + 1} of ${shown.length}`}
            >
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
              <span className="wall__cap" aria-hidden="true">{p.title}</span>
            </button>
          ))}
        </div>
      </section>

      {stories.map((c) => (
        <section className="section wrap" key={c.key} aria-labelledby={`story-${c.key}`}>
          <p className="tech tech--accent">[ Sequence ]</p>
          <h2 id={`story-${c.key}`} className="matrix-title" style={{ marginTop: '0.7rem' }}>
            {c.story.title}
          </h2>
          <p className="prose" style={{ marginTop: '0.9rem' }}>{c.story.caption}</p>
          <ol className="strip">
            {c.frames.map((f) => (
              <li key={f.src}>
                <button
                  type="button"
                  className="strip__frame"
                  onClick={(e) => openAt(f.i, e.currentTarget.getBoundingClientRect())}
                  aria-label={`Open ${f.title}, image ${f.i + 1} of ${shown.length}`}
                >
                  <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <section className="section wrap" aria-labelledby="posters-h">
        <p className="tech tech--accent">[ Not photographs ]</p>
        <h2 id="posters-h" className="matrix-title" style={{ marginTop: '0.7rem' }}>
          Tour posters
        </h2>
        <p className="prose" style={{ marginTop: '1rem' }}>
          Layout and typesetting for the same ensemble, built on the photographs above.
        </p>
        <div className="posters">
          {posters.map((p) => (
            <figure className="poster" key={p.src}>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
              <figcaption>{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {open >= 0 && (
        <Lightbox items={shown} index={open} origin={origin} onClose={close} onMove={move} />
      )}
    </>
  )
}
