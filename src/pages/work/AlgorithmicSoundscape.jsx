import { useEffect, useState } from 'react'
import { CaseHeader, CaseBody, CaseSection, PrevNext } from '../../components/CaseStudy.jsx'
import { useReveal } from '../../components/Reveal.jsx'
import ModeSwitch from '../../components/ModeSwitch.jsx'
import SoundscapeReport from '../../components/SoundscapeReport.jsx'
import { bySlug } from '../../data/projects.js'

const project = bySlug('algorithmic-soundscape')

/* The rule set, exactly as it was performed. */
const RULES = [
  { k: 'Colour', v: 'Sets the sound family. Red is drums, green is FX, blue is bass, yellow is synth.' },
  { k: 'Number', v: 'Sets density. 0 to 3 is one touch, 4 to 6 is two, 7 to 9 is three.' },
  { k: 'Special', v: 'Forces a break. Any special card stops playback for two seconds, then you draw one extra card and execute that before resuming.' },
]

export default function AlgorithmicSoundscape() {
  const [report, setReport] = useState(false)
  useReveal()

  useEffect(() => {
    if (report) document.documentElement.dataset.report = 'uno'
    else delete document.documentElement.dataset.report
    return () => { delete document.documentElement.dataset.report }
  }, [report])

  return (
    <>
      <div className="wrap" style={{ paddingTop: 'clamp(1.25rem, 3vw, 2rem)' }}>
        <ModeSwitch
          checked={report}
          onChange={setReport}
          labelOff="Case study · switch to score"
          labelOn="Score mode · switch to case study"
        />
      </div>

      {report ? (
        <>
          <SoundscapeReport />
          <div className="section wrap">
            <PrevNext slug="algorithmic-soundscape" />
          </div>
        </>
      ) : (
      <>
      <CaseHeader project={project}>
        <div className="embedder">
          <iframe
            src={project.video}
            title="Algorithmic Soundscape Performance"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CaseHeader>

      <CaseBody>
        <CaseSection id="problem" eyebrow="Problem" title="Improvisation needs a rule set, not freedom">
          <div className="prose">
            <p>
              A live generative performance has a familiar failure mode: with no constraint,
              it wanders, and an audience cannot tell intention from accident. The interesting
              question is not how much freedom the performer has. It is what rules make the
              freedom legible.
            </p>
            <p>
              So the score became a card game. UNO already has a colour, a number and a set
              of disruptive specials in every hand, and it already produces sequences nobody
              controls. Mapping those three properties onto musical parameters gave the
              performance a structure the audience could follow while it was happening.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="rules" eyebrow="System" title="The mapping">
          <div className="recog" style={{ marginTop: '1.5rem' }}>
            {RULES.map((r) => (
              <div className="recog__row" key={r.k}>
                <div className="recog__stamp">{r.k}</div>
                <div>
                  <p className="recog__note" style={{ marginTop: 0 }}>{r.v}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="prose" style={{ marginTop: '1.75rem' }}>
            <p>
              Every card carries all three at once, so a single draw changes instrument and
              density together, and a special card interrupts the piece outright. The deck
              does the composing; the rules decide what that composition sounds like.
            </p>
            <p>
              The piece runs <strong>36 bars at 75 BPM</strong>, about two and a half minutes,
              with a card drawn every two bars. It starts with everything muted except one
              quiet synth at 40% and ends on a master fade to silence. The full bar-by-bar
              score is in score mode above.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="outcomes" eyebrow="Outcomes" title="What it demonstrated">
          <div className="prose">
            <p>
              It performed live, which is the outcome that matters for a piece like this.
              The structure held up in front of an audience without narration: draw, hear the
              change, understand the connection.
            </p>
            <p>
              The transferable idea is the same one behind the shot chart. Give people a
              small, consistent mapping and they will read a complex output without being
              taught it. Three rules were enough.
            </p>
          </div>
        </CaseSection>

        <CaseSection id="reflection" eyebrow="Reflection" title="Limitations" narrow>
          <div className="prose">
            <p>
              The mapping is legible but coarse. Four colours and three density bands make a
              readable system and a fairly blunt instrument, and a longer set exposes that.
            </p>
            <p>
              It was also never tested for the thing it claims. Whether the audience actually
              inferred the rules, or simply enjoyed the sound, is unmeasured. That is the
              obvious next study.
            </p>
          </div>
        </CaseSection>
      </CaseBody>

      <div className="section wrap">
        <PrevNext slug="algorithmic-soundscape" />
      </div>
      </>
      )}
    </>
  )
}
