import { useEffect, useRef } from 'react'

/* ==========================================================================
   Pointer-reactive field behind the hero.

   A grid of nodes that swell, brighten and push away from the pointer. The
   headline says "spatial systems", so the background is a spatial system
   rather than decoration.

   Rules it has to obey:
   - prefers-reduced-motion: draw one static frame, never start a loop.
   - No fine pointer (touch): drift slowly on its own instead of sitting dead.
   - Off-screen: stop the loop entirely, do not burn frames behind the fold.
   - Settled: once the field has relaxed and the pointer has left, stop.
   - Theme: colours are read from CSS custom properties and re-read when the
     theme attribute changes, so it is never hardcoded to one palette.
   ========================================================================== */

const SPACING = 46      // px between nodes at 1x
const RADIUS = 170      // px of pointer influence
const BASE = 1.6        // node size at rest
const PEAK = 5.2        // node size directly under the pointer
const PUSH = 16         // px of displacement at the centre of the field
const EASE = 0.12       // per-frame approach rate toward the target

function readColours(el) {
  const cs = getComputedStyle(el)
  const pick = (name, fallback) => (cs.getPropertyValue(name).trim() || fallback)
  return { line: pick('--line', '#2a2a2e'), accent: pick('--accent', '#ccff00') }
}

/* Accepts #rgb, #rrggbb and rgb()/rgba(); returns [r,g,b]. */
function toRgb(c) {
  if (c.startsWith('#')) {
    let h = c.slice(1)
    if (h.length === 3) h = h.split('').map((x) => x + x).join('')
    const n = parseInt(h.slice(0, 6), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }
  const m = c.match(/rgba?\(([^)]+)\)/)
  if (m) {
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number)
    return [p[0] || 0, p[1] || 0, p[2] || 0]
  }
  return [128, 128, 128]
}

export default function ReactiveField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')

    let nodes = []
    let w = 0, h = 0, dpr = 1
    let colours = readColours(document.documentElement)
    let lineRgb = toRgb(colours.line)
    let accentRgb = toRgb(colours.accent)

    /* Pointer lives in canvas space. Off-field is represented by a huge
       distance rather than null, so the maths has no special case. */
    const p = { x: -9999, y: -9999 }
    let raf = 0
    let running = false
    let visible = true
    let idleFrames = 0
    let t = 0

    function build() {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      nodes = []
      const cols = Math.ceil(w / SPACING) + 1
      const rows = Math.ceil(h / SPACING) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING
          const y = j * SPACING
          nodes.push({ x, y, dx: 0, dy: 0, s: BASE, tdx: 0, tdy: 0, ts: BASE })
        }
      }
    }

    function frame() {
      t += 1
      let moved = false

      /* Without a fine pointer there is nothing to react to, so the field
         breathes on a slow sine instead of staying inert. */
      const drift = !finePointer.matches
      const px = drift ? w * (0.5 + 0.34 * Math.sin(t / 190)) : p.x
      const py = drift ? h * (0.5 + 0.26 * Math.cos(t / 145)) : p.y

      ctx.clearRect(0, 0, w, h)

      for (const n of nodes) {
        const ox = n.x - px
        const oy = n.y - py
        const d2 = ox * ox + oy * oy
        const r2 = RADIUS * RADIUS

        if (d2 < r2) {
          const d = Math.sqrt(d2) || 0.001
          const f = 1 - d / RADIUS            // 1 at the centre, 0 at the edge
          const e = f * f                     // bias the falloff toward the centre
          n.ts = BASE + (PEAK - BASE) * e
          n.tdx = (ox / d) * PUSH * e
          n.tdy = (oy / d) * PUSH * e
        } else {
          n.ts = BASE
          n.tdx = 0
          n.tdy = 0
        }

        n.s += (n.ts - n.s) * EASE
        n.dx += (n.tdx - n.dx) * EASE
        n.dy += (n.tdy - n.dy) * EASE

        if (Math.abs(n.s - n.ts) > 0.01 || Math.abs(n.dx - n.tdx) > 0.05) moved = true

        /* Lerp toward the accent as a node swells, so proximity reads as
           colour as well as size. */
        const k = Math.min(1, (n.s - BASE) / (PEAK - BASE))
        const r = Math.round(lineRgb[0] + (accentRgb[0] - lineRgb[0]) * k)
        const g = Math.round(lineRgb[1] + (accentRgb[1] - lineRgb[1]) * k)
        const b = Math.round(lineRgb[2] + (accentRgb[2] - lineRgb[2]) * k)
        ctx.fillStyle = `rgb(${r},${g},${b})`
        const s = n.s
        ctx.fillRect(n.x + n.dx - s / 2, n.y + n.dy - s / 2, s, s)
      }

      /* Stop once nothing is changing and the pointer has gone, rather than
         holding a rAF loop open for a still image. */
      if (drift) idleFrames = 0
      else idleFrames = moved || p.x > -9000 ? 0 : idleFrames + 1

      if (!visible || idleFrames > 30) { running = false; return }
      raf = requestAnimationFrame(frame)
    }

    function start() {
      if (running || reduce.matches || !visible) return
      running = true
      idleFrames = 0
      raf = requestAnimationFrame(frame)
    }

    function still() {
      /* One frame, no loop: the reduced-motion rendering. */
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = colours.line
      for (const n of nodes) ctx.fillRect(n.x - BASE / 2, n.y - BASE / 2, BASE, BASE)
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      p.x = e.clientX - rect.left
      p.y = e.clientY - rect.top
      start()
    }
    function onPointerLeave() {
      p.x = -9999
      p.y = -9999
      start()
    }

    function refresh() {
      build()
      /* Always paint the resting grid synchronously first. requestAnimationFrame
         does not run in a hidden tab or a suspended embedding context, and a
         field that only exists inside the loop would render as nothing at all
         in those cases rather than as a still grid. */
      still()
      if (!reduce.matches) start()
    }

    refresh()

    const ro = new ResizeObserver(refresh)
    ro.observe(canvas)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    /* The palette changes under us when the theme toggles. */
    const mo = new MutationObserver(() => {
      colours = readColours(document.documentElement)
      lineRgb = toRgb(colours.line)
      accentRgb = toRgb(colours.accent)
      if (reduce.matches) still()
      else start()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })
    reduce.addEventListener('change', refresh)

    return () => {
      cancelAnimationFrame(raf)
      running = false
      ro.disconnect(); io.disconnect(); mo.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      reduce.removeEventListener('change', refresh)
    }
  }, [])

  return <canvas className="field" ref={canvasRef} aria-hidden="true" />
}
