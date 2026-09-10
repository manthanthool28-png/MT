import { useEffect, useRef, useState } from 'react'
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom'
import { Triangle } from './Triangle.jsx'
import ContactTerminal from './ContactTerminal.jsx'
import BackLink from './BackLink.jsx'
import BackToTop from './BackToTop.jsx'
import { CursorRing } from './Reveal.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { site } from '../data/site.js'

const links = [
  /* Home is listed explicitly. The wordmark also goes home, but that is a
     convention people have to already know; a visitor deep in a case study was
     hunting for a way back to the front page and not finding one. */
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work' },
  { to: '/photography', label: 'Photos' },
  { to: '/vault', label: 'Vault' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef(null)

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <CursorRing />

      <header className="nav">
        <div className="wrap nav__inner">
          <Link to="/" className="nav__brand">
            <Triangle />
            <span>Manthan Thool</span>
          </Link>

          <nav aria-label="Primary" className="nav__nav">
            <ul className="nav__links" id="primary-menu" data-open={open || undefined}>
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className="nav__link">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="nav__controls">
              <a className="nav__cta snap" href={site.resumePdf} download>
                Resume ↓
              </a>
              <ThemeToggle />
              <button
                ref={toggleRef}
                type="button"
                className="nav__burger"
                aria-expanded={open}
                aria-controls="primary-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main id="main">
        {pathname !== '/' && <BackLink />}
        <Outlet />
      </main>

      <ContactTerminal compact={pathname === '/contact'} />
      <BackToTop />
    </>
  )
}
