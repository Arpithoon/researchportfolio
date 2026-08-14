import { useEffect, useRef } from 'react'
import './Contact.css'

interface ContactLink {
  id: string
  label: string
  displayText: string
  href: string
  external: boolean
}

const contactLinks: ContactLink[] = [
  {
    id: 'contact-email',
    label: 'Email',
    displayText: 'heyarpit@protonmail.com',
    href: 'mailto:heyarpit@protonmail.com',
    external: false,
  },
  {
    id: 'contact-linkedin',
    label: 'LinkedIn',
    displayText: 'linkedin.com/in/lemon-hoon',
    href: 'https://www.linkedin.com/in/lemon-hoon-a790563aa/',
    external: true,
  },
  {
    id: 'contact-github',
    label: 'GitHub',
    displayText: 'github.com/Arpithoon',
    href: 'https://github.com/Arpithoon',
    external: true,
  },
]

export default function Contact() {
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
      id="contact"
      className="contact section"
      ref={sectionRef}
      aria-label="Contact"
    >
      <div className="container">
        <header className="section-header contact__header">
          <p className="section-label">03 — CONTACT</p>
          <h2 className="contact__heading">
            Something worth<br />
            <span className="contact__heading-serif">exploring?</span>
          </h2>
          <p className="contact__body">
            Research ideas, interesting problems, collaborations,
            or just something worth discussing.
          </p>
        </header>

        <ul className="contact__list" aria-label="Contact links">
          {contactLinks.map((link) => (
            <li key={link.id} className="contact__item">
              <a
                id={link.id}
                href={link.href}
                className="contact__link"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-label={
                  link.external
                    ? `${link.label}: ${link.displayText} (opens in a new tab)`
                    : `${link.label}: ${link.displayText}`
                }
              >
                <span className="contact__link-label label">{link.label}</span>
                <span className="contact__link-text">{link.displayText}</span>
                <span className="contact__link-arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
