import { Link } from 'react-router-dom'
import { asset } from '../data/assets.js'
import CourtVisionArt from './CourtVisionArt.jsx'

function Thumb({ project }) {
  // Court Vision 3D gets the generated axonometric artwork; the others use
  // their screenshot (placeholder until the real one lands).
  if (project.slug === 'court-vision-3d') {
    return <CourtVisionArt title={project.thumb.alt} />
  }
  const a = asset(project.slug === 'csis-portal' ? 'csis-thumb' : 'lx-thumb')
  return <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" />
}

export function TagChips({ tags }) {
  return (
    <ul className="chips" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {tags.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectCard({ project }) {
  return (
    <Link className="card" to={`/work/${project.slug}`}>
      <div className="thumb">
        <Thumb project={project} />
      </div>
      <TagChips tags={project.tags} />
      <div>
        <h3 className="card__title">{project.title}</h3>
        <p className="card__desc">{project.description}</p>
      </div>
    </Link>
  )
}
