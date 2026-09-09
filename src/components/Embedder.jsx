/**
 * 16:10 live prototype container. Pass a public Figma prototype URL (or any
 * embeddable URL); with no url it renders an explicit empty state rather than
 * a broken frame.
 */
export default function Embedder({ url, title }) {
  if (!url) {
    return (
      <div className="embedder">
        <div className="embedder__empty">
          <p className="tech tech--accent">[ Embed slot ]</p>
          <p className="tech">
            Paste a public Figma prototype URL into src/data/vault.js to activate
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="embedder">
      <iframe
        src={url}
        title={title}
        loading="lazy"
        allow="fullscreen"
        allowFullScreen
      />
    </div>
  )
}
