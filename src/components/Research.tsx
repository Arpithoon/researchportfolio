import { useEffect, useRef } from 'react'
import ResearchCard from './ResearchCard'
import { research } from '../data/research'
import './Research.css'

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.08 }
    )

    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section
      id="research"
      className="research section"
      ref={sectionRef}
      aria-label="Research"
    >
      <div className="container">
        <header className="section-header research__header">
          <p className="section-label">01 — RESEARCH</p>
          <h2 className="research__heading">Selected work</h2>
        </header>

        <div className="research__grid">
          {research.map((item) => (
            <ResearchCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
