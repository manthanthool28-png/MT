import { useEffect, useState } from 'react'

/* ==========================================================================
   Back to top.

   Appears once you are far enough down that returning by scroll is a chore,
   and hides again near the top so it is not permanently in the way. Sits above
   the page but below the lightbox, which is a modal and owns the screen while
   it is open.
   ========================================================================== */

const SHOW_AFTER = 700 // px

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      /* Coalesce to one read per frame; scroll fires far more often than the
         answer can change. */
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setShow(window.scrollY > SHOW_AFTER)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? 'instant' : 'smooth' })
    /* Send focus back to the top of the document too, otherwise a keyboard user
       is visually at the top and tabbing from the bottom of the page. */
    const target = document.querySelector('main') || document.body
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      className="to-top"
      onClick={toTop}
      hidden={!show}
      aria-label="Back to top"
      title="Back to top"
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}
