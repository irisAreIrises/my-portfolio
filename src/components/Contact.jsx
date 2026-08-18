export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
              Open to new opportunities — feel free to reach out.
          </p>

          <a
            href="mailto:you@email.com"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition inline-block"
          >
            Email Me
          </a>
          <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
              <a href="https://github.com/yourname" target="_blank" rel="noreferrer" className="hover:text-black">
                  GitHub
              </a>
              <a href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer" className="hover:text-black">
                  LinkedIn
              </a>
          </div>
    </section>
  )
}