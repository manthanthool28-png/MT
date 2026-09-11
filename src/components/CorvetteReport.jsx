import Reveal from './Reveal.jsx'
import { asset } from '../data/assets.js'

/* ==========================================================================
   The report, rendered in its own visual language rather than the
   site's. Content is transcribed from the submitted PDF.
   Section numbering follows the report exactly.
   ========================================================================== */

function Fig({ k, n, caption }) {
  const a = asset(k)
  return (
    <figure className="rep-fig">
      <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
      <figcaption>
        <i>Figure {n}:</i> {caption}
      </figcaption>
    </figure>
  )
}

function Section({ n, title, children }) {
  return (
    <section className="rep-section">
      <div className="rep-section__head">
        <span className="rep-num">{n}</span>
        <h2 className="rep-h">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function CorvetteReport() {
  const hero = asset('corvette-hero')
  return (
    <div className="wrap">
      <Reveal className="rep-head">
        <div className="rep-head__bg">
          <img src={hero.src} alt={hero.alt} />
        </div>
        <p className="rep-head__kicker">Digital Modelling &amp; Animation</p>
        <h1 className="rep-head__title">Cinematic Automotive Animation</h1>
        <p className="rep-head__meta">
          Manthan Thool
        </p>
      </Reveal>

      <div className="rep-stats">
        {[
          ['Duration', '13 sec'],
          ['Frames', '175'],
          ['Render time', '3.6 hrs'],
          ['Engine', 'Cycles'],
        ].map(([k, v]) => (
          <div className="rep-stat" key={k}>
            <p className="rep-stat__k">{k}</p>
            <p className="rep-stat__v">{v}</p>
          </div>
        ))}
      </div>

      <Section n="01" title="Introduction & Project Aims">
        <div className="rep-body">
          <p>
            This report documents the complete process and development of a 13-second
            cinematic animation featuring a high-performance sports car. The primary
            objective was to move beyond static 3D modelling and execute a full animation
            pipeline.
          </p>
          <p>
            The project was designed to create a beauty shot sequence, similar to those in
            professional car commercials, rather than just a technical exercise. The focus
            was on achieving a photorealistic, high-energy aesthetic through dynamic camera
            work and dramatic lighting.
          </p>
        </div>
        <div className="rep-grid">
          {[
            ['Asset Preparation', 'Taking a pre-existing 3D model and preparing it for a professional animation workflow.'],
            ['Mechanical Rigging', 'Building a functional vehicle rig to allow for realistic animation control.'],
            ['Studio Lighting', 'Mastering lighting techniques for reflective, hard-surface objects.'],
            ['Render Optimization', 'Managing settings to achieve quality within a practical timeframe.'],
          ].map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="02" title="Pre-Production & Asset Sourcing">
        <div className="rep-grid" style={{ marginTop: 0 }}>
          {[
            ['Strategic Asset Selection', 'The foundation was a high-quality vehicle model sourced from CGTrader. This decision bypassed the time-intensive modelling phase and concentrated effort on rigging, lighting and animation.'],
            ['Model Analysis', 'Inspection of topology and UV maps, checking for overlapping geometry, non-manifold edges and inconsistent polygon density. The model was organised into logical collections.'],
            ['Visual Reference', 'Reference images and videos from professional car commercials defined the visual language: high-contrast and moody, with dramatic shadows and flowing highlights.'],
          ].map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
        <Fig k="corvette-set" n="1" caption="Blender workspace with the imported model, scene hierarchy and initial configuration." />
      </Section>

      <Section n="03" title="Custom Vehicle Rigging">
        <div className="rep-body">
          <p>
            To bring the static model to life I built a vehicle rig, constructing it to gain
            a deeper understanding of mechanical constraints and driver-based relationships
            in Blender.
          </p>
        </div>
        <div className="rep-grid">
          {[
            ['Root Controller', "Main control object at the car's base for movement, rotation and scaling without breaking the rig."],
            ['Wheel Mechanics', 'Drivers linking wheel rotation to forward movement, creating realistic rolling automatically.'],
            ['Steering Control', 'A dedicated controller linked to front wheel rotation for intuitive steering through constraints.'],
          ].map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
        <Fig k="corvette-lighting" n="2" caption="Rigging hierarchy and constraint configuration. The outliner displays the parent-child relationship of the mechanical skeleton." />
      </Section>

      <Section n="04" title="Animation & Camera Work">
        <div className="rep-body">
          <p>
            The animation was planned over 175 frames at 24fps. The goal was to create a
            sense of motion and energy through camera movement rather than having the car
            travel a long distance.
          </p>
        </div>
        <div className="rep-grid">
          {[
            ['Keyframing Strategy', 'Subtle movements: a slow creep forward and slight wheel turn, implying the engine is running and ready to go.'],
            ['Camera Rig Setup', 'Camera parented to an empty with track-to constraints, creating smooth orbital movement while maintaining focus on the vehicle.'],
            ['Dynamic Movement', 'Sweeping camera motions combined with subtle car animation create the commercial-quality beauty shot aesthetic.'],
          ].map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n="05" title="Material Development & Shading">
        <div className="rep-body">
          <p>
            Creating a believable car paint shader was crucial. I used Blender&rsquo;s
            node-based material editor to build a multi-layered material that mimics
            real-world automotive paint with metallic flakes and a glossy clear coat.
          </p>
        </div>
        <div className="rep-grid">
          {[
            ['01 Base Coat', "Foundational colour layer determining the car's primary hue. Dark metallic grey with controlled roughness.", 'Diffuse BSDF', 'Color Mix'],
            ['02 Metallic Flakes', 'Subtle noise texture creating randomised metallic particles that catch light at different angles for depth.', 'Noise Texture', 'Metallic'],
            ['03 Clear Coat', 'Highly reflective top layer producing the wet, glossy finish and sharp reflections of professional automotive paint.', 'Glossy BSDF', 'Layer Weight'],
          ].map(([t, d, a, b]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
              <div className="rep-card__rows">
                <span className="rep-card__row">Node <b>{a}</b></span>
                <span className="rep-card__row">Control <b>{b}</b></span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="06" title="Studio Lighting Design">
        <div className="rep-body">
          <p>
            The lighting was designed to create drama and define the car&rsquo;s shape. I
            opted for a classic studio lighting setup instead of a simple outdoor
            environment, creating the high-contrast, commercial look seen in professional
            automotive photography.
          </p>
        </div>
        <div className="rep-grid">
          {[
            ['Key Light', 'Large, soft area light placed above the car acting as the primary source.', 'Area Light (Soft)', 'Top / Front', 'Broad Reflections'],
            ['Rim Lights', 'Two long, thin area lights placed on the sides and slightly behind the car.', 'Area Light (Strip)', 'Sides / Back', 'Edge Definition'],
            ['Fill Lights', 'Smaller, less intense lights used to gently illuminate shadow areas.', 'Point / Area (Small)', 'Various', 'Shadow Control'],
          ].map(([t, d, type, pos, purpose]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
              <div className="rep-card__rows">
                <span className="rep-card__row">Type <b>{type}</b></span>
                <span className="rep-card__row">Position <b>{pos}</b></span>
                <span className="rep-card__row">Purpose <b>{purpose}</b></span>
              </div>
            </div>
          ))}
        </div>
        <div className="rep-rule">
          <p className="rep-rule__t">Lighting philosophy</p>
          <p className="rep-rule__d">
            This deliberate three-point arrangement creates the long, bright ribbon
            highlights that streak across the side panels, clearly defining the
            vehicle&rsquo;s contours and separating it from the dark background. It is
            essential for achieving the high-contrast commercial aesthetic.
          </p>
        </div>
        <Fig k="corvette-lighting" n="3" caption="3D viewport displaying the full lighting rig with key light, rim lights and fill lights positioned around the vehicle." />
      </Section>

      <Section n="07" title="Rendering & Performance Analysis">
        <div className="rep-stats" style={{ marginTop: 0 }}>
          {[
            ['Total frames', '175'],
            ['Avg per frame', '75s'],
            ['Total time', '3.6h'],
            ['Memory / frame', '3.8GB'],
            ['Samples', '120'],
          ].map(([k, v]) => (
            <div className="rep-stat" key={k}>
              <p className="rep-stat__k">{k}</p>
              <p className="rep-stat__v">{v}</p>
            </div>
          ))}
        </div>
        <div className="rep-body" style={{ marginTop: '1.5rem' }}>
          <p>
            The final stage was rendering the 175-frame animation as a PNG image sequence,
            industry standard practice that preserves the highest visual quality without
            compression and provides crash protection.
          </p>
        </div>
        <div className="rep-check">
          {[
            ['Adaptive Sampling', 'Most impactful optimisation. Enabling a noise threshold allowed Blender to stop calculating clean areas early, so simple backgrounds finished in under a minute while complex reflections took the full duration.'],
            ['Light Path Reduction', 'Reduced maximum light bounces for transparent and volumetric materials. Since the scene is mostly opaque metal, extra bounces were unnecessary and wasteful.'],
            ['AI Denoising', 'OpenImageDenoise in compositing allowed rendering with fewer samples, then smoothing in post-processing, saving minutes per frame.'],
          ].map(([t, d]) => (
            <div className="rep-check__item" key={t}>
              <div>
                <p className="rep-card__t">{t}</p>
                <p className="rep-card__d">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rep-rule">
          <p className="rep-rule__t">Performance improvement</p>
          <p className="rep-rule__d">
            Initial test renders estimated 5 to 8 minutes per frame. Through optimisation
            this reduced to roughly 1 minute per frame, a crucial improvement for completing
            the project in a single evening session.
          </p>
        </div>
        <Fig k="corvette-render" n="4" caption="Render output window displaying frame-by-frame progress, timing data and memory usage statistics." />
      </Section>

      <Section n="08" title="Post-Production">
        <div className="rep-body">
          <p>
            Once the PNG sequence was fully rendered, I imported it into Blender&rsquo;s Video
            Sequence Editor to convert the 175 high-quality images into a final video file.
          </p>
        </div>
        <div className="rep-grid">
          {[
            ['Sequence Compilation', 'Assembled 175 individual PNG images into a seamless clip at 24 frames per second with exact frame timing.'],
            ['Color Grading', "Adjusted contrast and saturation to enhance the moody, cinematic look, with a subtle vignette to draw the viewer's eye to centre."],
            ['Sound Design', 'Added low engine rumble and subtle electronic music to complete the high-energy commercial atmosphere.'],
          ].map(([t, d]) => (
            <div className="rep-card" key={t}>
              <p className="rep-card__t">{t}</p>
              <p className="rep-card__d">{d}</p>
            </div>
          ))}
        </div>
        <div className="rep-rule">
          <p className="rep-rule__t">Final output specifications</p>
          <p className="rep-rule__d">
            Resolution 1920 × 1080 (Full HD) · Frame rate 24fps · Duration 13 seconds ·
            Codec H.264 (MP4)
          </p>
        </div>
      </Section>

      <Section n="09" title="Conclusion">
        <div className="rep-body">
          <p>
            This project was a comprehensive journey through the entire 3D animation
            pipeline. By strategically using a pre-made asset from CGTrader, I was able to
            focus my learning on the highly technical and artistic disciplines of rigging,
            lighting and rendering optimisation.
          </p>
          <p>
            Building the rig provided insight into mechanical animation, while the challenges
            of lighting a reflective object forced me to think like a photographer.
            Ultimately I produced a 175-frame cinematic animation that met my initial
            aesthetic goals. Although rendering took nearly 4 hours, understanding why it
            took that long and how to optimise it down was one of the most valuable technical
            lessons of the module.
          </p>
        </div>
        <div className="rep-grid">
          <div className="rep-card">
            <p className="rep-card__t">Technical skills acquired</p>
            <p className="rep-card__d">
              Custom mechanical rigging with constraints and drivers · advanced shader
              development for reflective surfaces · professional studio lighting for
              hard-surface objects · render optimisation and performance management.
            </p>
          </div>
          <div className="rep-card">
            <p className="rep-card__t">Artistic development</p>
            <p className="rep-card__d">
              Understanding commercial automotive aesthetics · dynamic camera work for
              cinematic storytelling · colour grading and post-production workflow · creating
              mood through lighting and composition.
            </p>
          </div>
        </div>
        <div className="rep-rule">
          <p className="rep-rule__d" style={{ fontStyle: 'italic' }}>
            “The greatest technical lesson wasn&rsquo;t just creating the animation, it was
            understanding the production pipeline well enough to optimise every stage for
            professional results.”
          </p>
        </div>
        <div className="rep-grid">
          <div className="rep-card">
            <p className="rep-card__t">Tools used</p>
            <p className="rep-card__d">
              Blender 4.0 (Cycles render engine) · CGTrader (3D asset sourcing) ·
              OpenImageDenoise (post processing).
            </p>
          </div>
          <div className="rep-card">
            <p className="rep-card__t">References</p>
            <p className="rep-card__d">
              CG Masters (2023). <i>3D Cars: Inside and Out in Blender.</i>
              <br />
              Lightmap (n.d.). <i>Blender Lighting Tutorial: Smart Car Studio Lighting.</i>
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}
