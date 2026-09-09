import { useEffect, useRef } from 'react'

/**
 * Liquid-deceleration reveal. One shared IntersectionObserver drives every
 * element on the page rather than one observer per element.
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const nodes = document.querySelectorAll('[data-reveal=""], [data-reveal-stagger=""]')
    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const attr = e.target.hasAttribute('data-reveal') ? 'data-reveal' : 'data-reveal-stagger'
          e.target.setAttribute(attr, 'in')
          e.target.addEventListener(
            'transitionend',
            () => e.target.classList.add('reveal-done'),
            { once: true }
          )
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    )
    nodes.forEach((n) => io.observe(n))

    // Failsafe: if the observer never fires (layout quirk, background tab,
    // zero-height container) nothing should stay invisible.
    const failsafe = setTimeout(() => {
      document.querySelectorAll('[data-reveal=""]').forEach((n) => n.setAttribute('data-reveal', 'in'))
      document
        .querySelectorAll('[data-reveal-stagger=""]')
        .forEach((n) => n.setAttribute('data-reveal-stagger', 'in'))
    }, 3000)

    return () => {
      clearTimeout(failsafe)
      io.disconnect()
    }
  })
}

export default function Reveal({ as: Tag = 'div', stagger = false, delay, children, ...rest }) {
  const attr = stagger ? { 'data-reveal-stagger': '' } : { 'data-reveal': '' }
  const style = delay ? { ...rest.style, '--reveal-delay': `${delay}ms` } : rest.style
  return (
    <Tag {...attr} {...rest} style={style}>
      {children}
    </Tag>
  )
}

/** Accent ring trailing the native pointer. Desktop + fine pointer only. */
export function CursorRing() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)').matches)
      return

    let x = 0
    let y = 0
    let raf = 0
    let running = false

    const draw = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      running = false
    }
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      el.setAttribute('data-active', '')
      const hot = e.target?.closest?.('a, button, [role="button"], input, select, textarea, .bento__item')
      if (hot) el.setAttribute('data-hot', '')
      else el.removeAttribute('data-hot')
      if (!running) {
        running = true
        raf = requestAnimationFrame(draw)
      }
    }
    const onLeave = () => el.removeAttribute('data-active')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return <div className="cursor-ring" ref={ref} aria-hidden="true" />
}

/**
 * Scroll transform — parallax depth behind typography.
 * Factor 0.3: the layer moves at 30% of scroll speed. rAF-throttled, and it
 * only runs while the element is on screen.
 */
export function useParallax(ref, factor = 0.3) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let active = true

    const apply = () => {
      raf = 0
      if (!active) return
      const y = window.scrollY * factor
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    // Stop paying for transforms once the hero is off screen.
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting }, { threshold: 0 })
    io.observe(el)

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref, factor])
}
