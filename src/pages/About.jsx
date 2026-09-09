import { Link } from 'react-router-dom'
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
            <div className="portrait">
              <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} decoding="async" />
            </div>
            {photo.pending && <p className="tech" style={{ marginTop: '0.6rem' }}>Asset pending: portrait</p>}
            <p className="tech" style={{ marginTop: '0.9rem' }}>{site.location}</p>
          </Reveal>

          <div>
            <Reveal>
              <p className="philosophy">
                I design interfaces for information that resists being flattened: spatial
                data, multi-role systems, service flows with too many moving parts. The work
                usually starts the same way, with someone who can read the numbers but
                cannot see the shape of them.
              </p>
              <p className="philosophy">
                The practice is grounded in <strong>Research through Design</strong>.
                Building the artefact is how the question gets answered, not something that
                happens after the research is done. In my MSc thesis that meant shipping a
                working 3D shot chart and then measuring, with NASA-TLX and timed task
                accuracy, whether the third dimension actually helped non-experts or just
                looked impressive. The prototype was the instrument.
              </p>
              <p className="philosophy">
                That pattern carries into product work. Two personas are worth more than
                twenty opinions if you design against their stated frustrations. One
                coherent system beats three bolted-together ones. And an honest limitation
                in a case study is worth more than a polished claim that does not survive
                contact with a user.
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
            <ToolStrip />
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
