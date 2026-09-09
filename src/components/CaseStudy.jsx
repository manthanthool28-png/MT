import { Link } from 'react-router-dom'
import { neighbours } from '../data/projects.js'
import { TagChips } from './ProjectCard.jsx'
import { CornerAccent } from './Triangle.jsx'
import CaseToc from './CaseToc.jsx'

/** 1. Header band — title, one-line summary, metadata chips, hero visual. */
export function CaseHeader({ project, children }) {
  return (
    <header className="cs-head">
      <CornerAccent placement="tr" size={200} />
      <div className="wrap cs-head__grid">
        <div>
          <p className="eyebrow">{project.tagline}</p>
          <h1>{project.title}</h1>
          <p className="cs-head__summary">{project.summary}</p>
          <div style={{ marginTop: '1.35rem' }}>
            <TagChips tags={project.tags} />
          </div>
          <dl className="meta">
            {Object.entries(project.meta).map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>{children}</div>
      </div>
    </header>
  )
}

/** Sections 2–7 all share this shell. */
export function CaseSection({ id, eyebrow, title, children, narrow = false }) {
  return (
    <section className="cs-section" id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <div className={`wrap${narrow ? ' wrap--narrow' : ''}`}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && (
          <h2 id={id ? `${id}-h` : undefined} style={{ marginTop: eyebrow ? '0.6rem' : 0 }}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}

/** One numbered design decision in section 4. */
export function Decision({ n, title, children }) {
  return (
    <article className="decision">
      <p className="decision__num">Decision {String(n).padStart(2, '0')}</p>
      <h3>{title}</h3>
      {children}
    </article>
  )
}

/** 8. Prev / next project navigation. */
export function PrevNext({ slug }) {
  const { prev, next } = neighbours(slug)
  return (
    <nav className="wrap" aria-label="More projects">
      <div className="prevnext">
        <Link to={`/work/${prev.slug}`}>
          <small>← Previous</small>
          <span>{prev.title}</span>
        </Link>
        <Link to={`/work/${next.slug}`}>
          <small>Next →</small>
          <span>{next.title}</span>
        </Link>
      </div>
    </nav>
  )
}

/**
 * Split reading layout: sticky TOC on the left, single-column scrolling canvas
 * on the right for long-form narrative, blueprints and embedded viewports.
 */
export function CaseBody({ children }) {
  return (
    <div className="wrap">
      <div className="case-shell">
        <CaseToc />
        <div className="case-canvas">{children}</div>
      </div>
    </div>
  )
}
