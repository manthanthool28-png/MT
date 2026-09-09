import Reveal, { useReveal } from '../components/Reveal.jsx'
import { MailAction } from '../components/ContactTerminal.jsx'
import { site } from '../data/site.js'

const channels = [
  { key: 'Email', value: site.email, href: `mailto:${site.email}` },
  { key: 'LinkedIn', value: 'in/manthanthool', href: site.linkedin, external: true },
  { key: 'GitHub', value: 'manthanthool28-png', href: site.github, external: true },
]

export default function Contact() {
  useReveal()
  return (
    <>
      <header className="page-head wrap">
        <Reveal>
          <p className="tech tech--accent">[ Project contact terminal ]</p>
          <h1>System ready for deployment</h1>
          <p>
            Open to interaction design, product design and creative technology roles, and to
            research collaborations. Currently based in {site.location}.
          </p>
        </Reveal>
      </header>

      <section className="section wrap">
        <Reveal>
          <MailAction />
        </Reveal>

        <Reveal>
          <ul className="channels">
            {channels.map((c) => (
              <li key={c.key}>
                <a
                  className="snap"
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  {...(c.download ? { download: true } : {})}
                >
                  <span className="channel__key">{c.key}</span>
                  <span className="channel__val">{c.value}</span>
                  <span className="channel__go" aria-hidden="true">➔</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </>
  )
}
