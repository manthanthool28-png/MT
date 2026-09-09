/* ==========================================================================
   Algorithmic Soundscape — report mode.

   A transcription of the submitted score sheet (CS6042 Interactive Media
   Project / Workshop 2, 2025/6 SEM2) in the deck's own visual language: black
   table, the four UNO colours used as the encoding they actually are.

   The performance sheet is reproduced bar by bar because that is what the
   document is. Card colours are raised until each clears 4.5:1 on the black
   ground; the mapping from colour to sound family is the score's own.
   ========================================================================== */
import Reveal from './Reveal.jsx'

const FACTS = [
  ['Duration', '2.5 minutes'],
  ['Structure', '36 bars at 75 BPM, 4/4'],
  ['Instrument', 'Soundtrap DAW + a physical UNO deck'],
  ['Deck size', '25 to 30 mixed cards'],
]

const FAMILIES = [
  ['red', 'RED', 'Drums', ['Nagara Ensemble', 'Taiko', 'Early Bird']],
  ['green', 'GREEN', 'FX', ['Bone FX', 'Camden Rain FX', 'Rhythmic Street FX']],
  ['blue', 'BLUE', 'Bass', ['Camden Rain bass', 'Fire Rain bass', 'He Wont bass']],
  ['yellow', 'YELLOW', 'Synth', ['Ascent (Ollie synth)', 'Caesar Dramatic Brass', 'Time (808)', 'Time (synth bass)']],
]

const RULES = [
  ['1', 'Colours pick the sound family',
    'Red is drums, green is FX, blue is bass, yellow is synth. The card that comes off the deck decides which four tracks you are allowed to touch.'],
  ['2', 'Numbers decide how many loops you touch',
    '0 to 3 touches one loop, either unmute or mute. 4 to 6 touches two, one of each. 7 to 9 touches three, mixing unmute and mute.'],
  ['3', 'Special cards force a pause and an extra draw',
    'Any special card (Skip, Draw 2 and the rest) stops playback for two seconds, then you draw one extra card, execute it, and resume.'],
]

/* The sheet as submitted. Approximate sequence — the note on the score is
   explicit that the cue may differ in performance. */
const SHEET = [
  ['1–2', '2', 'red', 'Unmute Nagara drum'],
  ['3–4', '1', 'green', 'Unmute Early Bird FX'],
  ['5–6', '5', 'blue', 'Unmute Camden bass, mute Fire Rain bass'],
  ['7–8', '4', 'yellow', 'Unmute Ascent synth, mute G.O.A.T synth'],
  ['9–10', 'SKIP', null, 'Stop 2s → extra Green 3 → unmute Rain FX → play'],
  ['11–12', '7', 'blue', 'Two bass unmute, one bass mute'],
  ['13–14', '0', 'yellow', 'Mute one synth'],
  ['15–16', '8', 'green', 'Two FX unmute, one FX mute'],
  ['17–18', '+2', null, 'Stop 2s → extra Blue 6 → one bass swap → play'],
  ['19–20', '2', 'yellow', 'Unmute one synth pad'],
  ['21–22', '9', 'green', 'Two FX unmute, one FX mute (peak)'],
  ['23–24', '1', 'red', 'Unmute one drum'],
  ['25–26', '0', 'blue', 'Mute one bass'],
  ['27–28', 'SKIP', null, 'Stop 2s → extra Yellow 3 → one synth touch → play'],
  ['29–30', '0', 'red', 'Mute one drum'],
  ['31–32', '2', 'green', 'Mute one FX'],
  ['33–34', '1', 'blue', 'Mute last bass'],
  ['35–36', '0', null, 'Master volume fade to silence → stop'],
]

const ARC = [
  ['Intro', 'bars 1–8', 'One or two sounds, slow.'],
  ['Peak', 'bars 9–24', 'Four to six sounds. The specials create chaos.'],
  ['Dissolve', 'bars 25–36', 'Thin to silence.'],
]

const EXECUTION = [
  'Start Soundtrap with everything muted except one quiet synth at 40% volume.',
  'Start the OBS full-screen recording.',
  'Tap spacebar to play from bar 1.',
  'Every two bars: draw a card and execute the action it names.',
  'At bar 36: fade the master to silence, then stop.',
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

export default function SoundscapeReport() {
  return (
    <div className="wrap">
      <Reveal className="rep-head uno-head">
        <p className="rep-head__kicker">CS6042 · Interactive Media Project / Workshop 2 · 2025/6 SEM2</p>
        <h1 className="rep-head__title">
          <span className="uno-word" data-c="red">U</span>
          <span className="uno-word" data-c="green">N</span>
          <span className="uno-word" data-c="yellow">O</span>
        </h1>
        <p className="rep-head__meta">
          Interactive / algorithmic soundscape performance. An interactive algorithmic piece
          for Soundtrap DAW and a physical UNO deck.
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

      <Section
        title="Sound families"
        sub="Four tracks per colour, pre-loaded as loops before the performance starts. The deck never adds material; it only decides what is audible."
      >
        <div className="uno-families">
          {FAMILIES.map(([c, label, role, tracks]) => (
            <div className="uno-fam" data-c={c} key={c}>
              <p className="uno-fam__label">{label}</p>
              <p className="uno-fam__role">{role}</p>
              <ul className="uno-fam__list">
                {tracks.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Three rules" centre={false}>
        <div className="rep-card__rows">
          {RULES.map(([n, t, d]) => (
            <div className="rep-card__row" key={n}>
              <span className="rep-num" aria-hidden="true">{n}</span>
              <div>
                <p className="rep-card__t">{t}</p>
                <p className="rep-card__d">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Execution" centre={false}>
        <ol className="uno-steps">
          {EXECUTION.map((step, i) => (
            <li key={step}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{step}</li>
          ))}
        </ol>
      </Section>

      <Section
        title="Performance sheet"
        sub="The sequence as scored. The sheet itself carries the caveat: approximate, and while performing the cue may differ."
      >
        <div className="uno-sheet" role="table" aria-label="Performance sheet, bar by bar">
          <div className="uno-sheet__head" role="row">
            <span role="columnheader">Bar</span>
            <span role="columnheader">Card</span>
            <span role="columnheader">Action</span>
          </div>
          {SHEET.map(([bar, card, colour, action]) => (
            <div className="uno-sheet__row" role="row" key={bar}>
              <span className="uno-sheet__bar" role="cell">{bar}</span>
              <span className="uno-sheet__card" data-c={colour || 'wild'} role="cell">{card}</span>
              <span className="uno-sheet__act" role="cell">{action}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Structure" centre={false}>
        <div className="rep-grid">
          {ARC.map(([t, bars, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t} <span className="rep-pill">{bars}</span></p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Performer notes" centre={false}>
        <div className="rep-body" style={{ marginInline: 'auto' }}>
          <ul>
            <li>&ldquo;Touch&rdquo; means click the mute button, the speaker icon, on a specific track.</li>
            <li>Muting is permanent until you unmute.</li>
            <li>Watch the timeline ruler for bar numbers.</li>
            <li>Playback runs continuously except for the Skip and Draw 2 pauses.</li>
          </ul>
        </div>
      </Section>
    </div>
  )
}
