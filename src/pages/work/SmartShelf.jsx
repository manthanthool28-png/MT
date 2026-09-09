import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import SmartShelfReport from '../../components/SmartShelfReport.jsx'
import FlowMap from '../../components/FlowMap.jsx'
import Figure from '../../components/Figure.jsx'
import { asset } from '../../data/assets.js'
import { bySlug } from '../../data/projects.js'

const project = bySlug('smart-shelf')

/* Plain screenshots. The working prototypes are deliberately not opened to
   visitors, so nothing here links into the live Figma files. */
function Shot({ k, sheet = false }) {
  const a = asset(k)
  return (
    <div className={sheet ? 'shot shot--sheet' : 'shot'}>
      <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
    </div>
  )
}

const SCENARIOS = [
  ['Scenario 1', 'Receiving, tagging and colour-coded organisation of new medicines'],
  ['Scenario 2', 'Monitoring, alerting and restocking'],
  ['Scenario 3', 'Removing expired medicines'],
]

export default function SmartShelf() {
  const [report, setReport] = useState(false)
  useReveal()

  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'clinical'
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
          <SmartShelfReport />
          <div className="section wrap">
            <PrevNext slug="smart-shelf" />
          </div>
        </>
      ) : (
      <>
      <CaseHeader project={project}>
        <Shot k="shelf-overview" />
      </CaseHeader>

      <CaseBody>
        <CaseSection id="problem" eyebrow="Problem" title="Counting stock by hand is where the errors come from">
          <div className="prose">
            <p>
              Pharmacy inventory is largely manual: time-consuming, repetitive and prone to
              human error. Two failures follow from it, and both are worse than ordinary
              retail stock problems. Running out of an essential medicine has consequences
              beyond a lost sale. Leaving an expired one on the shelf has consequences beyond
              a refund.
            </p>
            <p>
              We interviewed a pharmacist already using digital inventory software
              (MEDMANTRA) to understand what the existing tools do and do not solve. The
              problems that came back were specific: tracking stock accurately, expired
              medicines going unnoticed on the shelf, no real-time signal when stock runs
              low, and time lost to manual recording and billing.
            </p>
            <p>
              The gap is that existing systems record what someone tells them. They do not
              know what is actually on the shelf. Every one of those four problems comes from
              that same gap.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="process" eyebrow="Process" title="Fifteen problems down to one">
          <div className="prose">
            <p>
              The group began with roughly fifteen problem areas across human, environmental
              and technological challenges, each drawn from a real difficulty we thought
              interaction design could improve. We took them to our supervisor for feedback
              on which were feasible within the project scope, and Smart Shelves came out of
              that conversation.
            </p>
            <p>
              From there the method was user-centred and deliberately quick: brainstorming
              and mind-mapping to open the space, the pharmacist interview to ground it, then
              sketches and wireframes to refine a concept that would fit into a working day
              rather than interrupt it.
            </p>
          </div>
          <div className="rq-list">
            {SCENARIOS.map(([n, s]) => (
              <li key={n}>
                <b>{n}</b>
                <p>{s}</p>
              </li>
            ))}
          </div>
          <Figure
            assetKey="shelf-flows"
            label="User flows"
            caption="Three flows covering the complete interaction cycle, from a delivery arriving to expired stock being removed."
          />
        </CaseSection>

        <CaseSection id="prototypes" eyebrow="Interface" title="MediStock AI, screen by screen">
          <div className="prose">
            <p>
              The software side is branded <strong>MediStock AI</strong> and signs in as a
              named chief pharmacist rather than a generic admin, because every decision the
              system suggests is one a person has to be willing to put their name against.
              Six screens carry the whole cycle.
            </p>
          </div>

          <figure className="figure">
            <Shot k="shelf-forecast" />
            <figcaption>
              <b>AI demand forecast: </b>
              current stock and days of supply beside predicted demand for the next four
              weeks, with the trend stated in plain language rather than left in the chart.
            </figcaption>
          </figure>

          <figure className="figure">
            <Shot k="shelf-alerts" />
            <figcaption>
              <b>Risk alerts: </b>
              stockout, expiry and overstock in one list, each carrying days remaining and a
              numeric impact score so a pharmacist can triage rather than read every row.
            </figcaption>
          </figure>

          <div className="figure-row">
            <figure className="figure">
              <Shot k="shelf-reorder" />
              <figcaption>
                <b>Reorder list: </b>
                recommended quantities with unit price, lead time and priority, every row
                individually selectable before approval.
              </figcaption>
            </figure>
            <figure className="figure">
              <Shot k="shelf-budget" />
              <figcaption>
                <b>Budget-aware ordering: </b>
                the order set against a fixed monthly budget, with the overspend stated
                rather than silently trimmed.
              </figcaption>
            </figure>
          </div>

          <figure className="figure">
            <Shot k="shelf-orders" />
            <figcaption>
              <b>Purchase orders: </b>
              six distinct states from draft through supplier processing to delivered, so
              &ldquo;where is that order&rdquo; is answered on screen instead of by phone.
            </figcaption>
          </figure>

          <figure className="figure">
            <Shot k="shelf-lofi" sheet />
            <figcaption>
              <b>Low fidelity first: </b>
              wireframes and sketches settled the structure, the budget card and the alert
              card before any of it was styled.
            </figcaption>
          </figure>
        </CaseSection>

        <CaseSection id="architecture" eyebrow="Architecture" title="From a tagged box to an alert">
          <FlowMap
            label="Data path from a tagged medicine box through the shelf reader to the dashboard"
            nodes={[
              { text: 'RFID-tagged box', io: true },
              { text: 'Shelf reader' },
              { text: 'Arduino' },
              { text: 'ESP8266 Wi-Fi' },
              { text: 'Cloud database' },
              { text: 'Dashboard + alerts', io: true },
            ]}
          />
        </CaseSection>

        <CaseSection id="decisions" eyebrow="Key decisions" title="Six decisions, half on the shelf and half on the screen">
          <Decision n={1} title="The tag carries the data, so the shelf does not have to be told">
            <p>
              Each medicine package gets an RFID tag holding product ID, name, batch,
              quantity and expiry date. Readers built into the shelf detect items being
              placed or removed and update the cloud record instantly. Nobody types anything,
              which is what removes the error class rather than just speeding it up.
            </p>
          </Decision>

          <Decision n={2} title="Silver foil partitions, because the physics does not care about the concept">
            <p>
              Three compartments, one reader each, for three medicine categories. In testing
              the readers picked up tags from neighbouring compartments, which makes
              per-category counts meaningless. Silver foil partitions between the
              compartments block the interference.
            </p>
            <p>
              It is a crude fix and it is the most useful thing in the build. A system that is
              elegant in concept and wrong about which shelf an item is on is not a working
              system, and that only surfaces once the hardware is assembled.
            </p>
          </Decision>

          <Decision n={3} title="The same colour code on the shelf and on the screen">
            <p>
              Each compartment carries a colour that matches its category in the dashboard.
              The physical object and the digital interface use one visual language, so a
              member of staff reading an alert on the screen already knows which shelf to
              walk to. It costs nothing and removes a translation step that would otherwise
              happen in someone&rsquo;s head every time.
            </p>
            <Figure
              assetKey="shelf-prototype"
              label="Prototype"
              caption="Three colour-coded compartments with individual readers, and the Arduino, ESP8266 and wiring housed in the base unit."
            />
          </Decision>

          <Decision n={4} title="Analytics that predict rather than report">
            <p>
              On top of live counts, the system studies usage and sales over time to identify
              fast-moving medicines, predict restocking needs, and flag stock at risk of
              expiring or being over-ordered. Reporting what already happened is the easy
              half; the value is in warning before the shelf is empty or the batch is dead.
            </p>
          </Decision>

          <Decision n={5} title="The AI recommends; the pharmacist decides">
            <p>
              Every forecast screen carries a <strong>Clinical Override</strong> control, and
              the reorder list arrives with each line individually selectable rather than as
              one accept-or-reject block. The model states itself as a confidence figure, not
              as an answer.
            </p>
            <p>
              That control is the whole ethical position of the product in one button. A
              system that orders medicine on a prediction and gives the pharmacist no way to
              disagree has quietly moved a clinical judgement into software that cannot be
              held responsible for it. The override is not a fallback for when the model is
              wrong. It is a statement about who is accountable when it is.
            </p>
          </Decision>

          <Decision n={6} title="Show the budget conflict instead of resolving it quietly">
            <p>
              When the recommended order exceeds the monthly budget, the screen says so in
              the plainest available terms: over by &euro;10,485 against a &euro;15K
              allocation. It does not silently drop the cheapest lines until the number fits.
            </p>
            <p>
              Auto-optimise is offered as something the pharmacist chooses, with the spend
              split by category and by priority shown beside it so the trade-off is visible
              before it is accepted. Deciding which medicines not to order is a clinical
              decision wearing a financial disguise, and the interface refuses to make it on
              anyone&rsquo;s behalf.
            </p>
          </Decision>
        </CaseSection>

        <CaseSection id="outcomes" eyebrow="Outcomes" title="What the prototype demonstrates">
          <div className="prose">
            <p>
              The prototype runs a complete cycle: tagged medicines placed on shelves,
              detection and cloud update, expiry and low-stock alerts, an AI forecast, a
              reorder list reconciled against a budget, and a purchase order tracked to
              delivery. That end-to-end path is the thing worth showing, because each step is
              easy alone and the integration is where these systems usually fail.
            </p>
          </div>
          <div className="callout">
            <h3>On a group project</h3>
            <p>
              This was team work. The concept, research and prototype were developed
              collectively, and the case study describes the system rather than claiming sole
              authorship of it.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
          <div className="prose">
            <p>
              <strong>One pharmacist is not a study.</strong> A single interview grounded the
              problem, and it cannot tell us whether the workflow generalises across pharmacy
              sizes, staffing levels or countries with different dispensing rules.
            </p>
            <p>
              <strong>Low fidelity hides the hard part.</strong> Three compartments and a
              handful of tags demonstrate the cycle. A real pharmacy has thousands of SKUs,
              tags that fail, items shelved in the wrong place and stock that moves faster
              than a reader polls. Reconciliation between what the system believes and what is
              physically present is the unsolved problem here.
            </p>
            <p>
              <strong>The analytics are asserted, not evaluated.</strong> Predicting restock
              needs is described in the concept; there is no data yet showing the predictions
              would be accurate enough to act on.
            </p>
            <p>
              <strong>Next.</strong> Test with a working pharmacy for a week, design the
              mismatch and tag-failure states, and validate the prediction model against real
              sales history before putting it in front of staff.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section wrap">
        <PrevNext slug="smart-shelf" />
      </div>
      </>
      )}
    </>
  )
}
