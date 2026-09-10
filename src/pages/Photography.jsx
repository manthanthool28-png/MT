import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../components/Reveal.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { CATEGORIES, STORIES, photos, posters } from '../data/photos.js'

/* ==========================================================================
   Photography.

   A masonry wall with a lightbox. The lightbox is a real modal: focus moves
   into it, Escape and the arrow keys work, the page behind it cannot scroll,
   and focus returns to the thumbnail you opened it from. A gallery that traps
   you or loses your place is worse than no gallery.
   ========================================================================== */

export default function Photography() {
  useReveal()
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState(-1)

  const shown = useMemo(
    () => (cat === 'all' ? photos : photos.filter((p) => p.cat === cat)),
    [cat],
  )
  const cells = useMemo(() => {
    const out = []
    const seen = new Set()
    shown.forEach((p, i) => {
      if (!p.story) { out.push({ kind: 'photo', p, i }); return }
      if (seen.has(p.story)) return
      seen.add(p.story)
      out.push({
        kind: 'story',
        key: p.story,
        story: STORIES[p.story],
        frames: shown.map((q, j) => ({ ...q, i: j })).filter((q) => q.story === p.story),
      })
    })
    return out
  }, [shown])

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
  const close = useCallback(() => setOpen(-1), [])

  return (
    <>
      <section className="section wrap">
        <p className="tech tech--accent">[ Photography ]</p>
        <h1 className="matrix-title" style={{ marginTop: '0.7rem', maxWidth: '20ch' }}>
          Light, mostly borrowed
        </h1>
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
          {cells.map((c) =>
            c.kind === 'story' ? (
              <figure className="wall__story" key={c.key}>
                <figcaption className="wall__story-head">
                  <span className="wall__story-title">{c.story.title}</span>
                  <span className="wall__story-cap">{c.story.caption}</span>
                </figcaption>
                <ol className="wall__strip">
                  {c.frames.map((f) => (
                    <li key={f.src}>
                      <button
                        type="button"
                        className="wall__frame"
                        onClick={() => setOpen(f.i)}
                        aria-label={`Open ${f.title}, image ${f.i + 1} of ${shown.length}`}
                      >
                        <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" />
                      </button>
                    </li>
                  ))}
                </ol>
              </figure>
            ) : (
              <button
                type="button"
                key={c.p.src}
                className={`wall__cell${c.p.span === 'tall' ? ' wall__cell--tall' : ''}`}
                onClick={() => setOpen(c.i)}
                aria-label={`Open ${c.p.title}, image ${c.i + 1} of ${shown.length}`}
              >
                <img src={c.p.src} alt={c.p.alt} width={c.p.w} height={c.p.h} loading="lazy" decoding="async" />
                <span className="wall__cap" aria-hidden="true">{c.p.title}</span>
              </button>
            ),
          )}
        </div>
      </section>

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
        <Lightbox items={shown} index={open} onClose={close} onMove={move} />
      )}
    </>
  )
}
