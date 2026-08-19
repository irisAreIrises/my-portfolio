import { useState, useEffect, useRef } from "react"

// Simple monochrome line icons, one per category — all same stroke style
const Icon = {
  Programming: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="8 6 2 12 8 18" />
      <polyline points="16 6 22 12 16 18" />
    </svg>
  ),
  QA: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  Database: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  ),
  Design: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  CMS: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <path d="M12 3a14 14 0 010 18a14 14 0 010-18z" />
    </svg>
  ),
  Frameworks: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    </svg>
  ),
  DevTools: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a4 4 0 015 5l-6.6 6.6a2 2 0 01-2.8 0l-2.2-2.2a2 2 0 010-2.8l6.6-6.6z" />
      <path d="M8 15l-4.5 4.5" />
    </svg>
  ),
}

const CATEGORIES = [
  { id: "programming", label: "Programming", icon: Icon.Programming, items: ["Java", "JavaScript", "Python", "C#", "PHP"] },
  { id: "qa", label: "QA Testing", icon: Icon.QA, items: ["Playwright", "Postman"] },
  { id: "database", label: "Database Management", icon: Icon.Database, items: ["MS SQL Server", "MySQL", "MS Access", "MongoDB"] },
  { id: "design", label: "Design Tools", icon: Icon.Design, items: ["Adobe Photoshop", "Figma", "Lightroom", "Canva"] },
  { id: "cms", label: "CMS Platform", icon: Icon.CMS, items: ["WordPress"] },
  { id: "frameworks", label: "Frameworks & Libraries", icon: Icon.Frameworks, items: ["ASP.NET Core MVC", "React"] },
  { id: "devtools", label: "Development Tools", icon: Icon.DevTools, items: ["Visual Studio 2022", "VS Code", "GitHub", "Git"] },
]

const SOFT_SKILLS = [
  "Communication",
  "Team Collaboration",
  "Adaptability",
  "Time Management",
  "Attention to Detail",
  "Critical Thinking",
]

const ROTATIONS = ["-2deg", "1.5deg", "-1deg", "2deg", "-2.5deg", "1deg", "-1.5deg"]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStamps, setActiveStamps] = useState(new Set())
  const [checkedSkills, setCheckedSkills] = useState(new Set())
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleStamp = (skill) => {
    setActiveStamps((prev) => {
      const next = new Set(prev)
      next.has(skill) ? next.delete(skill) : next.add(skill)
      return next
    })
  }

  const toggleCheck = (skill) => {
    setCheckedSkills((prev) => {
      const next = new Set(prev)
      next.has(skill) ? next.delete(skill) : next.add(skill)
      return next
    })
  }

  // Measures the actual rendered card width + gap, so the scroll distance
  // stays correct at every breakpoint instead of using a hardcoded pixel value
  const scrollCarousel = (direction) => {
    const track = trackRef.current
    if (!track || !track.firstElementChild) return
    const cardWidth = track.firstElementChild.getBoundingClientRect().width
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0")
    const distance = (cardWidth + gap) * 2
    track.scrollBy({ left: direction * distance, behavior: "smooth" })
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-paper-bg relative px-4 sm:px-6 py-16 sm:py-20 md:py-28"
    >
      <div id="skills-container" className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div id="skills-heading-wrap" className="skills-heading-wrap">
            <span className="skills-heading-highlight" aria-hidden="true" />
            <h2 id="skills-heading" className="skills-heading-text text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#021A54] tracking-tight">
              SKILLS
            </h2>
          </div>

          {/* Carousel nav arrows */}
          <div id="skills-carousel-nav" className="skills-carousel-nav">
            <span id="skills-scroll-hint" className="skills-scroll-hint hidden md:inline">
              scroll for more →
            </span>
            <button
              id="skills-nav-prev"
              type="button"
              onClick={() => scrollCarousel(-1)}
              className="skills-nav-btn"
              aria-label="Scroll skills left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              id="skills-nav-next"
              type="button"
              onClick={() => scrollCarousel(1)}
              className="skills-nav-btn"
              aria-label="Scroll skills right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <p id="skills-intro" className="skills-intro mb-6 sm:mb-8 text-sm sm:text-base">
          Tap a skill stamp to spotlight it, or highlight the strengths that matter most. ✨
        </p>

        {/* Horizontal scrolling carousel of category cards */}
        <div id="skills-carousel-wrap" className="skills-carousel-wrap mb-12 sm:mb-16">
          <div id="skills-carousel-track" ref={trackRef} className="skills-carousel-track">
            {CATEGORIES.map((cat, idx) => {
              const CatIcon = cat.icon
              return (
                <div
                  key={cat.id}
                  id={`skills-carousel-item-${cat.id}`}
                  className={`skills-carousel-item w-[190px] sm:w-[220px] md:w-[250px] skills-reveal ${isVisible ? "skills-visible" : ""}`}
                  style={{ transitionDelay: `${idx * 0.06}s` }}
                >
                  <div
                    id={`skills-card-${cat.id}`}
                    className="skills-card"
                    style={{ transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]})` }}
                  >
                    <span className="skills-tape" aria-hidden="true" />
                    <CatIcon className="skills-card-icon" aria-hidden="true" />
                    <h3 id={`skills-card-title-${cat.id}`} className="skills-card-title text-sm sm:text-base">
                      {cat.label}
                    </h3>
                    <div id={`skills-stamps-${cat.id}`} className="skills-stamp-row">
                      {cat.items.map((item) => {
                        const isActive = activeStamps.has(item)
                        return (
                          <button
                            key={item}
                            id={`skills-stamp-${item.replace(/\s+/g, "-").toLowerCase()}`}
                            type="button"
                            onClick={() => toggleStamp(item)}
                            className={`skills-stamp ${isActive ? "skills-stamp-active" : ""}`}
                            aria-pressed={isActive}
                          >
                            {item}
                            {isActive && <span className="skills-stamp-star">★</span>}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Soft skills — notebook checklist */}
        <div
          id="skills-notebook-reveal"
          className={`skills-reveal ${isVisible ? "skills-visible" : ""}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div id="skills-notebook" className="skills-notebook px-4 sm:px-6">
            <span className="skills-notebook-margin" aria-hidden="true" />
            <h3 id="skills-notebook-title" className="skills-notebook-title text-lg sm:text-xl">
              Soft Skills
            </h3>
            <p id="skills-notebook-hint" className="skills-notebook-hint">
              tap to highlight →
            </p>
            <div id="skills-checklist" className="skills-checklist">
              {SOFT_SKILLS.map((skill) => {
                const isChecked = checkedSkills.has(skill)
                return (
                  <button
                    key={skill}
                    id={`skills-check-${skill.replace(/\s+/g, "-").toLowerCase()}`}
                    type="button"
                    onClick={() => toggleCheck(skill)}
                    className={`skills-check-item ${isChecked ? "skills-checked" : ""}`}
                    aria-pressed={isChecked}
                  >
                    <span className="skills-checkbox" aria-hidden="true">
                      <svg
                        className="skills-checkmark"
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                      >
                        <path
                          d="M1 5 L4.5 8.5 L11 1.5"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="skills-check-label text-sm sm:text-base">
                      <span className="skills-check-highlight" aria-hidden="true" />
                      {skill}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}