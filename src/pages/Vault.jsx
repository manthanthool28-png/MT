import { useCallback, useEffect, useRef, useState } from 'react'
import Reveal, { useReveal } from '../components/Reveal.jsx'
import { vaultItems, repos } from '../data/vault.js'
import { asset } from '../data/assets.js'

/** One masonry tile. Muted preview plays on hover; click opens the player. */
function VaultTile({ item, onOpen }) {
  const a = asset(item.key)
  const external = !item.video && item.href
  const videoRef = useRef(null)

  const enter = () => {
    const v = videoRef.current
    if (v) v.play().catch(() => {})
  }
  const leave = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
  }

  const Tag = external ? 'a' : 'button'
  const props = external
    ? { href: item.href, target: '_blank', rel: 'noreferrer noopener' }
    : { type: 'button', onClick: () => onOpen(item), 'aria-label': `Open ${item.name} full screen` }

  return (
    <Tag
      className="vault__item snap"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      {...props}
    >
      <div className="vault__media">
        {item.video ? (
          <video
            ref={videoRef}
            src={item.video}
            poster={a.src}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
        )}
        {external && <span className="vault__badge">Watch ↗</span>}
      </div>
      <div className="vault__meta">
        <span className="vault__name">{item.name}</span>
        <span className="vault__kind">{item.kind}</span>
      </div>
    </Tag>
  )
}

export default function Vault() {
  useReveal()
  const [open, setOpen] = useState(null)
  const closeRef = useRef(null)

  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    // Move focus into the dialog so Escape and tabbing behave.
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, close])

  return (
    <>
      <header className="page-head wrap">
        <Reveal>
          <p className="tech tech--accent">[ Production media vault // Rapid repositories ]</p>
          <h1>Media vault</h1>
          <p>
            Motion work, performances and process captures, plus direct links to live files
            and source repositories.
          </p>
        </Reveal>
      </header>

      <section className="vault" aria-label="Media grid">
        {vaultItems.map((it) => (
          <VaultTile key={it.key} item={it} onOpen={setOpen} />
        ))}

        {repos.map((r) =>
          r.href ? (
            <a
              key={r.label}
              className="repo snap"
              href={r.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="repo__label">{r.label}</span>
            </a>
          ) : (
            <div key={r.label} className="repo" style={{ borderStyle: 'dashed' }}>
              <span className="repo__label" style={{ opacity: 0.55 }}>
                {r.label}
              </span>
              <span className="tech" style={{ display: 'block', marginTop: '0.5rem' }}>
                // URL pending. Add it in src/data/vault.js
              </span>
            </div>
          )
        )}
      </section>

      {open && (
        <div
          className="player"
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          onClick={close}
        >
          <button ref={closeRef} type="button" className="player__close" onClick={close}>
            [ Close · Esc ]
          </button>
          <div className="player__inner" onClick={(e) => e.stopPropagation()}>
            {open.video ? (
              <video src={open.video} controls autoPlay playsInline />
            ) : (
              <img src={asset(open.key).src} alt={asset(open.key).alt} />
            )}
            <p className="player__cap">
              {open.name} · {open.kind}
              {!open.video && ' · poster placeholder, no video file yet'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
