import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, Decision, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import KaleidoscopeReport from '../../components/KaleidoscopeReport.jsx'
import FlowMap from '../../components/FlowMap.jsx'
import Figure from '../../components/Figure.jsx'
import { bySlug } from '../../data/projects.js'

const project = bySlug('detachable-kaleidoscope')

export default function DetachableKaleidoscope() {
  const [report, setReport] = useState(false)
  useReveal()

  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'mirror'
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
          <KaleidoscopeReport />
          <div className="section wrap">
            <PrevNext slug="detachable-kaleidoscope" />
          </div>
        </>
      ) : (
        <>
          <CaseHeader project={project}>
            <div className="embedder">
              <iframe
                src={project.video}
                title="Detachable Kaleidoscope"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CaseHeader>

          <CaseBody>
            <CaseSection id="problem" eyebrow="Problem" title="Same words, different order, different truth">
              <div className="prose">
                <p>
                  Truth does not usually fail because someone lies. It fails because people
                  reorder it: what to say first, what to leave for later, what to leave out.
                  A witness who tells events in one sequence sounds calm. The same witness,
                  the same facts, a different sequence, sounds suspicious.
                </p>
                <p>
                  Detachable Kaleidoscope is a group interactive sculpture built to make that
                  property impossible to ignore. Five octagonal blocks stack into a loose
                  column. Four carry fragments of a police interview about a neighbour&rsquo;s
                  missing dog. The fifth, on top, is a working kaleidoscope. Rearranging the
                  blocks changes the order the fragments play in, and nothing else.
                </p>
                <p>
                  My responsibility was the technical build: the concept and technical
                  direction, the full wiring, the Arduino setup, and the Pure Data interaction
                  logic. The design problem underneath all of it was that a gallery piece
                  visitors are invited to pull apart has to work every time, for every
                  visitor, without anyone standing beside it explaining what went wrong.
                </p>
              </div>
            </CaseSection>

            <CaseSection id="decisions" eyebrow="Key decisions" title="Three decisions that made it work">
              <Decision n={1} title="Read the whole stack as one voltage, not four sensors">
                <p>
                  The blocks sit in series between the Arduino&rsquo;s +5 V and analogue pin A0,
                  with a 10 kΩ reference resistor from A0 to ground. Each block carries one
                  resistor bridging a pair of opposite faces and participates passively by
                  conducting through copper pads; the values in the sketch are 1 kΩ, 2.2 kΩ,
                  4.7 kΩ and 10 kΩ, chosen so no two subsets of them sum to the same total.
                </p>
                <p>
                  One analogue read replaces four sensors and any need for the blocks to know
                  about each other. There is no pairing, no addressing, and nothing to desync
                  when a block is lifted off, which is the failure mode a detachable piece is
                  most exposed to.
                </p>
                <p>
                  The cost of that simplicity is worth naming: resistors in series sum, so the
                  reading is the same whichever order the blocks are stacked in. What the divider
                  resolves is <em>which</em> blocks are in circuit — fifteen combinations plus an
                  empty stack. The reordering the visitor hears is the playback permutation each
                  of those states selects.
                </p>
                <Figure
                  assetKey="kal-block-internals"
                  label="Inside a block"
                  caption="Copper pads on the inner faces, with one resistor bridging an opposite pair and its leg soldered to the back of the pad."
                />
                <div className="figure-row">
                  <Figure
                    assetKey="kal-block-open"
                    label="A module, opened"
                    caption="An assembled module with one side panel lifted away: the resistor bridging a pair of faces, its wiring, and a copper pad on the lid above."
                  />
                  <Figure
                    assetKey="kal-resistors"
                    label="The four values"
                    caption="The four resistors laid out before soldering. The sketch declares 1k, 2.2k, 4.7k and 10k, and calls for 1% metal film — with 5% parts the three-block combinations blur into each other."
                  />
                </div>
              </Decision>

              <Decision n={2} title="Octagonal, so handling does not have to be careful">
                <p>
                  Eight faces means eight contact orientations. A visitor can set a block down
                  any way round and the copper pads still meet the pads below, so the electrical
                  path does not depend on anyone lining anything up. That is the whole argument
                  for the octagon: not a bigger state space, but a forgiving one.
                </p>
                <p>
                  It matters because the piece invites handling by people who have had no
                  instructions. A form that only conducts when placed correctly would spend most
                  of an exhibition silent, and the visitor would read the silence as the work
                  rather than as a miss.
                </p>
              </Decision>

              <Decision n={3} title="Decide the state in firmware, send one byte">
                <p>
                  The Arduino samples A0 every 150 ms, matches the reading against a lookup
                  table of the fifteen combinations within ±6 ADC counts, and writes a single
                  ASCII byte — <code>A</code> to <code>O</code>, or <code>P</code> for an empty
                  stack — only once that state has held for four consecutive reads and differs
                  from the last one sent. Contact through copper tape is noisy, and without that
                  hold a hand resting on the stack retriggers the audio mid-sentence.
                </p>
                <p>
                  Pure Data then does no thresholding at all: <code>[select 65 … 80]</code> on the
                  byte, straight into the sequence message for that state. Keeping the decision on
                  one side of the serial link means there is exactly one place where a
                  misreading can happen, and one place to recalibrate.
                </p>
                <p>
                  The tolerance is the tight part. The closest two states are 13 ADC counts apart,
                  so the build needs 1% metal-film resistors; 5% carbon-film parts would smear the
                  three-block combinations into each other.
                </p>
                <Figure
                  assetKey="kal-pd-patch"
                  label="The patch"
                  caption="comport into a select chain, fanning out into the sequence messages that unpack into four file triggers."
                />
              </Decision>

              <FlowMap
                label="Signal path from physical interaction through Arduino to Pure Data output"
                nodes={[
                  { text: 'Rearrange blocks', io: true },
                  { text: 'Voltage divider' },
                  { text: 'Arduino A0' },
                  { text: 'One byte, 115200' },
                  { text: 'Pure Data select' },
                  { text: 'Four WAVs in order', io: true },
                ]}
              />
            </CaseSection>

            <CaseSection id="outcomes" eyebrow="Outcomes" title="What I did on it">
              <ul className="exp__points" style={{ maxWidth: '62ch' }}>
                <li>Developed the project concept and technical direction.</li>
                <li>Completed the full wiring and Arduino setup.</li>
                <li>Built the Pure Data patch and the interaction logic.</li>
                <li>Tested and refined the system so the interaction held up under handling.</li>
                <li>Supported the final project video and presentation.</li>
              </ul>
              <div className="callout">
                <h3>On a group project</h3>
                <p>
                  This was collaborative work and the piece is not mine alone. My contribution
                  was turning the idea into a working interactive system, which is the part
                  worth claiming here. The full report, including the narrative design and the
                  research behind it, is in report mode above.
                </p>
              </div>
            </CaseSection>

            <CaseSection id="reflection" eyebrow="Reflection" title="What I would do next" narrow>
              <div className="prose">
                <p>
                  <strong>The contacts are the weak point.</strong> Adhesive copper tape wears
                  and oxidises, and it is the one part of the build that degrades with exactly
                  the thing the piece invites: repeated handling. Pogo pins or gold-plated
                  contacts would fix it, and that is a version-two change rather than a tweak.
                </p>
                <p>
                  <strong>Cause and effect needed a second try.</strong> Some test visitors
                  rearranged the blocks twice before the link between handling and audio
                  landed. An LED under the kaleidoscope shifting colour on a bin change would
                  close that gap without explaining anything in words.
                </p>
                <p>
                  <strong>It went undocumented as an interaction.</strong> There is a project
                  video, but no record of what visitors actually did with it. That evidence is
                  what would turn the design argument here from reasoning into a finding.
                </p>
                <p>
                  <strong>The calibration pass never got run again.</strong> Re-reading the sketch
                  for this write-up, the lookup entry for block B is 1002 where its own formula
                  gives 839 — far outside the ±6 window, so a B-only stack falls through to the
                  silent state. The debug flag is also still set, which holds the sketch in
                  calibration mode. Both are caught by the procedure written at the top of the
                  file, and neither is caught by anything automatic. A handful of unit-testable
                  assertions over that table, or simply generating it from the formula instead of
                  typing it, is the fix.
                </p>
              </div>
            </CaseSection>
          </CaseBody>

          <div className="section wrap">
            <PrevNext slug="detachable-kaleidoscope" />
          </div>
        </>
      )}
    </>
  )
}
