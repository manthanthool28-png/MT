import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/* Scroll management across route changes.

   The previous version passed behavior: 'instant' in window ? 'instant' : 'auto'.
   'instant' is not a property of window, so that test is always false and the
   call fell through to 'auto', which defers to CSS scroll-behavior — and the
   root element sets that to smooth. The result was that every navigation,
   including Back, animated a long scroll before the new page appeared.

   'instant' is a valid scroll behaviour and overrides the CSS value, so it is
   passed unconditionally now. On a POP (Back or Forward) the saved offset for
   that history entry is restored instead of jumping to the top, which is what
   Back is expected to do. */
const KEY = 'scrollpos:'

export default function ScrollToTop() {
  const { pathname, key } = useLocation()
  const navType = useNavigationType()

  /* Record where each history entry was left, so POP can return to it. */
  useEffect(() => {
    const save = () => {
      try { sessionStorage.setItem(KEY + key, String(window.scrollY)) } catch { /* private mode */ }
    }
    window.addEventListener('pagehide', save)
    return () => { save(); window.removeEventListener('pagehide', save) }
  }, [key])

  useEffect(() => {
    let top = 0
    if (navType === 'POP') {
      try {
        const saved = sessionStorage.getItem(KEY + key)
        if (saved !== null) top = parseInt(saved, 10) || 0
      } catch { /* private mode */ }
    }
    window.scrollTo({ top, left: 0, behavior: 'instant' })
  }, [pathname, key, navType])

  return null
}
