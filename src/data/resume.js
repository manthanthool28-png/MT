/* Mirrors the PDF at public/resume/Manthan-Thool-Resume.pdf. Keep the two in
   sync — this is what the /resume page renders on-page. */

export const profile =
  'UI/UX and product designer with a B.E. in Computer Engineering and a recently completed Master’s in Interaction and Experience Design. Experienced in designing responsive web interfaces, user flows, prototypes, design systems and visual assets in Figma. Comfortable collaborating with developers and cross-functional teams, leading design work, and iterating from feedback.'

export const experience = [
  {
    title: 'UI/UX Designer, Team Lead',
    org: 'To-Let Globe, Lucknow, India',
    when: 'Apr 2024 – Present',
    points: [
      'Led a 22-member design team across interface design projects, reviews, delivery coordination and quality standards.',
      'Translated requirements into user flows, wireframes, high-fidelity screens, prototypes and reusable interface patterns.',
      'Collaborated with developers, content writers and UX contributors to clarify requirements and support implementation.',
      'Reviewed design output and gave practical feedback on usability, visual hierarchy, consistency and interaction quality.',
      'Managed timelines and moved projects from early concepts to delivery with limited supervision.',
      'Mentored team members through design guidance, critique and structured collaboration.',
    ],
  },
  {
    title: 'UI/UX Designer, Intern',
    org: 'To-Let Globe, Lucknow, India',
    when: 'Mar 2024 – Apr 2024',
    points: [
      'Redesigned the company website in Figma with clearer information hierarchy, navigation and responsive layout structure.',
      'Created wireframes, mockups, interactive prototypes and micro-interaction concepts for stakeholder review.',
      'Iterated from feedback and prepared interface decisions for collaboration with developers and content teams.',
      'Identified usability and visual-consistency issues early and proposed improvements during design reviews.',
    ],
  },
]

export const education = [
  {
    title: 'MSc Interaction & Experience Design',
    org: 'University of Limerick, Ireland',
    when: '2025 – 2026',
    note: 'Supervised by Dr. Nicholas Ward. Transforming familiar 2D sports data visualisations into interactive 3D experiences for non-expert users.',
  },
  {
    title: 'B.E. Computer Engineering',
    org: 'AISSMS College of Engineering, Pune, India',
    when: '2022',
    note: 'CGPA 7.7.',
  },
]

export const skills = [
  {
    heading: 'UX / Product',
    items: 'User-centred design, user flows, information architecture, wireframing, prototyping, usability testing, interaction design, responsive design, accessibility, design documentation.',
  },
  {
    heading: 'UI / Visual',
    items: 'Visual hierarchy, typography, layout, design systems, component thinking, micro-interactions, high-fidelity interface design, visual communication.',
  },
  {
    heading: 'Tools',
    items: 'Figma, FigJam, Framer, Adobe Premiere Pro, VS Code, Git/GitHub.',
  },
  {
    heading: 'Technical',
    items: 'HTML, CSS, JavaScript, TypeScript, React, Three.js, responsive front-end development, interactive prototyping.',
  },
  {
    heading: 'Physical computing & creative coding',
    items: 'Arduino (sensors, actuators, microcontroller prototypes), Pure Data (audio programming, signal processing), Processing (visual coding, generative visuals, interactive installations).',
  },
  {
    heading: 'Collaboration',
    items: 'Cross-functional collaboration, design critique, stakeholder communication, team leadership, mentoring, feedback-driven iteration.',
  },
]

export const awards = [
  { title: 'UL Hackathon: Special Designer Award and Second Place', when: '2025' },
  { title: 'IFP Design Hackathon: Top 20', when: '2024' },
  { title: 'Design Fusion Hackathon: Top 5', when: '2023' },
  { title: 'TuteDude Design Hackathon: Winner', when: '2022' },
]

export const languages = ['English', 'Hindi', 'Marathi']

/* Recognition archive — rendered on the homepage timeline.
   Every entry is taken from the resume. Nothing is added here that isn't
   documented there; invented exhibitions and awards are a liability on a
   portfolio that goes to employers. */
export const recognition = [
  {
    year: '2025',
    kind: 'Hackathon',
    title: 'Special Designer Award & Second Place',
    venue: 'UL Hackathon, University of Limerick',
    note: 'Awarded for design work produced under a fixed-time team sprint.',
  },
  {
    year: '2024',
    kind: 'Design competition',
    title: 'Top 20',
    venue: 'IFP Design Hackathon',
  },
  {
    year: '2023',
    kind: 'Design competition',
    title: 'Top 5',
    venue: 'Design Fusion Hackathon',
  },
  {
    year: '2022',
    kind: 'Design competition',
    title: 'Winner',
    venue: 'TuteDude Design Hackathon',
  },
]
