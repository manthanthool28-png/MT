import Hang from './Hang.jsx'
import Reveal from './Reveal.jsx'
import { asset } from '../data/assets.js'

/* ==========================================================================
   The performing-arts layer.

   All content here is from Manthan directly. Nothing is inferred: no years he
   did not give, no productions he did not name, no level of sporting
   competition he did not claim.
   ========================================================================== */

const CARDS = [
  {
    k: 'Theatre',
    body:
      'Started with a college theatre group and carried on after graduating, working in production across several groups and with Firodiya Karandak. Building sets is where the design interest actually started.',
  },
  {
    k: 'Dance',
    body:
      'Performed as a dancer within the theatre work. Choreography is structure you can feel: fixed counts, fixed space, and everything expressive happening inside those limits.',
  },
  {
    k: 'Sport',
    body:
      'Basketball, handball and carrom among others. Team sport is a fast lesson in reading other people and adjusting mid-play rather than after the whistle.',
  },
  {
    k: 'Band',
    body:
      'Joined Folklok, a Marathi musical band, managing digital media and PR alongside photography and videography. A working brief with a real audience and a deadline.',
  },
]

/* Four distinct subjects on a four-column grid: the big cell takes the left half
   over two rows, the wide cell the top right, and two squares fill beneath it.
   That tiles exactly, which the previous six-cell arrangement did not — it left
   holes and the rows never lined up. */
const MOSAIC = [
  { key: 'life-1', cls: 'mosaic__cell--big' },
  /* The B&W frame is panoramic in content — sign at one end, dancer at the
     other — so it is the one that survives the double-width cell. */
  { key: 'life-5', cls: 'mosaic__cell--wide' },
  { key: 'life-3', cls: '' },
  { key: 'life-6', cls: '' },
]

export default function StageLayer() {
  return (
    <section className="section" aria-labelledby="stage-h">
      <div className="wrap">
        <Reveal>
          <span className="pill">Before design</span>
          <h2 id="stage-h" className="about-statement">
            There is a stage behind all this work.
          </h2>
          <p className="about-subline">
            Theatre, dance, sport and a band, running alongside an engineering degree and
            the years after it. Design started there, not in a design school.
          </p>
        </Reveal>

        <Reveal className="trio">
          {CARDS.map((c) => (
            <div className="trio__cell" key={c.k}>
              <p className="trio__k">{c.k}</p>
              <p className="trio__p">{c.body}</p>
            </div>
          ))}
        </Reveal>

        <Hang len={40} give={0.28} damp={1.5} tilt={2} pins={[0.08, 0.5, 0.92]}>
        <Reveal className="mosaic">
          {MOSAIC.map((m) => {
            const a = asset(m.key)
            return (
              <div className={`mosaic__cell ${m.cls}`} key={m.key}>
                <img src={a.src} alt={a.alt} loading="lazy" decoding="async" />
                {a.pending && <span className="mosaic__empty">Photo pending</span>}
              </div>
            )
          })}
        </Reveal>
        </Hang>

        <div className="nutshell">
          <Reveal>
            <h3>What the stage gave the studio</h3>
            <p>
              Designing a set is spatial design under hard constraint. It has to work from
              every seat in the house, it has to be read in seconds by an audience that
              cannot ask a question, and it has to hold up on the night whether or not the
              idea behind it was clever. That is the same problem as a 3D shot chart: make
              something legible at a glance to people who did not come with a manual.
            </p>
            <p>
              The rest of it was people. Theatre is a long exercise in communication and in
              working out what is going on in someone else&rsquo;s head, which is most of
              what user research turns out to be. Team sport taught the same thing at speed:
              read the room and adjust mid-play rather than after the whistle. Running
              digital media and PR for Folklok, and shooting photography and video for the
              band, put a working brief and a real audience behind that instinct.
            </p>
            <p>
              None of this ran after design. It ran alongside the engineering degree and
              into the years after it, and it is why the move into interaction design was a
              continuation rather than a change of direction.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
