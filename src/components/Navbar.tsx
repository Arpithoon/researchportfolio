import { useState, useEffect, useCallback } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Research', href: '#research' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setMobileOpen(false)
      const target = document.querySelector(href)
      if (target) {
        const navH = 64
        const top = target.getBoundingClientRect().top + window.scrollY - navH
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    []
  )

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner container">
        <a
          href="#"
          className="navbar__brand"
          aria-label="Arpit Rathore — back to top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Arpit Rathore
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className={`navbar__toggle${mobileOpen ? ' navbar__toggle--open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>
      </div>

      {/* Mobile drawer */}
      <nav
        id="mobile-nav"
        className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <ul className="navbar__mobile-list" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={(e) => handleNavClick(e, link.href)}
                tabIndex={mobileOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="navbar__backdrop"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  )
}
