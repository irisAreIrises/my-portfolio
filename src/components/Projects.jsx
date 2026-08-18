import { useState, useEffect, useRef } from "react"
import cpd from "../assets/cpd.webp"
import hrExpo from "../assets/hrexpo.webp"
import pupgass from "../assets/gass-uccs.webp"
import lms from "../assets/lms.webp"
import createspace from "../assets/createspace.webp"

const PROJECTS = [
  {
    id: "lms",
    title: "Web LMS for Advanced Learning Programs",
    role: "Frontend Developer Intern",
    period: "Feb 2026 – May 2026",
    description:
      "Built a web-based Learning Management System to improve online learning delivery, customizing course pages and UI for better accessibility.",
    tech: ["WordPress", "Elementor", "Tutor LMS"],
    image: lms,
    link: "https://learnbyalps.com/",
  },
  {
    id: "hr-expo",
    title: "5th Annual Southeast Asia HR Expo & Symposium 2026",
    role: "Frontend Developer Intern",
    period: "Apr 2026 – May 2026",
    description:
      "Developed the official event website, implementing responsive, user-friendly designs for a large-scale HR symposium.",
    tech: ["WordPress", "Elementor"],
    image: hrExpo,
    link: "https://hrexposymposium.com/",
  },
  {
    id: "pupgass",
    title: "PUPGASS–UCSS Catering Management System",
    role: "Backend Developer",
    period: "2025 – 2026",
    description:
      "Built secure backend logic for canteen reservations and catering operations, with a database schema tracking orders, menu items, and inventory to prevent double-bookings.",
    tech: ["Database Design", "Backend Logic"],
    image: pupgass,
  },
  {
    id: "community-db",
    title: "Community Project Development Database",
    role: "Developer",
    period: "2023 – 2024",
    description:
      "Designed a community-focused database system with table relationships, forms, queries, and reports to streamline community records.",
    tech: ["MS Access"],
    image: cpd,
  },
  {
    id: "createspace",
    title: "CreateSpace",
    role: "Lead Developer",
    period: "2023 – 2024",
    description:
      "Led development of a scalable, user-friendly web application for creative collaboration, built on the MERN stack.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    image: createspace,
  },
]

const FEATURED_COUNT = 3

// Cycle of scrapbook "mounts" — what's holding each polaroid to the page
const MOUNTS = ["tape", "pin", "clip"]
const TAPE_VARIANTS = ["pink", "navy", "light"]

function PaperclipIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 40"
      width="22"
      height="36"
      fill="none"
      stroke="#021A54"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 9 L8 27 a6 6 0 0 0 12 0 L20 11 a4 4 0 0 0 -8 0 L12 25" />
    </svg>
  )
}

function SquiggleUnderline({ visible }) {
  return (
    <svg
      className={`projects-underline ${visible ? "projects-visible" : ""}`}
      viewBox="0 0 220 20"
      width="220"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 14 Q 40 2, 80 12 T 160 10 T 216 14"
        stroke="#FF85BB"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
      />
    </svg>
  )
}

function StarSticker({ className }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 3 L23.5 15.5 L36 16 L26 24 L29.5 36 L20 28.5 L10.5 36 L14 24 L4 16 L16.5 15.5 Z"
        stroke="#021A54"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeartSticker({ className }) {
  return (
    <svg viewBox="0 0 40 36" width="34" height="30" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 32 C6 22 2 14 6 8 C9.5 3 16 3.5 20 10 C24 3.5 30.5 3 34 8 C38 14 34 22 20 32 Z"
        stroke="#FF85BB"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CurvedArrow({ className }) {
  return (
    <svg viewBox="0 0 60 50" width="52" height="44" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6 C 10 26, 24 38, 46 38"
        stroke="#021A54"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M38 32 L 47 39 L 37 44" stroke="#021A54" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, FEATURED_COUNT)

  return (
    <section id="projects" ref={sectionRef} className="projects-paper-bg relative px-6 py-24 overflow-hidden">
      {/* Floating background stickers */}
      <StarSticker className="projects-sticker projects-sticker-star" />
      <HeartSticker className="projects-sticker projects-sticker-heart" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-14">
          <h2
            id="projects-heading"
            className={`projects-heading text-3xl md:text-4xl font-extrabold text-center tracking-tight text-[#021A54] ${
              isVisible ? "projects-visible" : ""
            }`}
          >
            Featured Projects
          </h2>
          <SquiggleUnderline visible={isVisible} />
        </div>

        <div id="projects-grid" className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-14">
          {visibleProjects.map((project, i) => {
            const mount = MOUNTS[i % MOUNTS.length]
            const tapeVariant = TAPE_VARIANTS[i % TAPE_VARIANTS.length]
            const CardTag = project.link ? "a" : "div"
            const cardLinkProps = project.link
              ? {
                  href: project.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `Visit ${project.title} (opens in a new tab)`,
                }
              : {}

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`projects-card ${isVisible ? "projects-visible" : ""}`}
                style={{ transitionDelay: isVisible ? `${i * 0.08}s` : "0s" }}
              >
                <CardTag
                  {...cardLinkProps}
                  className={`projects-polaroid ${
                    i % 2 === 0 ? "projects-tilt-a" : "projects-tilt-b"
                  } ${project.link ? "projects-polaroid-link" : ""}`}
                >
                  {i === 0 && (
                    <span className="projects-featured-badge about-handwritten">Featured!</span>
                  )}

                  {mount === "tape" && (
                    <span className={`projects-tape projects-tape-${tapeVariant}`} aria-hidden="true" />
                  )}
                  {mount === "pin" && <span className="projects-pin" aria-hidden="true" />}
                  {mount === "clip" && <PaperclipIcon className="projects-clip" />}

                  <div id={`project-thumb-${project.id}`} className="projects-thumb">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="projects-thumb-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="projects-caption">
                    <span className="projects-role about-handwritten">
                      {project.role} · {project.period}
                    </span>
                    <h3 className="projects-title">
                      {project.title}
                      {project.link && (
                        <svg
                          className="projects-link-icon"
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M9 7h8v8" />
                        </svg>
                      )}
                    </h3>
                    <p className="projects-description">{project.description}</p>
                    <div className="projects-tags">
                      {project.tech.map((t) => (
                        <span key={t} className="projects-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardTag>
              </div>
            )
          })}
        </div>

        <div id="projects-divider" className="projects-divider" aria-hidden="true" />

        {PROJECTS.length > FEATURED_COUNT && (
          <div className="flex flex-col items-center">
            {!showAll && (
              <span className="projects-more-note about-handwritten">psst — more below</span>
            )}
            <CurvedArrow className={`projects-arrow ${showAll ? "projects-arrow-flip" : ""}`} />
            <button
              id="projects-view-more"
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="projects-view-more"
              aria-expanded={showAll}
              aria-controls="projects-grid"
            >
              {showAll ? "View less" : "View more"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}