import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import DesignQualitiesReport from '../../components/DesignQualitiesReport.jsx'
import { bySlug } from '../../data/projects.js'
import { asset } from '../../data/assets.js'

const project = bySlug('design-qualities')

/* Four qualities, each with the object that gets it right and the one that
   does not. Transcribed from the CS6431 Assignment 1 submission.

   The original essay illustrated these with sourced reference photography
   (stock libraries, brand assets, social media). None of it is Manthan's own
   work and none of it is licensed for republication, so the examples are set
   typographically here instead. */
const QUALITIES = [
  {
    n: '01',
    name: 'Mapping',
    img: { good: 'dq-mapping-good', bad: 'dq-mapping-bad' },
    def: 'Aligning an object’s controls with its intended actions so the relationship feels instinctive rather than learned.',
    good: {
      obj: 'Rotary dial telephone',
      body: 'Rotating the dial registers the number immediately, and the dial returning to rest gives a pulse you can feel for each digit. The numbers run 1 to 9 then 0, an order anyone can predict. Physical movement, tactile confirmation and predictable response combine so dialling is nearly error-proof. Unlike screen-only devices, it communicates through touch and motion at the same time.',
    },
    bad: {
      obj: 'Airport restroom signage',
      body: 'Overly stylised icons replace simple stick figures, so a figure in a saree or skirt reads as a logo rather than a toilet sign, and foreign travellers hesitate. Boards then pair both icons with a single forward arrow, sending people in opposite directions to double back. Finding a toilet should be effortless; here the signage is the obstacle.',
    },
  },
  {
    n: '02',
    name: 'Affordance',
    img: { good: 'dq-afford-good', bad: 'dq-afford-bad' },
    def: 'The qualities of an object that suggest how it can be used, through shape, size or material.',
    good: {
      obj: 'Tactile line on railway platforms',
      body: 'The raised yellow line gives a boundary that can be felt underfoot or with a cane, communicating “stand back” without relying on sight. Sighted passengers read it visually, blind and low-vision passengers read it through touch. The same element serves both, guiding people away from the platform edge and reducing risk for everyone.',
    },
    bad: {
      obj: 'Overloaded street signboards',
      body: 'Directions, distances, advertising and instructions compete on one board. At speed that is dangerous: turns, lane changes and safety warnings get missed. Tourists and unfamiliar drivers suffer most, and inconsistent fonts with low contrast make it worse. The board affords reading, but not in the time available.',
    },
  },
  {
    n: '03',
    name: 'Feedback',
    img: { good: 'dq-feedback-good', bad: 'dq-feedback-bad' },
    def: 'The information a system returns about the result of an action, confirming whether it worked or needs adjusting.',
    good: {
      obj: 'Tooltips',
      body: 'Explanation on demand, without cluttering the interface. They appear on hover or tap, which helps first-time users who do not recognise an icon while leaving experienced users unaffected. In minimalist interfaces where icons replace labels, tooltips are the failsafe that bridges visual simplicity and functional clarity.',
    },
    bad: {
      obj: 'Unlabelled car fuel flap',
      body: 'A fuel lid with no indication of petrol or diesel. In India, where attendants often fill the tank while the driver stays in the car, the absence of a label can mean the wrong fuel and severe engine damage. First-time drivers, tourists and renters are most exposed. A printed “Petrol only” on the flap would cost nothing and prevent the error entirely.',
    },
  },
  {
    n: '04',
    name: 'Constraint',
    img: { good: 'dq-constraint-good', bad: 'dq-constraint-bad' },
    def: 'Features that limit or guide how an object can be used, making correct operation easier and errors harder.',
    good: {
      obj: 'Elevator doors with obstruction sensors',
      body: 'The doors will not close while someone is standing in them. It is the physical equivalent of a form that will not submit until required fields are filled: a built-in check that makes the unsafe action unavailable rather than merely discouraged. The constraint is what produces confidence in the system.',
    },
    bad: {
      obj: 'Fixed aeroplane tray tables',
      body: 'Meant to be a surface for a meal or a laptop, but sized and positioned so it does neither well. Too small to hold more than one thing, forcing a choice between eating and working, and fixed to the seat in front so height cannot be adjusted. The constraint here restricts without guiding, which produces frustration rather than ease.',
    },
  },
]

export default function DesignQualities() {
  const [report, setReport] = useState(false)
  useReveal()

  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'paper'
    else delete document.documentElement.dataset.report
    return () => { delete document.documentElement.dataset.report }
  }, [report])

  return (
    <>
      <div className="wrap" style={{ paddingTop: 'clamp(1.25rem, 3vw, 2rem)' }}>
        <ModeSwitch
          checked={report}
          onChange={setReport}
          labelOff="Case study · switch to report"
          labelOn="Report mode · switch to case study"
        />
      </div>

      {report ? (
        <>
          <DesignQualitiesReport />
          <div className="section wrap">
            <PrevNext slug="design-qualities" />
          </div>
        </>
      ) : (
      <>
      <CaseHeader project={project}>
        <ul className="rq-list" style={{ marginTop: 0 }}>
          {QUALITIES.map((q) => (
            <li key={q.name} style={{ listStyle: 'none' }}>
              <b>{q.n}</b>
              <p style={{ fontWeight: 600, color: 'var(--text)' }}>{q.name}</p>
            </li>
          ))}
        </ul>
      </CaseHeader>

      <CaseBody>
        <CaseSection id="premise" eyebrow="Premise" title="The best design argument is a matched pair">
          <div className="prose">
            <p>
              Design qualities in everyday life describe how ordinary objects are crafted to
              improve function and experience. A well-designed chair supports posture, uses
              a material that is durable and comfortable, and suits the room it stands in.
              Ergonomics, material and aesthetics make daily tasks easier, usually without
              anyone noticing.
            </p>
            <p>
              Noticing is the point of this piece. Each of the four principles below is
              argued through two objects rather than one: something that gets it right, and
              something that gets the same thing wrong. A single good example proves a
              principle exists. A pair proves it matters, because the failure is what makes
              the success visible.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="qualities" eyebrow="Analysis" title="Four qualities, eight objects">
          {QUALITIES.map((q) => (
            <div className="quality" key={q.name}>
              <p className="quality__n">{q.n} // Quality</p>
              <h3 className="quality__h">{q.name}</h3>
              <p className="quality__def">{q.def}</p>
              <div className="pair">
                <div className="pair__cell pair__cell--good">
                  <div className="pair__media">
                    <img src={asset(q.img.good).src} alt={asset(q.img.good).alt}
                         width={asset(q.img.good).w} height={asset(q.img.good).h}
                         loading="lazy" decoding="async" />
                  </div>
                  <span className="pair__verdict">Works</span>
                  <p className="pair__obj">{q.good.obj}</p>
                  <p className="pair__body">{q.good.body}</p>
                </div>
                <div className="pair__cell pair__cell--bad">
                  <div className="pair__media">
                    <img src={asset(q.img.bad).src} alt={asset(q.img.bad).alt}
                         width={asset(q.img.bad).w} height={asset(q.img.bad).h}
                         loading="lazy" decoding="async" />
                  </div>
                  <span className="pair__verdict">Fails</span>
                  <p className="pair__obj">{q.bad.obj}</p>
                  <p className="pair__body">{q.bad.body}</p>
                </div>
              </div>
            </div>
          ))}
        </CaseSection>

        <CaseSection id="outcomes" eyebrow="Outcomes" title="What the pairs have in common" narrow>
          <div className="prose">
            <p>
              Read together, the four failures share a shape. None of them is caused by a
              missing feature. The restroom signs have icons, the signboards have
              information, the fuel flap has a lid, the tray table has a surface. Each fails
              because the design does not account for the conditions it is actually used in:
              a traveller who does not share the local visual vocabulary, a driver at speed,
              an attendant filling a tank the owner cannot see, a passenger with a laptop and
              a meal.
            </p>
            <p>
              That is the transferable lesson, and it is why this piece sits alongside the
              product work rather than apart from it. Every case study in this portfolio is
              the same question asked about a screen instead of an object.
            </p>
          </div>
          <div className="callout">
            <h3>A note on the illustrations</h3>
            <p>
              The reference photographs above are sourced third-party images used to
              illustrate each example, not my own photography. They are shown here for
              commentary and criticism.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section wrap">
        <PrevNext slug="design-qualities" />
      </div>
      </>
      )}
    </>
  )
}
