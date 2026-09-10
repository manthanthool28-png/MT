import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import Figure from '../../components/Figure.jsx'
import ShotChartHero from '../../components/ShotChartLazy.jsx'
import { bySlug } from '../../data/projects.js'
import { site } from '../../data/site.js'

const project = bySlug('court-vision-3d')

export default function CourtVision3D() {
  useReveal()
  return (
    <>
      {/* 1. Header band */}
      <CaseHeader project={project}>
        <ShotChartHero />
      </CaseHeader>

      <CaseBody>
        {/* 2. Problem / context */}
        <CaseSection id="problem" eyebrow="Problem" title="A chart experts can read and nobody else can">
          <div className="prose">
            <p>
              The 2D shot chart is the standard way basketball shooting is visualised, and
              it is very good at what it does, provided you already know what you are
              looking at. It encodes two variables in colour alone: how often a player
              shoots from a spot, and how well. A reader has to hold a legend in memory,
              map a colour ramp back to a percentage, and do that across a hundred cells
              at once before any pattern emerges.
            </p>
            <p>
              For a non-expert that is a lot of work for very little payoff. In informal
              observation the failure was consistent: people could describe the picture
              (“lots of red near the basket”) but could not answer questions the picture
              was supposedly designed to answer, like where a player is <strong>most
              efficient</strong> versus where they simply shoot <strong>most often</strong>.
              Volume and efficiency were competing for the same visual channel.
            </p>
            <p>
              Court Vision 3D asks whether adding a spatial dimension separates those two
              variables cleanly enough for a novice to read them at a glance, and whether
              it does so without imposing the cognitive cost that 3D visualisation is
              usually, and often fairly, accused of.
            </p>
          </div>
        </CaseSection>

        {/* 3. Process / research */}
        <CaseSection id="research" eyebrow="Process" title="Research through Design, in two phases">
          <div className="prose">
            <p>
              The prototype is the research instrument, not an illustration of it. It was
              built to be measurable: every design decision below exists because a
              research question needed it to be testable against a 2D baseline built from
              the same dataset: Luka Dončić’s 2024–25 NBA season, <strong>1,025
              shots</strong>.
            </p>
          </div>

          <ul className="rq-list">
            <li>
              <b>RQ1 · Cognitive load</b>
              <p>
                Does a 3D shot chart reduce or increase the cognitive load of reading
                spatial shooting data compared with the 2D standard, measured with
                NASA-TLX alongside timed task accuracy?
              </p>
            </li>
            <li>
              <b>RQ2 · Interaction principles</b>
              <p>
                Which interaction design principles allow a novice user to explore a 3D
                data space without becoming disoriented or lost in the camera?
              </p>
            </li>
            <li>
              <b>RQ3 · Engagement</b>
              <p>
                Does the 3D presentation increase engagement with the data relative to
                the 2D chart, and does any gain survive beyond first-encounter novelty?
              </p>
            </li>
          </ul>

          <div className="prose" style={{ marginTop: '2rem' }}>
            <p>
              <strong>Phase 1</strong> was formative. Participants worked through the
              early prototype in a think-aloud session, and the interaction problems
              surfaced there, not the visual ones, set the agenda for the build.
              Disorientation under free camera movement and the sheer density of a
              full-season shot field were the two that mattered.
            </p>
            <p>
              <strong>Phase 2</strong> was the comparative evaluation: the same
              participants completed matched interpretation tasks against both the 3D
              prototype and the 2D baseline, with NASA-TLX administered after each
              condition and task accuracy and completion time recorded throughout.
              Presentation order was counterbalanced so that learning effects did not
              accrue to whichever chart came second.
            </p>
          </div>

          <Figure
            assetKey="cv-2d-baseline"
            label="The comparison condition"
            caption="The flat 2D panel, built from the same 1,025-shot dataset so the only variable between conditions was the presentation. It ships inside the prototype, which means a participant can be moved between conditions without changing tools."
          />
        </CaseSection>

        {/* 4. Key decisions */}
        <CaseSection id="decisions" eyebrow="Key decisions" title="Five decisions that carry the design">
          <div className="prose">
            <p>
              Each of these was made to answer a specific problem observed in testing, and
              each one is the reason a particular task became answerable.
            </p>
          </div>

          <Decision n={1} title="Spike height encodes eFG%, freeing colour for something else">
            <p>
              The core move. Effective field goal percentage is mapped to the height of a
              vertical spike rising from each court location, which means efficiency is
              read by silhouette rather than by decoding a colour ramp. “Where is he most
              efficient?” becomes a question about which spikes are tallest, answerable
              from the shape of the skyline without consulting a legend.
              Crucially it also frees the colour channel entirely, so volume and
              efficiency stop competing for one visual variable.
            </p>
            <Figure
              assetKey="cv-decision-spike"
              label="Height = eFG%"
              caption="The courtside camera in the live build, where the encoding is at its most legible: efficiency reads as a skyline. The panel states the mapping in words too, taller spikes mean more efficient, so the encoding never depends on the reader inferring it."
            />
          </Decision>

          <Decision n={2} title="Colour stays categorical, never a ramp">
            <p>
              With height carrying efficiency, colour was freed for a categorical job. In the
              shipped build the default is outcome: green for made, red for missed, two
              values and nothing to interpolate by eye. Alternative modes recolour by shot
              type, by quarter, or by team, and every one of them is a small set of discrete
              categories rather than a continuous scale.
            </p>
            <p>
              That is the actual decision, and it is the opposite of what the 2D standard
              does. A hexbin chart asks the reader to map a twelve-step gradient back to a
              percentage, which is a judgement people make badly. A two-way or four-way
              categorical judgement is one they make reliably. Precision was moved out of
              colour entirely and into the panel and the tooltip, which state the numbers
              outright.
            </p>
            <Figure
              assetKey="cv-decision-colour"
              label="Made and missed"
              caption="The default broadcast view. Colour separates outcome, height carries efficiency, and thickness carries volume, so the three variables that competed for one channel in 2D each have their own."
            />
          </Decision>

          <Decision n={3} title="Orbital camera, constrained on purpose">
            <p>
              Phase 1 was blunt about this: free-flight camera control lost people
              immediately. Participants would tumble the view, lose the basket, and have
              no way back. The camera was rebuilt as a constrained orbit. It rotates
              around a fixed point on the court, elevation is clamped so the view never
              goes under the floor or fully overhead, and the court never leaves frame.
              Occlusion is the real reason a camera is needed at all: tall spikes hide
              short ones, and a small orbit resolves that far more directly than any
              transparency scheme.
            </p>
            <Figure
              assetKey="cv-decision-camera"
              label="Why the camera exists"
              caption="The top-down preset, which is very nearly the 2D chart again: seen from directly overhead the spikes collapse into dots and the height encoding vanishes. Rotating away from this view is what makes the third dimension do any work, and it is the clearest argument for giving the camera to the reader."
            />
          </Decision>

          <Decision n={4} title="Progressive disclosure through zone filter pills">
            <p>
              A full season rendered at once is a thicket. Rather than reduce the data,
              the interface reduces what is asked of the viewer at any moment: three
              pills (Paint, Mid, 3PT) toggle whole zones in and out. It splits one
              overwhelming question into three answerable ones, and the act of toggling
              teaches the court’s zone structure to viewers who did not already know it.
              The filters animate rather than cut, so that spikes disappearing reads as
              the same dataset being filtered rather than a new chart being loaded.
            </p>
            <Figure
              assetKey="cv-decision-zones"
              label="Zone filters"
              caption="With only the 3PT zone active, the corner-three efficiency spike separates cleanly from the arc, a comparison that is genuinely hard to make in the full view."
            />
          </Decision>

          <Decision n={5} title="Tooltips carry the precision the encoding deliberately drops">
            <p>
              Height and colour are for pattern-finding, not for reading exact values off
              an axis. That is a known weakness of 3D, and arguing otherwise would be
              dishonest. So precision moves into a hover tooltip: zone, distance,
              attempts and exact eFG% for the spike under the cursor. The visual encoding
              answers “where should I look”, the tooltip answers “what exactly is this”,
              and neither is asked to do the other’s job.
            </p>
            <p className="tech">
              Figure pending: the tooltip needs a live hover, which the automated capture
              could not trigger. Try it in the embedded prototype below.
            </p>
          </Decision>
        </CaseSection>

        {/* 5. Live demo */}
        <CaseSection id="demo" eyebrow="Live prototype" title="Try the full build">
          <Figure
            assetKey="cv-aboverim"
            label="The tool"
            caption="A full season loaded: 1,025 shots as spikes, filters and season stats on the left, camera presets on the right. This is the view the study put in front of participants."
          />

          <div className="prose">
            <p>
              The complete prototype runs in the browser with the full 1,025-shot season.
              Drag to orbit, use the zone pills to filter, and hover any spike for exact
              figures.
            </p>
          </div>
          <div className="embed" style={{ marginTop: '1.75rem' }}>
            <iframe
              src={site.livePrototype}
              title="Court Vision 3D live interactive prototype"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
          <p style={{ marginTop: '0.85rem' }}>
            <a className="btn btn--ghost" href={site.livePrototype} target="_blank" rel="noreferrer noopener">
              Open the prototype in a new tab ↗
            </a>
          </p>
        </CaseSection>

        {/* 6. Outcomes */}
        <CaseSection id="outcomes" eyebrow="Outcomes" title="What the evaluation measured">
          <div className="prose">
            <p>
              Phase 2 compared the 3D prototype against the 2D baseline across four
              measures. The instruments and the comparison design are fixed; the figures
              below are being transferred from the final thesis results.
            </p>
          </div>

          <div className="stats">
            <div className="stat">
              <p className="stat__value">—</p>
              <p className="stat__label">NASA-TLX overall workload, 3D vs 2D (RQ1)</p>
            </div>
            <div className="stat">
              <p className="stat__value">—</p>
              <p className="stat__label">Task accuracy on matched interpretation tasks</p>
            </div>
            <div className="stat">
              <p className="stat__value">—</p>
              <p className="stat__label">Mean time to answer per task</p>
            </div>
            <div className="stat">
              <p className="stat__value">—</p>
              <p className="stat__label">Self-reported engagement, 3D vs 2D (RQ3)</p>
            </div>
          </div>

          <span className="ph-note">
            Content pending: insert the final NASA-TLX, accuracy, timing and engagement
            figures from the thesis results chapter
          </span>

          <div className="callout">
            <h3>What already holds without the numbers</h3>
            <p>
              The qualitative pattern from think-aloud was consistent and is worth stating
              on its own terms: participants using the 3D chart reached for spatial
              language (“this whole area is dead”, “the corners are his best spot”),
              while the same participants reading the 2D chart tended to read values back
              cell by cell. Separating volume from efficiency changed the kind of question
              people asked of the data, not only how quickly they answered it.
            </p>
          </div>
        </CaseSection>

        {/* 7. Reflection */}
        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
          <div className="prose">
            <p>
              <strong>The sample is small and academic.</strong> A study of this size
              supports a direction, not a claim about basketball audiences generally.
              Participants were also recruited from a university population, which is not
              the non-expert sports audience the design ultimately targets.
            </p>
            <p>
              <strong>3D remains the wrong tool for exact comparison.</strong> Reading two
              similar spike heights against each other is harder than reading two numbers,
              and the tooltip is a mitigation rather than a solution. If the task is
              precise comparison, a table beats both charts, and the design should not
              pretend otherwise.
            </p>
            <p>
              <strong>Single-player scope.</strong> The prototype is built around one
              player’s season. Multi-player comparison introduces a genuinely harder
              spatial problem: two overlapping spike fields occlude each other in ways
              one field does not. That view is the least resolved part of the build.
            </p>
            <p>
              <strong>A known edge case.</strong> An edge case was identified during
              testing under a specific filter combination (Compare Players view with the
              Made-shots-only filter applied to the 3PT zone), which is flagged for
              resolution before further public demonstration.
            </p>
            <p>
              <strong>Next.</strong> Rebuild the comparison view around a side-by-side
              court pair rather than overlaid fields, retest with a recruited non-expert
              audience outside the university, and add a guided first-run sequence so the
              zone filters are discovered rather than explained.
            </p>
          </div>
        </CaseSection>
      </CaseBody>


      <div className="section section--tight">
        <PrevNext slug="court-vision-3d" />
      </div>
    </>
  )
}
