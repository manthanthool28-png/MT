import Reveal from './Reveal.jsx'
import { asset } from '../data/assets.js'

/* ==========================================================================
   The CS4071 King Run report in its own visual language: violet gradient
   header on a light ground. Content transcribed from
   "King Run _Manthan Thool.pdf".
   ========================================================================== */

const CHALLENGES = [
  ['◎', 'Root Motion Animation Issues', 'done', 'The Stumble animation using Root Motion caused the character to drift forward out of camera view. Disabled Root Motion in the Animator and baked the Z-axis position to keep physics logic in control of movement.'],
  ['⚡', 'Physics Material Tuning', 'done', 'Initial implementation caused unwanted sliding when changing lanes. Implemented custom Physics Materials on floor and player colliders to manage friction, ensuring tight, responsive controls.'],
  ['◆', 'Infinite Generation Performance', 'done', 'Procedural chunk spawning caused memory overhead. Planned implementation of object pooling and destruction of chunks behind the player to optimise memory usage.'],
  ['△', 'VR/AR Scalability Architecture', 'planned', 'Designing core systems to support future head tracking for lane changes (leaning left and right) and AR Foundation integration for real-world surface projection.'],
]

const FEATURES = [
  ['3-Lane Movement System', 'Implemented using clamped Vector3 positions to ensure precise control across Left, Center and Right lanes with WASD input handling.'],
  ['Tag-Based Collision Detection', 'Robust collision system using the OnCollisionEnter API with Inspector Attributes and Tags to differentiate between collectables and obstacles.'],
  ['Dual Score System', 'GameManager tracks survival time (Time.time) and currency collection, with SerializeField exposure for rapid iteration and balancing.'],
  ['Animator State Machine', 'State transitions between Run, Idle and Hit states using SetTrigger communication, with Mixamo animations for smooth character feedback.'],
]

const IMPL = [
  ['Procedural Level Generation', ['Custom LevelGenerator with chunk-based instantiation', 'Z-offset calculation for perfect chunk alignment', 'Weighted randomisation through ObstacleSpawner for varying intervals']],
  ['Physics & Movement', ['Rigidbody Physics with custom Physics Materials for friction control', 'Input System mapping with clamping logic for lane restrictions', 'Prevented character sliding with tuned collider properties']],
  ['Modular Architecture', ['Dependency injection via FindFirstObjectByType for GameManager', 'Decoupled PlayerCollision from score calculation logic', 'Heavy use of [SerializeField] Inspector attributes for rapid iteration']],
  ['Animation & Visual Feedback', ['Animator Controller with state machine transitions', 'Trigger parameters (SetTrigger) for collision responses', 'Mixamo integration for Run, Idle and Hit animations']],
]

const LEARNINGS = [
  'Disabling Root Motion and baking Z-axis position solved animation drift while maintaining physics control.',
  'Custom Physics Materials with tuned friction values provide responsive, non-sliding lane changes.',
  'Dependency injection via FindFirstObjectByType effectively decouples player logic from game state management.',
  'Heavy use of [SerializeField] Inspector attributes enables rapid iteration without code recompilation.',
  'Tag-based collision detection with OnCollisionEnter provides clean separation of collision response logic.',
  'Procedural chunk generation with Z-offset calculation creates seamless infinite pathways.',
]

const ROADMAP = [
  ['VR Integration', 'Implement head tracking for lane changes and leaning left and right instead of WASD keys.'],
  ['AR Foundation', 'Project the runner track onto real-world surfaces using AR Foundation.'],
  ['Power-ups & Features', 'Add invincibility shields, speed boosts and boss encounters.'],
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
        <div className="rep-section__head">
          <h2 className="rep-h">{title}</h2>
        </div>
      )}
      {children}
    </section>
  )
}

export default function KingRunReport() {
  const hero = asset('kingrun-hero')
  return (
    <div className="wrap">
      <Reveal className="rep-head">
        <div className="rep-head__bg">
          <img src={hero.src} alt={hero.alt} />
        </div>
        <p className="rep-head__kicker">CS4071 · Virtual &amp; Augmented Reality Design</p>
        <h1 className="rep-head__title">King Run</h1>
        <p className="rep-head__meta">
          A 3D endless runner designed to test player reflexes and spatial awareness while
          serving as a foundation for scalable VR/AR interaction.
          <br />
          Built on Unity 6 with physics-based movement and modular architecture.
        </p>
        <div className="rep-stats" style={{ maxWidth: '640px' }}>
          {[['Manthan Thool', '25065394'], ['Platform', 'Unity 6 · C#'], ['Date', 'December 2025']].map(([k, v]) => (
            <div className="rep-stat" key={k}>
              <p className="rep-stat__k">{k}</p>
              <p className="rep-stat__v" style={{ fontSize: 'var(--step-0)' }}>{v}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Section title="Project Overview">
        <div className="rep-grid" style={{ textAlign: 'center' }}>
          {[['∞', 'Endless Gameplay'], ['3D', 'Immersive Environment'], ['⚡', 'Physics-Based Movement']].map(([i, l]) => (
            <div key={l}>
              <p style={{ fontSize: '1.6rem', color: 'var(--accent-text)', fontWeight: 600 }}>{i}</p>
              <p className="rep-card__d" style={{ marginTop: '0.4rem' }}>{l}</p>
            </div>
          ))}
        </div>
        <div className="rep-body" style={{ marginTop: '2rem', marginInline: 'auto' }}>
          <p>
            King Run is an endless runner that places players in control of a monarch
            navigating a procedurally generated castle pathway. The game challenges players
            to dodge obstacles, collect coins and survive as long as possible.
          </p>
          <p>
            Built on <strong>Unity 6</strong> using <strong>C#</strong>, the project focuses
            on modular architecture and strict component separation. Unlike simple
            transform-based movement, this implementation uses <strong>Rigidbody physics</strong>{' '}
            for realistic interactions, providing the tight, responsive feel essential to the
            genre.
          </p>
          <p>
            The architecture emphasises performance optimisation and scalability, serving as a
            foundation for future VR/AR implementations where players can physically lean to
            change lanes instead of using keyboard inputs.
          </p>
        </div>
      </Section>

      <Section
        title="Development Challenges & Solutions"
        sub="Technical obstacles encountered during development and the engineering solutions implemented to overcome them."
      >
        <div className="rep-grid">
          {CHALLENGES.map(([icon, t, state, d]) => (
            <div className="rep-card rep-card--icon" key={t}>
              <span className="rep-icon" aria-hidden="true">{icon}</span>
              <div>
                <p className="rep-card__t">
                  {t}
                  <span className={`rep-pill rep-pill--${state}`}>
                    {state === 'done' ? 'Solved' : 'Planned'}
                  </span>
                </p>
                <p className="rep-card__d">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Key Features"
        sub="Core gameplay mechanics designed to create an engaging and challenging experience."
      >
        <div className="rep-grid">
          {FEATURES.map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Technical Implementation" sub="Built with performance and scalability as core principles.">
        <div className="rep-grid">
          {IMPL.map(([t, items]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <div className="rep-card__rows">
                {items.map((i) => (
                  <span className="rep-card__row" key={i} style={{ display: 'block' }}>{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Visual Showcase" sub="Unity workspace, the three-lane system and the in-game UI.">
        <div className="rep-grid">
          {[['kingrun-arch', 'Unity workspace and scene hierarchy'], ['kingrun-hero', 'The King, objects, fences and coins across three lanes'], ['kingrun-physics', 'Movement, clamping and rigidbody configuration']].map(([k, cap]) => {
            const a = asset(k)
            return (
              <figure className="rep-fig" key={k} style={{ marginTop: 0 }}>
                <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
                <figcaption>{cap}</figcaption>
              </figure>
            )
          })}
        </div>
      </Section>

      <Section title="Results & Outcomes">
        <div className="rep-stats" style={{ marginTop: 0 }}>
          {[['60 FPS', 'Consistent performance with rigidbody physics and procedural generation'], ['100%', 'Modular architecture ready for VR/AR adaptation'], ['Unity 6', 'Built with latest engine features and C# best practices']].map(([v, k]) => (
            <div className="rep-stat" key={v}>
              <p className="rep-stat__v">{v}</p>
              <p className="rep-card__d" style={{ marginTop: '0.4rem' }}>{k}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Key Technical Learnings">
        <div className="rep-check">
          {LEARNINGS.map((l) => (
            <div className="rep-check__item" key={l}>
              <p className="rep-card__d" style={{ color: 'var(--text-secondary)' }}>{l}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Future Development Roadmap">
        <div className="rep-grid">
          {ROADMAP.map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
