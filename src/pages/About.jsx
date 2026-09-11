import { Link } from 'react-router-dom'
import Hang from '../components/Hang.jsx'
import Reveal, { useReveal } from '../components/Reveal.jsx'
import StageLayer from '../components/StageLayer.jsx'
import ToolStrip from '../components/ToolStrip.jsx'
import { asset } from '../data/assets.js'
import { site } from '../data/site.js'

export default function About() {
  useReveal()
  const photo = asset('profile')

  return (
    <>
      <header className="page-head wrap">
        <Reveal>
          <span className="pill">About me</span>
          <h1 style={{ marginTop: '1.1rem' }}>Design as a way of asking questions</h1>
          <p className="about-subline">
            Research first. Systems over screens. Prototypes that run, not mockups that
            imply.
          </p>
          <div className="about-cta">
            {/* A bare mailto silently does nothing when no mail client is
                registered, so this routes to the contact page instead. */}
            <Link className="btn btn--primary" to="/contact">Get in touch</Link>
          </div>
        </Reveal>
      </header>

      <section className="section wrap">
        <div className="about-shell">
          <Reveal>
            <Hang len={92} damp={1.15} drag pins={[0.22, 0.78]}>
              <div className="portrait">
                <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} decoding="async" />
              </div>
            </Hang>
            {photo.pending && <p className="tech" style={{ marginTop: '0.6rem' }}>Asset pending: portrait</p>}
            <p className="tech" style={{ marginTop: '0.9rem' }}>{site.location}</p>
          </Reveal>

          <div>
            <Reveal>
              <p className="bio">
                I&rsquo;m Manthan Thool &mdash; a UX/UI designer and design lead who works
                across research, design and code.
              </p>
              <p className="bio">
                I&rsquo;ve just finished an MSc in Interaction &amp; Experience Design at the
                University of Limerick, where my thesis,{' '}
                <Link to="/work/court-vision-3d">Court Vision 3D</Link>, rebuilt NBA shot
                charts into something you can move around inside. I also lead a{' '}
                <Link to="/work/tolet-globe">22-person design team</Link> at To-Let Globe,
                on top of a B.E. in Computer Engineering.
              </p>
              <p className="bio">
                I want work that holds up technically and still makes sense to someone
                seeing it for the first time.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Toolkit, minimal: glyphs rather than the numbered lists that were here. */}
      <section className="section--tools" aria-labelledby="about-tools-h">
        <div className="wrap">
          <Reveal>
            <div className="tools__head">
              <p className="tech tech--accent">[ Toolkit ]</p>
              <h2 id="about-tools-h" className="tools__title">What I work in</h2>
            </div>
          </Reveal>
          <Reveal>
            <Hang len={44} give={0.45} damp={1.35} tilt={2} pins={[0.12, 0.88]}>
              <ToolStrip />
            </Hang>
          </Reveal>
          <Reveal>
            <p className="tech" style={{ marginTop: '1.25rem' }}>
              Research methods: NASA-TLX · persona development · usability testing ·
              think-aloud · task-accuracy studies
            </p>
          </Reveal>
        </div>
      </section>

      <StageLayer />
    </>
  )
}
