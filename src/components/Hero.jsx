export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4">Hi, I'm Your Name</h1>
      <p className="text-xl text-gray-600 max-w-xl mb-8">
        A frontend developer building fast, accessible, and thoughtfully designed web experiences.
      </p>
        <a
          href="#projects"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          View my work
        </a>
    </section>
  )
}