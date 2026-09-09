import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ShotChartHero from '../components/ShotChartLazy.jsx'
import CourtVisionArt from '../components/CourtVisionArt.jsx'
import Reveal, { useReveal, useParallax } from '../components/Reveal.jsx'
import ToolStrip from '../components/ToolStrip.jsx'
import StageTeaser from '../components/StageTeaser.jsx'
import { projects } from '../data/projects.js'
import { site } from '../data/site.js'
import { asset } from '../data/assets.js'
import { thumbFor } from '../data/thumbs.js'
import { TemplateFlag } from '../components/TemplateFlag.jsx'

/* Filter set. Every filter resolves to a distinct set: an "Interactive audio"
   filter returned exactly the same two projects as "Creative technology", and
   Court Vision sat in both Thesis and Creative technology, so the same card
   appeared under filters that promised different things. */
const FILTERS = [
  { id: 'all', label: '[ All work ]' },
  { id: 'product', label: '[ UX/UI & Figma systems ]' },
  { id: 'thesis', label: '[ Thesis core tech ]' },
  { id: 'creative-tech', label: '[ Creative technology ]' },
  { id: 'film', label: '[ Film & cinematography ]' },
]

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

export default function Home() {
  useReveal()
  const parallaxRef = useRef(null)
  useParallax(parallaxRef, 0.55)
  const [filter, setFilter] = useState('all')

  const counts = useMemo(() => {
    const c = { all: projects.length }
    for (const f of FILTERS) {
      if (f.id === 'all') continue
      c[f.id] = projects.filter((p) => p.tracks.includes(f.id)).length
    }
    return c
  }, [])

  const visible = (p) => filter === 'all' || p.tracks.includes(filter)

  return (
    <>
      {/* ---------------- 1. Hero billboard ---------------- */}
      <section className="billboard">
        {/* Depth layer behind the typography. Scroll factor 0.55 */}
        <div className="parallax" ref={parallaxRef} aria-hidden="true">
          <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 900">
            <defs>
              <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M120 0 L0 0 0 120" fill="none" stroke="var(--line)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1200" height="900" fill="url(#grid)" opacity="0.85" />
            <path d="M1200 0 L1200 380 L820 0 Z" fill="var(--accent)" opacity="0.07" />
          </svg>
        </div>
        <Reveal>
          <p className="billboard__monicker">
            Manthan Thool // Graduate portfolio 2026 // MSc Interaction &amp; Experience
            Design, University of Limerick
          </p>
          <h1 className="billboard__headline">
            Blending human-centered UI with <em>spatial systems.</em>
          </h1>
          <p className="billboard__sub">
            A cross-disciplinary portfolio bridging human-centered interfaces, research-led
            3D data visualisation, multi-role web platforms, and the creative-coding
            toolkit behind them: Three.js, Arduino, Pure Data, Processing.
          </p>
        </Reveal>

        <Reveal className="billboard__ctas" delay={120}>
          <Link className="btn btn--primary" to="/work">View work</Link>
          <Link className="btn btn--outline" to="/contact">Get in touch</Link>
        </Reveal>

        <div className="billboard__foot">
          <button
            type="button"
            className="scroll-cue"
            onClick={() =>
              document.getElementById('matrix')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          >
            [ Scroll for project matrix ]
          </button>
          <p className="tech">{site.location}</p>
        </div>
      </section>

      {/* ---------------- 2. Track router ---------------- */}
      <nav className="router" aria-label="Portfolio tracks">
        <Link className="router__gate snap" to="/work/csis-portal">
          <span className="router__index">Track 01</span>
          <h2 className="router__title">Product design synopsis</h2>
          <p className="router__body">
            High-fidelity UX/UI case studies, role-based system design, persona-driven
            product flows, and the design-system thinking behind them.
          </p>
          <span className="router__go">[ Enter track ➔ ]</span>
        </Link>

        <Link className="router__gate snap" to="/work/court-vision-3d">
          <span className="router__index">Track 02</span>
          <h2 className="router__title">Creative technology system</h2>
          <p className="router__body">
            Research-led spatial interaction, real-time 3D built in Three.js, and
            Master&rsquo;s thesis documentation evaluated against a 2D baseline.
          </p>
          <span className="router__go">[ Enter track ➔ ]</span>
        </Link>
      </nav>

      {/* ---------------- 3. Live prototype, contained ---------------- */}
      <section className="section wrap" aria-labelledby="proto-h">
        <Reveal className="proto">
          <div className="proto__label">
            <p className="tech tech--accent">[ Interactive window active ]</p>
            <h2 id="proto-h" className="proto__title">Court Vision 3D, running live</h2>
            <p className="proto__body">
              Drag to orbit. Spike height is effective field goal percentage; the zone
              pills filter Paint, Mid and 3PT. The full 1,025-shot season runs in the
              linked prototype.
            </p>
          </div>
          <ShotChartHero />
        </Reveal>
      </section>

      {/* ------- 3b. Toolkit strip: separates the two 3D blocks ------- */}
      <section className="section--tools" aria-labelledby="tools-h">
        <div className="wrap">
          <Reveal>
            <div className="tools__head">
              <p className="tech tech--accent">[ Toolkit ]</p>
              <h2 id="tools-h" className="tools__title">Tools used so far</h2>
            </div>
          </Reveal>
          <Reveal>
            <ToolStrip />
          </Reveal>
        </div>
      </section>

      {/* ---------------- 4. Project matrix ---------------- */}
      <section id="matrix" aria-labelledby="matrix-h">
        <div className="wrap matrix-head">
          <div>
            <p className="tech tech--accent">[ Project matrix ]</p>
            <h2 id="matrix-h" className="matrix-title" style={{ marginTop: '0.7rem' }}>
              Selected work
            </h2>
          </div>
          <ul className="filters" role="group" aria-label="Filter projects by track">
            {FILTERS.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  className="filter snap"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                  <span className="filter__count">{counts[f.id]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bento">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to={`/work/${p.slug}`}
              className={`bento__item bento__item--${p.size} snap`}
              hidden={!visible(p) || undefined}
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

          {/* Explorations: real, but deliberately lower weight. */}
          <div className="bento__item bento__item--md" hidden={filter !== 'all' || undefined}>
            <span className="bento__index">Explorations</span>
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
              A mobile interface for an impact-driven service concept. Early wireframes,
              concept stage, not a case study.
            </p>
          </div>

        </div>
      </section>

      {/* 5. The most distinctive thing here, before the footer. */}
      <StageTeaser />

    </>
  )
}
