/* ==========================================================================
   Smart Shelf / Predictive Restocking — report mode.

   A transcription of the CS6431 Assignment 4 submission, "Testing and
   Redesign", in a clinical register: white ground, pharmacy teal, tabular
   data. The report evaluates the group's original Smart Shelf Management
   System and specifies the predictive module that replaced its reactive core.

   One naming note is carried in the report itself: the written report calls
   the product CliniSense, while the built prototype ships as MediStock AI.
   Both names are shown rather than quietly reconciled.
   ========================================================================== */
import Reveal from './Reveal.jsx'
import Figure from './Figure.jsx'

const FACTS = [
  ['Module', 'CS6431 · Foundations of Interaction & Experience Design'],
  ['Method', 'Cognitive Walkthrough + qualitative interviews'],
  ['Personas', 'Three, all strategic users'],
  ['Output', 'Predictive Restocking Intelligence Module'],
]

const FLAWS = [
  {
    n: '1',
    t: 'Reactivity',
    step: 'You will be notified when the stock level reaches the reorder point.',
    who: 'Mark Doyle, operational pharmacist',
    fail: 'He did not meet his goal of being time efficient. The reactive alert led to a stressful and urgent response, which interrupted his planned workflow and made human error more likely.',
  },
  {
    n: '2',
    t: 'Data deficiency',
    step: 'The pharmacist uses current stock levels to figure out how much to dispense.',
    who: 'Dr Priya Sharma, clinical pharmacist',
    fail: 'She did not hit her target for anticipation. The system missed contextual information such as local disease trends and specialised protocols, which resulted in arbitrary changes to order quantities.',
  },
  {
    n: '3',
    t: 'Isolation from strategy',
    step: 'The order list is created only from alerts, so it carries no financial information.',
    who: 'Dr Áine O’Connell, procurement officer',
    fail: 'She did not hit her mark on cost optimisation, struggling to balance medication needs against budget until the very end, costing time and risking non-compliance with financial rules.',
  },
]

const REQUIREMENTS = [
  ['AI-driven forecasting', 'Addresses flaw 2',
    'Move from showing past consumption rates to predicting future demand, by combining dispensing frequency, prescribing patterns, seasonal factors and local health data.'],
  ['Strategic risk monitoring', 'Addresses flaw 1',
    'Replace simple threshold alerts with a calculated risk score, stockout or expiry, that quantifies future problems from the forecast. Notify before the problem, so ordering happens in normal workflow hours.'],
  ['Budget integration', 'Addresses flaw 3',
    'Financial controls that suggest budget-conscious ordering and give a clear view of total cost across all suggested orders before anything is sent.'],
]

const PERSONAS = [
  {
    name: 'Dr Áine O’Connell',
    age: '48',
    role: 'Chief Pharmacy Procurement Officer',
    pains: ['Manual adjustment wastes time and pushes spend over budget', 'No data to justify strategic decisions'],
    quote: '“I need the system to tell me how much money I can save by reducing low-priority stock, not just how much I have left.”',
    value: 'Budget-aware ordering',
  },
  {
    name: 'Mark Doyle',
    age: '31',
    role: 'Pharmacist-in-Charge / Inventory Supervisor',
    pains: ['High workload from manual counting and delivery scheduling', 'Urgent, reactive stockout alerts as a source of stress'],
    quote: '“Tell me what’s going to run out in three weeks, not what ran out five minutes ago, so I can order it next Tuesday when I have time.”',
    value: 'Proactive stockout alerts',
  },
  {
    name: 'Dr Priya Sharma',
    age: '35',
    role: 'Clinical Pharmacist, Infectious Diseases Ward',
    pains: ['Only generalised stock data', 'No specialised context such as antibiotic resistance trends'],
    quote: '“The forecast needs to justify itself using our local admission data, not just national sales trends. Show me the contextual data.”',
    value: 'Contextual prediction',
  },
]

const SCREENS = [
  {
    asset: 'cs-dashboard',
    fig: 'Fig. 5',
    t: 'Main screen (dashboard)',
    body: [
      'Key performance indicators give the procurement officer a quick status check: budget management at €66K for immediate visibility on financial health, action required across 10 items, and 8 active AI forecasts, which shows the system is running predictive models rather than simply tracking.',
      'The AI model data sources panel addresses flaw 2 directly by justifying the forecast. Contextual metrics such as flu season impact, +152% over four weeks, and weekly admissions, +18%, expose the external clinical inputs driving the prediction. That transparency is what builds trust for the clinical pharmacist.',
      'Critical stockout risks solve flaw 1 by naming the most urgent future problems, each with a days-until-stockout countdown, Insulin Glargine in three days, Salbutamol inhaler in twelve, and a reasoning badge explaining why the item is flagged.',
    ],
  },
  {
    asset: 'cs-forecast',
    extra: 'cs-override',
    extraCap: 'Fig. 7 — the override modal. It does not simply accept a new number: it asks for the event, the timing in weeks and the expected impact, so the adjustment is recorded as a clinical judgement with a reason attached rather than an unexplained edit.',
    fig: 'Fig. 6 and 7',
    t: 'AI demand forecast, and clinical override',
    body: [
      'The analytical heart of the product. It shows daily units and total stock value, and a dynamic graph mapping actual demand against AI-predicted demand so a trend reads immediately as stable, increasing or decreasing.',
      'Crucially the page includes a clinical override, allowing the user to manually adjust the suggested order, with a pop-up that captures the justification for the override.',
    ],
  },
  {
    asset: 'cs-alerts',
    fig: 'Fig. 8 and 9',
    t: 'Risk alerts',
    body: [
      'The hub for proactive action, and the direct answer to reactivity in the old system. It shows which medications are at risk of running out, leading on days until stockout, and gives each alert a short explanation of why the risk exists, so the inventory supervisor can place orders quickly and back the decision with what is happening in the clinic.',
    ],
  },
  {
    asset: 'cs-reorder',
    fig: 'Fig. 10',
    t: 'AI-suggested reorder list',
    body: [
      'A combined list of medications needing attention, sorted by urgency from critical down to low. The table compares current stock against the suggested quantity, shows the cost of each line immediately, and allows the quantity to be changed.',
      'Supplier lead time sits in the same table, so orders can be timed to avoid a supply gap. Approve Selected converts the checked suggestions into a purchase order.',
    ],
  },
  {
    asset: 'cs-budget',
    extra: 'cs-budget-resolve',
    extraCap: 'Fig. 12 — the resolution. Budget exceeded by €10,180, a before-and-after pair, and the two medium-priority items deferred to get there, named individually. The saving is stated as a figure rather than implied.',
    fig: 'Fig. 11 and 12',
    t: 'Budget-aware ordering',
    body: [
      'The financial guardrail. In the report’s worked example the proposed order of €25,180 exceeds the €15,000 monthly budget. Rather than halting the user, the system categorises cost by medicine type and by importance, showing that critical items are the bulk of the price.',
      'The AI resolution tool then offers Smart Auto-Optimise, which delays less critical medicines while preserving essentials such as insulin. A before-and-after comparison shows the removed items and the total saving, so the final order is both clinically safe and financially approved.',
    ],
  },
  {
    asset: 'cs-orders',
    extra: 'cs-order-create',
    extraCap: 'Fig. 14 — the creation modal, pre-filled from the AI suggestion but still editable, with Save as Draft weighted against Create and Send.',
    extra2: 'cs-order-confirm',
    extraCap2: 'Fig. 15 — confirmation for PO-2025-002 to MediSupply Ltd: three items, €565, in transit, with Download PDF beside Send to Supplier.',
    fig: 'Fig. 13 to 15',
    t: 'Purchase orders',
    body: [
      'The control centre for the final procurement steps: in-progress counts and a list carrying delivery dates and amounts. The creation modal pre-fills from the AI suggestion but stays editable, and lets the order be saved as a draft or sent straight away.',
      'The confirmation modal gives a final rundown of the order, PO-2025-002 in the example, which can be downloaded as a PDF for records or sent directly to the supplier.',
    ],
  },
]

const FUTURE = [
  ['Vendor performance integration', 'Suggest optimal ordering times from historical supplier delivery reliability and pricing.'],
  ['Recipe-based forecasting', 'For common surgery kits or treatment bundles, forecast demand from the recipe of required items rather than item by item.'],
]

const REFS = [
  'Nielsen, J. (1994). Usability Engineering. Academic Press.',
  'Lewis, C., Polson, P. G., Wharton, C., & Rieman, J. (1990). The Cognitive Walkthrough Method: A Practitioner’s Guide. In CHI ’90 Proceedings.',
  'Rajkomar, A., Dean, J., & Kohane, I. (2019). Machine Learning in Medicine. The New England Journal of Medicine, 380(14), 1347–1358.',
  'Chopra, S., & Meindl, P. (2019). Supply Chain Management: Strategy, Planning, and Operation. Pearson.',
]

function Section({ title, sub, children, centre = true }) {
  return (
    <section className="rep-section">
      {centre ? (
        <div className="rep-centre" style={{ marginBottom: '1.75rem' }}>
          <h2 className="rep-h">{title}</h2>
          {sub && <p className="rep-body" style={{ marginTop: '1rem', marginInline: 'auto' }}>{sub}</p>}
        </div>
      ) : (
        <div className="rep-section__head"><h2 className="rep-h">{title}</h2></div>
      )}
      {children}
    </section>
  )
}

export default function SmartShelfReport() {
  return (
    <div className="wrap">
      <Reveal className="rep-head">
        <p className="rep-head__kicker">CS6431 · Assignment 4 · 2025/6 SEM1</p>
        <h1 className="rep-head__title">Testing and Redesign</h1>
        <p className="rep-head__meta">
          Evaluating the Smart Shelf Management System and specifying the predictive
          restocking module that replaced its reactive core. Manthan Thool · 25065394.
        </p>
        <div className="rep-stats" style={{ maxWidth: '860px' }}>
          {FACTS.map(([k, v]) => (
            <div className="rep-stat" key={k}>
              <p className="rep-stat__k">{k}</p>
              <p className="rep-stat__v" style={{ fontSize: 'var(--step-0)' }}>{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Section title="1 · Project context">
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The original Smart Shelf Management System used RFID to automate inventory
            tracking and alerted pharmacy staff when stock was physically low or near expiry.
            It successfully removed the tedium of manual shelf checks, a pain point confirmed
            in the initial interviews, where professionals described the high risk of
            overlooking expired products. That first phase established reliable, automated
            stock data.
          </p>
          <p>
            <strong>The gap.</strong> For a central hospital pharmacy the system was set up to
            react, using low-stock alerts, the same mechanism the old process used. That pushed
            procurement managers into rushed ordering, which wasted time and money. The result
            was stockouts that cost money and put patient care at risk, alongside surplus
            medication that expired and was thrown away.
          </p>
        </div>

        <div className="callout" style={{ maxWidth: '68ch', marginInline: 'auto' }}>
          <h3>The problem statement that guided the redesign</h3>
          <p>
            The current system lacks a Predictive Restocking Intelligence Module. By analysing
            past dispensing data, seasonal trends and prescription patterns, the system must
            transform from a reactive alert mechanism into a proactive decision support tool
            that forecasts medicine demand and suggests budget-aware orders for hospital
            pharmacists.
          </p>
        </div>
      </Section>

      <Section
        title="2 · Method"
        sub="Qualitative interviews to establish ground-level context, then a Cognitive Walkthrough as the formal evaluation."
      >
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The interviews confirmed that even in systematic settings, workload and staffing
            were the dominant challenges, and that manual checks remained surprisingly common.
            The consensus was that while automation was welcome, the strategic planning phase
            was still dependent on tedious, error-prone human calculation.
          </p>
          <p>
            The Cognitive Walkthrough traced the actions a strategic user, the procurement
            officer, has to take in the old dashboard when responding to an alert. The task
            was: <em>how would a pharmacist respond to a system-generated alert and
            strategically generate a new purchase order?</em>
          </p>
        </div>
      </Section>

      <Section title="3 · Three flaws the walkthrough exposed" centre={false}>
        <div className="rep-card__rows">
          {FLAWS.map((f) => (
            <div className="rep-card__row" key={f.n}>
              <span className="rep-num" aria-hidden="true">{f.n}</span>
              <div>
                <p className="rep-card__t">
                  {f.t} <span className="rep-pill">{f.who}</span>
                </p>
                <p className="rep-card__d" style={{ fontStyle: 'italic' }}>Step: {f.step}</p>
                <p className="rep-card__d">{f.fail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="rep-body" style={{ marginTop: '1.75rem', marginInline: 'auto' }}>
          <strong>The lesson.</strong> The old system provided tracking but not intelligence.
          The next iteration had to be predictive. The shift in focus was mandatory: from
          monitoring the past to predicting the future.
        </p>
      </Section>

      <Section title="4 · Core requirements" centre={false}>
        <div className="rep-grid">
          {REQUIREMENTS.map(([t, tag, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t} <span className="rep-pill">{tag}</span></p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="5 · Personas"
        sub="Three user roles whose goals were frustrated by the old reactive system."
      >
        <div className="rep-grid">
          {PERSONAS.map((p) => (
            <div className="rep-card" key={p.name}>
              <p className="rep-card__t">{p.name} <span className="rep-pill">{p.age}</span></p>
              <p className="rep-card__d" style={{ color: 'var(--accent-text)' }}>{p.role}</p>
              <ul className="rep-check" style={{ marginTop: '0.75rem' }}>
                {p.pains.map((x) => <li className="rep-check__item" key={x}>{x}</li>)}
              </ul>
              <p className="rep-card__d" style={{ fontStyle: 'italic', marginTop: '0.9rem' }}>{p.quote}</p>
              <p className="rep-card__d" style={{ marginTop: '0.6rem' }}>
                <strong>AI module value:</strong> {p.value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="6 · The prototype, screen by screen"
        sub="The figures below are the CliniSense build, the one the written report documents figure by figure. A later variant of the same prototype is branded MediStock AI, and that is the one the case study shows. Both names are in the source material and neither has been quietly dropped."
      >
        {SCREENS.map((s) => (
          <div className="rep-screen" key={s.asset}>
            <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
              <h3 className="rep-card__t">
                <span className="rep-pill">{s.fig}</span> {s.t}
              </h3>
            </div>
            <Figure assetKey={s.asset} />
            <div className="rep-body" style={{ marginInline: 'auto' }}>
              {s.body.map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
            </div>
            {s.extra && <Figure assetKey={s.extra} caption={s.extraCap} />}
            {s.extra2 && <Figure assetKey={s.extra2} caption={s.extraCap2} />}
          </div>
        ))}

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">Low fidelity first</h3>
        </div>
        <Figure
          assetKey="cs-lofi"
          caption="Lo-fi wireframes deliberately disregard colour, typeface and imagery to focus on structure, hierarchy and functional placement. They settled three things: the budget meter moved to a prominent position at the top, the AI data sources panel and critical stockout list took the central view, and a persistent left sidebar was reserved for the major workflow areas."
        />
      </Section>

      <Section title="7 · Conclusion" centre={false}>
        <div className="rep-grid">
          <div className="rep-card">
            <p className="rep-card__t">A · Reducing cognitive load</p>
            <p className="rep-card__d">
              The system handles the data-heavy work, forecasting and risk calculation, and
              surfaces only the actionable output: risk score, suggested quantity, and whether
              the budget is being followed. Less thinking, quicker decisions.
            </p>
          </div>
          <div className="rep-card">
            <p className="rep-card__t">B · Data-driven and contextual</p>
            <p className="rep-card__d">
              Historical dispensing data is combined with external factors, local disease data
              and prescription trends, so the forecast is relevant to the specific situation.
              Each important output carries a written explanation, which is what builds
              confidence in the prediction.
            </p>
          </div>
          <div className="rep-card">
            <p className="rep-card__t">C · Workflow-specific features</p>
            <p className="rep-card__d">
              Risk alerts change the time horizon: predict, then order during calm hours rather
              than in a rush. Budget-aware ordering uses constraint to guide, forcing the budget
              question to be answered before ordering begins rather than after.
            </p>
          </div>
        </div>

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">Future possibilities</h3>
        </div>
        <div className="rep-grid">
          {FUTURE.map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="References" centre={false}>
        <ul className="rep-check">
          {REFS.map((r) => <li className="rep-check__item" key={r}>{r}</li>)}
        </ul>
      </Section>
    </div>
  )
}
