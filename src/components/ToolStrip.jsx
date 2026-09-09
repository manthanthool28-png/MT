/* ==========================================================================
   Toolkit strip: the tools behind the work, pictorially.

   Glyphs are drawn here rather than pulled from brand assets: monochrome
   marks on the site palette, because a row of full-colour vendor logos would
   drop ten competing hues onto a shell built specifically to have none.
   Every glyph uses currentColor so hover can tint it, and in light mode hover
   swaps in that tool's own brand colour (see .tools__cell[data-tool] in
   brutalist.css) so the colour is a reward for pointing rather than a
   permanent decoration.

   Only tools listed on the resume appear here.
   ========================================================================== */

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round', strokeLinecap: 'round' }

/* The five Figma lobes are individually classed so light mode can restore the
   real brand colours on hover; at rest they are tonal steps of currentColor. */
const Figma = () => (
  <g fill="currentColor">
    <path className="fig-a" d="M12 2H8.7a3.3 3.3 0 0 0 0 6.6H12z" />
    <path className="fig-b" d="M12 2h3.3a3.3 3.3 0 0 1 0 6.6H12z" opacity="0.6" />
    <path className="fig-c" d="M12 8.6H8.7a3.3 3.3 0 0 0 0 6.7H12z" opacity="0.8" />
    <circle className="fig-d" cx="15.3" cy="12" r="3.3" opacity="0.6" />
    <path className="fig-e" d="M12 15.3H8.7a3.3 3.3 0 1 0 3.3 3.4z" opacity="0.45" />
  </g>
)

const Framer = () => (
  <g fill="currentColor">
    <path d="M5 2h14v7h-7z" />
    <path d="M5 9h14l-7 7H5z" opacity="0.7" />
    <path d="M12 16v6l-7-6z" opacity="0.45" />
  </g>
)

const ReactMark = () => (
  <g {...S}>
    <ellipse cx="12" cy="12" rx="9.5" ry="3.7" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
  </g>
)

const ThreeJs = () => (
  <g {...S}>
    <path d="M12 2.4 3.5 17.9h17z" />
    <path d="M12 2.4v15.5M3.5 17.9 12 21.6l8.5-3.7" />
  </g>
)

const Ts = () => (
  <g>
    <rect x="2.6" y="2.6" width="18.8" height="18.8" {...S} />
    <text x="12" y="15.9" textAnchor="middle" fontFamily="monospace" fontSize="8.6" fontWeight="700" fill="currentColor">TS</text>
  </g>
)

const Arduino = () => (
  <g {...S}>
    <path d="M12 12c2.1-3.6 3.7-5 6-5a5 5 0 0 1 0 10c-2.3 0-3.9-1.4-6-5-2.1-3.6-3.7-5-6-5a5 5 0 0 0 0 10c2.3 0 3.9-1.4 6-5z" />
    <path d="M4.4 12h3.2M16.4 12h3.2M18 10.4v3.2" />
  </g>
)

const PureData = () => (
  <g {...S}>
    <rect x="2.6" y="3" width="7.6" height="5.4" />
    <rect x="13.8" y="15.6" width="7.6" height="5.4" />
    <path d="M6.4 8.4v3.2c0 3.4 2.8 3.4 5.6 3.4h5.6" />
    <circle cx="6.4" cy="11" r="0.9" fill="currentColor" stroke="none" />
  </g>
)

const Processing = () => (
  <g {...S}>
    <rect x="2.6" y="2.6" width="18.8" height="18.8" />
    <path d="M9.6 7.4c-2.2 2.6-2.2 6.6 0 9.2M14.4 7.4c2.2 2.6 2.2 6.6 0 9.2" />
  </g>
)

const Premiere = () => (
  <g>
    <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" {...S} />
    <text x="12" y="15.9" textAnchor="middle" fontFamily="monospace" fontSize="8.6" fontWeight="700" fill="currentColor">Pr</text>
  </g>
)

const Git = () => (
  <g {...S}>
    <circle cx="7" cy="5.2" r="2.3" />
    <circle cx="7" cy="18.8" r="2.3" />
    <circle cx="17" cy="10.4" r="2.3" />
    <path d="M7 7.5v9M9.3 10.4H12c1.7 0 2.7 0 2.7 0" />
    <path d="M7 12.6c0-2.4 1.6-2.2 3.6-2.2h4.1" />
  </g>
)

const TOOLS = [
  { name: 'Figma', Icon: Figma },
  { name: 'Framer', Icon: Framer },
  { name: 'React', Icon: ReactMark },
  { name: 'TypeScript', Icon: Ts },
  { name: 'Three.js', Icon: ThreeJs },
  { name: 'Arduino', Icon: Arduino },
  { name: 'Pure Data', Icon: PureData },
  { name: 'Processing', Icon: Processing },
  { name: 'Premiere Pro', Icon: Premiere },
  { name: 'Git', Icon: Git },
]

export default function ToolStrip() {
  return (
    <ul className="tools" aria-label="Tools used across this work">
      {TOOLS.map(({ name, Icon }, i) => (
        <li className="tools__cell" data-tool={name} key={name}>
          <svg viewBox="0 0 24 24" className="tools__glyph" aria-hidden="true" focusable="false">
            <Icon />
          </svg>
          <span className="tools__name">{name}</span>
          <span className="tools__idx">{String(i + 1).padStart(2, '0')}</span>
        </li>
      ))}
    </ul>
  )
}
