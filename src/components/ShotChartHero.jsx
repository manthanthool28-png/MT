import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { site } from '../data/site.js'

/* ==========================================================================
   A live, miniature Court Vision 3D running in the hero.

   It demonstrates the same four ideas the case study argues for:
     spike height = eFG%   ·   colour-coded efficiency bands
     orbital camera        ·   progressive disclosure via zone filters
   Court geometry is to NBA scale (feet). Shot values are a deterministic
   synthetic distribution shaped like the real Dončić data — the full
   1,025-shot dataset lives in the linked prototype.
   ========================================================================== */

// Data encoding pulled from the site palette so the chart reads as part of the
// page rather than a foreign object. Lime = signal, off-white = neutral,
// grey = recedes.
const HIGH = 0xccff00
const MID = 0xf5f5f7
const LOW = 0x6e6e73

const COURT_W = 50 // ft
const COURT_L = 47 // ft
const HOOP = new THREE.Vector2(0, 5.25)
const ZONES = ['paint', 'mid', 'three']

/* Deterministic PRNG so the spike field is identical on every mount. */
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function zoneOf(x, z) {
  const d = Math.hypot(x - HOOP.x, z - HOOP.y)
  const corner = Math.abs(x) >= 22 && z <= 14
  if (d >= 23.75 || corner) return 'three'
  if (Math.abs(x) <= 8 && z <= 19) return 'paint'
  return 'mid'
}

/** Build the spike field: one bar per sampled court cell. */
function buildShots() {
  const rand = mulberry32(1025) // the shot count, as a seed
  const shots = []
  const step = 2.6
  for (let x = -24; x <= 24; x += step) {
    for (let z = 1.5; z <= 33; z += step) {
      const d = Math.hypot(x - HOOP.x, z - HOOP.y)
      if (d > 27.5) continue
      const zone = zoneOf(x, z)

      // Volume: heavy at the rim and along the arc, thin in the mid-range —
      // the shape of a modern NBA shot profile.
      let volume =
        Math.exp(-((d - 2) ** 2) / 26) * 1.0 +
        Math.exp(-((d - 24.6) ** 2) / 9) * 0.85 +
        0.12
      volume *= 0.75 + rand() * 0.5
      if (volume < 0.22) continue

      // Efficiency: eFG% by zone, with per-cell variance.
      let efg
      if (d < 4.5) efg = 0.6
      else if (zone === 'paint') efg = 0.46
      else if (zone === 'three') efg = 0.53
      else efg = 0.39
      efg += (rand() - 0.5) * 0.14
      efg = THREE.MathUtils.clamp(efg, 0.16, 0.72)

      shots.push({
        x: x + (rand() - 0.5) * 0.5,
        z: z + (rand() - 0.5) * 0.5,
        zone,
        efg,
        volume,
      })
    }
  }
  return shots
}

/** Court markings, painted once into a CanvasTexture. */
function courtTexture() {
  const S = 1024
  const c = document.createElement('canvas')
  c.width = S
  c.height = Math.round((S * COURT_L) / COURT_W)
  const g = c.getContext('2d')
  const px = S / COURT_W // pixels per foot
  const X = (ft) => (ft + COURT_W / 2) * px
  const Y = (ft) => c.height - ft * px

  g.fillStyle = '#131315'
  g.fillRect(0, 0, c.width, c.height)

  g.strokeStyle = 'rgba(245,245,247,0.42)'
  g.lineWidth = Math.max(2, px * 0.18)
  g.lineCap = 'round'

  // Boundary
  g.strokeRect(X(-25) + g.lineWidth / 2, Y(47), 50 * px - g.lineWidth, 47 * px)

  // Paint + free-throw circle
  g.strokeRect(X(-8), Y(19), 16 * px, 19 * px)
  g.beginPath()
  g.arc(X(0), Y(19), 6 * px, 0, Math.PI * 2)
  g.stroke()

  // Three-point line: corners + arc
  g.beginPath()
  g.moveTo(X(-22), Y(0))
  g.lineTo(X(-22), Y(14))
  g.arc(X(0), Y(5.25), 23.75 * px, Math.PI - Math.acos(22 / 23.75), Math.acos(22 / 23.75), true)
  g.moveTo(X(22), Y(14))
  g.lineTo(X(22), Y(0))
  g.stroke()

  // Restricted area + rim
  g.beginPath()
  g.arc(X(0), Y(5.25), 4 * px, Math.PI, 0, true)
  g.stroke()
  g.strokeStyle = 'rgba(204,255,0,0.7)'
  g.beginPath()
  g.arc(X(0), Y(5.25), 0.75 * px, 0, Math.PI * 2)
  g.stroke()

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

export default function ShotChartHero() {
  const mountRef = useRef(null)
  const canvasRef = useRef(null)
  const apiRef = useRef(null)
  const [active, setActive] = useState(() => new Set(ZONES))
  const [hover, setHover] = useState(null)

  /* ---------------- scene: built once ---------------- */
  useEffect(() => {
    const mount = mountRef.current
    const canvas = canvasRef.current
    if (!mount || !canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shots = buildShots()

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0b0b0c)
    scene.fog = new THREE.Fog(0x0b0b0c, 78, 170)

    const camera = new THREE.PerspectiveCamera(40, 1, 0.5, 400)
    const target = new THREE.Vector3(0, 2, 16)

    scene.add(new THREE.AmbientLight(0xffffff, 1.45))
    const key = new THREE.DirectionalLight(0xffffff, 1.15)
    key.position.set(18, 34, 12)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffffff, 0.22)
    rim.position.set(-20, 10, -14)
    scene.add(rim)

    // --- floor ---
    const tex = courtTexture()
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(COURT_W, COURT_L),
      new THREE.MeshBasicMaterial({ map: tex })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.z = COURT_L / 2
    scene.add(floor)

    // --- spikes ---
    const geo = new THREE.CylinderGeometry(1, 1, 1, 12)
    geo.translate(0, 0.5, 0) // base sits on the floor
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.95, metalness: 0 })
    const mesh = new THREE.InstancedMesh(geo, mat, shots.length)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(mesh)

    const colour = new THREE.Color()
    shots.forEach((s, i) => {
      s.height = 2.5 + (s.efg / 0.72) * 13
      s.radius = 0.6 + s.volume * 0.55
      s.scale = 1 // current, animated
      s.tScale = 1 // target
      colour.setHex(s.efg >= 0.52 ? HIGH : s.efg >= 0.44 ? MID : LOW)
      mesh.setColorAt(i, colour)
    })
    mesh.instanceColor.needsUpdate = true

    const dummy = new THREE.Object3D()
    function writeMatrices() {
      shots.forEach((s, i) => {
        dummy.position.set(s.x, 0, s.z)
        dummy.scale.set(s.radius * s.scale, Math.max(s.height * s.scale, 0.001), s.radius * s.scale)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
    }
    writeMatrices()

    // --- orbit state (hand-rolled: auto-rotate + drag, no addons) ---
    const BASE_THETA = -Math.PI / 2 + 0.55
    const orbit = { theta: BASE_THETA, elev: 0.58, radius: 70, dragging: false, taken: false }
    let px0 = 0
    let py0 = 0

    const onDown = (e) => {
      orbit.dragging = true
      orbit.taken = true // hand the camera over; stop the ambient drift
      px0 = e.clientX
      py0 = e.clientY
      canvas.setPointerCapture?.(e.pointerId)
    }
    const onUp = (e) => {
      orbit.dragging = false
      canvas.releasePointerCapture?.(e.pointerId)
    }
    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    let pendingPick = null

    const onMove = (e) => {
      if (orbit.dragging) {
        orbit.theta -= (e.clientX - px0) * 0.006
        orbit.elev = THREE.MathUtils.clamp(orbit.elev + (e.clientY - py0) * 0.004, 0.14, 1.35)
        px0 = e.clientX
        py0 = e.clientY
        pendingPick = null
        return
      }
      const r = canvas.getBoundingClientRect()
      pendingPick = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: -((e.clientY - r.top) / r.height) * 2 + 1,
      }
    }
    const onLeave = () => {
      pendingPick = null
      setHover(null)
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    // --- sizing ---
    function resize() {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    // --- loop, paused when off-screen ---
    let raf = 0
    let visible = true
    let last = performance.now()
    let hoverId = -1
    let drift = 0

    function frame(now) {
      raf = requestAnimationFrame(frame)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      // Ambient drift: +/-17 degrees over a 90s cycle, peaking at 1.2 deg/s.
      // The previous continuous spin ran at 4.3 deg/s, which read as an
      // animation demanding attention rather than a still object breathing.
      if (!reduceMotion && !orbit.dragging && !orbit.taken) {
        drift += dt
        orbit.theta = BASE_THETA + Math.sin(drift * 0.07) * 0.3
      }

      camera.position.set(
        target.x + orbit.radius * Math.cos(orbit.elev) * Math.cos(orbit.theta),
        target.y + orbit.radius * Math.sin(orbit.elev),
        target.z + orbit.radius * Math.cos(orbit.elev) * Math.sin(orbit.theta)
      )
      camera.lookAt(target)

      // Ease spikes toward their filtered target scale.
      let dirty = false
      for (const s of shots) {
        if (Math.abs(s.scale - s.tScale) > 0.001) {
          s.scale += (s.tScale - s.scale) * Math.min(dt * 7, 1)
          dirty = true
        } else if (s.scale !== s.tScale) {
          s.scale = s.tScale
          dirty = true
        }
      }
      if (dirty) writeMatrices()

      if (pendingPick) {
        ndc.set(pendingPick.x, pendingPick.y)
        raycaster.setFromCamera(ndc, camera)
        const hit = raycaster.intersectObject(mesh, false)[0]
        const id = hit && shots[hit.instanceId]?.scale > 0.5 ? hit.instanceId : -1
        if (id !== hoverId) {
          hoverId = id
          const s = id >= 0 ? shots[id] : null
          setHover(
            s
              ? {
                  efg: Math.round(s.efg * 1000) / 10,
                  zone: s.zone === 'three' ? '3PT' : s.zone === 'paint' ? 'Paint' : 'Mid-range',
                  dist: Math.round(Math.hypot(s.x - HOOP.x, s.z - HOOP.y)),
                }
              : null
          )
        }
      }

      renderer.render(scene, camera)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting
        if (nowVisible === visible) return
        visible = nowVisible
        if (visible) {
          last = performance.now()
          raf = requestAnimationFrame(frame)
        } else {
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0.05 }
    )
    io.observe(mount)
    raf = requestAnimationFrame(frame)

    apiRef.current = {
      applyFilter(set) {
        for (const s of shots) s.tScale = set.has(s.zone) ? 1 : 0
      },
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      geo.dispose()
      mat.dispose()
      floor.geometry.dispose()
      floor.material.dispose()
      tex.dispose()
      renderer.dispose()
      apiRef.current = null
    }
  }, [])

  /* ---------------- zone filters drive the scene ---------------- */
  useEffect(() => {
    apiRef.current?.applyFilter(active)
  }, [active])

  function toggle(zone) {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(zone)) next.delete(zone)
      else next.add(zone)
      // Never let the user empty the chart entirely.
      return next.size ? next : prev
    })
  }

  const labels = { paint: 'Paint', mid: 'Mid', three: '3PT' }

  return (
    <figure className="hero-viz">
      <div ref={mountRef} style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          className="hero-viz__canvas"
          role="img"
          aria-label="Interactive 3D basketball shot chart, a recreation of the Court Vision 3D prototype. Spikes rise from each court zone; spike height is effective field goal percentage and colour marks whether that zone scores above, near, or below average. Drag to orbit the court."
        />
        <div className="viz-legend" aria-hidden="true">
          <span><i style={{ background: '#CCFF00' }} />Above avg eFG%</span>
          <span><i style={{ background: '#F5F5F7' }} />Near avg</span>
          <span><i style={{ background: '#6E6E73' }} />Below avg</span>
        </div>
        <div className="viz-caption" aria-live="polite">
          {hover
            ? `${hover.zone} · ${hover.dist} ft · ${hover.efg}% eFG`
            : 'Drag to orbit · height = eFG%'}
        </div>
      </div>

      <figcaption className="hero-viz__bar">
        <div className="zone-pills" role="group" aria-label="Filter shot zones">
          {ZONES.map((z) => (
            <button
              key={z}
              type="button"
              className="zone-pill"
              aria-pressed={active.has(z)}
              onClick={() => toggle(z)}
            >
              {labels[z]}
            </button>
          ))}
        </div>
        <a className="hero-viz__link" href={site.livePrototype} target="_blank" rel="noreferrer noopener">
          Open live prototype ↗
        </a>
      </figcaption>
      {/* Said out loud, because the difference is real: this miniature bins the
          season into zones and colours them by efficiency band in the site
          palette. The shipped prototype plots every individual shot and colours
          by outcome. The encoding argument, height for efficiency, is the same
          in both; the colours are not. */}
      <p className="hero-viz__note">
        A recreation in this site&rsquo;s palette, binned into zones. The live build plots
        all 1,025 shots and colours them by made or missed.
      </p>
    </figure>
  )
}
