import { useRef, useState } from 'react'
import { site } from '../data/site.js'

/* Pre-formatted outreach payload. Copied to the clipboard on click, then the
   local mail client opens with the same content already populated, so the
   recruiter has a draft either way, whichever path their browser allows. */
const SUBJECT = 'Collaboration Inquiry // Multidisciplinary Portfolio Review'

const BODY = `Hello Manthan,

I reviewed your graduate portfolio and would love to discuss your work across UX/UI design, interaction design and creative technology.

Let's coordinate a brief introductory call. Please let me know your availability next week.

Best regards,
[Sender Name]
[Company / Organisation]`

/** The oversized email action plus its clipboard behaviour. Shared by the
    global footer and the /contact page so the payload can never drift. */
export function MailAction() {
  const [hint, setHint] = useState('')
  const timer = useRef(null)

  async function handle(e) {
    e.preventDefault()
    const payload = `Subject: ${SUBJECT}\n\n${BODY}`
    let copied = false
    try {
      await navigator.clipboard.writeText(payload)
      copied = true
    } catch {
      /* Clipboard blocked (no permission, insecure context) — the mailto
         below still carries the whole draft, so nothing is lost. */
    }
    setHint(copied ? '✓ Draft copied. Opening mail client…' : 'Opening mail client…')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setHint(''), 4000)

    window.location.href =
      `mailto:${site.email}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`
  }

  return (
    <>
      {/* The oversized line is a short phrase; the address sits beneath it at a
          size it can actually carry. Setting a long address at display scale
          forced it to wrap and read as a broken headline. */}
      <button type="button" className="terminal__mail snap" onClick={handle}>
        <span className="terminal__mail-label">Start a conversation</span>
        <span aria-hidden="true" className="terminal__mail-arrow">➔</span>
      </button>
      <p className="terminal__address">{site.email}</p>
      <p className="terminal__hint" data-copied={hint.startsWith('✓') || undefined} role="status">
        {hint || 'Click to copy a pre-written enquiry and open your mail client'}
      </p>
    </>
  )
}

/**
 * Global footer terminal. On /contact the page itself already carries the
 * mail action, so the footer drops to its utility row rather than showing the
 * same oversized address twice on one screen.
 */
export default function ContactTerminal({ compact = false }) {
  return (
    <footer className="terminal" id="contact-terminal" data-compact={compact || undefined}>
      <div className="wrap">
        {!compact && (
          <>
            <p className="terminal__tag">System ready for deployment</p>
            <MailAction />
          </>
        )}

        <div className="terminal__utility">
          <span>© {new Date().getFullYear()} Manthan Thool</span>
          <ul className="terminal__links">
            <li>
              <a className="snap" href={site.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn</a>
            </li>
            <li>
              <a className="snap" href={site.github} target="_blank" rel="noreferrer noopener">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
