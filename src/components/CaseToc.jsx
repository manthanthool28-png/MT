import { useEffect, useState } from 'react'

/**
 * Sticky vertical table of contents that tracks reading depth.
 * Sections are discovered from the DOM rather than duplicated in a prop, so a
 * case study can never ship a TOC that disagrees with its own content.
 */
export default function CaseToc() {
  const [items, setItems] = useState([])
  const [current, setCurrent] = useState('')

  useEffect(() => {
    const nodes = [...document.querySelectorAll('.case-canvas .cs-section[id]')]
    const found = nodes.map((n) => ({
      id: n.id,
      label: n.querySelector('h2')?.textContent?.trim() || n.id,
    }))
    setItems(found)
    if (!nodes.length) return

    /* Scroll position rather than IntersectionObserver: IO gives no callbacks
       at all in a backgrounded tab, and the reading-depth indicator should be
       correct the instant the tab is looked at again. rAF-throttled, so this
       costs one bounding-box read per painted frame while scrolling. */
    let raf = 0
    const measure = () => {
      raf = 0
      const line = 96 // just below the sticky nav
      let active = nodes[0].id
      for (const n of nodes) {
        if (n.getBoundingClientRect().top <= line) active = n.id
        else break
      }
      setCurrent(active)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }

    /* rAF is suspended while the tab is hidden, so a scroll that happened
       just before the tab was backgrounded would leave a stale indicator.
       Re-measure directly whenever the page becomes visible again. */
    const onVisible = () => {
      if (!document.hidden) measure()
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  if (items.length < 2) return null

  return (
    <nav className="toc" aria-label="Case study contents">
      <p className="toc__label">Contents</p>
      <ol className="toc__list">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              className="toc__link"
              href={`#${it.id}`}
              data-current={current === it.id || undefined}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span className="toc__num">{String(i + 1).padStart(2, '0')}</span>
              <span>{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
