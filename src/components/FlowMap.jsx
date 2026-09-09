/** Monospaced node-chain diagram. Wraps rather than scrolling off-screen. */
export default function FlowMap({ nodes, label }) {
  return (
    <figure className="flowmap" aria-label={label}>
      {nodes.map((n, i) => (
        <span key={n.text + i} style={{ display: 'contents' }}>
          <span className={`flowmap__node${n.io ? ' flowmap__node--io' : ''}`}>{n.text}</span>
          {i < nodes.length - 1 && (
            <span className="flowmap__arrow" aria-hidden="true">
              ➔
            </span>
          )}
        </span>
      ))}
    </figure>
  )
}
