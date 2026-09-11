import { CaseHeader, CaseBody, CaseSection, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import { Counter, Motes, ScrollFilm, SplitHeading } from '../../components/Cinema.jsx'
import { bySlug } from '../../data/projects.js'
import Figure from '../../components/Figure.jsx'
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

/* The act, in the project's own words: every line below is a sentence from
   the study cut to length, and every number is one the study already states. */
const BEATS = [
  {
    key: 'film-tape',
    kicker: 'Stik-ie Tape',
    line: 'Product advert, shot and cut end to end.',
  },
  {
    key: 'film-diwali',
    kicker: 'UL Diwali 2025',
    line: 'Event coverage, edited as a short-form vertical piece.',
  },
  {
    key: 'bts-2',
    kicker: 'On the day',
    line: 'Two people, a phone and a tripod.',
  },
  {
    key: 'desk',
    kicker: 'The edit',
    line: 'The ordering has to do the explaining the first time.',
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

      <section className="cine" aria-labelledby="cine-h">
        <div className="wrap cine__intro">
          <Motes glyph="frame" />
          <div className="cine__say">
            <p className="eyebrow">The work in four frames</p>
            <SplitHeading id="cine-h" text="A viewer cannot rewind a live event and a user will not re-read a screen." />
            <p className="cine__lede">
              Short films, adverts and event coverage, shot and cut end to end. The through-line
              is pacing: what a cut lands on, how long a shot is allowed to breathe, and when to
              move the camera rather than change the frame.
            </p>
          </div>
        </div>

        <ScrollFilm beats={BEATS} label="Videography, four frames from the work" />
      </section>

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

        <CaseSection id="bts" eyebrow="On the day" title="Two people, a phone and a tripod">
          <div className="prose">
            <p>
              None of this was shot with a crew or a rig. The kit is a phone on a tripod and
              whoever is free to hold the other end of the conversation, which is worth saying
              plainly: the look in the pieces above comes from where the camera was put and
              what was cut, not from what it was shot on.
            </p>
          </div>
          <div className="figure-row">
            <Figure
              assetKey="bts-2"
              label="On location"
              caption="A field, a fence and a phone on a tripod. The whole production."
            />
            <Figure
              assetKey="bts-3"
              label="Blocking it out"
              caption="Working out the frame before rolling, which is most of the time on any shoot this size."
            />
          </div>
          <Figure
            assetKey="desk"
            label="Filming a screen"
            caption="A desk-lamp-lit night shoot getting screen footage. Cheap to stage, and the only way to show software doing something."
          />
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
