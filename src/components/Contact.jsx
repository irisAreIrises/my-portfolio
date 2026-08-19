import { useState, useEffect, useRef } from "react"

const CONTACT_INFO = {
  phone: "09103855052",
  email: "bermassigrid@gmail.com",
  linkedin: "www.linkedin.com/in/sigrid-bermas",
}

const Icon = {
  Phone: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  Email: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  LinkedIn: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Copy: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  Close: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
}

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Close on Escape, lock page scroll while the letter popup is open
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleCopy = (e, id, value) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(value).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 1800)
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-paper-bg relative px-6 py-24 md:py-28 overflow-hidden"
    >
      <div id="contact-container" className="relative max-w-2xl mx-auto text-center">
        <div id="contact-heading-wrap" className="contact-heading-wrap mb-3">
          <span className="contact-heading-highlight" aria-hidden="true" />
          <h2 id="contact-heading" className="contact-heading-text text-4xl md:text-5xl font-extrabold text-[#021A54] tracking-tight">
            GET IN TOUCH
          </h2>
        </div>

        <p id="contact-subtext" className="text-gray-600 mb-12 max-w-md mx-auto">
          I've got a letter for you — click the seal to open it.
        </p>

        {/* Envelope — flap animation only, fixed size, never moves */}
        <div
          id="contact-envelope-reveal"
          className={`contact-reveal ${isVisible ? "contact-visible" : ""}`}
        >
          <div id="contact-envelope-scene" className="contact-envelope-scene">
            <div id="contact-envelope" className={`contact-envelope ${isOpen ? "contact-open" : ""}`}>
              <div id="contact-envelope-body" className="contact-envelope-body">
                <span id="contact-envelope-caption" className="contact-envelope-caption">
                  {isOpen ? "" : "tap the seal to open"}
                </span>
              </div>

              <div id="contact-envelope-flap" className="contact-envelope-flap" aria-hidden="true" />

              <button
                id="contact-wax-seal"
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="contact-wax-seal"
                aria-expanded={isOpen}
                aria-controls="contact-letter-popup"
                aria-label={isOpen ? "Close the letter" : "Open the letter"}
              >
                {isOpen ? <>close<br />me</> : <>open<br />me</>}
              </button>
            </div>
          </div>

          <p id="contact-hint" className="contact-hint">
            {isOpen ? "click outside the letter to close" : ""}
          </p>
        </div>
      </div>

      {/* Letter popup — appears centered on screen, closes on backdrop click or Escape */}
      {isOpen && (
        <div
          id="contact-letter-backdrop"
          className="contact-letter-backdrop fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            id="contact-letter-popup"
            className="contact-letter-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="contact-letter-close"
              type="button"
              onClick={() => setIsOpen(false)}
              className="contact-letter-close"
              aria-label="Close the letter"
            >
              <Icon.Close width="16" height="16" />
            </button>

            <div id="contact-letter" className="contact-letter">
              <p id="contact-letter-greeting" className="contact-letter-greeting">
                Hi, let's talk!
              </p>

              <a
                id="contact-letter-phone"
                href={`tel:${CONTACT_INFO.phone}`}
                className="contact-letter-line"
              >
                <Icon.Phone className="contact-letter-icon" aria-hidden="true" />
                {CONTACT_INFO.phone}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, "phone", CONTACT_INFO.phone)}
                  className="contact-copy-btn"
                  aria-label="Copy phone number"
                >
                  <Icon.Copy width="12" height="12" />
                </button>
                <span className={`contact-copy-toast ${copiedId === "phone" ? "contact-toast-show" : ""}`}>
                  Copied!
                </span>
              </a>

              <a
                id="contact-letter-email"
                href={`mailto:${CONTACT_INFO.email}`}
                className="contact-letter-line"
              >
                <Icon.Email className="contact-letter-icon" aria-hidden="true" />
                {CONTACT_INFO.email}
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, "email", CONTACT_INFO.email)}
                  className="contact-copy-btn"
                  aria-label="Copy email address"
                >
                  <Icon.Copy width="12" height="12" />
                </button>
                <span className={`contact-copy-toast ${copiedId === "email" ? "contact-toast-show" : ""}`}>
                  Copied!
                </span>
              </a>

              <a
                id="contact-letter-linkedin"
                href={`https://${CONTACT_INFO.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="contact-letter-line"
              >
                <Icon.LinkedIn className="contact-letter-icon" aria-hidden="true" />
                {CONTACT_INFO.linkedin}
              </a>

              <p id="contact-letter-sign" className="contact-letter-sign">
                — Sigrid
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}