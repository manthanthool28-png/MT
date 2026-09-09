/* ==========================================================================
   An axonometric rendering of the Court Vision 3D shot chart, generated as
   plain SVG. Used as the project thumbnail so the card reads as the real
   thing (and stays crisp, tiny and theme-independent) rather than a stand-in.
   Geometry is projected from actual court coordinates in feet.
   ========================================================================== */

const A = 0.9 // horizontal shear
const B = 0.5 // vertical shear
const S = 11 // pixels per foot
const HOOP = { x: 0, z: 5.25 }

const project = (x, z, y = 0) => [(x - z) * A * S, (x + z) * B * S - y * S]

function rand(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function build() {
  const r = rand(2025)
  const spikes = []
  for (let x = -23; x <= 23; x += 3.1) {
    for (let z = 1.5; z <= 31; z += 3.1) {
      const d = Math.hypot(x - HOOP.x, z - HOOP.z)
      if (d > 27) continue
      let vol = Math.exp(-((d - 2) ** 2) / 24) + Math.exp(-((d - 24.6) ** 2) / 8) * 0.85 + 0.1
      vol *= 0.7 + r() * 0.6
      if (vol < 0.3) continue
      const corner = Math.abs(x) >= 22 && z <= 14
      const three = d >= 23.75 || corner
      const paint = Math.abs(x) <= 8 && z <= 19
      let efg = d < 4.5 ? 0.6 : three ? 0.53 : paint ? 0.46 : 0.39
      efg += (r() - 0.5) * 0.13
      spikes.push({
        x: x + (r() - 0.5) * 0.6,
        z: z + (r() - 0.5) * 0.6,
        h: 1.5 + Math.max(efg, 0.16) * 17,
        w: 2.2 + vol * 1.6,
        fill: efg >= 0.52 ? '#CCFF00' : efg >= 0.44 ? '#F5F5F7' : '#6E6E73',
      })
    }
  }
  // Painter's algorithm: smaller (x + z) sits further back.
  spikes.sort((a, b) => a.x + a.z - (b.x + b.z))
  return spikes
}

const SPIKES = build()

const floor = [
  [-25, 0],
  [25, 0],
  [25, 40],
  [-25, 40],
]

const paintBox = [
  [-8, 0],
  [8, 0],
  [8, 19],
  [-8, 19],
]

function arcPath() {
  const pts = []
  pts.push(project(-22, 0))
  pts.push(project(-22, 14))
  const start = Math.PI - Math.acos(22 / 23.75)
  const end = Math.acos(22 / 23.75)
  for (let i = 0; i <= 34; i++) {
    const a = start + ((end - start) * i) / 34
    pts.push(project(HOOP.x + 23.75 * Math.cos(a), HOOP.z + 23.75 * Math.sin(a)))
  }
  pts.push(project(22, 14))
  pts.push(project(22, 0))
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
}

const poly = (pts) => pts.map(([x, z]) => project(x, z).map((n) => n.toFixed(1)).join(',')).join(' ')

// Fit the viewBox to everything we actually drew.
const allPts = [
  ...floor.map(([x, z]) => project(x, z)),
  ...SPIKES.flatMap((s) => [project(s.x, s.z), project(s.x, s.z, s.h)]),
]
const xs = allPts.map((p) => p[0])
const ys = allPts.map((p) => p[1])
const PAD = 24
const VB = [
  Math.min(...xs) - PAD,
  Math.min(...ys) - PAD,
  Math.max(...xs) - Math.min(...xs) + PAD * 2,
  Math.max(...ys) - Math.min(...ys) + PAD * 2,
].map((n) => n.toFixed(1)).join(' ')

export default function CourtVisionArt({ title }) {
  return (
    <svg
      viewBox={VB}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title || 'Axonometric view of the Court Vision 3D shot chart: spikes rise from the half court, taller and amber at the rim and along the three-point arc.'}
    >
      <rect x={VB.split(' ')[0]} y={VB.split(' ')[1]} width="100%" height="100%" fill="#0B0B0C" />
      <polygon points={poly(floor)} fill="#131315" stroke="#F5F5F7" strokeOpacity="0.28" strokeWidth="1.2" />
      <polygon points={poly(paintBox)} fill="none" stroke="#F5F5F7" strokeOpacity="0.28" strokeWidth="1.2" />
      <path d={arcPath()} fill="none" stroke="#F5F5F7" strokeOpacity="0.28" strokeWidth="1.2" />
      <circle {...(() => { const [cx, cy] = project(HOOP.x, HOOP.z); return { cx, cy } })()} r="4" fill="none" stroke="#CCFF00" strokeOpacity="0.7" strokeWidth="1.4" />

      <g>
        {SPIKES.map((s, i) => {
          const [bx, by] = project(s.x, s.z)
          const w = s.w * S * 0.42
          const h = s.h * S
          return (
            <g key={i}>
              <rect x={bx - w / 2} y={by - h} width={w} height={h} rx={w / 2} fill={s.fill} opacity="0.92" />
              <ellipse cx={bx} cy={by - h} rx={w / 2} ry={w / 4} fill="#fff" opacity="0.16" />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
