import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import LaundryXpressReport from '../../components/LaundryXpressReport.jsx'
import Figure from '../../components/Figure.jsx'
import { bySlug } from '../../data/projects.js'
import { asset } from '../../data/assets.js'

const project = bySlug('laundry-xpress')

export default function LaundryXpress() {
  const [report, setReport] = useState(false)
  useReveal()

  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'lavender'
    else delete document.documentElement.dataset.report
    return () => { delete document.documentElement.dataset.report }
  }, [report])

  const hero = asset('lx-thumb')

  return (
    <>
      <div className="wrap" style={{ paddingTop: 'clamp(1.25rem, 3vw, 2rem)' }}>
        <ModeSwitch
          checked={report}
          onChange={setReport}
          labelOff="Case study · switch to the deck"
          labelOn="Deck · switch to case study"
        />
      </div>

      {report ? (
        <>
          <LaundryXpressReport />
          <div className="section wrap">
            <PrevNext slug="laundry-xpress" />
          </div>
        </>
      ) : (
        <>
          <CaseHeader project={project}>
            <div className="thumb" style={{ aspectRatio: '16 / 7' }}>
              <img src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} decoding="async" />
            </div>
          </CaseHeader>

          <CaseBody>
            <CaseSection id="problem" eyebrow="Problem" title="Forty-eight hours, and the hard part is trust">
              <div className="prose">
                <p>
                  Dezignathon &rsquo;23 gave fifty teams the same brief: people in hostels, PGs
                  and flats across tier 1 and 2 cities cannot get reliable laundry and ironing
                  near them. Design something that fixes it. We had forty-eight hours and four
                  people.
                </p>
                <p>
                  The survey our researcher ran came back with an order of priority that shaped
                  everything after it. <strong>Convenient pickup and delivery was the top-ranked
                  essential feature at 76.5%</strong>, and inconvenient pickup and delivery was
                  the top-ranked complaint at 58.8%. But the second-most cited challenge was not
                  logistics at all — it was <strong>lack of trust in the service quality</strong>.
                  Handing a stranger a bag of your clothes is the actual product problem.
                </p>
                <p>
                  My work on the team was idea brainstorming, the high-fidelity screens, the
                  prototype, and the final presentation. The research, personas and illustration
                  were other people&rsquo;s; the full credits are in the deck.
                </p>
              </div>
            </CaseSection>

            <CaseSection id="decisions" eyebrow="Key decisions" title="Three decisions in the screens">
              <Decision n={1} title="Spend the home screen on trust, not on the order button">
                <p>
                  The obvious home screen for a service app is a big booking CTA and little else.
                  This one puts the four service tiles and a <em>Book Now</em> button in the first
                  screenful, then spends the entire rest of the scroll answering the trust
                  problem: a guarantee row (99% stain removal, wrinkle-free steam iron, fabric
                  friendly detergents, a separate wash cycle per customer), a four-step
                  how-we-work strip, and customer reviews with photographs of the actual returned
                  clothes.
                </p>
                <p>
                  Reviews carrying photographs are doing specific work. A star rating tells you
                  people were happy; a photograph of a folded stack tells you what your own
                  clothes will look like coming back. That is the anxiety the survey found, and it
                  is not answerable in words.
                </p>
                <Figure
                  assetKey="lx-anno-home"
                  label="Home screen"
                  caption="Annotated as presented: services and call to action up top, then subscription, guarantees, how-we-work, home items, and reviews — most of the screen given over to reasons to believe."
                />
              </Decision>

              <Decision n={2} title="Two pickers, not one, because the complaint was about timing">
                <p>
                  Scheduling is where the top-ranked frustration lives, so it gets its own screen
                  and the most control on it. Delivery method first (normal at two days, express
                  at three hours), then <strong>a separate date and time picker for collection and
                  for return</strong> rather than one pickup slot and an implied turnaround.
                </p>
                <p>
                  The persona that drove this was Kaviyan, whose stated problem was that laundry
                  services close before he gets home and open after he leaves. A single pickup
                  picker does not help him; being able to choose an early collection and a late
                  return does.
                </p>
                <Figure
                  assetKey="lx-anno-schedule"
                  label="Schedule pick-up"
                  caption="Collection and return scheduled independently, with the itemised review order alongside so the price is settled before the payment step."
                />
              </Decision>

              <Decision n={3} title="Put the sorting choice on the garment, not in a settings screen">
                <p>
                  &ldquo;Smart cloth sorting&rdquo; was one of the five features we committed to,
                  and the cheapest place to honour it is inside the item list. Each shirt row
                  carries a <strong>hung or folded</strong> toggle, and curtains price by size
                  rather than by unit, at 3&ndash;6 feet or 7&ndash;10 feet. The preference is
                  attached to the thing it applies to, at the moment you are already thinking
                  about that thing.
                </p>
                <p>
                  It also keeps the order screen honest about cost: because size and handling are
                  chosen inline, the running subtotal at the foot of the list is the real number,
                  not an estimate that grows at checkout.
                </p>
                <Figure
                  assetKey="lx-anno-services"
                  label="Service selection"
                  caption="Packaging chosen per garment, with the subtotal updating in place."
                />
              </Decision>
            </CaseSection>

            <CaseSection id="flow" eyebrow="Flow" title="The whole path, start to finish">
              <div className="prose">
                <p>
                  Splash and login, location, home, service and garment selection, cart,
                  scheduling, address confirmation, payment, tracking, and back to the homepage.
                  Every screen in the app maps to a node on this sheet.
                </p>
              </div>
              <Figure
                assetKey="lx-userflow"
                label="User flow"
                caption="The flow as agreed before any high-fidelity work started. Building the screens against a settled flow is what made a 48-hour turnaround possible."
              />
              <div className="prose" style={{ marginTop: '2rem' }}>
                <p>
                  The two screens that matter most after payment are the ones that keep the
                  promise: a five-state order tracker with timestamps, and live tracking with the
                  driver&rsquo;s route and a call button. And when the promise is broken, a
                  support chat that accepts a photograph — the deck&rsquo;s own example is a
                  customer reporting a discoloured shirt.
                </p>
              </div>
              <Figure
                assetKey="lx-status"
                label="Order status"
                caption="Order placed, picked, preparing, ready to deliver, delivered — with a timestamp against each state that has happened and nothing invented for the ones that have not."
              />
            </CaseSection>

            <CaseSection id="outcomes" eyebrow="Outcomes" title="What I did on it">
              <ul className="exp__points" style={{ maxWidth: '62ch' }}>
                <li>Contributed to idea brainstorming and the service concept.</li>
                <li>Designed the high-fidelity screens for the ordering, scheduling, payment and tracking flow.</li>
                <li>Built the clickable prototype.</li>
                <li>Prepared and delivered the final presentation.</li>
              </ul>
              <div className="callout">
                <h3>On a group project</h3>
                <p>
                  Four of us worked on this, and the survey, personas, research analysis,
                  illustration, logo and onboarding screens were not mine. The full contribution
                  list is on the deck&rsquo;s own team slide, reproduced in the deck view above.
                </p>
              </div>
            </CaseSection>

            <CaseSection id="reflection" eyebrow="Reflection" title="What I would change" narrow>
              <div className="prose">
                <p>
                  <strong>Seventeen responses is not a finding.</strong> The deck reports survey
                  percentages without qualifying them, and 64.7% is eleven people. That was enough
                  to point a 48-hour build in a direction, and it is presented in the deck as
                  though it were more. Today I would put the sample size next to every percentage
                  rather than in a sentence above the charts.
                </p>
                <p>
                  <strong>Nothing was tested.</strong> There is a prototype and no usability
                  session. The scheduling screen is the one I would most want in front of someone:
                  two date pickers and two time pickers stacked on one screen is a lot of
                  controls, and I do not know whether the flexibility reads as helpful or as work.
                </p>
                <p>
                  <strong>The slot colours arrived late, and they arrived alone.</strong> Colouring
                  time slots red, amber and green by availability was added after the hackathon,
                  and colour is currently the only thing carrying that meaning. It needs a second
                  cue — a label, a pattern, or simply disabling what is full — before it is
                  usable by everyone.
                </p>
                <p>
                  <strong>Some of what is shown was not built in the 48 hours.</strong> The deck
                  labels the household upholstery list and the availability-coloured scheduling
                  screen as later work. I have kept that label rather than quietly folding them in,
                  because a hackathon case study is partly a claim about what you can do under
                  time pressure.
                </p>
              </div>
            </CaseSection>
          </CaseBody>

          <div className="section section--tight">
            <PrevNext slug="laundry-xpress" />
          </div>
        </>
      )}
    </>
  )
}
