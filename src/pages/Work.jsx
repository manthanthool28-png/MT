import { Link } from 'react-router-dom'
import Reveal, { useReveal } from '../components/Reveal.jsx'
import CourtVisionArt from '../components/CourtVisionArt.jsx'
import { projects } from '../data/projects.js'
import { asset } from '../data/assets.js'
import { thumbFor } from '../data/thumbs.js'
import { TemplateFlag } from '../components/TemplateFlag.jsx'

function Thumb({ project }) {
  if (project.slug === 'court-vision-3d') return <CourtVisionArt title={project.thumb.alt} />
  const a = thumbFor(project)
  return (
    <img
      src={a.src}
      alt={a.alt}
      width={a.w || undefined}
      height={a.h || undefined}
      loading="lazy"
      decoding="async"
    />
  )
}

export default function Work() {
  useReveal()
  return (
    <>
      <header className="page-head wrap">
        <Reveal>
          <p className="tech tech--accent">[ Project index ]</p>
          <h1>Work index</h1>
          <p>
            Six projects across product design and creative technology. Each started from the same place: someone had to understand something
            complicated, and the interface was in the way. Research first, then the pixels.
          </p>
        </Reveal>
      </header>

      <section aria-labelledby="all-projects">
        <h2 id="all-projects" className="visually-hidden">All projects</h2>
        <div className="bento">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className={`bento__item bento__item--${p.size} snap`}
            >
              {p.template && <TemplateFlag />}
              <span className="bento__index">
                {String(i + 1).padStart(2, '0')} / {p.meta.Timeline}
              </span>
              <div className="bento__media">
                <Thumb project={p} />
              </div>
              <h3 className="bento__title">{p.title}</h3>
              <p className="bento__desc">{p.description}</p>
              <ul className="bento__tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Link>
          ))}

          {/* Not a link, and now it says so. It sat in the grid looking exactly
              like the eleven cards around it while having nowhere to go, so it
              read as broken rather than as an unfinished sketch. */}
          <div className="bento__item bento__item--md bento__item--static">
            <span className="bento__index">Exploration &middot; no case study</span>
            <div className="bento__media" style={{ display: 'flex', gap: '1px' }}>
              {['rag-1', 'rag-2'].map((k) => {
                const a = asset(k)
                return (
                  <img
                    key={k}
                    src={a.src}
                    alt={a.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '50%', opacity: 0.5 }}
                  />
                )
              })}
            </div>
            <h3 className="bento__title">Rag Picker</h3>
            <p className="bento__desc">
              A mobile interface for an impact-driven service concept. Two early
              wireframes and nothing else yet &mdash; there is no page behind this one.
            </p>
            <p className="ph-note">Placeholder wireframes: the real ones are still to come</p>
          </div>

        </div>
      </section>
    </>
  )
}
