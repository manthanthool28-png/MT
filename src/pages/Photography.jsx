import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../components/Reveal.jsx'
import { CATEGORIES, photos, posters } from '../data/photos.js'

/* ==========================================================================
   Photography.

   A masonry wall with a lightbox. The lightbox is a real modal: focus moves
   into it, Escape and the arrow keys work, the page behind it cannot scroll,
   and focus returns to the thumbnail you opened it from. A gallery that traps
   you or loses your place is worse than no gallery.
   ========================================================================== */

function Lightbox({ items, index, onClose, onMove }) {
  const dialogRef = useRef(null)
  const item = items[index]

  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onMove(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); onMove(-1) }
      else if (e.key === 'Tab') {
        /* Two controls plus the dialog: keep Tab inside rather than letting it
           wander into the page underneath. */
        const f = dialogRef.current?.querySelectorAll('button')
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
  }, [onClose, onMove])

  if (!item) return null
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
        <button type="button" className="lb__btn" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <figure className="lb__stage">
        <img src={item.src} alt={item.alt} width={item.w} height={item.h} />
      </figure>

      <div className="lb__nav">
        <button type="button" className="lb__btn" onClick={() => onMove(-1)} aria-label="Previous image">←</button>
        <button type="button" className="lb__btn" onClick={() => onMove(1)} aria-label="Next image">→</button>
      </div>
    </div>
  )
}

export default function Photography() {
  useReveal()
  const [cat, setCat] = useState('all')
  const [open, setOpen] = useState(-1)

  const shown = useMemo(
    () => (cat === 'all' ? photos : photos.filter((p) => p.cat === cat)),
    [cat],
  )
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
          {shown.map((p, i) => (
            <button
              type="button"
              key={p.src}
              className={`wall__cell${p.span === 'tall' ? ' wall__cell--tall' : ''}`}
              onClick={() => setOpen(i)}
              aria-label={`Open ${p.title}, image ${i + 1} of ${shown.length}`}
            >
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" />
              <span className="wall__cap" aria-hidden="true">{p.title}</span>
            </button>
          ))}
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
