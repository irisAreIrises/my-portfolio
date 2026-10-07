import { useState, useEffect, useRef, useCallback } from "react"
import design1 from "../assets/design-1.webp"
import design2 from "../assets/design-2.webp"
import design3 from "../assets/design-3.webp"
import design4 from "../assets/design-4.webp"
import design5 from "../assets/design-5.webp"
import design6 from "../assets/design-6.webp"


const placeholder = (w, h) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect width="${w}" height="${h}" fill="#FFE3F0"/>
      <rect x="16" y="16" width="${w - 32}" height="${h - 32}" fill="none" stroke="#021A54" stroke-width="4" stroke-dasharray="14 12"/>
      <text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-family="sans-serif" font-size="36" fill="#021A54">Your design here</text>
      <text x="${w / 2}" y="${h / 2 + 40}" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#021A54">${w} × ${h}</text>
    </svg>`
  )

const DESIGNS = [
  {
    id: "design-1",
    title: "Five Security Risks Infographic",
    category: "Infographic",
    description: "An infographic breaking down five security risks, made for our Multimedia class.",
    details: [
      "This infographic explains five common security risks in a clear, visual way. It was an activity for our Multimedia subject.",
    ],
    tools: ["Photoshop"],
    ratio: "4.5 / 5",
    image: design1,
  },
  {
    id: "design-2",
    title: "Santa Cruzan 2026 Announcement",
    category: "Poster",
    description: "An announcement poster for the Santa Cruzan 2026 at Our Lady of Lourdes Chapel.",
    details: [
      "A poster announcing the Santa Cruzan 2026 at Our Lady of Lourdes Chapel, posted on the chapel's Facebook page.",
    ],
    tools: ["Photoshop, Canva"],
    ratio: "1.75 / 1.5",
    image: design2,
  },
  {
    id: "design-3",
    title: "Academic Achievers Posting",
    category: "Social Media",
    description: "A congratulatory post for the academic achievers of our first semester block.",
    details: [
      "A recognition post for the academic achievers of our block in the first semester, published on our university block's Facebook page.",
    ],
    tools: ["Canva", "Photoshop"],
    ratio: "20 / 10",
    image: design3,
  },
  {
    id: "design-4",
    title: "All About Me Magazine Layout",
    category: "Magazine Layout",
    description: "A creative magazine spread about myself, made for our magazine project.",
    details: [
      "A magazine-style layout about myself, created for our magazine project.", "I played with typography, image placement, and spacing to give it the feel of a real editorial spread while still showing my personality.",
    ],
    tools: ["Canva"],
    ratio: "3 / 4",
    image: design4,
  },
  {
    id: "design-5",
    title: "No Healing Mass Announcement",
    category: "Poster",
    description: "A Facebook announcement for Our Lady of Lourdes Chapel about the suspended healing mass.",
    details: [
      "An announcement poster for Our Lady of Lourdes Chapel, posted on Facebook, letting parishioners know that there will be no healing mass.",
    ],
    tools: ["Canva"],
    ratio: "1.75 / 1.5",
    image: design5,
  },
  {
    id: "design-6",
    title: "CISCO NetConnect Membership Drive",
    category: "Social Media",
    description: "A poster announcing that membership applications are now open for CISCO NetConnect.",
    details: [
      "A social media announcement for CISCO NetConnect PUP-Sta. Mesa, an academic organization, informing students that membership applications are now open.",
    ],
    tools: ["Photoshop"],
    ratio: "1 / 1",
    image: design6,
  },
]

const FEATURED_COUNT = 3
const TILTS = [-2.5, 1.8, -1.2, 2.6, -1.8, 1.2]

function DesignModal({ design, number, onClose }) {
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

  const paragraphs = design.details ?? [design.description]

  return (
    <div className="designs-modal-overlay" onClick={onClose}>
      <button
        ref={closeRef}
        type="button"
        className="designs-modal-close"
        onClick={onClose}
        aria-label="Close design preview"
      >
        ✕
      </button>

      <div
        className="designs-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="designs-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="designs-modal-mat">
          <img src={design.image} alt={`${design.title} full view`} />
        </div>

        <div className="designs-modal-note">
          <span className="designs-modal-meta about-handwritten">
            No. {number} · {design.category} · {design.year}
          </span>
          <h3 id="designs-modal-title" className="designs-modal-title">
            {design.title}
          </h3>
          {paragraphs.map((p, idx) => (
            <p key={idx} className="designs-modal-text">
              {p}
            </p>
          ))}
          {design.tools && (
            <div className="designs-tools">
              {design.tools.map((t) => (
                <span key={t} className="designs-tool">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Designs() {
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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const visibleDesigns = showAll ? DESIGNS : DESIGNS.slice(0, FEATURED_COUNT)
  const pad = (n) => String(n).padStart(2, "0")

  return (
    <section id="designs" ref={sectionRef} className="designs-bg relative px-6 py-24 overflow-hidden">
      <div className="designs-ruler" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className={`designs-header ${isVisible ? "designs-visible" : ""}`}>
          <div className="designs-heading-wrap">
            <span className="designs-heading-highlight" aria-hidden="true" />
            <h2 className="designs-heading-text text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Design Wall
            </h2>
          </div>
          <p className="designs-subtitle about-handwritten">
            graphic design samples — tap a print to look closer
          </p>
        </div>

        <div id="designs-grid" className="designs-masonry">
          {visibleDesigns.map((design, i) => (
            <div
              key={design.id}
              className={`designs-item ${isVisible ? "designs-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${i * 0.1}s` : "0s" }}
            >
              <button
                type="button"
                onClick={() => setSelected({ design, number: pad(i + 1) })}
                aria-haspopup="dialog"
                aria-label={`View ${design.title}`}
                className="designs-print"
                style={{ "--tilt": `${TILTS[i % TILTS.length]}deg` }}
              >
                <span className="designs-num about-handwritten">No. {pad(i + 1)}</span>

                <div className="designs-art" style={{ "--ratio": design.ratio }}>
                  <img src={design.image} alt={`${design.title} preview`} loading="lazy" />
                </div>

                <div className="designs-note">
                  <span className="designs-note-cat about-handwritten">
                    {design.category} · {design.year}
                  </span>
                  <span className="designs-note-title about-handwritten">{design.title}</span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {DESIGNS.length > FEATURED_COUNT && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="designs-more"
              aria-expanded={showAll}
              aria-controls="designs-grid"
            >
              {showAll ? "− Show fewer prints" : "+ Pin more prints"}
            </button>
          </div>
        )}
      </div>

      {selected && (
        <DesignModal design={selected.design} number={selected.number} onClose={closeModal} />
      )}
    </section>
  )
}