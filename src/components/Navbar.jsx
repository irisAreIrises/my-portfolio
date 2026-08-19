import { useState, useEffect } from "react"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden="true">
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <nav
      id="navbar"
      className={`nav-scrapbook fixed top-0 w-full z-50 ${isScrolled ? "nav-scrolled" : ""}`}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo — left */}
        <a href="#hero" id="nav-logo" className="nav-logo-wrap">
          <span className="nav-logo-tape" aria-hidden="true" />
          <span className="nav-logo about-handwritten">Sigrid</span>
        </a>

        {/* Desktop links — right, hidden on mobile */}
        <div id="nav-links-desktop" className="hidden md:flex items-center gap-3 text-sm">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ "--nav-tilt": i % 2 === 0 ? "-2deg" : "2deg" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle — hidden on desktop */}
        <button
          id="nav-menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          className={`nav-menu-toggle md:hidden ${isMenuOpen ? "nav-menu-toggle-open" : ""}`}
          aria-expanded={isMenuOpen}
          aria-controls="nav-mobile-panel"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile panel — notebook page unrolling below header */}
      <div
        id="nav-mobile-panel-wrap"
        className={`nav-mobile-panel-wrap md:hidden ${isMenuOpen ? "nav-open" : ""}`}
      >
        <div className="nav-mobile-panel-inner">
          <div id="nav-mobile-panel" className="nav-mobile-panel">
            <span className="nav-mobile-tape" aria-hidden="true" />
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="nav-mobile-link about-handwritten"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}