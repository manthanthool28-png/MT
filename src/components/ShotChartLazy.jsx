import { lazy, Suspense } from 'react'

/**
 * three.js is ~460 kB of the bundle and only the hero needs it, so it is
 * split into its own chunk and loaded after first paint. The fallback holds
 * the exact layout box so nothing shifts when the real canvas arrives.
 */
const ShotChartHero = lazy(() => import('./ShotChartHero.jsx'))

function Skeleton() {
  return (
    <div className="hero-viz" aria-hidden="true">
      <div className="hero-viz__canvas hero-viz__skeleton" />
      <div className="hero-viz__bar">
        <div className="zone-pills">
          {['Paint', 'Mid', '3PT'].map((z) => (
            <span className="zone-pill" key={z}>{z}</span>
          ))}
        </div>
        <span className="hero-viz__link">Loading shot data…</span>
      </div>
    </div>
  )
}

export default function ShotChartLazy() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ShotChartHero />
    </Suspense>
  )
}
