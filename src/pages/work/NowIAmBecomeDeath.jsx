import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import TrinityReport from '../../components/TrinityReport.jsx'
import Figure from '../../components/Figure.jsx'
import { bySlug } from '../../data/projects.js'
import { asset } from '../../data/assets.js'

const project = bySlug('now-i-am-become-death')

/* Figures quoted here come from the submitted sketch rather than the written
   report, because the two drift apart in several places and the code is the
   thing that actually ran. The divergence is listed at the end of report mode. */
export default function NowIAmBecomeDeath() {
  const [report, setReport] = useState(false)
  useReveal()
  const poster = asset('vc-mandala')

  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'trinity'
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
          <TrinityReport />
          <div className="section wrap">
            <PrevNext slug="now-i-am-become-death" />
          </div>
        </>
      ) : (
        <>
          <CaseHeader project={project}>
            {/* Local file rather than a YouTube embed: 51 seconds at 1280x828
                is 9 MB with sound, which is cheaper than loading a third-party
                player, and it keeps the piece playable with no network beyond
                this site. The first transcode of this file silently dropped the
                audio track; the score is part of the work, so it is muxed back
                in and the element is no longer muted. preload="none" keeps the
                9 MB off anyone who does not press play. */}
            <div className="videoframe">
              <video
                src={project.video}
                poster={poster.src}
                controls
                playsInline
                preload="none"
                width="1280"
                height="828"
                aria-label="Now I Am Become Death, a fifty-second generative animation in three acts"
              />
            </div>
            <p className="tech" style={{ marginTop: '0.75rem' }}>
              51 seconds, silent here. The sketch plays against an audio score that is not
              redistributed with this capture.
            </p>
          </CaseHeader>

          <CaseBody>
            <CaseSection id="problem" eyebrow="Premise" title="Two things that turn out to share a machine">
              <div className="prose">
                <p>
                  John Whitney was the first artist to systematically apply integer harmonic
                  ratios to visual motion. His argument in <em>Digital Harmony</em> (1980) was
                  that the mathematics governing musical consonance could govern visual motion
                  too: particles orbiting at whole-number multiples of a base speed converge and
                  separate in patterns that feel structured the way a melody feels structured.
                </p>
                <p>
                  He built his first motion-control camera out of a surplus World War II M-5
                  Antiaircraft Gun Director, a device designed to compute weapon trajectories.
                  He took it apart and reassembled it to aim light at film. The era that
                  produced the Trinity detonation also produced the hardware Whitney used to
                  make abstract beauty.
                </p>
                <p>
                  That is not a metaphor invented for this piece; it is a fact of both
                  biographies. The brief was creative coding, and the question this sketch asks
                  is whether Whitney&rsquo;s system, pointed back at the thing his hardware was
                  originally for, reads as critique or as tribute.
                </p>
              </div>
            </CaseSection>

            <CaseSection id="structure" eyebrow="Structure" title="Three acts, on a fixed frame budget">
              <div className="prose">
                <p>
                  The sketch runs at 30 fps and the act boundaries are constants, not events:
                  Act I ends at frame 450, Act II at 900, Act III at 1500. Fifteen seconds,
                  fifteen seconds, twenty. Nothing waits for anything else to finish, which
                  means the piece has the same shape every run even though its contents never
                  repeat.
                </p>
                <p>
                  <strong>It is stochastically seeded at startup.</strong>{' '}
                  <code>randomSeed()</code> and <code>noiseSeed()</code> both take{' '}
                  <code>millis()</code>, so orbit start angles, chain branching and the Perlin
                  field are different every time. Press R and it reseeds. There is no canonical
                  version of this animation, only runs of it.
                </p>
              </div>

              <div className="figure-row">
                <Figure assetKey="vc-orbits" label="Act I · 9s" caption="Cold harmonic geometry. Five counter-rotating rings, a Lissajous ghost layer, and the star-polygon mesh." />
                <Figure assetKey="vc-chain-warm" label="Act II · 27s" caption="The geometry has faded out and a recursive chain reaction has taken over. The first amber appears as particles age." />
              </div>
            </CaseSection>

            <CaseSection id="decisions" eyebrow="Key decisions" title="Four decisions that carry the piece">
              <Decision n={1} title="Counter-rotating rings, because interference is free structure">
                <p>
                  Eighty particles across five rings, sixteen each. Within a ring, particle{' '}
                  <em>i</em> gets angular speed <code>BASE_SPEED × (i + 1)</code>, and the ring
                  directions alternate <code>+1, −1, +1, −1, +1</code>. That is the entire rule.
                </p>
                <p>
                  Everything that looks designed in Act I, the mandala convergences, the moments
                  where the rings briefly agree and then drift apart, falls out of integer speed
                  ratios and alternating signs. This is Whitney&rsquo;s point and it is worth
                  restating: the motion <em>is</em> the structure. No keyframes, no easing
                  curves, no choreography.
                </p>
                <Figure
                  assetKey="vc-mandala"
                  label="Convergence"
                  caption="A moment of visual consonance at twelve seconds. It was not authored; it is what those five speed ratios do when they line up."
                />
              </Decision>

              <Decision n={2} title="The logistic map, because the algorithm should be the theme">
                <p>
                  <code>x = r · x · (1 − x)</code> runs every frame, with r mapped from 3.50 at
                  the start to 3.95 at the end. At 3.50 the output is periodic. Past about 3.57
                  it goes chaotic. That value drives the nucleus pulse in Act I and the burst
                  probability in Act II.
                </p>
                <p>
                  The reason this matters is not that it looks good, although the uneven,
                  under-pressure rhythm it produces is better than uniform randomness would be.
                  It matters because a deterministic rule crossing a threshold into apparent
                  chaos is <em>the same kind of thing</em> as a nuclear chain reaction, not an
                  illustration of one. Picking <code>random()</code> here would have made the
                  piece about fission. Picking the logistic map made it structurally analogous
                  to fission.
                </p>
              </Decision>

              <Decision n={3} title="Withhold the fire for thirty seconds">
                <p>
                  Act I is locked to a blue-teal band: the cold palette is generated once in{' '}
                  <code>setup()</code> with hue restricted to 195–245, and nothing in the first
                  fifteen seconds can leave it. Act II lets amber bleed in gradually as chain
                  particles age. Act III opens on a near-white flash and then releases the full
                  fire ramp, cool blue-white through yellow and orange to deep red.
                </p>
                <p>
                  Half a minute of enforced cold is a long time to ask an audience to wait, and
                  it is the whole reason the detonation lands. The fire is vivid because it is
                  the first warm thing that has happened.
                </p>
                <div className="figure-row">
                  <Figure assetKey="vc-flash" label="30.5s" caption="The ignition flash, mapped to the actual blinding light of the test." />
                  <Figure assetKey="vc-embers" label="45s" caption="The fire palette at full saturation, embers drifting upward on their own Perlin paths." />
                </div>
              </Decision>

              <Decision n={4} title="Trails, not frames: the persistence rectangle">
                <p>
                  Each frame paints a semi-transparent black rectangle over the whole canvas
                  rather than clearing it. The alpha is the interesting part: 10 in Act I, 26 in
                  Act II, 40 in Act III. Low alpha means old frames persist and the image
                  accumulates into long crisp trails; high alpha wipes faster.
                </p>
                <p>
                  So the drawing gets progressively more smeared as the piece goes on, from the
                  precise instrument-like line of Act I to the blur of Act III, without a single
                  blur filter. It is one number, changed twice.
                </p>
              </Decision>
            </CaseSection>

            <CaseSection id="outcomes" eyebrow="Outcomes" title="What it demonstrates">
              <div className="prose">
                <p>
                  Six algorithms carry the fifty seconds: differential harmonic motion,
                  Lissajous curves, an Archimedean spiral, a morphing star-polygon mesh, the
                  logistic map, recursive chain spawning, Perlin drift and expanding shock
                  rings. None of them are libraries. All of them are visible on screen doing the
                  job they were chosen for.
                </p>
                <p>
                  The performance work is real too, and mostly invisible: both colour palettes
                  are precomputed into 360-entry arrays in <code>setup()</code> so{' '}
                  <code>colorMode()</code> is never called inside the draw loop, particle counts
                  are hard-capped at 1,400 and shock rings at 100, and the chain list iterates
                  backwards so removal cannot corrupt the index.
                </p>
              </div>
            </CaseSection>

            <CaseSection id="reflection" eyebrow="Reflection" title="Limitations and next steps" narrow>
              <div className="prose">
                <p>
                  <strong>The report drifted from the code.</strong> Writing the documentation
                  alongside a sketch that was still being tuned left several figures stale: the
                  canvas size, the Act III end frame, the spiral revolution count and the Act I
                  fade windows are all stated differently in the report than in the file that
                  was submitted with it. Report mode above keeps the report&rsquo;s numbers and
                  lists the divergence, because rewriting a submitted document after the fact
                  would be the wrong fix. The right fix is generating those figures from the
                  constants next time.
                </p>
                <p>
                  <strong>The restart is built on unofficial API.</strong> Setting{' '}
                  <code>frameCount = 0</code> in <code>keyPressed()</code> works in Processing
                  4.x and is not guaranteed to keep working. A <code>startFrame</code> offset
                  subtracted at the top of <code>draw()</code> would be equivalent and would not
                  depend on the runtime letting me write to it.
                </p>
                <p>
                  <strong>It was never tested on anyone.</strong> The claim that withholding
                  warmth for thirty seconds is what makes Act III land is an argument about an
                  audience, made without one. It would take very little to check: two cuts, one
                  with the cold Act I and one with the fire brought forward, and ask people
                  which detonation reads as bigger.
                </p>
              </div>
            </CaseSection>
          </CaseBody>

          <div className="section wrap">
            <PrevNext slug="now-i-am-become-death" />
          </div>
        </>
      )}
    </>
  )
}
