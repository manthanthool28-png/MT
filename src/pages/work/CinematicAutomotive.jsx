import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import { Counter, Motes, ScrollFilm, SplitHeading } from '../../components/Cinema.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import CorvetteReport from '../../components/CorvetteReport.jsx'
import Figure from '../../components/Figure.jsx'
import { bySlug } from '../../data/projects.js'

const project = bySlug('cinematic-automotive')

/* The act, in the project's own words: every line below is a sentence from
   the study cut to length, and every number is one the study already states. */
const BEATS = [
  {
    key: 'corvette-hero',
    kicker: 'The target',
    line: 'A beauty shot, not a technical exercise.',
  },
  {
    key: 'corvette-lighting',
    kicker: 'Decision 01',
    line: 'A mechanical rig, so animation is driven, not hand-placed.',
  },
  {
    key: 'corvette-set',
    kicker: 'Decision 03',
    line: 'Light the room, not the car.',
  },
  {
    key: 'corvette-render',
    kicker: 'Outcome',
    line: 'The render budget was the real lesson.',
  },
]

export default function CinematicAutomotive() {
  const [report, setReport] = useState(false)
  useReveal()

  /* The report theme is set on <html> so the whole page carries it, and it is
     removed on unmount so navigating away never leaves the site recoloured. */
  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'navy'
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
          <CorvetteReport />
          <div className="section wrap">
            <PrevNext slug="cinematic-automotive" />
          </div>
        </>
      ) : (
      <>
      <CaseHeader project={project}>
        <div className="embedder">
          <iframe
            src={project.video}
            title="Cinematic automotive animation"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CaseHeader>

      <section className="cine" aria-labelledby="cine-h">
        <div className="wrap cine__intro">
          <Motes glyph="wheel" />
          <div className="cine__say">
            <p className="eyebrow">The shot in four frames</p>
            <SplitHeading id="cine-h" text="Everyone has seen the real thing and knows instantly when it is off." />
            <p className="cine__lede">
              A car commercial beauty shot: high contrast, moody, with light flowing along the
              panels as the camera moves. The geometry was licensed rather than modelled, which
              bought the time to do the rigging, shading, lighting and render optimisation
              properly. Every decision after that is mine.
            </p>
          </div>
        </div>

        <ScrollFilm beats={BEATS} label="Cinematic automotive animation, the shot in four frames" />

        <div className="wrap cine__facts">
          <div className="facts">
            <Counter value={175} label="Frames at 24fps · 13 seconds at 1920×1080" />
            <Counter value={3} label="Paint layers, because real paint has three" />
            <Counter value={3.6} decimals={1} label="Hours · the whole render, in one session" />
            <Counter value={1} label="Minute per frame after optimisation, down from five to eight" />
          </div>
        </div>
      </section>

      <CaseBody>
        <CaseSection id="problem" eyebrow="Problem" title="A beauty shot, not a technical exercise">
          <div className="prose">
            <p>
              The brief was a full animation pipeline rather than another static render. I
              set the target as a car commercial beauty shot: high contrast, moody, with
              light flowing along the panels as the camera moves. That is a specific and
              unforgiving reference, because everyone has seen the real thing and knows
              instantly when it is off.
            </p>
            <p>
              <strong>The car model was licensed from CGTrader rather than modelled.</strong>{' '}
              That was deliberate. Modelling a vehicle to that standard would have consumed
              the whole project and taught me the one skill the work was not about.
              Buying the asset bought the time to do the rigging, shading, lighting and
              render optimisation properly. Every decision below is mine; the geometry is
              not.
            </p>
            <p>
              The real difficulty is that a dark, glossy, reflective car is the hard case
              for lighting. It has almost no diffuse surface of its own. What you see is
              almost entirely a reflection of whatever is around it, so lighting the car
              means designing the room, not aiming lamps at the subject.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="decisions" eyebrow="Key decisions" title="Four decisions behind the shot">
          <Decision n={1} title="A mechanical rig, so animation is driven not hand-placed">
            <p>
              The vehicle was rigged for mechanical behaviour rather than posed frame by
              frame: a root controller at the base of the car for movement without breaking
              anything downstream, drivers linking wheel rotation to forward travel so the
              wheels roll the correct amount automatically, and a steering controller
              constrained to the front wheels.
            </p>
            <p>
              The payoff is that the animation stays honest. If the car creeps forward, the
              wheels turn by exactly the distance covered, because the relationship is a
              formula rather than my judgement of what looks about right.
            </p>
            <Figure
              assetKey="corvette-lighting"
              label="Rig and scene organisation"
              caption="The outliner keeps the car rig, the car body and the set as separate collections, which is what makes the lighting and the animation independently adjustable."
            />
          </Decision>

          <Decision n={2} title="Paint built in three layers, because real paint has three">
            <p>
              The shader is layered the way automotive paint actually is: a dark metallic
              base coat setting the hue, a noise-driven flake layer scattering tiny
              highlights so the surface has depth as it turns through the light, and a
              highly reflective clear coat producing the wet, sharp reflections that read
              as a finished car rather than grey plastic.
            </p>
          </Decision>

          <Decision n={3} title="Light the room, not the car">
            <p>
              A three-point studio setup, chosen over an outdoor environment because an HDRI
              gives you whatever the sky happened to be doing. A large soft key light above
              and in front provides the broad reflection across the bonnet. Two long, thin
              strip lights along the sides and slightly behind draw the edge highlights that
              separate the car from a near-black background. Small fills lift the shadows
              just enough to keep detail.
            </p>
            <p>
              Those strip lights are the whole shot. They are what produce the long ribbon
              highlights streaking along the side panels as the camera sweeps, and on a
              reflective surface that ribbon is what describes the body&rsquo;s shape. Get
              the strips wrong and the car reads as a silhouette.
            </p>
            <Figure
              assetKey="corvette-set"
              label="Set and camera"
              caption="The camera is parented to an empty with a track-to constraint, so it orbits smoothly while staying locked on the vehicle."
            />
          </Decision>

          <Decision n={4} title="Move the camera, not the car">
            <p>
              175 frames at 24fps. The car barely travels: a slow creep forward and a slight
              wheel turn, enough to imply the engine is running. All the energy comes from
              the camera orbiting on a constrained path. It is cheaper, it keeps the subject
              in frame and correctly lit for the whole shot, and it is what commercial work
              actually does.
            </p>
          </Decision>
        </CaseSection>

        <CaseSection id="outcomes" eyebrow="Outcomes" title="The render budget was the real lesson">
          <div className="stats">
            <div className="stat">
              <p className="stat__value">175</p>
              <p className="stat__label">Frames at 24fps, 13 seconds at 1920×1080</p>
            </div>
            <div className="stat">
              <p className="stat__value">~1 min</p>
              <p className="stat__label">Per frame after optimisation, down from an estimated 5 to 8</p>
            </div>
            <div className="stat">
              <p className="stat__value">3.6 hrs</p>
              <p className="stat__label">Total render, finished in a single session</p>
            </div>
          </div>

          <div className="prose" style={{ marginTop: '1.75rem' }}>
            <p>
              Three changes did it. <strong>Adaptive sampling</strong> with a noise threshold
              let Cycles stop working on regions that were already clean, so flat background
              finished in under a minute while the reflections took the full budget.{' '}
              <strong>Reducing light bounces</strong> for transparent and volumetric
              materials cost nothing in a scene that is mostly opaque metal.{' '}
              <strong>AI denoising</strong> through OpenImageDenoise meant rendering
              deliberately grainy at fewer samples and cleaning it in post.
            </p>
            <p>
              Output went to a PNG sequence rather than straight to video: no compression
              loss, and a crash at frame 140 costs one frame instead of the whole run. The
              sequence was assembled, graded and scored in Blender&rsquo;s video editor.
            </p>
          </div>

          <Figure
            assetKey="corvette-render"
            label="Render in progress"
            caption="Frame 173 mid-render at sample 42 of 120, using 3.8 GB. Watching this panel is how the optimisation targets were found."
          />
        </CaseSection>

        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
          <div className="prose">
            <p>
              <strong>The geometry is not mine.</strong> Worth repeating, because a car
              render invites the assumption. This project demonstrates rigging, shading,
              lighting and render management, and it does not demonstrate hard-surface
              modelling.
            </p>
            <p>
              <strong>One camera move, one lighting setup.</strong> Thirteen seconds is
              enough to prove a look and not enough to prove a sequence. Cutting between two
              or three setups is a different discipline, and harder, because the lighting has
              to stay consistent across them.
            </p>
            <p>
              <strong>Next.</strong> A second lighting setup and a cut between them, motion
              blur on the wheels at speed, and a proper look at whether the flake layer is
              doing anything visible at this camera distance or is just costing render time.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section wrap">
        <PrevNext slug="cinematic-automotive" />
      </div>
      </>
      )}
    </>
  )
}
