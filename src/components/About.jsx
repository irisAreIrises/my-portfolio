export default function About() {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <p className="text-gray-600 leading-relaxed">
        I'm a frontend developer focused on React and modern JavaScript. I enjoy turning
        designs into fast, responsive interfaces and care about clean code and good UX.
        When I'm not coding, I'm [your hobby/interest here].
      </p>
      <div className="flex gap-6 mt-6 text-sm text-gray-500">
        <span>📍 Your City</span>
        <span>💻 React · JavaScript · CSS</span>
      </div>
    </section>
  )
}