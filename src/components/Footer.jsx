function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 40 36" width="16" height="14" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 32 C6 22 2 14 6 8 C9.5 3 16 3.5 20 10 C24 3.5 30.5 3 34 8 C38 14 34 22 20 32 Z"
        fill="#FF85BB"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer-scrapbook relative text-center py-12 px-6">
      {/* Torn-page edge, like the last sheet of the scrapbook peeling up */}
      <div className="footer-torn-edge" aria-hidden="true" />

      {/* Washi tape "sealing" the bottom of the book shut */}
      <span className="footer-tape" aria-hidden="true" />

      <p id="footer-signoff" className="footer-signoff about-handwritten">
        Made with <HeartIcon className="footer-heart" /> using React &amp; Tailwind
      </p>
      <p id="footer-copyright" className="footer-copyright">
        © {new Date().getFullYear()} Sigrid Bermas
      </p>
    </footer>
  )
}