# Manthan Thool — Portfolio

Personal portfolio site. React + Vite, plain CSS with custom properties,
`HashRouter` for GitHub Pages, Three.js for the live shot-chart hero.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build locally
```

## Content integrity

Two rules this repo is built around, both of which cost real work to honour:

1. **No invented credentials.** The recognition archive in `src/data/resume.js`
   contains only awards documented on the actual resume. A creative-direction
   brief supplied fictional exhibitions and awards ("Best Innovative Research
   Presentation Award", "The Apex Digital Arts Pavilion", a Figma-sponsored first
   place) — none were added. Don't add an accolade here that isn't on the resume.
2. **No placeholder projects remain.** Three template entries once stood in for
   creative-technology and film work. They were replaced with real projects
   recovered from the previous portfolio repo (`Portfolio_Manthan`): Detachable
   Kaleidoscope, Algorithmic Soundscape and Videography. The `TemplateFlag`
   component still exists for future use; nothing currently sets `template: true`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, featured project, project grid, explorations strip |
| `/work` | All projects |
| `/work/court-vision-3d` | Case study |
| `/work/csis-portal` | Case study |
| `/work/laundry-xpress` | Case study |
| `/work/tolet-globe` | To-Let Globe — live zero-brokerage rental platform redesign |
| `/work/king-run` | King Run: Unity 6 endless runner, VR/AR-ready architecture |
| `/work/detachable-kaleidoscope` | Interactive sculpture on Arduino and Pure Data |
| `/work/algorithmic-soundscape` | Live generative performance scored by UNO cards |
| `/work/videography` | Short films, adverts and event coverage |
| `/vault` | Production media vault — masonry, hover previews, repo tiles |
| `/about` · `/resume` · `/contact` | Profile & manifesto, resume, contact terminal |

Rag Picker (Explorations) has no route by design — it is a strip on `/` and `/work`.

## Theme — Digital Museum Brutalism

The interface is an **invisible, high-contrast structural container**. Its job is
to make installation mockups and high-fidelity product screens pop, never to
compete with them.

### Deep Tech Gallery core matrix

| Token | Hex | Role | Applied to |
| --- | --- | --- | --- |
| `--canvas` | `#0B0B0C` | Deep matte carbon black | Viewport foundation, page wrap, case-study body blocks |
| `--component` | `#131315` | Dark studio shadow | Bento card backings, split-lane grounds, media mats |
| `--elevation` | `#1A1A1D` | Industrial charcoal | Spec grids, flow maps, callout boxes, stat cells |
| `--type-primary` | `#F5F5F7` | Studio off-white | Headings, thesis statements, timeline values, body |
| `--type-secondary` | `#9E9E9F` | Matte aluminium | Subtitles, descriptions, metadata (7.4:1 on canvas) |
| `--wireframe` | `#333336` | Utility border | 1px separators between bento cards, timeline splits |
| `--accent` | `#CCFF00` | Electric cyber lime | Active menu, hover, filter tags, selection, indicators |

`--text-muted` is aliased to `--type-secondary`: the matrix defines a single
secondary tier, so there is no third grey.

**One addition the matrix doesn't cover.** `#333336` is only **1.6:1** against
the canvas. That's correct for decorative separators, but WCAG 1.4.11 requires
**3:1** for the boundary of any control you need to see to use — filter pills,
outline buttons, the theme toggle. Those use `--line-strong: #6E6E73` (3.9:1)
while every structural separator keeps the spec value. Don't collapse the two.

The light theme is the inverted counterpart: canvas `#F5F5F7`, secondary type
`#5E5E63` (5.9:1), and accent `#4A5C00` — lime on off-white is **1.1:1** and
unusable as text.

**Accent is functional only** — cursor ring, active selectors, filter state,
links, focus rings. It is never decoration and never a project's brand colour.
Note the light-mode divergence: lime on off-white is **1.1:1** and unusable as
text, so light mode substitutes a dark olive. Don't "fix" that back to `#CCFF00`.

**The 3D chart uses the shell palette too.** Court Vision's original amber/teal
were kept as "data encoding" for a while, but warm amber against matte black and
lime read as a foreign object dropped onto the page. The three efficiency bands
are now `--viz-high` `#CCFF00` (above average — the signal), `--viz-mid`
`#F5F5F7` (near average) and `--viz-low` `#6E6E73` (below average, recedes).
Same three-way categorical encoding, one palette.

Its ambient camera drift is deliberately slow: **±17 degrees over a 90s cycle,
peaking at 1.2 deg/s**. It ran at a constant 4.3 deg/s before, which read as an
animation demanding attention rather than a still object breathing. The drift
also stops permanently the moment someone drags, so it never fights the user.

**Typography engine:** Space Grotesk (wide geometric) for headers, Inter
(neo-grotesque) for case-study breakdowns, and the system mono stack — which
resolves to SF Mono on Apple hardware — for data feeds, component labels and
hardware matrices.

**Motion:** liquid deceleration (`cubic-bezier(0.16, 1, 0.3, 1)` at 1.05s) for
layout glide. Component triggers use a real spring — damping 40, stiffness 400,
mass 1. That is `omega0 = 20 rad/s` and `zeta = 1.0`, i.e. **critically damped**:
it settles hard with no overshoot in ~350ms. It is expressed as a CSS
`linear()` easing sampled from `x(t) = 1 - (1 + omega0*t)*e^(-omega0*t)` every
25ms, with a `cubic-bezier` fallback behind `@supports`. Parallax layers use a
scroll transform factor of `0.3`. Native scrolling is deliberately
**not** hijacked — smooth-scroll libraries break keyboard paging, find-in-page
and screen readers, so the inertia lives in the reveal easing instead.

Two robustness notes on the reveal system, both learned the hard way:

- The hidden state is scoped to `html.js`. Without that, a JS failure leaves
  every revealed element stuck at `opacity: 0` and the page renders blank.
- A 3s failsafe force-reveals everything, because `IntersectionObserver` does
  not fire at all in a backgrounded tab.

The case-study TOC uses scroll position rather than `IntersectionObserver` for
the same reason, and re-measures on `visibilitychange`.

Every text pairing on every route in both themes is verified at >= 4.5:1
(>= 3:1 for large text).

## The hero

`src/components/ShotChartHero.jsx` is a real Three.js scene, not a video: NBA-scale
half court, one instanced spike per court cell, height = eFG%, colour = efficiency
band (amber/teal/grey), constrained orbital camera, working Paint/Mid/3PT filters
and hover read-out. This panel is the one place the Court Vision palette appears,
and it keeps its dark ground in both themes. The shot distribution is a deterministic synthetic stand-in shaped like
the real data — the full 1,025-shot dataset lives in the linked prototype.

It is loaded via `React.lazy` (`ShotChartLazy.jsx`) so Three.js sits in its own
chunk, pauses its render loop off-screen via `IntersectionObserver`, and skips
auto-rotation under `prefers-reduced-motion`.

*The original brief called for a looping MP4 here. If you'd rather ship video,
replace the `<ShotChartHero />` in `src/pages/Home.jsx` with a `<video autoplay
muted loop playsinline>` — but you'd lose the working filters.*

## Swapping in real assets

Every image is declared once in **`src/data/assets.js`**. Anything with
`pending: true` is a generated placeholder, and the UI says so out loud wherever
one appears — nothing ships silently looking finished.

To replace one:

1. Drop the real file into `public/assets/`
2. Update `src` and `alt` in `src/data/assets.js`, set `pending: false`

`node scripts/gen-placeholders.mjs` regenerates placeholders for whatever is
still pending.

Recovered from the previous portfolio repo (`~/Desktop/Portfolio_Manthan-fix`,
origin `Portfolio_Manthan.git`): the portrait, videography stills and the
interactive-sculpture still, all resized on import (originals were 2 to 7 MB).

Still needed: To-Let Globe screens (home, property types, listing, mobile),
CSIS Portal screens (thumb, login, dashboard, admin, CMS, mobile),
Laundry Xpress screens (thumb, personas, signup, schedule, payment, status,
desktop), Court Vision 3D captures (5 decision screenshots + the 2D baseline),
2 Rag Picker wireframes, a profile photo, and the NASA-TLX / accuracy /
engagement figures in the Court Vision 3D Outcomes section.

The resume is real: `public/resume/Manthan-Thool-Resume.pdf` is the two-page
export, and `src/data/resume.js` mirrors its content for the on-page `/resume`
view. Update both together when the PDF changes.

Court Vision 3D's card thumbnail is **not** a placeholder — `CourtVisionArt.jsx`
generates it as SVG from projected court coordinates.

## Layout spec

Values that are pinned rather than eyeballed, and which a redesign should
preserve deliberately:

| | value |
| --- | --- |
| Nav | `position: fixed`, `80px` tall (64px under 620px), 40px side padding, Primary fill grading to transparent, Space Mono links |
| Hero | `100svh - nav`, vertically centred / left aligned, 8% side padding, title `clamp(40px, 6vw, 96px)` at `0.95` line-height, subtitle Inter `20px` |
| Bento | 2 columns desktop / 1 mobile, `32px` gap, `1600px` max width, 1px `Border/System` per card |
| Bento hover | border to `Accent/Cyber`, `scale(1.02)`, media opacity `0.75` to `1.0`, spring transition |

`main` carries `padding-top: var(--nav-h)` because the fixed nav is out of flow.

**A note on the Framer guide these came from.** The spec was written for Framer
(Color Styles panel, Utility-panel Embed component, native Video component).
This project is React + Vite, so the design intent was translated: Color Styles
became CSS custom properties, the Embed component became `Embedder.jsx`, and the
Framer Video component became native `<video>` with the same muted/loop/
playsinline/opacity behaviour. Nothing about the visual result differs.

## Media vault

`src/data/vault.js` drives `/vault`. Each item has a `video` field that is
currently `null`, so the poster placeholder shows and a "Poster only" badge
appears. **Drop an MP4 into `public/` and set `video` to its path** — the
hover-preview, scale-on-hover and full-screen player all activate with no other
change. The same is true of the installation page's locked media lane: point
`install-hero` at a video and set `pending: false`, and the unmute control
wires itself up.

`repos` in the same file holds the external link tiles. The Figma URL is `null`
and renders as a dashed, non-clickable tile until you paste one in.

## Deploying to GitHub Pages

`vite.config.js` uses `base: './'`, so the build works both as a user site
(`manthanthool28-png.github.io`) and as a project repo, with no config change.
`HashRouter` means no server-side rewrite rules are needed.

```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```

Then point Pages at the `gh-pages` branch in the repo settings. For a user site,
push the built output to `main` on the `manthanthool28-png.github.io` repo instead.
