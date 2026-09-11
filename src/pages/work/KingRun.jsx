import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import { Counter, Motes, ScrollFilm, SplitHeading } from '../../components/Cinema.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import KingRunReport from '../../components/KingRunReport.jsx'
import Figure from '../../components/Figure.jsx'
import { bySlug } from '../../data/projects.js'
import { asset } from '../../data/assets.js'

const project = bySlug('king-run')

/* The act, in the project's own words: every line below is a sentence from
   the study cut to length, and every number is one the study already states. */
const BEATS = [
  {
    key: 'kingrun-physics',
    kicker: 'Decision 01',
    line: 'Rigidbody physics instead of moving the transform.',
  },
  {
    key: 'kingrun-hero',
    kicker: 'Decision 02',
    line: 'Lane clamping, so the runner cannot fall off its own level.',
  },
  {
    key: 'kingrun-arch',
    kicker: 'Decision 03',
    line: 'The player never calculates the score.',
  },
  {
    key: 'kingrun-level',
    kicker: 'Decision 04',
    line: 'Procedural chunks with calculated Z-offsets.',
  },
]

export default function KingRun() {
  const [report, setReport] = useState(false)
  useReveal()
  const hero = asset('kingrun-hero')

  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'violet'
    else delete document.documentElement.dataset.report
    return () => {
      delete document.documentElement.dataset.report
    }
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
          <KingRunReport />
          <div className="section wrap">
            <PrevNext slug="king-run" />
          </div>
        </>
      ) : (
      <>
      <CaseHeader project={project}>
        {project.video ? (
          <div className="embedder">
            <iframe
              src={project.video}
              title="King Run gameplay"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="thumb" style={{ aspectRatio: '16 / 10' }}>
            <img src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} decoding="async" />
          </div>
        )}
      </CaseHeader>

      <section className="cine" aria-labelledby="cine-h">
        <div className="wrap cine__intro">
          <Motes glyph="chevron" />
          <div className="cine__say">
            <p className="eyebrow">The build in four frames</p>
            <SplitHeading id="cine-h" text="Swapping the input for head tracking should be one component, not a rewrite." />
            <p className="cine__lede">
              An endless runner is a solved genre; the reason to build it was what comes after. A
              headset build was not the deliverable, so the question became architectural, which
              is why almost every decision is about separation rather than gameplay.
            </p>
          </div>
        </div>

        <ScrollFilm beats={BEATS} label="King Run, the build in four frames" />

        <div className="wrap cine__facts">
          <div className="facts">
            <Counter value={60} label="FPS held with physics and generation running together" />
            <Counter value={3} label="Lanes, clamped, ready to be driven by lean" />
            <Counter value={1} label="Component to swap for head tracking" />
            <Counter value={4} label="Decisions that keep the door open" />
          </div>
        </div>
      </section>

      <CaseBody>
        <CaseSection id="problem" eyebrow="Problem" title="Build the game you can afford to rebuild as VR">
          <div className="prose">
            <p>
              King Run is an endless runner: a monarch runs a procedurally generated castle
              pathway, dodging obstacles and collecting coins for as long as they survive.
              As a game that is a solved genre. The reason to build it was what comes after.
            </p>
            <p>
              The brief was VR and AR design, and the honest constraint was that a headset
              build was not the deliverable. So the question became architectural: how do you
              write a keyboard-driven runner so that swapping the input for head tracking is
              a change of one component rather than a rewrite? That is what the work was
              really testing, and it is the reason almost every decision below is about
              separation rather than about gameplay.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="decisions" eyebrow="Key decisions" title="Four decisions that keep the door open">
          <Decision n={1} title="Rigidbody physics instead of moving the transform">
            <p>
              The easy implementation of a runner is to add to the transform every frame. It
              works, and it feels wrong: nothing has weight, and collisions have to be faked.
              Movement runs through Rigidbody physics instead, which costs tuning time but
              gives the tight, responsive feel the genre depends on and makes collisions real
              rather than scripted.
            </p>
            <p>
              That created its own problem. Lane changes slid, because nothing was stopping
              the body once it was moving. Custom Physics Materials on the floor and player
              colliders fixed it by managing friction directly, rather than by damping the
              input and making the controls feel mushy.
            </p>
            <Figure
              assetKey="kingrun-physics"
              label="Movement and rigidbody"
              caption="Move speed and lane clamp exposed in the inspector, with the rigidbody and capsule collider that make the physics behave."
            />
          </Decision>

          <Decision n={2} title="Lane clamping, so the runner cannot fall off its own level">
            <p>
              Three lanes: left, centre, right. Position is clamped on a Vector3 so the player
              is physically restricted to the playable width and cannot walk off the edge of
              the path. This is the piece that makes the VR plan viable. A clamped
              three-position system does not care whether the input is a key press or a
              measured lean; only the thing feeding it changes.
            </p>
            <Figure
              assetKey="kingrun-hero"
              label="Three-lane layout"
              caption="Coins and obstacles distributed across the three lanes, which is the entire interaction surface of the game."
            />
          </Decision>

          <Decision n={3} title="The player never calculates the score">
            <p>
              Collision detection is tag-based through OnCollisionEnter. Objects tagged Coin
              trigger collection, Obstacle and Fence trigger damage. The important part is
              what the player does next, which is nothing: it notifies the GameManager that
              an event happened and lets the manager decide what that is worth.
            </p>
            <p>
              PlayerCollision finds the GameManager through FindFirstObjectByType rather than
              holding a hard reference, so player logic and game state stay decoupled. It is
              the same instinct as the role-conditional work in the CSIS Portal: keep the
              thing that detects separate from the thing that decides.
            </p>
            <Figure
              assetKey="kingrun-arch"
              label="Scene hierarchy"
              caption="LevelGen, Obstacle Spawner, ChunkParent, Player and GameManager as separate objects. The separation in the hierarchy is the separation in the code."
            />
          </Decision>

          <Decision n={4} title="Procedural chunks with calculated Z-offsets">
            <p>
              The pathway is built from chunks instantiated ahead of the player, with the
              Z-offset calculated so each one aligns seamlessly with the last, and an
              ObstacleSpawner using weighted randomisation so obstacle intervals vary instead
              of falling into a readable rhythm.
            </p>
            <Figure
              assetKey="kingrun-level"
              label="Chunk generation"
              caption="A generated section of pathway. Chunks align on the Z axis so the seam between them is invisible in play."
            />
          </Decision>
        </CaseSection>

        <CaseSection id="outcomes" eyebrow="Outcomes" title="What it runs at, and what it taught">
          <div className="stats">
            <div className="stat">
              <p className="stat__value">60</p>
              <p className="stat__label">FPS held with rigidbody physics and procedural generation running together</p>
            </div>
            <div className="stat">
              <p className="stat__value">3</p>
              <p className="stat__label">Lanes, clamped, ready to be driven by lean instead of keys</p>
            </div>
            <div className="stat">
              <p className="stat__value">Unity 6</p>
              <p className="stat__label">Built on the current engine with the new Input System</p>
            </div>
          </div>

          <div className="callout">
            <h3>The animation bug worth recording</h3>
            <p>
              The Stumble animation used Root Motion, which drifted the character forward and
              out of camera view: the animation was moving the body while physics thought it
              was in charge. Disabling Root Motion and baking the Z-axis position handed
              movement back to the physics system. Two systems both believing they own
              position is a bug I now look for first.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
          <div className="prose">
            <p>
              <strong>The VR claim is architectural, not demonstrated.</strong> The systems
              are separated so head tracking can replace keyboard input, but no headset build
              exists. Until one does, this is a well-structured 2D-input game with a credible
              plan, and it should be read that way.
            </p>
            <p>
              <strong>Memory management is designed, not implemented.</strong> Chunks spawn
              ahead of the player but are not yet pooled or destroyed behind it, so a long run
              accumulates overhead. Object pooling is the next piece of work, and it is
              required before any headset build, where the frame budget is far less forgiving.
            </p>
            <p>
              <strong>Nobody has played it but me.</strong> There is no data on whether the
              difficulty curve works or whether the weighted obstacle spacing actually reads
              as fair. For a game whose entire premise is testing reflexes, that is the
              obvious gap.
            </p>
            <p>
              <strong>Next.</strong> Object pooling, an AR Foundation build projecting the
              track onto a real surface, and lane changes driven by leaning rather than keys.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section wrap">
        <PrevNext slug="king-run" />
      </div>
      </>
      )}
    </>
  )
}
