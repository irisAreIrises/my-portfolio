import { useState, useEffect, useRef, useCallback } from "react"

const ROLES = [
  "WordPress Developer",
  "Frontend Developer",
  "Graphic Designer",
  "Software Tester",
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [canHover, setCanHover] = useState(true)
  const heroRef = useRef(null)
  const blobNavyRef = useRef(null)
  const blobPinkRef = useRef(null)
  const blobLightPinkRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setCanHover(mq.matches)
    const handler = (e) => setCanHover(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2200)
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleBadgeClick = () => {
    setRoleIndex((prev) => (prev + 1) % ROLES.length)
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2200)
  }

  const handleMouseMove = useCallback((e) => {
    if (!canHover) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height

    if (blobNavyRef.current) {
      blobNavyRef.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`
    }
    if (blobPinkRef.current) {
      blobPinkRef.current.style.transform = `translate(${x * -40}px, ${y * -40}px)`
    }
    if (blobLightPinkRef.current) {
      blobLightPinkRef.current.style.transform = `translate(${x * 20}px, ${y * -20}px)`
    }
  }, [canHover])

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 overflow-hidden bg-[#F5F5F5]"
    >
      {/* Dot-grid background */}
      <div id="hero-grid" className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Ambient blobs */}
      <div id="hero-blob-navy-wrap" ref={blobNavyRef} className="hero-blob-wrap absolute -top-16 -left-16 sm:-top-24 sm:-left-24" aria-hidden="true">
        <div className="hero-blob-navy w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-[#021A54] opacity-20 blur-2xl md:blur-3xl" />
      </div>
      <div id="hero-blob-pink-wrap" ref={blobPinkRef} className="hero-blob-wrap absolute -bottom-20 -right-12 sm:-bottom-32 sm:-right-16" aria-hidden="true">
        <div className="hero-blob-pink w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-[#FF85BB] opacity-30 blur-2xl md:blur-3xl" />
      </div>
      <div id="hero-blob-light-pink-wrap" ref={blobLightPinkRef} className="hero-blob-wrap absolute top-1/4 right-1/4 hidden sm:block" aria-hidden="true">
        <div className="hero-blob-light-pink w-40 h-40 md:w-64 md:h-64 rounded-full bg-[#FFCEE3] opacity-40 blur-2xl md:blur-3xl" />
      </div>

      {/* Floating particles */}
      <div id="hero-particles" className="hero-particles absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            id={`hero-particle-${i}`}
            className="hero-particle"
            style={{
              "--particle-top": `${15 + i * 9}%`,
              "--particle-left": `${10 + ((i * 13) % 80)}%`,
              "--particle-size": i % 2 === 0 ? "6px" : "4px",
              "--particle-color": i % 3 === 0 ? "#021A54" : "#FF85BB",
              "--particle-duration": `${5 + i}s`,
              "--particle-delay": `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div id="hero-content" className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <button
          id="hero-badge"
          type="button"
          onClick={handleBadgeClick}
          className="hero-fade-up hero-badge-clickable about-handwritten text-sm sm:text-base text-[#021A54] bg-[#FFCEE3] border border-[#FF85BB] rounded-full px-3 sm:px-4 py-1.5 mb-5 sm:mb-6 w-full max-w-[220px] sm:max-w-[240px] flex items-center justify-center gap-2"
          aria-label="Click to see my other roles"
        >
          <span aria-hidden="true">{"</>"}</span>
          <span key={roleIndex} id="hero-role-text" className="hero-role-text truncate">
            {ROLES[roleIndex]}
          </span>
        </button>

        <h1
          id="hero-heading"
          className="hero-fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#021A54] tracking-tight leading-tight"
        >
          Hi, I'm{" "}
          <span className="hero-underline-wrap">
            <span className="text-[#FF85BB]">Sigrid</span>
            <svg className="hero-underline-svg" viewBox="0 0 140 16" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M2,9 C 30,2 60,13 80,7 C 100,2 120,10 138,6"
                fill="none"
                stroke="#FF85BB"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            id="hero-cursor"
            className="hero-cursor inline-block w-[2px] sm:w-[3px] h-8 sm:h-10 md:h-12 bg-[#021A54] ml-1 sm:ml-2 align-middle"
            aria-hidden="true"
          />
        </h1>

        <p
          id="hero-subtext"
          className="hero-fade-up-delay-2 text-base sm:text-lg md:text-xl text-[#021A54]/70 max-w-md sm:max-w-xl mb-8 px-2 sm:px-0"
        >
          A frontend developer building fast, accessible, and thoughtfully
          designed web experiences.
        </p>

        <a
          id="hero-cta"
          href="#projects"
          className="hero-fade-up-delay-3 group inline-flex items-center gap-2 bg-[#021A54] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base
                     transition-all duration-300 hover:bg-[#FF85BB] hover:text-[#021A54] hover:shadow-lg hover:shadow-[#FF85BB]/40"
        >
          View my work
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>

      {/* Torn-paper edge at the bottom, into About */}
      <div className="hero-torn-edge" aria-hidden="true" />
    </section>
  )
}