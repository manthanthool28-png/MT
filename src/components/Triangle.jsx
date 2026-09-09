/**
 * Personal logo mark and corner ornament.
 *
 * Both are achromatic on purpose. They used to be filled with Court Vision's
 * amber and teal, which put one project's branding on every page of a
 * three-project portfolio.
 */
export function Triangle({ size = 22 }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 21 L12 3 L22 21 Z"
        fill="none"
        stroke="var(--text-muted)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 3 L22 21 L12 21 Z" fill="var(--text)" />
      <path d="M7 21 L12 12 L12 21 Z" fill="var(--text-muted)" opacity="0.55" />
    </svg>
  )
}

export function CornerAccent({ placement = 'tr', size = 180 }) {
  const flip = placement === 'bl'
  return (
    <svg
      className={`corner-accent corner-accent--${placement}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
    >
      <g opacity="0.5" fill="none" stroke="var(--text-muted)">
        <path d="M120 0 L120 92 L28 0 Z" strokeWidth="0.8" opacity="0.45" />
        <path d="M120 0 L120 46 L74 0 Z" strokeWidth="0.8" opacity="0.3" />
        <path d="M120 52 L120 82 L90 52 Z" strokeWidth="0.8" opacity="0.25" />
      </g>
    </svg>
  )
}
