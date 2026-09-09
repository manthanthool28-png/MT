/* ==========================================================================
   Design Qualities in Everyday Objects — report mode.

   The submission is an essay, so this theme is the paper it was written on:
   warm cream, serif body, one red used only where the example fails. Each
   quality gets its definition, then the object that gets it right and the
   object that gets it wrong, in the report's own order.

   Text is the submitted text, lightly repunctuated where the PDF extraction
   dropped characters. Nothing is added to the argument.
   ========================================================================== */
import Reveal from './Reveal.jsx'
import Figure from './Figure.jsx'

const QUALITIES = [
  {
    n: '1',
    name: 'Mapping',
    def: 'Mapping in design makes objects easier to use by aligning their controls with their intended actions in a way that feels instinctive.',
    good: {
      title: 'Rotary dial phone',
      asset: 'dq-mapping-good',
      body: [
        'The rotary dial phone is a prime example of how great design can make things easy to use. When you rotate the dial to a number, that number is immediately registered by the phone system, giving a clear and predictable result. As the dial returns to its original position you can feel each pulse, confirming the number has been entered correctly.',
        'The numbers are laid out in a familiar, logical order, one to nine and zero, so anyone can understand how to use it without instructions. This combination of physical movement, tactile feedback and predictable response makes dialling simple and reduces mistakes. Unlike many modern devices that rely only on screens or digital cues, the rotary phone communicates through both touch and motion.',
      ],
    },
    bad: {
      title: 'Male and female restroom signage',
      asset: 'dq-mapping-bad',
      body: [
        'Universal restroom signs should be easily identifiable, but in many airports poor mapping causes confusion. One issue is the use of unusual or overly stylised icons. Instead of simple stick figures, some airports use abstract shapes or cultural symbols, making female icons in sarees or skirts look like logos rather than toilet signs. That causes unnecessary hesitation for foreign travellers.',
        'Another problem is unclear arrows and placement. Boards showing male and female icons with a single forward arrow often lead people to opposite turns, causing them to double back or search awkwardly. In crowded airports this confusion is stressful, wasting time and causing embarrassment. Basic tasks like finding a toilet should be effortless.',
      ],
    },
  },
  {
    n: '2',
    name: 'Affordance',
    def: 'Affordance is the quality of an object that suggests how it can be used: the intuitive cues an object gives about its function, based on its shape, size or material.',
    good: {
      title: 'The yellow raised line on railway platforms',
      asset: 'dq-afford-good',
      body: [
        'The yellow raised line on railway platforms offers a tactile boundary, allowing visually impaired users to feel it with their feet or cane and clearly marking the safe area. This tactile cue communicates “stand back” without relying on sight, making it inclusive for users with different abilities.',
        'Sighted passengers benefit from the visual cue while blind or low-vision passengers perceive the same boundary through touch. The line guides users away from the platform edge, reducing accident risk. This dual-mode feedback is a thoughtful affordance: it protects users and gives them confidence in a public space.',
      ],
    },
    bad: {
      title: 'Overloaded street signboards',
      asset: 'dq-afford-bad',
      body: [
        'In many cities, street and traffic signboards are overcrowded with too much information at once: directions, distances, advertisements and multiple instructions. This is especially dangerous for drivers and pedestrians on busy streets at speed.',
        'Overloaded signboards lead to missed details like turns, lane changes and safety warnings, increasing the risk of accidents. Tourists and unfamiliar visitors are particularly vulnerable, often feeling stressed, lost, and taking wrong turns. Inconsistent fonts and low contrast make the navigation problem worse.',
      ],
    },
  },
  {
    n: '3',
    name: 'Feedback',
    def: 'Feedback is the information an object or system gives the user about the result of their actions. It confirms whether an action succeeded or needs adjustment.',
    good: {
      title: 'Tooltips',
      asset: 'dq-feedback-good',
      body: [
        'Tooltips provide on-demand explanation without cluttering the interface. They appear when a user hovers or taps, offering guidance exactly when it is needed. That makes them useful for first-time users who may not immediately recognise an icon, while experienced users remain unaffected, which keeps efficiency intact and avoids unnecessary noise.',
        'In minimalist designs, where icons and symbols replace labels, tooltips act as a fail-safe. They bridge the gap between aesthetic simplicity and functional clarity, helping users understand features without sacrificing visual elegance. By clarifying intent they reduce confusion and improve confidence.',
      ],
    },
    bad: {
      title: 'A fuel flap with no petrol or diesel marking',
      asset: 'dq-feedback-bad',
      body: [
        'A car fuel lid lacking any indication of the required fuel type is a clear case of absent feedback. In India, where petrol and diesel stations are common, drivers rely on visible cues to avoid mistakes. Without a label, even an attentive driver can be caught out if a station attendant fills the wrong fuel while the driver is still in the car.',
        'This can cause severe engine damage and expensive repairs, especially for first-time drivers, tourists or car renters unfamiliar with the vehicle. A simple visible label reading “Petrol only” or “Diesel only”, combined with a dashboard indicator, would give immediate feedback and prevent the error.',
      ],
    },
  },
  {
    n: '4',
    name: 'Constraint',
    def: 'Constraint refers to features that limit or guide how an object can be used, making it easier to operate correctly and preventing errors.',
    good: {
      title: 'A lift door that will not close on someone standing in it',
      asset: 'dq-constraint-good',
      body: [
        'Lift doors that do not close when someone is in the way use motion or pressure sensors to detect their presence. This simple feature prevents accidents like doors closing on people.',
        'Just as a digital form will not submit until all fields are filled, a lift door only closes when it is safe to do so. Built-in checks like these ensure a safe interaction and give people confidence in the system.',
      ],
    },
    bad: {
      title: 'Aeroplane tray tables',
      asset: 'dq-constraint-bad',
      body: [
        'Aeroplane tray tables are meant to offer a convenient surface for meals or a laptop. But designed for limited space and fixed in position, they become ineffective constraints that cause frustration rather than ease of use.',
        'Their small size makes it difficult to place multiple items, forcing a choice between eating and working. The tray’s attachment to the seat in front also limits height adjustment, which leads to an awkward posture.',
      ],
    },
  },
]

function Pair({ kind, item }) {
  const good = kind === 'good'
  return (
    <div className={`dq-pair ${good ? 'dq-pair--good' : 'dq-pair--bad'}`}>
      <p className="dq-pair__verdict">{good ? 'Gets it right' : 'Gets it wrong'}</p>
      <h4 className="dq-pair__title">{item.title}</h4>
      <Figure assetKey={item.asset} />
      {item.body.map((para) => (
        <p className="rep-body" key={para.slice(0, 40)}>{para}</p>
      ))}
    </div>
  )
}

export default function DesignQualitiesReport() {
  return (
    <div className="wrap">
      <Reveal className="rep-head">
        <p className="rep-head__kicker">CS6431 · Foundations of Interaction and Experience Design</p>
        <h1 className="rep-head__title">Design Qualities in Everyday Objects</h1>
        <p className="rep-head__meta">
          Manthan Thool · 25065394 · University of Limerick
        </p>
      </Reveal>

      <section className="rep-section">
        <div className="rep-centre" style={{ marginBottom: '1.5rem' }}>
          <h2 className="rep-h">Introduction</h2>
        </div>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            Design qualities in everyday life refer to how ordinary objects are thoughtfully
            crafted to improve function and experience. A well-designed chair has a shape that
            supports your posture, a material that feels durable yet comfortable, and a look
            that fits your space.
          </p>
          <p>
            These qualities, ergonomics, material choice and aesthetics, make daily tasks
            easier and more pleasant, often without us noticing. Good design in things like
            mugs, pens or doorknobs blends practicality with subtle beauty, improving our
            routines.
          </p>
        </div>
      </section>

      {QUALITIES.map((q) => (
        <section className="rep-section" key={q.name}>
          <div className="rep-section__head">
            <h2 className="rep-h">
              <span className="dq-num" aria-hidden="true">{q.n}</span> {q.name}
            </h2>
          </div>
          <p className="rep-body dq-def" style={{ marginInline: 'auto' }}>{q.def}</p>
          <div className="dq-grid">
            <Pair kind="good" item={q.good} />
            <Pair kind="bad" item={q.bad} />
          </div>
        </section>
      ))}
    </div>
  )
}
