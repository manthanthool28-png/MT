import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import { Counter, Motes, ScrollFilm, SplitHeading } from '../../components/Cinema.jsx'
import Figure from '../../components/Figure.jsx'
import Embedder from '../../components/Embedder.jsx'
import { bySlug } from '../../data/projects.js'

const project = bySlug('tolet-globe')

/* The session token from the share link (&t=…) is stripped: it identifies the
   share session rather than the file, and the prototype loads without it. */
const PROTOTYPE =
  'https://embed.figma.com/proto/AFR1ajWllBGsFrsRQD6c2S/To-Let-homepage' +
  '?node-id=1145-4388&page-id=0%3A1&starting-point-node-id=1145%3A4388&embed-host=share'

/* The act, in the project's own words: every line below is a sentence from
   the study cut to length, and every number is one the study already states. */
const BEATS = [
  {
    key: 'tolet-hero-after',
    kicker: 'Decision 01',
    line: 'Lead with the promise, not the search box.',
  },
  {
    key: 'tolet-cities',
    kicker: 'Decision 02',
    line: 'City first, because coverage is finite.',
  },
  {
    key: 'tolet-services',
    kicker: 'Decision 03',
    line: 'Six property types, weighted equally.',
  },
  {
    key: 'tolet-listing',
    kicker: 'Decision 04',
    line: 'Put the owner on the card.',
  },
]

export default function ToLetGlobe() {
  useReveal()
  return (
    <>
      <CaseHeader project={project}>
        <Embedder url={PROTOTYPE} title="To-Let Globe home page prototype" />
        <p className="tech" style={{ marginTop: '1rem' }}>
          <a href="https://www.toletglobe.in/" target="_blank" rel="noopener noreferrer">
            toletglobe.in ↗
          </a>
        </p>
      </CaseHeader>

      <section className="cine" aria-labelledby="cine-h">
        <div className="wrap cine__intro">
          <Motes glyph="pin" />
          <div className="cine__say">
            <p className="eyebrow">The entry in four frames</p>
            <SplitHeading id="cine-h" text="Let the two contact each other directly, at zero brokerage." />
            <p className="cine__lede">
              A broker stands between an owner with a vacant property and a tenant looking for
              one, and charges both. If the product looks like every other listings portal, the
              thing that makes it worth using is invisible.
            </p>
          </div>
        </div>

        <ScrollFilm beats={BEATS} label="To-Let Globe, the entry in four frames" />

        <div className="wrap cine__facts">
          <div className="facts">
            <Counter value={22} label="Designers on the team I led" />
            <Counter value={6} label="Property types, weighted equally" />
            <Counter value={0} label="Brokerage · the whole premise" />
            <Counter value={4} label="Decisions that shape the entry" />
          </div>
        </div>
      </section>

      <CaseBody>
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
              A visitor has no reason to believe this one is different. The interface had to
              make the promise legible before anything else, and then get out of the way so
              people could find a property.
            </p>
            <p>
              The second constraint is coverage. The platform operates in particular cities,
              not nationally: Kota, Lucknow, Ayodhya and Vellore. An interface that invites
              an open-ended search will mostly return nothing, and an empty result set on a
              first visit is very hard to recover from.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="process" eyebrow="Process" title="A contract engagement, run close to the founder">
          <div className="prose">
            <p>
              This was contract work for the startup rather than an in-house brief handed
              over finished. The <strong>CEO worked directly with me</strong> on how the
              business actually operates, where the revenue is meant to come from, and what
              design could and could not do about it. Some of the most useful input was not
              design input at all: it was being walked through the business model before
              being asked to draw anything.
            </p>
            <p>
              That framing set the starting point as a competitive read rather than a blank
              canvas. We went through the established Indian property portals —{' '}
              <strong>99acres and similar sites</strong> — and looked at how they handle
              entry, search, category structure and, above all, the point at which they put
              a broker or an enquiry gate between the two parties. That last pattern is the
              one To-Let Globe exists to break, so it needed to be understood before it
              could be designed against.
            </p>
            <p>
              From there the work ran in Figma: information hierarchy and navigation first,
              then high-fidelity screens, then an interactive prototype with the
              micro-interactions attached, so review could happen on something clickable
              instead of a flat board. Because a separate development team built it, the
              output had to be handoff-shaped — reusable patterns rather than one-off
              screens, and interface decisions documented well enough to be implemented
              without a meeting.
            </p>
            <p>
              <strong>I led a design team of 22 on it.</strong> Multiple designers produced
              multiple versions of the same pages; a large part of my job was reviewing that
              output, giving critique that was specific enough to act on, and deciding which
              direction went forward. The mobile About page below is a team member&rsquo;s
              work rather than mine, included because the team is a real part of what this
              project was.
            </p>
          </div>

          <Figure
            assetKey="tolet-overview"
            label="The flow"
            caption="Every page of the design in order: the two hero states, services, about, hiring partners, top locations, the statistics band, partnered universities, testimonials and contact."
          />
        </CaseSection>

        <CaseSection id="decisions" eyebrow="Key decisions" title="Four decisions that shape the entry">
          <Decision n={1} title="Lead with the promise, not the search box">
            <p>
              The first thing on the page states the offer in plain terms: no brokerage,
              across PGs, flats, houses and offices. A search field first would have been
              the conventional choice — it is what the portals we looked at do — but it asks
              the visitor to already trust the platform. Stating the differentiator first
              earns the search.
            </p>
            <p>
              The hero animates into place rather than arriving whole, and the search field
              is the last thing to appear. The sequence is the argument: the claim lands
              before the tool for acting on it.
            </p>
            <div className="figure-row">
              <Figure
                assetKey="tolet-hero-before"
                label="At rest"
                caption="The headline and strapline land first, with the illustration still in fragments."
              />
              <Figure
                assetKey="tolet-hero-after"
                label="Settled"
                caption="The fragments assemble into the house-in-hand, and only then does the search field appear."
              />
            </div>
          </Decision>

          <Decision n={2} title="City first, because coverage is finite">
            <p>
              Entry is gated through a city selector rather than an open search. It looks
              like friction and is actually the opposite: it keeps a visitor inside the
              cities the platform actually serves, so the first result set is never empty. A
              user who searches a city with no inventory concludes the product is broken,
              not that the coverage is limited.
            </p>
            <p>
              Each city then gets a page of its own, led by a photograph of a landmark
              people will recognise. National portals treat a city as a filter value; here
              it is a place, which is the right unit when your inventory is four cities deep
              rather than four hundred.
            </p>
            <Figure
              assetKey="tolet-cities"
              label="City pages"
              caption="Lucknow, Ayodhya, Vellore and Kota, each with its own entry point rather than being options in a dropdown."
            />
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

          <Decision n={4} title="Put the owner on the card">
            <p>
              Every listing card carries the owner directly on it, alongside the
              photographs, price and room specification. On the portals we looked at, that
              slot holds an agent or an enquiry form. Here it holds the person you are
              actually renting from, because every intermediate step between finding a
              property and reaching its owner reintroduces the friction the platform exists
              to remove.
            </p>
            <Figure
              assetKey="tolet-listing"
              label="Listing"
              caption="A three-column grid with the owner shown on each card, and the filter and view-mode controls kept above the results rather than in a sidebar."
            />
          </Decision>

          <div className="figure-row" style={{ marginTop: '2rem' }}>
            <Figure
              assetKey="tolet-about"
              label="About and contact"
              caption="Who we are, vision and mission in alternating rows, then testimonials, then contact."
            />
            <Figure
              assetKey="tolet-mobile"
              label="Mobile, by the team"
              caption="A team member's mobile About page. The body copy is still placeholder text, which is what an in-progress page from a 22-person team looks like."
            />
          </div>
        </CaseSection>

        <CaseSection id="outcomes" eyebrow="Outcomes" title="What this achieved">
          <div className="prose">
            <p>
              <strong>It shipped, and it is running.</strong> The design went to a separate
              development team and is live at toletglobe.in, serving Kota, Lucknow, Ayodhya
              and Vellore across six property categories. That is the outcome worth
              claiming: design that survived handoff and runs in production, rather than a
              concept deck.
            </p>
            <p>
              The structural result is that the platform&rsquo;s differentiator is the first
              thing a visitor reads. Everything after that — city entry, category cards,
              owner on the card — is arranged to deliver on it rather than to look busy.
            </p>
          </div>

          <div className="figure-row" style={{ marginTop: '1.5rem' }}>
            <Figure
              assetKey="tolet-live-home"
              label="Shipped: home"
              caption="The live site in September 2026. The hero came through the build close to the design."
            />
            <Figure
              assetKey="tolet-live-listing"
              label="Shipped: listing"
              caption="The live listing with real inventory. Owner names are blurred here because they belong to real people; on the live site they are shown in full."
            />
          </div>

          <div className="callout">
            <h3>Design against build</h3>
            <p>
              The two shots above are the current production site, not the Figma file, so
              the gap is visible: the shipped listing card drops the photo carousel and the
              owner avatar, and its filter bar sits above a map rather than beside view-mode
              controls. Some of that is the development team&rsquo;s call and some of it is
              inventory the design assumed and the platform does not yet have.
            </p>
            <p>
              One thing worth flagging as an operational rather than design issue: the map
              on the live listing page currently returns a Google Maps billing error for
              every visitor.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
          <div className="prose">
            <p>
              <strong>The competitive read was qualitative.</strong> Going through 99acres
              and its peers with the CEO was the right way to start, but it was a structured
              look rather than a documented audit with a rubric. The conclusions held up;
              the working would not survive being asked to show it.
            </p>
            <p>
              <strong>No usability testing.</strong> The city-first entry is a reasoned bet
              that a constrained start beats an empty result set, and it has never been put
              in front of a first-time visitor to check. It is the decision on this project
              I would most want evidence for, because it is the one that deliberately adds a
              step.
            </p>
            <p>
              <strong>Leading 22 people was the harder skill.</strong> The design problems
              here were tractable. Keeping a large team producing consistent work, giving
              critique that people could act on, and choosing between competing versions
              without stalling — that was the part I was least prepared for and learned the
              most from.
            </p>
            <p>
              <strong>Next.</strong> Usability testing on the city-first entry, a written
              audit behind the competitive read, and a component inventory shared with the
              development team so the gap between the design and the build closes on
              purpose rather than by inspection.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section section--tight">
        <PrevNext slug="tolet-globe" />
      </div>
    </>
  )
}
