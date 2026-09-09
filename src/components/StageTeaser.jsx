import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

/* Homepage hook for the performing-arts background. Condensed: the full
   account lives on /about. Content mirrors StageLayer so the two cannot drift
   into saying different things. */
const AREAS = [
  { k: 'Theatre', v: 'College group, then production across several groups and Firodiya Karandak' },
  { k: 'Dance', v: 'Performed as part of the theatre work' },
  { k: 'Sport', v: 'Basketball, handball, carrom' },
  { k: 'Band', v: 'Folklok: digital media, PR, photography, video' },
]

export default function StageTeaser() {
  return (
    <section className="stage-teaser" aria-labelledby="teaser-h">
      <div className="wrap stage-teaser__grid">
        <Reveal>
          <span className="pill">Before design</span>
          <h2 id="teaser-h" className="stage-teaser__title">
            Design started on a stage, not in a design school.
          </h2>
          <p className="stage-teaser__body">
            Building sets is spatial design under hard constraint: it has to read in seconds,
            from every seat, to an audience that cannot ask a question. That is the same
            problem as a 3D shot chart.
          </p>
          <Link className="btn btn--outline" to="/about" style={{ marginTop: '1.5rem' }}>
            Read the full story
          </Link>
        </Reveal>

        <Reveal className="stage-teaser__list" stagger>
          {AREAS.map((a) => (
            <div className="stage-teaser__row" key={a.k}>
              <span className="stage-teaser__k">{a.k}</span>
              <span className="stage-teaser__v">{a.v}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
