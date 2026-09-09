/* ==========================================================================
   Detachable Kaleidoscope — report mode.

   A transcription of the submitted report (University of Limerick, interactive
   art sculpture, MSc Interaction & Experience Design), following its own ten
   sections and using its own figures, which were extracted from the submitted
   PDF rather than redrawn.

   Two rules hold here. Prose and citations are the report's; nothing is added
   to either. Where this page states something the report does not — the serial
   protocol, the metro period, the sixteen-state guide — it is read directly
   out of `audio_blocks_sequences.pd` and is labelled as such. Section 5.1 and
   the closing note are the only places that happens, and the closing note
   lists every point where the two sources disagree.
   ========================================================================== */
import Reveal from './Reveal.jsx'
import Figure from './Figure.jsx'
import { asset } from '../data/assets.js'

const FACTS = [
  ['Form', 'Four octagonal audio blocks under a kaleidoscope viewing piece'],
  ['Material', '3 mm MDF, laser-cut finger joints, copper tape contacts'],
  ['Sensing', 'Resistor network read as analogue voltage on Arduino A0'],
  ['Audio', 'Pure Data, sixteen states, four WAV fragments'],
]

const RESISTORS = [
  ['Block A', '1 kΩ'],
  ['Block B', '4.7 kΩ'],
  ['Block C', '10 kΩ'],
  ['Block D', '22 kΩ'],
  ['Reference', '10 kΩ to ground'],
]

/* The sixteen rows of the patch's own SEQUENCE GUIDE comment, verbatim. The
   left column is the serial byte, the middle the blocks that comment names,
   the right the playback order it triggers. */
const STATES = [
  ['A', 65, 'A', '1 › 2 › 3 › 4'],
  ['B', 66, 'B', '2 › 3 › 4 › 1'],
  ['C', 67, 'A B', '1 › 2 › 4 › 3'],
  ['D', 68, 'C', '3 › 4 › 1 › 2'],
  ['E', 69, 'A C', '1 › 3 › 2 › 4'],
  ['F', 70, 'B C', '2 › 1 › 3 › 4'],
  ['G', 71, 'A B C', '1 › 3 › 4 › 2'],
  ['H', 72, 'D', '4 › 1 › 2 › 3'],
  ['I', 73, 'A D', '1 › 4 › 3 › 2'],
  ['J', 74, 'B D', '2 › 4 › 1 › 3'],
  ['K', 75, 'A B D', '2 › 3 › 1 › 4'],
  ['L', 76, 'C D', '3 › 1 › 4 › 2'],
  ['M', 77, 'A C D', '3 › 2 › 4 › 1'],
  ['N', 78, 'B C D', '4 › 2 › 1 › 3'],
  ['O', 79, 'A B C D', '4 › 3 › 2 › 1'],
  ['P', 80, 'none', 'silence'],
]

const RESEARCH = [
  ['Cybernetic and systems art',
   'Cybernetic art builds feedback systems between the audience and the machine making the work (Wiener, 1948). Rearranging the sculpture changes its resistance values, which changes the narrative Pure Data plays back. Burnham’s systems aesthetics holds that the behaviour and systems inside an artwork matter more than the object itself (Burnham, 1968); the meaning of this piece is in the interaction, rearrangement and interpretation rather than in the sculpture as a thing.'],
  ['Tangible interaction',
   'Ishii and Ullmer argue for physical objects as the interface into the digital world, in place of graphical screens (Ishii & Ullmer, 1997). Here the physical objects are both the sculpture and the interface: there is no screen and no control surface anywhere in the piece.'],
  ['Optical art and shifting viewpoints',
   'Duchamp’s Rotoreliefs used repetition and shifting viewpoints to change what a viewer sees from a fixed set of elements (Duchamp, 1935). The kaleidoscope module repeats the same visual components and produces a different image depending on movement.'],
  ['The audience as participant',
   'Ascott describes interactivity in art as replacing the spectator with the artist — the audience becomes a participant in the work rather than an observer of it (Ascott, 1968). Rearranging the blocks is what makes the visitor an author of the version they hear.'],
]

const REFERENCES = [
  'Ascott, R. (1968) ‘The Cybernetic Stance: My Process and Purpose’, Leonardo, 1(2), pp. 105–112.',
  'Burnham, J. (1968) ‘Systems Esthetics’, Artforum, 7(1), pp. 30–35.',
  'Duchamp, M. (1935) Rotoreliefs. Paris: Self-published experimental optical discs.',
  'Ishii, H. and Ullmer, B. (1997) ‘Tangible Bits: Towards Seamless Interfaces between People, Bits and Atoms’, Proceedings of the SIGCHI Conference on Human Factors in Computing Systems, pp. 234–241.',
  'Wiener, N. (1948) Cybernetics: Or Control and Communication in the Animal and the Machine. Cambridge, MA: MIT Press.',
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

export default function KaleidoscopeReport() {
  const hero = asset('kal-tower')
  return (
    <div className="wrap">
      <Reveal className="rep-head">
        <div className="rep-head__bg">
          <img src={hero.src} alt="" />
        </div>
        <p className="rep-head__kicker">Interactive Art Sculpture · University of Limerick</p>
        <h1 className="rep-head__title">Detachable Kaleidoscope</h1>
        <p className="rep-head__meta">
          A modular interactive sculpture about different truths to the same information.
          Concept, research, narrative design, technical process, fabrication and reflection.
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
        title="1 · Introduction"
        sub="A modular interactive sculpture that explores the idea of different truths to the same information based on its structure."
      >
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The sculpture allows audiences to interact with it, resequencing the information
            within each block to create different interpretations of the same story. It consists
            of four octagon blocks and a kaleidoscope viewing piece stacked on top of each other.
            Each block features a fragment of dialogue about a police interview scenario. The
            resequencing of each block alters the truth audiences perceive of the same story.
          </p>
          <p>
            The idea developed out of discussions about the fragmented nature of information
            within modern media. Social media platforms such as TikTok, Instagram Reels and X
            feature short-form content that limits the way stories are presented to audiences. As
            a result, audiences often do not see the full context of situations in which stories
            are shared, and tend to base their interpretations of truths without having context to
            frame their understanding of the story.
          </p>
        </div>
      </Section>

      <Section title="2 · Concept and theme" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The main theme is the distortion of truth within narratives and the interpretation of
            the story. During initial discussions, platforms like TikTok, Instagram Reels and X
            continuously present short-form content to audiences, limiting the information within
            stories to short clips, pictures and headlines. As a result, audiences often do not
            have context to understand the stories being presented to them.
          </p>
          <p>
            Rather than focusing on the spread of misinformation on these platforms, the focus is
            instead on <strong>the structure of the information being presented</strong>. By
            rearranging the blocks, audiences change the structure in which the information is
            presented yet keep the same dialogue within each block. This introduces the idea of
            the truth of the same story depending on its structure. The kaleidoscope component
            continuously displays the same images yet in a different structure depending on
            movement.
          </p>
          <p>
            This relates to the fragmented nature of digital media platforms and the different
            truths audiences base on their interpretations of short-form content. Another idea
            reflected within the project is the interaction of the audience with the installation.
            Interactivity in interactive arts allows audiences to become participants in the work
            of art rather than passive spectators of the art piece (Ascott, 1968). As the audience
            interacts with and manipulates the Detachable Kaleidoscope, they change the narrative
            structure of the story blocks.
          </p>
        </div>

        <Figure
          assetKey="kal-ideation"
          label="Figure 1"
          caption="Early idealisation sketches exploring modular structure, resistor topology, kaleidoscope concepts and interaction systems. The right-hand panels set out the two constraints the rest of the build follows: eight sides means eight possible contact orientations, and different resistor values mean a different voltage per orientation."
        />
      </Section>

      <Section title="3 · Research and context" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
          <p>
            Several ideas from the lecture material and readings had an influence upon the
            direction of this project.
          </p>
        </div>
        <div className="rep-grid">
          {RESEARCH.map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="4 · Narrative and interaction design" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The narrative is based upon a fictional police interview of the neighbour who was
            discussing the missing dog. It was chosen to be somewhat generic and not include any
            drama associated with the missing dog scenario; this allows the interaction to be more
            believable and lets ambiguity be incorporated into the interview. Each module contains
            one short audio fragment recorded in a conversational tone, natural to the speakers
            rather than attempting to create a theatrical interaction.
          </p>
          <p>
            The interaction itself is simple: audience members approach the sculpture and
            rearrange the blocks to hear different audio clips. The audience become a part of the
            interaction with the sculpture. Placing the audience as part of an interactive art
            installation is based upon the ideas of artists such as Ascott, who described the role
            of the audience within interactive art as one that replaces the spectator with the
            artist (Ascott, 1968).
          </p>
          <p>
            One of the most important elements of the installation is that{' '}
            <strong>the dialogue between the two characters never changes</strong>. Only the order
            of the dialogue changes, based upon the way in which audience members select to
            arrange the blocks. This was important to incorporate as a way of depicting the idea of
            different interpretations of the same information.
          </p>
          <p>
            Finally, the kaleidoscope element acts as a visual metaphor for the installation of
            audio clips. Looking through the kaleidoscope enables audience members to observe the
            same fragment of the interview continuously changing to a different arrangement of the
            same characters, again reinforcing the ideas the installation contains regarding
            interpretation of information.
          </p>
        </div>

        <Figure
          assetKey="kal-storyboard"
          label="Figure 2"
          caption="Storyboard demonstrating audience interaction, rearrangement, and changing narrative interpretation. Panel six carries the thesis in the visitor's own words: same words, different truth?"
        />
      </Section>

      <Section title="5 · Technical process" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The sculpture functions through the use of analogue electronics, Arduino sensing and
            audio sequencing within Pure Data.
          </p>
          <p>
            Each octagonal block contains copper contact points and resistors between chosen faces
            of the octagon. When the blocks are stacked upon one another, the resulting networks of
            resistors change depending upon the arrangement of the blocks. The resistance of those
            networks creates analogue voltage readings, which are read by the Arduino. The Arduino
            then sends those values over serial communication to Pure Data on the laptop.
          </p>
          <p>
            Pure Data was constructed in a relatively simple manner. Different ranges of resistors
            trigger different arrangements of the narrative, and different WAV files are played in
            sequence in response to those resistors.
          </p>
          <p>
            Testing with resistors of different values was performed to ensure the blocks would
            read stable values of resistance. Early versions created unstable readings from the
            contact points within the blocks. As a result,{' '}
            <strong>additional logic was added to the Arduino to average the readings</strong> from
            the analogue sensors, to create a stable interaction with the sculpture. The
            interaction methods are visible and understandable, though not entirely hidden from
            view.
          </p>
        </div>

        <div className="rep-stats" style={{ maxWidth: '840px', margin: '2rem auto 0' }}>
          {RESISTORS.map(([k, v]) => (
            <div className="rep-stat" key={k}>
              <p className="rep-stat__k">{k}</p>
              <p className="rep-stat__v">{v}</p>
            </div>
          ))}
        </div>

        <Figure
          assetKey="kal-flowchart"
          label="Figure 3"
          caption="Technical system flowchart showing signal flow between modular blocks, resistor networks, Arduino sensing and Pure Data audio playback. The eighth step loops back to the first: the visitor rearranges again."
        />

        <Figure
          assetKey="kal-wiring"
          label="Arduino circuit"
          caption="The stack wired as a single voltage divider. 5 V leaves the Arduino into the top of the block stack and returns through blocks A to D into analogue pin A0, with a 10 kΩ reference resistor to ground on the breadboard. The kaleidoscope module carries no resistor and is marked passive."
        />

        <div className="rep-section__head" style={{ marginTop: '3rem' }}>
          <h3 className="rep-card__t">5.1 Inside the patch</h3>
        </div>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            This subsection is not in the submitted report. It is read directly out of{' '}
            <code>audio_blocks_sequences.pd</code>, because the patch is more specific than the
            report&rsquo;s description of it.
          </p>
          <p>
            The patch opens the serial link with <code>[comport 3 115200]</code> and feeds it into{' '}
            <code>[select 65 66 … 80]</code> — sixteen consecutive byte values, which are the
            ASCII codes for the letters <strong>A to P</strong>. Each of the sixteen outlets fires
            one message box holding a permutation of <code>1 2 3 4</code>. That permutation is
            unpacked into four file triggers, which open <code>audio1.wav</code> through{' '}
            <code>audio4.wav</code> in turn through <code>[readsf~]</code> into <code>[dac~]</code>,
            stepped by a <code>[metro 15000]</code>.
          </p>
          <p>
            The patch&rsquo;s own <em>SEQUENCE GUIDE</em> comment names each letter after a set of
            blocks rather than an order of them: <code>A</code> is the A-block alone,{' '}
            <code>C</code> is AB, <code>O</code> is ABCD, <code>P</code> is nothing and plays
            silence. Assigning A, B, C and D the bit values 1, 2, 4 and 8, every one of the sixteen
            rows resolves to the same rule —{' '}
            <strong>byte = 65 + ((block mask − 1) mod 16)</strong>. The serial code is a four-bit
            record of <em>which blocks are in the conductive path</em>.
          </p>
          <p>
            That is worth stating plainly, because a series resistor chain sums to the same total
            regardless of the order the resistors sit in. What the divider can distinguish is the
            set of blocks in circuit, not their sequence — which is why removing and reinserting a
            block, as the storyboard shows the visitor doing, is what moves the piece between
            states. The <em>audible</em> reordering is real: each of the sixteen states triggers a
            different playback permutation of the same four fragments.
          </p>
        </div>

        <div className="rep-table" role="region" aria-label="The patch's sixteen states" tabIndex={0}>
          <table>
            <caption>
              The sixteen states, transcribed from the SEQUENCE GUIDE comment in{' '}
              <code>audio_blocks_sequences.pd</code>.
            </caption>
            <thead>
              <tr>
                <th scope="col">Byte</th>
                <th scope="col">ASCII</th>
                <th scope="col">Blocks in circuit</th>
                <th scope="col">Playback order</th>
              </tr>
            </thead>
            <tbody>
              {STATES.map(([letter, code, blocks, order]) => (
                <tr key={letter}>
                  <th scope="row">{letter}</th>
                  <td>{code}</td>
                  <td>{blocks}</td>
                  <td>{order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Figure
          assetKey="kal-pd-patch"
          label="The patch"
          caption="comport feeding the select chain that fans out into the sixteen sequence messages, each unpacked into four file triggers."
        />

        <div className="rep-section__head" style={{ marginTop: '3rem' }}>
          <h3 className="rep-card__t">5.2 Inside the sketch</h3>
        </div>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            Also not in the submitted report. <code>code.ino</code> sits in the same folder as the
            patch and is the other half of the system, so it is worth reading alongside it.
          </p>
          <p>
            The sketch reads A0 every <strong>150 ms</strong>, matches the reading against a
            fifteen-row lookup table with a tolerance of <strong>±6 ADC counts</strong>, and emits
            one ASCII byte followed by a newline only when a state has held for{' '}
            <strong>four consecutive identical reads</strong> and differs from the last one sent.
            Anything it cannot match becomes <code>&apos;P&apos;</code>. It opens serial at{' '}
            <strong>115200 baud</strong>, matching the patch&rsquo;s <code>[comport 3 115200]</code>.
          </p>
          <p>
            The report describes this as logic that <em>averages</em> the analogue readings. The
            sketch does not average; it debounces, requiring the same value four times in a row.
            The effect the report wanted — a stable interaction that does not retrigger under a
            resting hand — is achieved, by a different mechanism.
          </p>
          <p>
            The header comment sets its own hard constraint:{' '}
            <em>the tightest gap between any two combinations is only 13 ADC units</em>, so 1%
            metal-film resistors are mandatory and 5% carbon-film parts would confuse the ACD, BCD
            and ABCD states. Recomputing every row from the sketch&rsquo;s own formula,{' '}
            <code>1023 × 10 / (R + 10)</code>, that figure is exactly right: the closest pair is
            BCD at 380 and ABCD at 367.
          </p>
          <p>
            Two things in the file do not hold up to that recomputation.{' '}
            <strong>The lookup entry for block B alone is 1002, where the formula gives 839</strong> —
            a gap of 163 against a tolerance of 6, which also breaks the descending order the
            comment above the table claims for it. A B-only stack would match no row and fall
            through to <code>&apos;P&apos;</code>, playing silence instead of its 2 › 3 › 4 › 1
            loop. And <code>PRINT_RAW</code> is left <code>true</code>, which holds the sketch in
            calibration mode: it prints raw readings and returns before ever writing a state byte.
            Both are exactly what the file&rsquo;s own calibration procedure is written to catch,
            and it is the step that was not run last.
          </p>
          <p>
            The resistor values differ too. The circuit diagram above and the idealisation sketch
            both give 1 kΩ, 4.7 kΩ, 10 kΩ and 22 kΩ. The sketch declares{' '}
            <strong>1 kΩ, 2.2 kΩ, 4.7 kΩ and 10 kΩ</strong>, and every value in its lookup table is
            computed from that second set.
          </p>
        </div>
      </Section>

      <Section title="6 · Fabrication and iteration" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            The modules were fabricated from 3 mm MDF using laser-cut pieces and finger joint
            construction. Several issues emerged with the physical construction, most notably in
            relation to the kerf of the wood and the tightness of the joints between the pieces.
            Several iterations of the module design were made before physical construction became
            possible.
          </p>
          <p>
            Copper tape contact pads were added to the exterior faces of the modules, and the
            internal resistors were soldered to the conductive areas within each module. Testing
            was performed to ensure that the copper tape areas provided reliable measurements of
            the resistors within the modules when the blocks were physically rearranged.
          </p>
          <p>
            The kaleidoscope module was constructed separately from the remaining blocks, and is
            composed of mirrored acrylic blocks arranged in the shape of a triangular prism. This
            component was constructed primarily for the conceptual theme of the project. Physical
            prototyping contributed to the development of the interaction with the kaleidoscope
            component: some of the interaction elements were developed during construction rather
            than as a result of planning prior to it. For instance, some of the decisions regarding
            the interaction with the kaleidoscope were made during testing of the component itself.
          </p>
        </div>

        <div className="figure-row" style={{ marginTop: '2rem' }}>
          <Figure
            assetKey="kal-boxrender"
            label="Finger joints"
            caption="One module as a finger-jointed box before cutting. The kerf of the MDF and the tightness of these joints drove several iterations of the design."
          />
          <Figure
            assetKey="kal-isometric"
            label="Figure 4"
            caption="Prototype render of the modular sculpture and kaleidoscope viewing module, with the rearrangement plane, the copper contact interface and the signal tap at block D called out."
          />
        </div>

        <div className="figure-row" style={{ marginTop: '2rem' }}>
          <Figure
            assetKey="kal-lasercut-bed"
            label="Cut and engraved"
            caption="The laser bed after a run: octagonal panels, lids and bases, many carrying the engraved artwork that dresses the outside of the stack."
          />
          <Figure
            assetKey="kal-workshop"
            label="Assembly"
            caption="Assembling the cut panels at the workshop bench."
          />
        </div>

        <div className="figure-row" style={{ marginTop: '2rem' }}>
          <Figure
            assetKey="kal-soldering"
            label="Contact pads"
            caption="Soldering a resistor leg to a copper pad. These pads are the electrical interface between one block and the next."
          />
          <Figure
            assetKey="kal-block-internals"
            label="Inside a module"
            caption="Copper pads on the inner faces with the resistor bridging one opposite pair."
          />
        </div>

        <div className="figure-row" style={{ marginTop: '2rem' }}>
          <Figure
            assetKey="kal-testing"
            label="Calibration"
            caption="Reading values off the stack against the patch. In the foreground, a module seen from above: four copper pads around the central viewing ring."
          />
          <Figure
            assetKey="kal-tower"
            label="Assembled"
            caption="The finished sculpture on its base, five modules high, with the Arduino and breadboard wired in alongside."
          />
        </div>

        <p className="rep-body" style={{ marginTop: '1.5rem', marginInline: 'auto' }}>
          Figure 5 in the submitted report is a montage of the fabrication process, covering
          resistor testing, Arduino prototyping, soldering and internal wiring. Its constituent
          photographs are reproduced separately above.
        </p>
      </Section>

      <Section title="7 · Reflection" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            One of the main relationships that became apparent was that between the physical
            interaction with the installation and the conceptual theme of the installation itself.
            By manipulating the sculpture, the story changes for the audience. The focus on
            sequencing rather than changing the content of the installation was also effective
            conceptually about the impact of interaction on narrative installations.
          </p>
          <p>
            Beyond the conceptual elements, the project allowed for some exploration of the
            challenges to be encountered in creating an interactive installation that relied upon
            analogue interaction elements. Some of these challenges included the inconsistencies of
            the analogue interaction elements — and yet the way that the focus upon these
            challenges created elements of the installation that were both noticeable and
            incorporated into the interaction with the installation itself.
          </p>
          <p>
            Another aspect that became a value of the project was the importance of simplicity in
            interaction with installations. More complicated audio interaction systems were
            considered prior to development, but simplification of those interaction elements was
            one that was considered both valuable and beneficial to the installation overall.
          </p>
          <p>
            Overall, the project was successful in creating an interactive sculpture that
            incorporated elements of physical interaction, sequencing and modularity, all of which
            led to the creation of an installation that encouraged the audience to reflect upon its
            elements and concepts altogether.
          </p>
        </div>
      </Section>

      <Section title="8 · Conclusion" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            In exploring the Detachable Kaleidoscope, audiences become aware of how meaning can
            change with arrangement and interaction with the installation. By combining sculpture,
            analogue sensing, Pure Data and audience interaction, abstract ideas on media and
            narrative became physical and interactive. The same information was presented each
            time, yet through the rearrangement of the sculpture&rsquo;s modules audiences
            experienced different emotional readings and assumptions of the narrative.
          </p>
        </div>
        <blockquote className="rep-centre" style={{ marginTop: '2.5rem' }}>
          <p className="rep-body" style={{ fontSize: 'var(--step-2)', lineHeight: 1.4 }}>
            &ldquo;Truth is not always in the information but in how the information is arranged
            and interacted with.&rdquo;
          </p>
        </blockquote>
      </Section>

      <Section title="9 · References" centre={false}>
        <ul className="rep-refs">
          {REFERENCES.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </Section>

      <Section title="10 · Appendices" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
          <p>
            The appendices carry the storyboard, the technical flowchart, the Arduino circuit
            diagram, the fabrication process images, the audio script fragments and the Pure Data
            patch. The first four are reproduced in the sections above. The audio material is
            below.
          </p>
        </div>

        <Figure
          assetKey="kal-wavfiles"
          label="Audio assets"
          caption="Seven files: audio a to d carry the four interview fragments, with dogbark, alien, and a version of audio d with effects applied."
        />

        <div className="figure-row" style={{ marginTop: '2rem' }}>
          <Figure
            assetKey="kal-voice"
            label="Voice generation"
            caption="The voices were generated rather than recorded. The prompt shown asks for a deep, booming, theatrical delivery, and the presets beside it read Evil Ogre, Little Mouse and Southern Woman."
          />
          <Figure
            assetKey="kal-audacity"
            label="Assembly"
            caption="The four fragments laid out in Audacity, each starting where the previous one ends, with the effects and sound-effect tracks beneath."
          />
        </div>

        <p className="rep-body" style={{ marginTop: '1.5rem', marginInline: 'auto' }}>
          Section 4 describes the fragments as recorded in a conversational tone, natural to the
          speakers rather than theatrical. The appendix evidence points the other way: the voices
          are synthesised from character presets, and the prompt explicitly asks for a theatrical
          quality. Both are reproduced here rather than reconciled.
        </p>
      </Section>

      <Section title="Note on sources" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <p>
            Everything above is the submitted report except sections 5.1, 5.2 and this note, which
            are read from <code>audio_blocks_sequences.pd</code> and <code>code.ino</code>. Where
            the sources disagree, both are shown:
          </p>
          <ul>
            <li>
              The report describes different <em>ranges</em> of resistance triggering different
              arrangements. The patch keys off sixteen discrete serial bytes, so the binning
              happens on the Arduino and Pure Data only sees the resulting letter.
            </li>
            <li>
              The patch header calls the piece &ldquo;15 Combinations&rdquo;; the select chain
              handles sixteen codes. The sixteenth, <code>P</code>, is the empty stack and plays
              silence.
            </li>
            <li>
              The patch&rsquo;s timing comment tells the reader to double-click{' '}
              <code>[metro 5000]</code>; the object in the patch is <code>[metro 15000]</code>.
            </li>
            <li>
              The report frames the interaction as reordering the blocks. The sensed quantity is
              order-independent, so what the patch reads is which blocks are in circuit; the
              reordering the audience hears is the playback permutation each state selects.
            </li>
            <li>
              The report says the Arduino averages its readings; the sketch debounces them,
              requiring four identical reads in a row.
            </li>
            <li>
              The circuit diagram and the idealisation sketch give the block resistors as 1 kΩ,
              4.7 kΩ, 10 kΩ and 22 kΩ; the sketch declares 1 kΩ, 2.2 kΩ, 4.7 kΩ and 10 kΩ, and
              computes its lookup table from the second set.
            </li>
            <li>
              Section 4 describes conversational, non-theatrical recordings; the appendix shows
              synthesised character voices.
            </li>
          </ul>
        </div>
      </Section>
    </div>
  )
}
