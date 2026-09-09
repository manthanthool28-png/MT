/**
 * Marks content carried over from the creative-direction brief that has not
 * been replaced with real project material yet.
 *
 * To clear it: replace the copy, then delete `template: true` from that
 * project's entry in src/data/projects.js.
 */
export function TemplateFlag() {
  return <span className="tpl-flag">Template</span>
}

export function TemplateBanner({ children }) {
  return (
    <div className="tpl-banner" role="note">
      <TemplateFlag />
      <p>
        {children ||
          'Placeholder copy and media from the creative-direction brief. Structure, layout and motion are final. Swap in the real project, then remove the template flag in src/data/projects.js.'}
      </p>
    </div>
  )
}
