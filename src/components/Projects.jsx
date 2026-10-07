import { useState, useEffect, useRef, useCallback } from "react"
import cpd from "../assets/cpd.webp"
import hrExpo from "../assets/hrexpo.webp"
import pupgass from "../assets/gass-uccs.webp"
import lms from "../assets/lms.webp"
import createspace from "../assets/CreateSpace.webp"

const PROJECTS = [
  {
    id: "lms",
    title: "LearnByALPS Learning Management System",
    role: "Frontend Developer Intern",
    period: "Feb 2026 – May 2026",
    description:
      "Built a web-based Learning Management System to improve online learning delivery, customizing course pages and UI for better accessibility.",
    details: [
      "A web-based Learning Management System developed for Advanced Learning Programs (ALPs), a preferred training partner delivering high-impact onsite and online training programs in leadership development, digital transformation, and artificial intelligence.",
      "I customized the course pages and overall user interface using Elementor and Tutor LMS, with a focus on accessibility, responsive design, and creating a smoother online learning experience for learners.",
    ],
    tech: ["WordPress", "Elementor", "Tutor LMS", "php", "javascript"],
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
    details: [
      "The official website for the 5th Annual Southeast Asia HR Expo & Symposium (SEA HRES 2026), a premier HR summit bringing together HR leaders, industry experts, and innovators from across the region.",
      "Organized by ALPs, the event brings together organizations from both the public and private sectors. I developed responsive and user-friendly pages to effectively present the event, speakers, agenda, and other key information to attendees.",
    ],
    tech: ["WordPress", "Elementor"],
    image: hrExpo,
    link: "https://hrexposymposium.com/",
  },
  {
    id: "pupgass",
    title: "PUPGASS–UCCS Catering Management System",
    role: "Backend Developer",
    period: "2025 – 2026",
    description:
      "Built secure backend logic for canteen reservations and catering operations, with a database schema tracking orders, menu items, and inventory to prevent double-bookings.",
    details: [
      "A web-based catering management system developed for the University Canteen Catering Service (UCCS) under the General Administrative Support Services (GASS) at PUP. The system replaces paper forms, Google Sheets, and a manual whiteboard calendar with a centralized digital platform.",
      "Clients can browse menus, check availability, submit catering reservations, and track their reservation status. Staff, on the other hand, can manage approvals, capacity limits, blackout dates, inventory, and reports.",
      "As the backend developer, I designed the reservation logic and database structure for orders, menu items, and inventory, including safeguards against double-bookings. The system also features Market Basket Analysis for menu recommendations and an AI Admin Assistant for report summaries, data retrieval, and automatically filling forms based on phone requests.",
    ],
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

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const prevOverflow = document.body.style.overflow
    const onKey = (e) => e.key === "Escape" && onClose()

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  const paragraphs = project.details ?? [project.description]

  return (
    <div className="projects-modal-overlay" onClick={onClose}>
      <div
        className="projects-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="projects-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="projects-tape projects-tape-pink projects-modal-tape" aria-hidden="true" />

        <button
          ref={closeRef}
          type="button"
          className="projects-modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ✕
        </button>

        <div className="projects-modal-image">
          <img src={project.image} alt={`${project.title} preview`} />
        </div>

        <div className="projects-modal-body">
          <span className="projects-role about-handwritten">
            {project.role} · {project.period}
          </span>
          <h3 id="projects-modal-title" className="projects-modal-title">
            {project.title}
          </h3>

          {paragraphs.map((p, idx) => (
            <p key={idx} className="projects-modal-text">
              {p}
            </p>
          ))}

          <div className="projects-tags">
            {project.tech.map((t) => (
              <span key={t} className="projects-tag">
                {t}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="projects-view-more projects-modal-visit"
            >
              Visit website ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [selected, setSelected] = useState(null)
  const sectionRef = useRef(null)
  const closeModal = useCallback(() => setSelected(null), [])

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

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`projects-card ${isVisible ? "projects-visible" : ""}`}
                style={{ transitionDelay: isVisible ? `${i * 0.08}s` : "0s" }}
              >
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  aria-haspopup="dialog"
                  aria-label={`View details for ${project.title}`}
                  className={`projects-polaroid projects-polaroid-btn ${
                    i % 2 === 0 ? "projects-tilt-a" : "projects-tilt-b"
                  } projects-polaroid-link`}
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
                    <h3 className="projects-title">{project.title}</h3>
                    <p className="projects-description">{project.description}</p>
                    <div className="projects-tags">
                      {project.tech.map((t) => (
                        <span key={t} className="projects-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
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

      {selected && <ProjectModal project={selected} onClose={closeModal} />}
    </section>
  )
}