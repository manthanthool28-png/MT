/* ==========================================================================
   Now I Am Become Death — report mode.

   A transcription of the submitted report in the piece's own
   colour arc: cold structure, fire held back for the accent.

   Where the written report and the shipped sketch disagree on a number, the
   report's figure is given here because this is the report, and the divergence
   is called out in the closing note rather than quietly reconciled. The case
   study uses the code's values, which are the ones that actually ran.
   ========================================================================== */
import Reveal from './Reveal.jsx'
import Figure from './Figure.jsx'

const FACTS = [
  ['Runtime', 'About 50 seconds, 30 fps'],
  ['Environment', 'Processing 4.x, Minim'],
  ['Algorithms', 'Six, across three acts'],
  ['Lecturer', 'Robin Parmar'],
]

const ACTS = [
  ['I', 'cold', 'Frames 0–450', 'Harmonic orbits, Lissajous curves, spiral. Cold, geometric, and deliberately undramatic.'],
  ['II', 'warm', 'Frames 451–900', 'A stochastic chain reaction takes over as the orbit geometry fades. The first amber bleeds in.'],
  ['III', 'fire', 'Frames 901–1500', 'Detonation, shockwaves, embers. The full fire palette, released all at once.'],
]

const ALGORITHMS = [
  ['Differential harmonic motion', 'Core Act I geometry. Eighty particles on five rings at integer-multiple speeds.'],
  ['Lissajous curves', 'Ghost-layer texture in Act I. Parametric: x = cos(at + φ), y = sin(bt).'],
  ['Archimedean spiral', 'r = bθ. Grows through Act I and rotates throughout.'],
  ['Harmonic star-polygon mesh', 'Connecting every Nth orbit particle forms continuously morphing star polygons.'],
  ['Logistic map, r·x·(1−x)', 'Deterministic chaos. Drives the nucleus pulse in Act I and the burst frequency in Act II.'],
  ['Recursive chain spawn', 'spawnChain() branches stochastically, modelling nuclear fission.'],
  ['Perlin noise drift', 'Each particle samples its own 3D noise slice, producing organic, smoke-like paths.'],
  ['Shockwave rings', 'Expanding ellipses from the explosion; overlapping rings create visual interference.'],
]

const INFLUENCES = [
  ['Norman McLaren', 'Synchromy (1971) showed that abstract visual rhythm can carry emotional weight without representation.'],
  ['Len Lye', 'Treated light and colour on film as primary materials rather than as a means of depicting something else.'],
]

const REFS = [
  'May, R. M. (1976). Simple mathematical models with very complicated dynamics. Nature, 261(5560), 459–467.',
  'McLaren, N. (1971). Synchromy [Film]. National Film Board of Canada.',
  'Oppenheimer, J. R. (1965). The decision to drop the bomb [TV interview]. NBC News.',
  'Parmar, R. (2025). John Whitney [lecture slides]. University of Limerick.',
  'Perlin, K. (1985). An image synthesizer. ACM SIGGRAPH Computer Graphics, 19(3), 287–296.',
  'Russett, R., & Starr, C. (1976). Experimental animation: Origins of a new art. Van Nostrand Reinhold.',
  'Whitney, J. (1968). Permutations [Film]. USA.',
  'Whitney, J. (1975). Arabesque [Film]. USA.',
  'Whitney, J. (1975). Computational periodics. Computer Graphics and Art, 2(2).',
  'Whitney, J. (1980). Digital harmony: On the complementarity of music and visual art. Byte Books / McGraw-Hill.',
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

export default function TrinityReport() {
  return (
    <div className="wrap">
      <Reveal className="rep-head">
        <p className="rep-head__kicker">Creative Coding · 2025</p>
        <h1 className="rep-head__title">Now I Am Become Death</h1>
        <p className="rep-head__meta">
          A generative animation inspired by John Whitney. Manthan Thool.
        </p>
        <div className="rep-stats" style={{ maxWidth: '820px' }}>
          {FACTS.map(([k, v]) => (
            <div className="rep-stat" key={k}>
              <p className="rep-stat__k">{k}</p>
              <p className="rep-stat__v" style={{ fontSize: 'var(--step-0)' }}>{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <section className="rep-section">
        <blockquote className="rep-centre">
          <p className="rep-body" style={{ fontSize: 'var(--step-2)', lineHeight: 1.4 }}>
            “Now I am become Death, the destroyer of worlds.”
          </p>
          <p className="rep-body" style={{ marginTop: '0.75rem' }}>
            J. Robert Oppenheimer, Trinity, 16 July 1945
          </p>
        </blockquote>
      </section>

      <Section title="1 · Introduction">
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            <em>Now I Am Become Death</em> is a fifty-second generative animation built in
            Processing 4.x. It has three acts: cold harmonic geometry in Act I, a stochastic
            chain reaction in Act II, and a Perlin-noise explosion in Act III. The piece never
            looks the same twice because it is stochastically seeded at startup, and it uses
            six distinct algorithms across the three acts.
          </p>
          <p>
            The work takes John Whitney&rsquo;s differential harmonic motion as its core visual
            language and the 1945 Trinity nuclear test as its narrative frame. Those two things
            connect more directly than you might expect, and that connection is the reason this
            combination was chosen.
          </p>
        </div>

        <div className="act-strip">
          {ACTS.map(([n, tone, frames, d]) => (
            <div className="act" data-tone={tone} key={n}>
              <p className="act__n">Act {n}</p>
              <p className="act__frames">{frames}</p>
              <p className="act__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="2 · Inspiration and prior art" centre={false}>
        <div className="rep-section__head" style={{ marginTop: '0.5rem' }}>
          <h3 className="rep-card__t">2.1 John Whitney</h3>
        </div>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            Whitney (1917–1995) was the first artist to systematically apply integer harmonic
            ratios to visual motion. His argument, set out in <em>Digital Harmony</em> (1980),
            was that the same mathematics governing musical consonance and dissonance could
            govern visual motion. When particles orbit a centre point at speeds that are
            whole-number multiples of a base speed, they converge and separate in patterns that
            feel structured in the same way a melody feels structured.
          </p>
          <p>
            His films <em>Permutations</em> (1968) and <em>Arabesque</em> (1975) are the direct
            ancestors of Act I. <em>Arabesque</em> uses counter-rotating rings so that adjacent
            rings go in opposite directions, creating complex interference from a very simple
            rule. That is exactly what <code>drawOrbitsPerRing()</code> does.
          </p>
        </div>

        <blockquote className="rep-centre" style={{ marginBlock: '2rem' }}>
          <p className="rep-body" style={{ fontSize: 'var(--step-1)', lineHeight: 1.5 }}>
            “Computational periodic is a propositional and tentative term which may help to
            designate a new unified field for a heterodimensional art; a field whose special
            dimension is time.”
          </p>
          <p className="rep-body" style={{ marginTop: '0.6rem' }}>
            John Whitney, <em>Computational Periodic</em> (1975)
          </p>
        </blockquote>

        <Figure
          assetKey="vc-mandala"
          label="Act I"
          caption="Harmonic orbit convergence in the finished piece: five counter-rotating rings, the star-polygon mesh and the spiral overlapping at the moment they reach visual consonance. The report reproduces three Whitney diagrams from Digital Harmony here; they are not reproduced on this page."
        />

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">2.2 Why Oppenheimer?</h3>
        </div>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            Whitney built his first motion-control camera from a surplus World War II M-5
            Antiaircraft Gun Director. That device was designed to compute weapon trajectories.
            Whitney took it apart and reassembled it to aim light at film instead. The same era
            that produced the Trinity detonation also produced the hardware Whitney used to make
            abstract beauty. That is not a metaphor invented for this sketch; it is a fact of
            both their biographies.
          </p>
          <p>
            There is also a structural reason. The logistic map, which drives Act II&rsquo;s
            burst rhythm, is a deterministic system that produces chaotic output once r exceeds
            about 3.57. That is not random; it is a rule-governed system crossing a threshold
            into behaviour that looks uncontrolled. The nuclear chain reaction works the same
            way: deterministic physics, catastrophic scale.{' '}
            <strong>The algorithm embodies the theme rather than just illustrating it.</strong>
          </p>
        </div>

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">2.3 Other influences</h3>
        </div>
        <div className="rep-grid">
          {INFLUENCES.map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
        <p className="rep-body" style={{ marginTop: '1.5rem', marginInline: 'auto' }}>
          Both confirmed that pure geometric motion is a legitimate expressive language on its
          own terms.
        </p>
      </Section>

      <Section title="3 · Technical approach" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The only library is Minim, which is standard in Processing. Three acts occupy fixed
            frame ranges. A global background persistence rectangle is drawn each frame at low
            opacity, creating motion trails that are tighter in Act I and longer in Act III.
          </p>
          <p>
            <strong>3.1 Act I: staggered reveal.</strong> The screen is black for the first two
            seconds. Nothing appears immediately. Each visual layer has its own fade-in window,
            controlled by a <code>fadein()</code> helper that maps a frame range to a 0.0–1.0
            multiplier: the nucleus pulse, then the orbit rings at intervals, then the Lissajous
            curves, the harmonic polygon mesh, and finally the Archimedean spiral.
          </p>
          <p>
            All orbit angles advance in <code>draw()</code> regardless of which rings are
            visible. When a ring fades in, it arrives already in motion.
          </p>
        </div>

        <div className="figure-row" style={{ marginTop: '2rem' }}>
          <Figure assetKey="vc-title" label="0–3s" caption="The title card, over the first Lissajous layer." />
          <Figure assetKey="vc-orbits" label="9s" caption="Rings arriving one at a time, each already in motion." />
        </div>

        <div className="rep-section__head" style={{ marginTop: '2.5rem' }}>
          <h3 className="rep-card__t">3.2 Algorithms</h3>
        </div>
        <div className="rep-card__rows">
          {ALGORITHMS.map(([t, d], i) => (
            <div className="rep-card__row" key={t}>
              <span className="rep-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="rep-card__t">{t}</p>
                <p className="rep-card__d">{d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rep-body" style={{ marginTop: '2.5rem', marginInline: 'auto' }}>
          <p>
            <strong>3.3 Differential harmonic motion.</strong> Eighty particles across five
            rings. Within each ring, particle i has angular speed BASE_SPEED × (i + 1) ×
            direction. Adjacent rings alternate clockwise and anticlockwise, producing the
            counter-rotation interference Whitney used in <em>Arabesque</em>. Starting angles
            are randomised each run.
          </p>
          <p>
            <strong>3.4 Logistic map.</strong> The map x = r · x · (1 − x) runs every frame,
            with r increasing from 3.50 to 3.95 across the piece. At 3.50 the output is
            periodic. By 3.95 it is deeply chaotic. The current value modulates the nucleus
            pulse size in Act I and the burst probability in Act II. The rhythm it produces is
            irregular in a way that feels under pressure rather than random.
          </p>
          <p>
            <strong>3.5 Recursive chain reaction.</strong> <code>spawnChain()</code> calls
            itself recursively. Each invocation adds one particle and, with 65% probability,
            spawns a deflected child at generation − 1. A second child follows with 45%
            probability. The stochastic spread angle is resampled each call. The generation
            parameter decrements to zero; a cap of 1,400 particles prevents runaway allocation.
          </p>
          <p>
            <strong>3.6 Perlin noise and embers.</strong> Each particle samples a 3D Perlin
            field at (x × 0.004, y × 0.004, nOff + t × 0.014), where nOff is a unique random
            offset per particle. Spatially coherent drift means nearby particles flow together,
            but every particle takes a slightly different path. Embers in Act III get a small
            upward bias to simulate heat rising.
          </p>
        </div>

        <div className="figure-row" style={{ marginTop: '2rem' }}>
          <Figure assetKey="vc-chain" label="24s" caption="The chain reaction branching, geometry already gone." />
          <Figure assetKey="vc-chain-warm" label="27s" caption="Particles ageing into amber, with shock rings scattering." />
        </div>

        <div className="rep-body" style={{ marginTop: '2rem', marginInline: 'auto' }}>
          <p>
            <strong>3.7 Colour arc.</strong> Act I is near-monochrome: five rings move from
            bright cold-white at the centre to steel blue at the outer edge, no warm hues at
            all. Act II introduces the first amber as chain particles age. Act III releases the
            full fire palette all at once.{' '}
            <strong>
              The fire reads as vivid precisely because it was withheld through the first two
              acts.
            </strong>
          </p>
        </div>

        <Figure
          assetKey="vc-explosion"
          label="36s"
          caption="Four hundred and eighty radial spokes, each length shaped by the 3D Perlin field, with the z axis driven by time so the blast silhouette never repeats."
        />
      </Section>

      <Section title="4 · Code notes" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The code divides into clearly labelled sections: constants, <code>setup()</code>,{' '}
            <code>draw()</code>, three act renderers, individual draw functions, chain helpers,
            utility functions, and two classes, <code>ChainParticle</code> and{' '}
            <code>ShockRing</code>. Each major function has a block comment explaining its
            algorithm and any Whitney reference. <code>fadein()</code>,{' '}
            <code>ringColour()</code> and <code>fireColour()</code> are short, pure utility
            functions.
          </p>
          <p>
            A few things worth noting. The <code>frameCount = 0</code> reset in{' '}
            <code>keyPressed()</code> works in Processing 4.x but is unofficial API; a cleaner
            approach would use a separate startFrame offset variable. The backward-iterating
            removal in <code>updateChain()</code> is correct. Every function that switches to{' '}
            <code>blendMode(ADD)</code> restores <code>blendMode(BLEND)</code> before returning,
            which is essential for correct rendering and is done consistently throughout.
          </p>
        </div>
      </Section>

      <Section title="5 · Running it" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            Processing 4.x, plus the Minim library via Sketch → Import Library → Add Library.
            Audio is optional: drop <code>score.mp3</code> into the sketch&rsquo;s{' '}
            <code>/data</code> folder. Open <code>NowIAmBecomeDeath.pde</code> and press Run; a
            window opens and plays immediately, stopping after about 50 seconds.
          </p>
          <p>
            <strong>S</strong> saves a screenshot as <code>trinity-####.png</code>.{' '}
            <strong>R</strong> restarts with a fresh seed, rewinding the audio and clearing all
            particles. No hidden dependencies exist; it was tested from a clean Processing
            installation.
          </p>
        </div>
      </Section>

      <Section title="6 · Conclusion">
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The piece works because of restraint more than complexity. The cold palette of Act I
            is not a limitation; it is what makes Act III&rsquo;s fire mean something. The
            recursive chain in Act II is not just visually interesting; it is structurally
            analogous to what it depicts. And the logistic map, initially chosen for
            convenience, turned out to be the most thematically loaded element in the sketch: a
            deterministic rule that crosses a threshold into apparent chaos. That is not an
            illustration of nuclear fission. It is the same kind of thing.
          </p>
          <p>
            Whitney repurposed military hardware to make abstract beauty. This sketch runs that
            in reverse: it takes his aesthetic system and applies it to the moment of
            destruction that his hardware was originally built for. Whether that reads as
            critique or tribute is genuinely unclear. Probably both.
          </p>
        </div>
        <Figure
          assetKey="vc-dying"
          label="49s"
          caption="The master fade. Not a cut, a dying."
        />
      </Section>

      <Section title="7 · References" centre={false}>
        <ul className="rep-check">
          {REFS.map((r) => <li className="rep-check__item" key={r}>{r}</li>)}
        </ul>

        <div className="callout" style={{ marginTop: '2.5rem' }}>
          <h3>Where the report and the sketch disagree</h3>
          <p>
            This transcription keeps the written report&rsquo;s numbers. Several of them have
            drifted from the code that was submitted alongside it: the report gives the canvas
            as 1280×720 where the sketch calls <code>fullScreen(P2D)</code>, puts Act III&rsquo;s
            end at frame 1530 where the constant is 1500, says the spiral grows to five
            revolutions where the code specifies six, and lists Act I fade windows that do not
            match the ones in <code>draw()</code>. The case study uses the code&rsquo;s values,
            because those are the ones that actually ran.
          </p>
        </div>
      </Section>
    </div>
  )
}
