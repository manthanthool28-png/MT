import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import { Counter, Motes, ScrollFilm, SplitHeading } from '../../components/Cinema.jsx'
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

const FLAWS = [
  ['Reactivity',
   'Mark Doyle, pharmacist-in-charge',
   'Time efficiency',
   'The alert only fires once stock has already hit the reorder point. That turns ordering into an interruption \u2014 stressful, urgent, dropped into the middle of another task, and exactly the condition under which people make mistakes.'],
  ['Data deficiency',
   'Dr Priya Sharma, clinical pharmacist',
   'Anticipation',
   'The system reasons from current stock alone. It has no view of local disease trends or ward-level protocol shifts, so order quantities get adjusted on instinct rather than evidence, and the adjustments are not reproducible.'],
  ['Isolation from strategy',
   "Dr \u00c1ine O'Connell, procurement officer",
   'Cost optimisation',
   'The order list is assembled from alerts and carries no financial information at all, so the budget is only reconciled at the very end \u2014 by hand, under time pressure, with non-compliance discovered too late to do anything about it.'],
]

const SCENARIOS = [
  ['Scenario 1', 'Receiving, tagging and colour-coded organisation of new medicines'],
  ['Scenario 2', 'Monitoring, alerting and restocking'],
  ['Scenario 3', 'Removing expired medicines'],
]

/* The act, in the project's own words: every line below is a sentence from
   the study cut to length, and every number is one the study already states. */
const BEATS = [
  {
    key: 'shelf-mindmap',
    kicker: 'Method',
    line: 'Fifteen problems down to one.',
  },
  {
    key: 'shelf-build',
    kicker: 'The rig',
    line: 'Cardboard, foil and an Arduino.',
  },
  {
    key: 'shelf-prototype',
    kicker: 'Decision 03',
    line: 'The same colour code on the shelf and on the screen.',
  },
  {
    key: 'cs-forecast',
    kicker: 'Decision 04',
    line: 'Analytics that predict rather than report.',
  },
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

      <section className="cine" aria-labelledby="cine-h">
        <div className="wrap cine__intro">
          <Motes glyph="box" />
          <div className="cine__say">
            <p className="eyebrow">The build in four frames</p>
            <SplitHeading id="cine-h" text="Running out of a medicine has consequences beyond a lost sale." />
            <p className="cine__lede">
              Pharmacy inventory is largely manual: time-consuming, repetitive and prone to human
              error. A pharmacist already running digital inventory software named the two that
              matter — expired stock going unnoticed on the shelf, and no real-time signal when
              stock runs low.
            </p>
          </div>
        </div>

        <ScrollFilm beats={BEATS} label="Smart Shelf, the build in four frames" />

        <div className="wrap cine__facts">
          <div className="facts">
            <Counter value={15} label="Problems found · narrowed to one" />
            <Counter value={3} label="Personas · all strategic users" />
            <Counter value={6} label="Decisions · half shelf, half screen" />
            <Counter value={1} label="Pharmacist interviewed · already using inventory software" />
          </div>
        </div>
      </section>

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

        <CaseSection id="process" eyebrow="Method" title="Fifteen problems down to one">
          <div className="prose">
            <p>
              This started as a methods exercise rather than a product idea. The brief was to
              run a full user-centred process and let it decide what to build, so the group
              opened with <strong>fifteen problem areas</strong> across human, environmental
              and technological challenges &mdash; every one drawn from a real difficulty
              somebody had actually hit, from bus commuter anxiety to fall detection for the
              elderly to a smart power outlet indicator.
            </p>
          </div>
          <Figure
            assetKey="shelf-problem-areas"
            label="Divergence"
            caption="The fifteen starting points. Nothing here is a product; they are annoyances, which is the correct raw material at this stage."
          />

          <div className="prose" style={{ marginTop: '2rem' }}>
            <p>
              <strong>Mind-mapping and brainstorming</strong> came next, run on the three
              themes that survived a first pass: shopping efficiency, shared kitchen
              resources, and food management. The point was not to collect more ideas but to
              find root causes &mdash; to cluster complaints until the structure underneath
              them showed. Mapping &ldquo;shopping efficiency&rdquo; is what surfaced
              <em> inventory confusion</em> as a category distinct from price or layout
              problems, and that is the thread that eventually led to a pharmacy shelf.
            </p>
          </div>
          <Figure
            assetKey="shelf-mindmap"
            label="Mind map"
            caption="One of the theme maps. Pain points clustered until price confusion, layout and navigation, and operational delay separated out as distinct problems rather than one undifferentiated complaint."
          />

          <div className="prose" style={{ marginTop: '2rem' }}>
            <p>
              Two rounds of supervisor feedback narrowed fifteen to five, then five to four.
              The deciding criteria were explicit: the concept had to demonstrate a
              <strong> complete interaction cycle</strong>, involve a tangible and testable
              prototype, and show social and operational impact. Smart Shelves won because it
              was the one that put physical hardware and a digital dashboard on the same
              problem.
            </p>
            <p>
              <strong>The pharmacist interview grounded it.</strong> We spoke to a pharmacist
              already running semi-automated software (MEDMANTRA) with low-stock and
              short-expiry alerts by daily email. Stock was checked every morning and updated
              by end of day, with printouts carried around for distributor returns. The
              failures they described were not software failures: manual dispensing never
              made it back into the system, bulk data entry introduced quantity errors, and
              the daily check was only as good as whoever did it that day.
            </p>
            <p>
              They supported automated shelves, with one caveat that shaped the whole design:{' '}
              <strong>manual verification still had to be possible</strong>, particularly for
              half-used or cut medicine strips, which no tag-based count can be trusted to
              get right.
            </p>
          </div>

          <ul className="rq-list">
            {SCENARIOS.map(([n, s]) => (
              <li key={n}>
                <b>{n}</b>
                <p>{s}</p>
              </li>
            ))}
          </ul>

          <div className="prose" style={{ marginTop: '2rem' }}>
            <p>
              Those three scenarios were written to cover the complete cycle the supervisor
              asked for, and everything after them &mdash; sketches, wireframes, the physical
              build &mdash; was checked against whether it served all three rather than just
              the easy one.
            </p>
          </div>
          <div className="figure-row">
            <Figure
              assetKey="shelf-sketches"
              label="Sketches"
              caption="Working out the carcass, the compartment divisions and where the reader and cable run would sit."
            />
            <Figure
              assetKey="shelf-lofi-annot"
              label="Low-fidelity, annotated"
              caption="Hand-drawn dashboard, restock table and add-supply form, annotated with what each region has to carry before any of it was styled."
            />
          </div>
        </CaseSection>

        <CaseSection id="build" eyebrow="Build" title="Cardboard, foil and an Arduino">
          <div className="prose">
            <p>
              The prototype is deliberately low-fidelity in material and high-fidelity in
              behaviour. Three shelf levels are divided into eight labelled compartments,
              each colour-coded by category &mdash; pain killer, cold, digestive, allergy,
              sleep, first aid, syrup &mdash; and each with its own RFID reader. Every
              medicine box carries a tag holding product ID, name, quantity and expiry.
              An Arduino and an ESP8266 Wi-Fi module live in the base tray and push reads to
              a cloud database.
            </p>
          </div>
          <div className="figure-row">
            <Figure
              assetKey="shelf-build"
              label="Build sequence"
              caption="Six steps from flat cardboard to a tested assembly, which is also the instruction set that let three people build in parallel."
            />
            <Figure
              assetKey="shelf-workshop"
              label="Assembly"
              caption="Built on a living-room floor over a weekend."
            />
          </div>
          <Figure
            assetKey="shelf-prototype"
            label="The prototype"
            caption="The finished shelf, loaded with real medicine packaging. Compartments are hand-labelled A1 to C2 by category, each box carries a numbered tag, and the Wi-Fi module and Arduino sit in the base."
          />
        </CaseSection>

        <CaseSection id="evaluation" eyebrow="Evaluation" title="A cognitive walkthrough, and what it broke">
          <div className="prose">
            <p>
              The first system worked. It tracked stock, flagged expiry and pushed alerts,
              and against manual counting that was a real improvement. So the second half of
              this project was about finding out where it still failed, which needed a method
              rather than an opinion.
            </p>
          </div>
          <Figure
            assetKey="shelf-ssms-ui"
            label="The system under test"
            caption="The original Smart Shelf app: shelf status, restock management, sales reporting, alerts and staff management. This is what the walkthrough was run against."
          />

          <div className="prose" style={{ marginTop: '2rem' }}>
            <p>
              We used a <strong>cognitive walkthrough</strong> (Lewis, Polson, Wharton and
              Rieman), tracing the actions a strategic user has to take to answer one
              question: <em>how does a pharmacist respond to a system-generated alert and
              strategically generate a purchase order?</em> Walking that path against three
              personas, each with a stated goal, turned a vague sense that the system was
              &ldquo;a bit reactive&rdquo; into three specific failures.
            </p>
          </div>

          <ul className="rq-list">
            {FLAWS.map(([name, persona, goal, detail]) => (
              <li key={name}>
                <b>{name}</b>
                <p style={{ marginBottom: '0.5rem' }}>
                  <span className="tech">{persona} &middot; goal: {goal}</span>
                </p>
                <p>{detail}</p>
              </li>
            ))}
          </ul>

          <div className="prose" style={{ marginTop: '2rem' }}>
            <p>
              The conclusion was blunt enough to be useful: the system provided{' '}
              <strong>tracking but not intelligence</strong>. Every one of the three failures
              came from the same root, which is that a threshold alert can only ever describe
              the present. Fixing it meant the next version had to forecast, not monitor.
            </p>
          </div>
          <Figure
            assetKey="shelf-brainstorm"
            label="Redesign brainstorm"
            caption="Mapping the second round. The centre is the new capability, and the branches are the problems it has to answer, the data it needs, the users it serves and how success would be measured."
          />
          <Figure
            assetKey="shelf-flows"
            label="Redesigned flow"
            caption="The proactive cycle that replaced it: start from predicted stockout risk, read the forecast, review the suggested order, reconcile against budget, then approve and export. The budget check is a gate inside the flow rather than a reconciliation afterwards."
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
