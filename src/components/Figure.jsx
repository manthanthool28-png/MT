import { asset } from '../data/assets.js'

/**
 * A case-study screenshot in its neutral mat. Every project's own palette
 * (UL green, Laundry Xpress purple) sits against near-black or cream — never
 * a flat amber or teal block.
 *
 * If the asset is still a generated placeholder, the caption says so out loud.
 */
export default function Figure({ assetKey, caption, label, eager = false }) {
  const a = asset(assetKey)
  return (
    <figure className="figure">
      <div className="figure__frame">
        <img
          src={a.src}
          alt={a.alt}
          width={a.w}
          height={a.h}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {(caption || label) && (
        <figcaption>
          {label && <b>{label}: </b>}
          {caption}
          {a.pending && <span className="ph-note">Asset pending: real {a.kind} to replace “{a.title}”</span>}
        </figcaption>
      )}
      {!caption && !label && a.pending && (
        <figcaption>
          <span className="ph-note">Asset pending: real {a.kind} to replace “{a.title}”</span>
        </figcaption>
      )}
    </figure>
  )
}
