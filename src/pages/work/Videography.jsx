import { CaseHeader, CaseBody, CaseSection, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import { bySlug } from '../../data/projects.js'
import { asset } from '../../data/assets.js'

const project = bySlug('videography')

const REEL = [
  {
    title: 'Stik-ie Tape Advert',
    href: 'https://youtu.be/ig9jZU4F1Nw',
    assetKey: 'film-tape',
    note: 'Product advert, shot and cut end to end.',
  },
  {
    title: 'UL Diwali Festival 2025',
    href: 'https://youtube.com/shorts/bHJ34gBbPQU',
    assetKey: 'film-diwali',
    note: 'Event coverage, edited as a short-form vertical piece.',
  },
]

export default function Videography() {
  useReveal()
  const hero = asset('film-showreel')

  return (
    <>
      <CaseHeader project={project}>
        <div className="thumb" style={{ aspectRatio: '16 / 10' }}>
          <img src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} decoding="async" />
        </div>
      </CaseHeader>

      <CaseBody>
        <CaseSection id="approach" eyebrow="Approach" title="The edit is where it gets made">
          <div className="prose">
            <p>
              Short films, adverts and event coverage, shot and cut end to end. The
              through-line across all of it is pacing: what a cut lands on, how long a shot
              is allowed to breathe, and when to move the camera rather than change the
              frame.
            </p>
            <p>
              It is the same discipline as interface work. A viewer cannot rewind a live
              event and a user will not re-read a screen, so the ordering has to do the
              explaining the first time.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="work" eyebrow="Selected" title="Pieces">
          <div className="figure-row">
            {REEL.map((r) => {
              const a = asset(r.assetKey)
              return (
                <figure className="figure" key={r.title}>
                  <a className="figure__frame" href={r.href} target="_blank" rel="noreferrer noopener" style={{ display: 'block' }}>
                    <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
                  </a>
                  <figcaption>
                    <b>{r.title}: </b>
                    {r.note}{' '}
                    <a href={r.href} target="_blank" rel="noreferrer noopener">Watch ↗</a>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </CaseSection>

        <CaseSection id="reflection" eyebrow="Reflection" title="Where this sits" narrow>
          <div className="prose">
            <p>
              This is craft work rather than research work, and it is here for that reason.
              It is where the visual instinct behind the rest of the portfolio was trained,
              and it is the part of the toolkit that gets used whenever a project needs to be
              communicated rather than only built.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section wrap">
        <PrevNext slug="videography" />
      </div>
    </>
  )
}
