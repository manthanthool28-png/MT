import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import Figure from '../../components/Figure.jsx'
import { bySlug } from '../../data/projects.js'
import { asset } from '../../data/assets.js'

const project = bySlug('tolet-globe')

export default function ToLetGlobe() {
  useReveal()
  const hero = asset('tolet-thumb')

  return (
    <>
      <CaseHeader project={project}>
        <div className="thumb" style={{ aspectRatio: '16 / 10' }}>
          <img src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} decoding="async" />
        </div>
        {/* The domain was serving a registrar parking page earlier on 9 September
            2026 and is serving the product again as of the same day, so the live
            link is back. */}
        <p className="tech" style={{ marginTop: '1rem' }}>
          <a href="https://www.toletglobe.in/" target="_blank" rel="noopener noreferrer">
            toletglobe.in ↗
          </a>
        </p>
      </CaseHeader>

      <CaseBody>
        {/* 2. Problem */}
        <CaseSection id="problem" eyebrow="Problem" title="A marketplace whose whole value is removing the middleman">
          <div className="prose">
            <p>
              To-Let Globe exists to cut brokerage out of renting. In the Indian rental
              market a broker typically stands between an owner with a vacant property and
              a tenant looking for one, and charges both. The platform&rsquo;s premise is
              simple: let the two contact each other directly, at zero brokerage.
            </p>
            <p>
              That premise creates a specific design obligation. If the product looks like
              every other listings portal, the thing that makes it worth using is invisible.
              A visitor has no reason to believe this one is different. The redesign had
              to make the promise legible before anything else, and then get out of the way
              so people could find a property.
            </p>
            <p>
              The second constraint is coverage. The platform operates in particular cities,
              not nationally: Kota, Lucknow, Ayodhya and Vellore. An interface that
              invites an open-ended search will mostly return nothing, and an empty result
              set on a first visit is very hard to recover from.
            </p>
          </div>
        </CaseSection>

        {/* 3. Process */}
        <CaseSection id="process" eyebrow="Process" title="Redesign, prototype, hand off">
          <div className="prose">
            <p>
              The work ran in Figma: wireframes to establish information hierarchy and
              navigation, then high-fidelity mockups, then interactive prototypes and
              micro-interaction concepts for stakeholder review. Designs were iterated from
              that feedback rather than presented once.
            </p>
            <p>
              Because the site was live and being built by a separate development team, the
              output had to be handoff-shaped: reusable interface patterns rather than
              one-off screens, and interface decisions documented well enough that a
              developer could implement them without a meeting. Usability and
              visual-consistency issues were raised during design review, where they are
              cheap, instead of after build.
            </p>
          </div>
        </CaseSection>

        {/* 4. Key decisions */}
        <CaseSection id="decisions" eyebrow="Key decisions" title="Four decisions that shape the entry">
          <Decision n={1} title="Lead with the promise, not the search box">
            <p>
              The first thing on the page states the offer in plain terms: no brokerage,
              across PGs, flats, houses and offices. A search field first would have been
              the conventional choice, but it asks the visitor to already trust the
              platform. Stating the differentiator first earns the search.
            </p>
            <Figure
              assetKey="tolet-home"
              label="Landing"
              caption="The no-brokerage promise sits above the fold, with city entry immediately beneath it."
            />
          </Decision>

          <Decision n={2} title="City first, because coverage is finite">
            <p>
              Entry is gated through a city selector rather than an open search. It looks
              like friction and is actually the opposite: it keeps a visitor inside the
              cities the platform actually serves, so the first result set is never empty.
              A user who searches a city with no inventory concludes the product is broken,
              not that the coverage is limited.
            </p>
          </Decision>

          <Decision n={3} title="Six property types, weighted equally">
            <p>
              Paying guest, flat, house, shop, office and warehouse each get an identical
              card. The platform is not only residential, and burying commercial space in a
              filter would have hidden a whole side of the business. Equal weighting also
              means the grid does not need reordering as demand shifts between categories.
            </p>
            <Figure
              assetKey="tolet-services"
              label="Property types"
              caption="Six categories as peers rather than a residential-first list with commercial tucked into a dropdown."
            />
          </Decision>

          <Decision n={4} title="Direct contact is the payoff, so it stays visible">
            <p>
              The listing view puts owner contact in reach rather than behind an enquiry
              gate. Every intermediate step between finding a property and reaching its
              owner reintroduces the friction the platform exists to remove.
            </p>
            <Figure
              assetKey="tolet-listing"
              label="Listing"
              caption="Owner contact presented directly, delivering the product promise at the point it matters."
            />
          </Decision>

          <Figure
            assetKey="tolet-mobile"
            label="Mobile"
            caption="Responsive structure: the property grid collapses to a single column and city entry stays at the top."
          />
        </CaseSection>

        {/* 6. Outcomes */}
        <CaseSection id="outcomes" eyebrow="Outcomes" title="What this achieved">
          <div className="prose">
            <p>
              <strong>It shipped.</strong> The redesign went to a separate development team
              and went live at toletglobe.in, serving Kota, Lucknow, Ayodhya and Vellore
              across six property categories. That is the outcome worth claiming: design
              that survived handoff and ran in production, rather than a concept deck.
            </p>
            <p>
              The structural result is that the platform&rsquo;s differentiator is the first
              thing a visitor reads. Everything after that (city entry, category cards,
              direct contact) is arranged to deliver on it rather than to look busy.
            </p>
          </div>
          <div className="callout">
            <h3>A note on the current state of the site</h3>
            <p>
              The screenshots on this page were captured from the live site in September
              2026, so what is shown is the product as it runs now rather than a Figma
              mock-up. That also means it has moved on since handoff: the build is the
              development team&rsquo;s, and not every decision described here survived
              contact with it unchanged.
            </p>
            <p>
              Property owners&rsquo; names appear against every listing on the live site.
              They are real people, so those names are blurred in the listing screenshot
              below.
            </p>
          </div>
        </CaseSection>

        {/* 7. Reflection */}
        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
          <div className="prose">
            <p>
              <strong>No measurement.</strong> This is a live commercial product, and the
              obvious question, whether the redesign changed enquiry rate, bounce or
              time-to-first-contact, is unanswered here. Without that, the argument for
              each decision is reasoning, not evidence.
            </p>
            <p>
              <strong>Trust is under-designed.</strong> A zero-brokerage marketplace lives or
              dies on whether listings are real. Verification, reporting and dispute handling
              are exactly where a direct-contact model is most fragile, and they are the
              least developed part of this work.
            </p>
            <p>
              <strong>Next.</strong> Instrument the funnel from city selection to owner
              contact, usability-test the listing view with first-time renters, and design
              the verification and reporting states that make direct contact safe.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section wrap">
        <PrevNext slug="tolet-globe" />
      </div>
    </>
  )
}
