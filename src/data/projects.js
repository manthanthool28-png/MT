// Ordered — drives the homepage, the /work grid and prev/next navigation.
export const projects = [
  {
    slug: 'court-vision-3d',
    featured: true,
    title: 'Court Vision 3D',
    tagline: 'A 3D basketball shot chart novices can actually read',
    summary:
      'An interactive 3D shot chart that turns 1,025 of Luka Dončić’s shots into a spatial landscape non-experts can orbit, filter and interpret.',
    description:
      'Interactive 3D shot chart built with Three.js and tested against a 2D baseline for cognitive load and engagement.',
    tags: ['3D', 'Data viz', 'Research'],
    tracks: ['thesis'],
    size: 'xl',
    thumb: { src: './assets/cv-broadcast.jpg', alt: 'The live Court Vision 3D prototype: a basketball half-court seen at an angle with coloured spikes rising from every shot location.' },
    meta: {
      Role: 'Sole designer and developer: research, IxD, front-end',
      Tools: 'Three.js, WebGL, Figma, NASA-TLX',
      Timeline: 'MSc thesis project, 2025–26',
      Context: 'CS6572, University of Limerick',
    },
  },
  {
    slug: 'tolet-globe',
    featured: true,
    title: 'To-Let Globe',
    tagline: 'Designing a zero-brokerage rental marketplace',
    summary:
      'A contract engagement designing the To-Let Globe platform \u2014 a zero-brokerage marketplace connecting owners and tenants directly across Kota, Lucknow, Ayodhya and Vellore \u2014 working from the founder\u2019s business model and leading a 22-person design team.',
    description:
      'Product design for a live zero-brokerage rental platform, built from a competitive read of the Indian property portals and shipped to production.',
    tags: ['Web platform', 'Team lead', 'Live'],
    tracks: ['product'],
    size: 'md',
    live: 'https://www.toletglobe.in/',
    thumb: { src: './assets/tolet-thumb.jpg', alt: 'To-Let Globe home page: a near-black layout with the heading Welcome to To-Let Globe, a city selector and search bar, and a line illustration of a house held in an open hand.' },
    meta: {
      Role: 'Design lead: product design, prototyping, dev handoff',
      Team: 'Led a 22-person design team',
      Tools: 'Figma, responsive web',
      Timeline: '2024 \u2013 present',
      Context: 'Contract engagement with the founder \u00b7 shipped and live',
    },
  },
  {
    slug: 'csis-portal',
    featured: true,
    title: 'CSIS Portal',
    tagline: 'One system, three very different users',
    summary:
      'A role-based departmental platform for Computer Science & Information Systems, designed so admins, staff and students each get a coherent view of the same system.',
    description:
      'Role-based web platform for a university department, with admin, staff and student experiences in one system.',
    tags: ['Systems', 'Web platform', 'UI design'],
    tracks: ['product'],
    size: 'md',
    thumb: { src: './assets/csis-admin-dash.jpg', alt: 'CSIS Portal admin dashboard with sidebar navigation, four statistic cards and University of Limerick green branding.' },
    meta: {
      Role: 'UX/UI designer',
      Tools: 'Figma, design tokens, responsive web',
      Timeline: '2025',
      Context: 'University of Limerick, CSIS department',
    },
  },
  {
    slug: 'laundry-xpress',
    title: 'Laundry Xpress',
    tagline: 'A laundry app, designed end to end in 48 hours',
    summary:
      'A laundry pickup and delivery app built by a team of four for a 48-hour design hackathon, from survey through user flow to a clickable high-fidelity prototype.',
    description:
      'Mobile laundry service app built in 48 hours for Dezignathon \u201923, from sign-up through scheduling, payment, tracking and support.',
    tags: ['Mobile', 'Hackathon', 'Product'],
    tracks: ['product'],
    size: 'md',
    thumb: { src: './assets/lx-thumb.jpg', alt: 'Four Laundry Xpress phone screens fanned at an angle: onboarding, the purple home screen, service selection and order tracking.' },
    meta: {
      Role: 'High-fidelity screens, prototype & presentation',
      Tools: 'Figma',
      Timeline: '2023 \u00b7 48 hours',
      Context: 'Dezignathon \u201923, a design hackathon run by TuteDude \u00b7 team of four',
    },
  },
  {
    slug: 'design-qualities',
    title: 'Design Qualities in Everyday Objects',
    tagline: 'Four principles, eight objects, one argument',
    summary:
      'An analysis of mapping, affordance, feedback and constraint through paired everyday objects, one that gets each principle right and one that gets it wrong.',
    description:
      'Interaction design principles analysed through paired everyday objects that succeed and fail at the same thing.',
    tags: ['IxD theory', 'Analysis', 'Writing'],
    tracks: ['product'],
    size: 'md',
    thumb: { src: './assets/dq-afford-good.jpg', alt: 'A blind passenger using the tactile platform edge to board a train.' },
    meta: {
      Role: 'Research and writing',
      Tools: 'Observational analysis',
      Timeline: '2025',
      Context: 'CS6431 Foundations of Interaction & Experience Design, University of Limerick',
    },
  },
  {
    slug: 'smart-shelf',
    featured: true,
    title: 'Smart Shelf Management System',
    tagline: 'Fifteen problem areas, one shelf that counts itself',
    summary:
      'A design-methods project run end to end \u2014 fifteen problem areas narrowed by mind-mapping and brainstorming, grounded in a pharmacist interview, built as an RFID and Arduino shelf, then tested with a cognitive walkthrough that sent it back for a predictive redesign.',
    description:
      'A full user-centred process from divergent problem-finding to a working RFID prototype, evaluated by cognitive walkthrough and redesigned into a budget-aware forecasting tool.',
    tags: ['Design research', 'Physical computing', 'RFID'],
    tracks: ['creative-tech'],
    size: 'md',
    thumb: { src: './assets/shelf-overview.jpg', alt: 'The MediStock AI dashboard showing procurement budget, reorder count and stockout risks.' },
    /* Prototype URLs are deliberately NOT stored here. The working prototypes
       are not opened to visitors; the case study shows static previews only.
       Note: removing the links does not make the Figma files private, that has
       to be changed in Figma's own sharing settings. */
    figma: {
      lofi: { title: 'Low-Fidelity Design and Sketches' },
      hifi: { title: 'AI Predictive Restocking Module' },
    },
    meta: {
      Role: 'Group project: research, interaction design, prototype',
      Methods: 'Mind-mapping, brainstorming, interviews, cognitive walkthrough',
      Tools: 'Arduino, RFID, ESP8266, Figma',
      Timeline: '2025',
      Context: 'CS6431 Foundations of Interaction & Experience Design, University of Limerick',
    },
  },
  {
    slug: 'cinematic-automotive',
    title: 'Cinematic Automotive Animation',
    tagline: 'Lighting a black car is the hard version of lighting',
    summary:
      'A 13-second automotive beauty shot in Blender: a mechanical vehicle rig, a layered paint shader, a three-point studio lighting design, and a render pipeline optimised from eight minutes a frame down to about one.',
    description:
      'Blender/Cycles automotive beauty shot: vehicle rig, layered paint shader, studio lighting and render optimisation.',
    tags: ['Blender', '3D', 'Animation'],
    tracks: ['film'],
    size: 'wide',
    video: 'https://www.youtube.com/embed/bc9JWHfhvVo',
    thumb: { src: './assets/corvette-hero.jpg', alt: 'Rendered frame of the car under studio strip lighting.' },
    meta: {
      Role: 'Rigging, shading, lighting, animation, render pipeline',
      Tools: 'Blender 4.0, Cycles, OpenImageDenoise',
      Timeline: 'December 2025',
      Context: 'CS4151 Digital Modelling & Animation, University of Limerick',
    },
  },
  {
    slug: 'king-run',
    title: 'King Run',
    tagline: 'An endless runner built as a VR/AR foundation',
    summary:
      'A 3D endless runner in Unity 6 that tests reflexes and spatial awareness, architected so lane changes can later be driven by head tracking rather than keys.',
    description:
      'Unity 6 endless runner with rigidbody movement, procedural level generation and a modular VR/AR-ready architecture.',
    tags: ['Unity', 'C#', 'VR/AR'],
    tracks: ['creative-tech'],
    size: 'md',
    video: 'https://www.youtube.com/embed/mPFqpOsAZ4I',
    thumb: { src: './assets/kingrun-hero.jpg', alt: 'The castle pathway in King Run.' },
    meta: {
      Role: 'Sole designer and developer',
      Tools: 'Unity 6, C#, Rigidbody physics, Mixamo',
      Timeline: 'December 2025',
      Context: 'CS4071 Virtual & Augmented Reality Design, University of Limerick',
    },
  },
  {
    slug: 'now-i-am-become-death',
    featured: true,
    title: 'Now I Am Become Death',
    tagline: 'Whitney\u2019s harmony, pointed at Trinity',
    summary:
      'A fifty-second generative animation in Processing, in three acts: cold harmonic geometry, a stochastic chain reaction, then a Perlin-noise detonation. Six algorithms, stochastically seeded, never the same twice.',
    description:
      'Generative animation in Processing built on John Whitney\u2019s differential harmonic motion, with the 1945 Trinity test as its narrative frame.',
    tags: ['Generative', 'Processing', 'Creative coding'],
    tracks: ['creative-tech'],
    /* Spans both columns: the piece is a 1.55:1 frame, and a full-width cell
       keeps the bento row count even now that this is the twelfth project. */
    size: 'wide',
    thumb: { src: './assets/vc-mandala.jpg', alt: 'Concentric rings of cold blue-white particles forming a mandala on black.' },
    video: './video/now-i-am-become-death.mp4',
    meta: {
      Role: 'Sole author: concept, algorithms, code, edit',
      Tools: 'Processing 4.x, Minim',
      Timeline: 'Submitted 8 May 2026',
      Context: 'CS4049 Creative Coding, University of Limerick',
    },
  },
  {
    slug: 'detachable-kaleidoscope',
    featured: true,
    title: 'Detachable Kaleidoscope',
    tagline: 'An interactive sculpture that had to work on the night',
    summary:
      'A group interactive sculpture where I owned the technical build: concept and direction, the full wiring, the Arduino setup, and the Pure Data interaction logic that made it respond reliably.',
    description:
      'Interactive sculpture built on Arduino and Pure Data, with the wiring and interaction logic as my contribution.',
    tags: ['Installation', 'Arduino', 'Pure Data'],
    tracks: ['creative-tech'],
    size: 'md',
    video: 'https://www.youtube.com/embed/QLhWnRbSY3s',
    thumb: { src: './assets/kal-tower.jpg', alt: 'The finished sculpture: five engraved octagonal modules stacked into a column with copper contact rings at every joint.' },
    meta: {
      Role: 'Technical lead on a group project: concept, electronics, interaction logic',
      Tools: 'Arduino, Pure Data, physical prototyping',
      Timeline: 'Interactive media module',
      Context: 'University of Limerick',
    },
  },
  {
    slug: 'algorithmic-soundscape',
    title: 'Algorithmic Soundscape',
    tagline: 'A card game turned into a scoring system',
    summary:
      'A live algorithmic music performance where UNO cards drive generative sound. Colours choose the instrument family, numbers set density, and special cards force tempo and effect changes.',
    description:
      'Live generative music performance with UNO cards mapped to musical parameters as the rule set.',
    tags: ['Interactive audio', 'Generative', 'Performance'],
    tracks: ['creative-tech'],
    size: 'md',
    video: 'https://www.youtube.com/embed/vi7EpUg3cZo',
    thumb: { src: './assets/interactive-hero.jpg', alt: 'A digital audio workstation with a dozen coloured, labelled audio tracks laid out across a timeline.' },
    meta: {
      Role: 'Concept, rule system and performance',
      Tools: 'Generative audio, live performance',
      Timeline: 'Interactive media module',
      Context: 'University of Limerick',
    },
  },
  {
    slug: 'videography',
    title: 'Videography',
    tagline: 'Pacing, camera movement, storytelling in the edit',
    summary:
      'Short films, ads and event coverage shot and cut end to end, including the Stik-ie tape advert and UL Diwali Festival 2025.',
    description:
      'Short films, ads and event coverage, shot and edited end to end.',
    tags: ['Film', 'Motion', 'Edit'],
    tracks: ['film'],
    size: 'md',
    thumb: { src: './assets/film-showreel.jpg', alt: 'Frame from the videography showreel.' },
    meta: {
      Role: 'Director, camera, editor',
      Tools: 'Adobe Premiere Pro',
      Timeline: '2024 to 2025',
      Context: 'Client and university work',
    },
  },
]

export const bySlug = (slug) => projects.find((p) => p.slug === slug)

export function neighbours(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  const len = projects.length
  return {
    prev: projects[(i - 1 + len) % len],
    next: projects[(i + 1) % len],
  }
}
