/* ==========================================================================
   Laundry Xpress — report mode.

   A transcription of the deck submitted for Dezignathon '23, a 48-hour design
   hackathon run by TuteDude, by the four-person team Soulful Pixels. It keeps
   the deck's own order, its own figures (extracted from the submitted PDF
   rather than redrawn) and its own wording.

   Two things are deliberately withheld. The deck's team slide prints each
   member's personal phone number; the names and contributions are reproduced
   here and the numbers are not. The deck's login mock-up also shows a real
   personal email address, so the screen used here is the one carrying the
   placeholder address instead.
   ========================================================================== */
import Reveal from './Reveal.jsx'
import Figure from './Figure.jsx'
import { asset } from '../data/assets.js'

const FACTS = [
  ['Event', 'Dezignathon ’23 · TuteDude'],
  ['Duration', '48 hours'],
  ['Team', 'Soulful Pixels, four designers'],
  ['Field', '50 teams participating'],
]

/* The deck reports these as counts out of 17 responses; the percentages are
   the ones printed on its own charts. */
const SURVEY = [
  ['64.7%', 'had faced laundry services being unavailable near them'],
  ['76.5%', 'named convenient pickup and delivery as an essential feature — the single highest-ranked'],
  ['58.8%', 'named inconvenient pickup and delivery as a main challenge, the top-ranked problem'],
  ['52.9%', 'were looking for regular laundry rather than delicate or dry cleaning'],
]

const FEATURES = [
  'Real-time delivery tracking',
  'Affordable pricing',
  'Multiple payment options',
  'Pick up and delivery time flexibility',
  'Smart cloth sorting for ease',
]

const CHALLENGES = [
  'Lack of convenient delivery options',
  'Lack of trust in the service quality',
  'Expensive services',
  'Not aware about the benefits of professional laundry',
]

const PERSONAS = [
  {
    name: 'Divya', age: '25', edu: 'Engineering', loc: 'Pune', job: 'Student',
    quote: 'My busy schedule makes laundry a hassle, don’t know what to do',
    goals: ['Convenient pickup and delivery', 'To save time on laundry', 'Needs affordable solutions for clothes and household items'],
    frustrations: ['Inconvenient in pickup and delivery', 'Pricing', 'Service quality and reliability'],
    motivations: ['Convenience', 'Time-saving', 'Efficiency'],
    personality: 'Organised & ambitious',
  },
  {
    name: 'Kaviyan A N', age: '23', edu: 'BSc', loc: 'Delhi', job: 'UX UI Designer',
    quote: 'My office timings are so odd, by the time I come back all the laundry and ironing services are closed and I have to leave early in morning',
    goals: ['User friendly app', 'A service that offers reliable customer support'],
    frustrations: ['Inconvenient in pickup and delivery', 'Pricing issues', 'Lack of trust in service quality'],
    motivations: ['Hassle-free experience', 'Professional results', 'Access to various services and options'],
    personality: 'Busy and time conscious',
  },
]

/* Names and contributions from the deck's team slide. Phone numbers omitted. */
const TEAM = [
  ['Manthan', 'Idea brainstorming · high-fidelity screens · prototype · presentation'],
  ['Ritika', 'Idea brainstorming · user flow · high-fidelity screens · prototype'],
  ['Kavita', 'Illustrations · logo · editing and presentation · onboarding screens'],
  ['Loshmin', 'User surveys · user personas · research analysis'],
]

const LEARNED = [
  'This 48-hour Designathon taught us the power of collaboration and teamwork tackling complex challenges.',
  'We learned to work under pressure and think outside the box solutions and pushing ourselves until the very end.',
  'We learned the importance of user centric design, understanding unique needs of our target audience to create a seamless user experience.',
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

function Screens({ items }) {
  return (
    <div className="lx-screens">
      {items.map(([key, title, caption]) => {
        const a = asset(key)
        return (
          <figure className="lx-screen" key={key}>
            <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
            <figcaption>
              <span className="lx-screen__t">{title}</span>
              {caption}
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

export default function LaundryXpressReport() {
  const hero = asset('lx-thumb')
  return (
    <div className="wrap">
      <Reveal className="rep-head">
        <div className="rep-head__bg">
          <img src={hero.src} alt="" />
        </div>
        <p className="rep-head__kicker">Dezignathon ’23 · UX/UI Design Challenge</p>
        <h1 className="rep-head__title">Laundry Xpress</h1>
        <p className="rep-head__meta">
          A laundry and ironing service app for tier 1 and 2 cities, designed end to end in
          forty-eight hours. Problem, research, flow, screens and reflection.
        </p>
        <div className="rep-stats" style={{ maxWidth: '760px' }}>
          {FACTS.map(([k, v]) => (
            <div className="rep-stat" key={k}>
              <p className="rep-stat__k">{k}</p>
              <p className="rep-stat__v" style={{ fontSize: 'var(--step-0)' }}>{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Section
        title="1 · The brief"
        sub="I participated in a 48-hour Design Marathon for the very first time, organised by TuteDude. We were a team of 4 working tirelessly together."
      >
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            <strong>Problem statement.</strong> In many tier 1 and 2 cities, residents living in
            hostels, paying guest accommodations (PGs) and flats face a common challenge: the
            unavailability of reliable laundry and ironing services within their vicinity, which
            leads to inconvenience, additional time consumption and overall reduced quality of
            life.
          </p>
          <p>
            The objective of this design hackathon is to develop innovative and practical
            solutions that provide accessible, affordable, and reliable laundry and ironing
            services. The solutions should aim to enhance convenience, quality, and overall
            customer satisfaction.
          </p>
          <p>
            <strong>The goal.</strong> As UX designers, our major goal was to make laundry simple
            and worry-free. We wanted to use technology to make things easier for people and save
            their precious time so that they can focus on more important things in life.
          </p>
        </div>
      </Section>

      <Section title="2 · The solution" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            We introduced LaundryXpress — a laundry and ironing service company in tier 1 and 2
            cities, providing quick and reliable service, with a reliable customer support and
            with assurity that their clothes are handled with care.
          </p>
        </div>
        <div className="rep-card__rows" style={{ marginTop: '1.5rem' }}>
          {FEATURES.map((f, i) => (
            <div className="rep-card__row" key={f}>
              <span className="rep-num" aria-hidden="true">{i + 1}</span>
              <div><p className="rep-card__t">{f}</p></div>
            </div>
          ))}
        </div>
        <Figure
          assetKey="lx-process"
          label="Design process"
          caption="The five stages the team worked through inside the 48 hours: empathize, define, ideate, deliver and test."
        />
      </Section>

      <Section
        title="3 · User survey"
        sub="The quantitative survey involved 10 research questions which was taken by 17 people."
      >
        <div className="lx-figs">
          {SURVEY.map(([n, l]) => (
            <div className="lx-fig" key={l}>
              <p className="lx-fig__n">{n}</p>
              <p className="lx-fig__l">{l}</p>
            </div>
          ))}
        </div>

        <Figure
          assetKey="lx-survey"
          label="Survey results"
          caption="All eight charted questions as they appear in the deck, including the free-text question about existing laundry apps, which came back overwhelmingly as ‘nil’."
        />

        <Figure
          assetKey="lx-voices"
          label="What users said"
          caption="The open-ended answers: affordable and quick service for clothes and home items, pricing that does not exceed local outlets, good customer support, and discounts."
        />

        <Figure
          assetKey="lx-analysis"
          label="Survey analysis"
          caption="The analysis slide as submitted; the points below are its own wording."
        />

        <div className="rep-body" style={{ marginTop: '2rem', marginInline: 'auto' }}>
          <p><strong>Survey analysis.</strong></p>
          <ul>
            <li>Prioritize convenient delivery options for their laundry needs.</li>
            <li>Our target audience is mainly students &amp; bachelors.</li>
            <li>52% of participants are seeking regular laundry services.</li>
            <li>
              The key themes emerging from the comments include the demand for affordable and
              quick services for both clothes and home items, providing excellent customer
              support, and the app’s pricing should not exceed local laundry outlet rates.
            </li>
            <li>
              These insights tell the need for a user-friendly app that focuses on convenience,
              affordability, and responsive customer service to meet the laundry needs of the
              target audience effectively.
            </li>
          </ul>
        </div>
      </Section>

      <Section title="4 · Main challenges users face" centre={false}>
        <div className="rep-grid">
          {CHALLENGES.map((c) => (
            <div className="rep-card" key={c}>
              <p className="rep-card__t">{c}</p>
            </div>
          ))}
        </div>
        <Figure
          assetKey="lx-challenges"
          label="Challenges"
          caption="The four challenges as the deck presents them."
        />
      </Section>

      <Section title="5 · User personas" centre={false}>
        <div className="rep-grid">
          {PERSONAS.map((p) => (
            <div className="rep-card" key={p.name}>
              <p className="rep-card__t">{p.name}</p>
              <p className="rep-card__d" style={{ marginBottom: '0.75rem' }}>
                {p.age} · {p.edu} · {p.loc} · {p.job}
              </p>
              <p className="rep-card__d" style={{ fontStyle: 'italic', marginBottom: '0.75rem' }}>
                “{p.quote}”
              </p>
              <p className="rep-card__d"><strong>Goals.</strong> {p.goals.join('; ')}.</p>
              <p className="rep-card__d"><strong>Frustrations.</strong> {p.frustrations.join('; ')}.</p>
              <p className="rep-card__d"><strong>Motivations.</strong> {p.motivations.join('; ')}.</p>
              <p className="rep-card__d"><strong>Personality.</strong> {p.personality}.</p>
            </div>
          ))}
        </div>
        <Figure
          assetKey="lx-personas"
          label="Persona sheets"
          caption="Both persona sheets as submitted. Divya’s bio still carries the template’s original name, opening ‘Sarah’s primary goal is to excel in her engineering studies’ — a leftover from the layout it was built on, reproduced here rather than corrected."
        />
      </Section>

      <Section title="6 · Structure" centre={false}>
        <Figure
          assetKey="lx-cardsort"
          label="Card sort"
          caption="Features grouped into five destinations: home page, select services, time and date schedule, review order, and profile. Those five groups become the app’s navigation almost unchanged."
        />
        <Figure
          assetKey="lx-userflow"
          label="User flow"
          caption="The whole flow on one sheet, from splash and login through location, service and garment selection, cart, scheduling, address confirmation, payment, tracking, and back to the homepage."
        />
      </Section>

      <Section title="7 · How it would actually work" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The main idea was introducing <strong>a franchise system</strong> where the parent
            company provides training, support, and brand recognition, allowing the franchisee to
            focus on providing high-quality services to customers. This model has proven
            successful according to our secondary research, and it will definitely expand our
            customer base as well.
          </p>
          <p>
            The vans that we provide can travel to different residential areas on scheduled days.
            Residents can book slots through the app, and the vans will provide door-to-door
            pickup and delivery services.
          </p>
        </div>
        <Figure
          assetKey="lx-model"
          label="Operating model"
          caption="The service model behind the app: franchised outlets, and vans running scheduled routes through residential areas."
        />
      </Section>

      <Section title="8 · The final designs" centre={false}>
        <div className="rep-section__head" style={{ marginTop: '0.5rem' }}>
          <h3 className="rep-card__t">8.1 Login and location</h3>
        </div>
        <Screens
          items={[
            ['lx-login', 'Log in', 'Email and password, with register underneath.'],
            ['lx-location', 'Outlet found', 'The nearest outlet, its address, and a change link before proceeding.'],
            ['lx-signup', 'Sign up', 'Name, email, phone and password, or continue with Google or Facebook.'],
          ]}
        />

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">8.2 Onboarding</h3>
        </div>
        <p className="rep-body" style={{ marginInline: 'auto' }}>
          The deck notes against this section that some improvements were made after the
          hackathon, as part of reflection and to make the case study and UI look more
          presentable.
        </p>
        <Screens
          items={[
            ['lx-onboard-1', 'One', 'Say goodbye to laundry woes with our app.'],
            ['lx-onboard-2', 'Two', 'Schedule laundry at your doorstep, at your preferred time.'],
            ['lx-onboard-3', 'Three', 'Our dedicated team ensures your clothes are handled with care.'],
          ]}
        />

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">8.3 Home screen</h3>
        </div>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <ul>
            <li>
              The app is friendly for everyone, tech-savvy or not. Our user interface is a breeze
              to navigate, enhancing the user experience.
            </li>
            <li>
              Users land on the home screen after registration, where they can access essential
              app features.
            </li>
          </ul>
        </div>
        <Figure
          assetKey="lx-home"
          label="The whole screen"
          caption="The home screen end to end, at the length a visitor actually scrolls: services, offer, subscription, the guarantee row, how-we-work, upholstery, a review, and the navigation bar."
        />
        <Figure
          assetKey="lx-anno-home"
          label="Home, annotated"
          caption="The deck’s own annotations: featured services, a clear call to action, subscription plans, the guarantee row building customer trust, home-item cleaning, featured reviews to set realistic expectations, and a navigation bar with a plus button for easy access."
        />

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">8.4 Service selection</h3>
        </div>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <ul>
            <li>
              The user then proceeds towards booking services. Here we have provided different
              sections for men, women and household items as well.
            </li>
            <li>
              Also we have provided separate categories for daily, ethnic and winter wear
              according to users needs.
            </li>
          </ul>
        </div>
        <Figure
          assetKey="lx-anno-services"
          label="Services, annotated"
          caption="Custom packaging by the choice of user — the hung or folded toggle sitting under each garment — with a running subtotal at the foot of the list."
        />
        <Screens
          items={[
            ['lx-order', 'Collapsed', 'Three categories, nothing expanded until asked for.'],
            ['lx-services-men', 'Men’s daily wear', 'Per-item prices, steppers, and the packaging choice.'],
            ['lx-services-household', 'Household', 'Upholstery, with curtains priced by size.'],
          ]}
        />

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">8.5 Pickup and delivery schedule</h3>
        </div>
        <p className="rep-body" style={{ marginInline: 'auto' }}>
          We provided flexible scheduling of the pick up and delivery time since this was the
          biggest concern of the users. Additionally we have also provided option for rapid
          service in times of urgency.
        </p>
        <Figure
          assetKey="lx-anno-schedule"
          label="Scheduling, annotated"
          caption="Normal against express, then separate date and time pickers for collection and return, with the itemised review order alongside."
        />
        <Screens
          items={[
            ['lx-schedule', 'Schedule', 'Normal or express, then pickup and delivery slots.'],
            ['lx-review', 'Review order', 'Items, instructions, subtotal, service charge and both addresses.'],
            ['lx-payment', 'Payment', 'Amount, contact, and the available methods.'],
          ]}
        />

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">8.6 Tracking the order</h3>
        </div>
        <p className="rep-body" style={{ marginInline: 'auto' }}>
          Users can track the status of their laundry in real-time. Important elements we
          introduced are order status updates and estimated delivery time.
        </p>
        <Screens
          items={[
            ['lx-success', 'Payment successful', 'Straight to order status, or home.'],
            ['lx-status', 'Order status', 'Five states from placed to delivered, with timestamps.'],
            ['lx-tracking', 'Live tracking', 'The driver’s route, with message and call.'],
          ]}
        />

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">8.7 Feedback and live chat</h3>
        </div>
        <p className="rep-body" style={{ marginInline: 'auto' }}>
          Users receive their clean clothes and can rate their experience with the laundry
          service. Important elements introduced are delivery confirmation, user rating and
          review options, and a ‘reorder’ button for future convenience.
        </p>
        <Figure
          assetKey="lx-reviews"
          label="Review flow"
          caption="Writing a review with a star rating, the confirmation, and the review list — where each review carries photographs of the returned clothes."
        />
        <Screens
          items={[
            ['lx-chat', 'Support chat', 'A complaint about a damaged shirt, with a photograph attached and an agent responding.'],
            ['lx-payment-otp', 'Payment, OTP', 'The confirmation step before the amount leaves the account.'],
            ['lx-schedule-slots', 'Slot availability', 'The later version, with slots coloured by how full they are.'],
          ]}
        />
      </Section>

      <Section title="9 · Changes made after the hackathon" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The deck is explicit that not everything shown was built inside the forty-eight
            hours. Two screens are labelled as later work: the household upholstery list, and a
            scheduling screen where the slot colours indicate availability.
          </p>
        </div>
        <Figure
          assetKey="lx-improvements"
          label="Later additions"
          caption="Screens and improvements made after the hackathon, as the deck labels them."
        />
      </Section>

      <Section title="10 · What we learned" centre={false}>
        <Figure
          assetKey="lx-learned"
          label="As submitted"
          caption="The closing slide, reproduced; the three lessons below are transcribed from it."
        />

        <div className="rep-card__rows">
          {LEARNED.map((l, i) => (
            <div className="rep-card__row" key={l}>
              <span className="rep-num" aria-hidden="true">{i + 1}</span>
              <div><p className="rep-card__d">{l}</p></div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Credits" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto', marginBottom: '1.5rem' }}>
          <p>
            Team Soulful Pixels, with the contributions each member listed on the deck’s own team
            slide. This was collaborative work; the research and the illustration in particular
            are not mine.
          </p>
        </div>
        <div className="rep-card__rows">
          {TEAM.map(([name, contrib]) => (
            <div className="rep-card__row" key={name}>
              <span className="rep-num" aria-hidden="true">{name.slice(0, 1)}</span>
              <div>
                <p className="rep-card__t">{name}</p>
                <p className="rep-card__d">{contrib}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Note on sources" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            Everything above is the submitted Dezignathon deck, in its own order and largely its
            own words. Two things were left out on purpose, and one is worth flagging:
          </p>
          <ul>
            <li>
              The deck’s team slide prints a personal phone number for each of the four members.
              The names and contributions are reproduced; the numbers are not.
            </li>
            <li>
              The deck’s login mock-up shows a real personal email address. The screen used here
              is the variant carrying a placeholder address instead.
            </li>
            <li>
              The survey has <strong>17 respondents</strong>. That is a small sample, and the deck
              presents its percentages without qualifying them — 64.7% is eleven people. The
              findings are directionally useful and were enough to steer a 48-hour build; they are
              not evidence of anything at population scale.
            </li>
          </ul>
        </div>
      </Section>
    </div>
  )
}
