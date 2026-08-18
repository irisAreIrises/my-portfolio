import { useState, useEffect, useRef } from "react"
import gradPic from "../assets/gradpic.webp"

const ROLES_MARQUEE = [
  "FRONTEND DEVELOPER",
  "WEB DEVELOPER",
  "QA ENGINEER",
  "WORDPRESS DEVELOPER",
  "GRAPHIC DESIGNER",
]

const INTERESTS = [
  {
    id: "frontend",
    label: "Frontend Development",
    detail:
      "Building responsive, accessible interfaces with React, JavaScript, and modern CSS — turning designs into interfaces that actually feel good to use.",
  },
  {
    id: "qa",
    label: "Software Testing / QA",
    detail:
      "Writing test cases, doing manual and exploratory testing, and catching issues before they reach users — I like thinking about how things break.",
  },
  {
    id: "wordpress",
    label: "WordPress Development",
    detail:
      "Custom themes, plugins, and site builds — skills sharpened through my internship and current part-time role.",
  },
  {
    id: "design",
    label: "Graphic Design",
    detail:
      "Designing publication materials and visuals for our Chapel — a creative outlet outside of code that I genuinely enjoy.",
  },
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTag, setActiveTag] = useState(null)
  const [isBioExpanded, setIsBioExpanded] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

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

  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") setIsLightboxOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isLightboxOpen])

  const toggleTag = (id) => {
    setActiveTag((prev) => (prev === id ? null : id))
  }

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden">
      {/* Scrolling marquee strip */}
      <div id="about-marquee" className="relative bg-[#021A54] py-4 overflow-hidden" aria-hidden="true">
        <div className="about-marquee-track">
          {[...ROLES_MARQUEE, ...ROLES_MARQUEE].map((role, i) => (
            <span key={i} className="about-marquee-item">
              {role} <span className="about-marquee-dot">●</span>
            </span>
          ))}
        </div>
      </div>

      <div id="about-body" className="about-paper-bg px-6 py-20 md:py-24">
        <div id="about-container" className="max-w-5xl mx-auto">
          {/* Top row: outlined polaroid + name tag + bio */}
          <div
            id="about-top-row"
            className="grid md:grid-cols-[280px_1fr] gap-14 md:gap-16 items-start mb-16"
          >
            {/* Outlined polaroid photo */}
            <div id="about-image-column" className="flex justify-center md:justify-start md:mt-4">
              <div
                id="about-image-wrap"
                className={`about-image-wrap ${isVisible ? "about-visible" : ""}`}
              >
                <div id="about-polaroid" className="about-polaroid-outline w-64 sm:w-72">
                  <button
                    id="about-image-tilt"
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="about-image-tilt relative w-full aspect-square overflow-hidden block rounded-sm"
                    aria-label="Open full-size photo"
                  >
                    <img
                      id="about-image"
                      src={gradPic}
                      alt="Portrait of Your Name"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div
                      id="about-image-zoom-overlay"
                      className="about-image-zoom-overlay absolute inset-0 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <div
                        id="about-image-zoom-icon"
                        className="about-image-zoom-icon w-11 h-11 rounded-full bg-white flex items-center justify-center"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#021A54" strokeWidth="2">
                          <circle cx="11" cy="11" r="7" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Name tag + bio */}
            <div id="about-text-block" className={`about-text-block ${isVisible ? "about-visible" : ""}`}>
              <div id="about-name-tag" className="about-name-tag mb-6">
                <span className="about-handwritten text-3xl sm:text-4xl font-bold">
                  Hi, I'm Your Name
                </span>
              </div>

              <p id="about-bio" className="text-gray-700 leading-relaxed mb-2">
                I'm an aspiring IT professional focused on{" "}
                <span className="text-[#FF85BB] font-semibold">Frontend Development</span> and{" "}
                <span className="text-[#FF85BB] font-semibold">Software Testing</span>. Alongside
                that, I've picked up hands-on{" "}
                <span className="text-[#FF85BB] font-semibold">WordPress development</span> experience
                through my internship and current part-time role.
              </p>

              <div
                id="about-bio-extra"
                className={`about-bio-extra ${isBioExpanded ? "about-open" : ""}`}
              >
                <div style={{ overflow: "hidden" }}>
                  <p id="about-bio-2" className="text-gray-700 leading-relaxed pt-2 pb-1">
                    While finishing my degree, I've been spending my time sharpening my skills,
                    exploring new tools, and pushing myself outside my comfort zone. Beyond
                    development, I also enjoy graphic design — I create publication materials for
                    our Chapel.
                  </p>
                </div>
              </div>

              <button
                id="about-readmore"
                type="button"
                onClick={() => setIsBioExpanded((prev) => !prev)}
                className="about-readmore mt-1"
                aria-expanded={isBioExpanded}
              >
                {isBioExpanded ? "Show less" : "Read more..."}
              </button>
            </div>
          </div>

          {/* Tag bars — click to reveal detail */}
          <div id="about-tags" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INTERESTS.map((item) => (
              <div key={item.id}>
                <button
                  id={`about-tag-${item.id}`}
                  type="button"
                  onClick={() => toggleTag(item.id)}
                  className={`about-tagbar w-full ${activeTag === item.id ? "about-tagbar-active" : ""}`}
                  aria-expanded={activeTag === item.id}
                  aria-controls={`about-tag-detail-${item.id}`}
                >
                  {item.label.toUpperCase()}
                </button>
                <div
                  id={`about-tag-detail-wrap-${item.id}`}
                  className={`about-tag-detail ${activeTag === item.id ? "about-open" : ""}`}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      id={`about-tag-detail-${item.id}`}
                      className="text-sm text-gray-600 leading-relaxed pt-3 pb-1"
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          id="about-lightbox-backdrop"
          className="about-lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            id="about-lightbox-close"
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="about-lightbox-close absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 text-[#021A54] flex items-center justify-center"
            aria-label="Close photo viewer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            id="about-lightbox-image"
            src={gradPic}
            alt="Portrait of Your Name, full size"
            className="about-lightbox-image max-w-full max-h-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}