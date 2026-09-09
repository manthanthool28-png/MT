import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap wrap--narrow" style={{ textAlign: 'center', paddingBlock: '3rem' }}>
        <p className="eyebrow">404</p>
        <h1 style={{ marginBlock: '0.8rem 1rem' }}>That page isn’t here</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
          The link may be out of date. The work is all one click away.
        </p>
        <Link className="btn btn--primary" to="/work">
          View work
        </Link>
      </div>
    </section>
  )
}
