import type { ResearchItem } from '../data/research'
import './ResearchCard.css'

interface ResearchCardProps {
  item: ResearchItem
}

function StatusBadge({ status }: { status: ResearchItem['status'] }) {
  const label =
    status === 'in-progress'
      ? 'IN PROGRESS'
      : status === 'published'
        ? 'PUBLISHED'
        : 'COMING SOON'
  return <span className={`research-card__badge research-card__badge--${status}`}>{label}</span>
}

function PaperLink({ item }: { item: ResearchItem }) {
  if (item.status === 'coming-soon') return null

  if (item.pdfUrl) {
    return (
      <a
        href={item.pdfUrl}
        className="research-card__cta"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View paper: ${item.title}`}
      >
        View paper <span aria-hidden="true">↗</span>
      </a>
    )
  }

  if (item.paperUrl) {
    return (
      <a
        href={item.paperUrl}
        className="research-card__cta"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read paper: ${item.title}`}
      >
        Read paper <span aria-hidden="true">↗</span>
      </a>
    )
  }

  // Paper not yet available
  return (
    <span className="research-card__cta research-card__cta--disabled" aria-label="Research in progress">
      Research in progress <span aria-hidden="true">↗</span>
    </span>
  )
}

export default function ResearchCard({ item }: ResearchCardProps) {
  return (
    <article className="research-card" aria-label={item.title}>
      <header className="research-card__header">
        <div className="research-card__meta">
          <span className="research-card__field label">{item.field}</span>
          <StatusBadge status={item.status} />
        </div>
        {item.date && (
          <time className="research-card__date label" dateTime={item.date}>
            {item.date}
          </time>
        )}
      </header>

      <h3 className="research-card__title">{item.title}</h3>

      <p className="research-card__description">{item.description}</p>

      <footer className="research-card__footer">
        <ul className="research-card__tags" aria-label="Research tags">
          {item.tags.map((tag) => (
            <li key={tag} className="research-card__tag">
              {tag}
            </li>
          ))}
        </ul>

        <PaperLink item={item} />
      </footer>
    </article>
  )
}
