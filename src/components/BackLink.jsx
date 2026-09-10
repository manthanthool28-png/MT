import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Back control for every page below the root.
 *
 * Prefers real history (so it returns you to wherever you actually came from),
 * but falls back to a sensible parent when there is none — a deep link pasted
 * into a fresh tab has no history to go back to, and a dead button there is
 * worse than no button.
 */
function fallbackFor(pathname) {
  if (pathname.startsWith('/work/')) return { to: '/work', label: 'Work' }
  return { to: '/', label: 'Home' }
}

export default function BackLink() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const fallback = fallbackFor(pathname)

  // react-router records an index on history.state; 0 means we opened here.
  const hasHistory = (window.history.state?.idx ?? 0) > 0

  return (
    <div className="backbar">
      <div className="wrap">
        <button
          type="button"
          className="backbar__btn snap"
          onClick={() => (hasHistory ? navigate(-1) : navigate(fallback.to))}
        >
          <span aria-hidden="true">←</span>
          {hasHistory ? 'Back' : `Back to ${fallback.label}`}
        </button>
      </div>
    </div>
  )
}
