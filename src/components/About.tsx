import { useEffect, useRef } from 'react'
import './About.css'

// Minimal avatar placeholder — easy to swap for a real <img> later
function AvatarPlaceholder() {
  return (
    <div className="about__avatar" aria-hidden="true">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
      >
        {/* Circular frame */}
        <circle cx="40" cy="40" r="39" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        {/* Avatar silhouette — head */}
        <circle cx="40" cy="31" r="12" fill="rgba(107,140,174,0.12)" />
        {/* Avatar silhouette — body */}
        <path
          d="M 12 72 C 12 55 26 46 40 46 C 54 46 68 55 68 72"
          fill="rgba(107,140,174,0.12)"
        />
      </svg>
    </div>
  )
}

export default function About() {
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
      { threshold: 0.1 }
    )
    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  return (
    <section
      id="about"
      className="about section"
      ref={sectionRef}
      aria-label="About"
    >
      <div className="container">
        <header className="section-header about__label-row">
          <p className="section-label">02 — ABOUT</p>
        </header>

        <div className="about__layout">
          <div className="about__text-col">
            <h2 className="about__heading">
              Curiosity<br />
              <span className="about__heading-serif">comes first.</span>
            </h2>

            <div className="about__body">
              <p>
                I'm Arpit, an independent researcher interested in understanding
                difficult questions through physics, mathematics, computation,
                and experimentation.
              </p>
              <p>
                My interests are not limited to a single field. I explore ideas,
                build simulations, and turn questions that genuinely interest me
                into research projects.
              </p>
            </div>
          </div>

          <div className="about__profile-col">
            <AvatarPlaceholder />
            <p className="about__profile-caption">Arpit</p>
          </div>
        </div>
      </div>
    </section>
  )
}
