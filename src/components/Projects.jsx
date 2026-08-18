const projects = [
  {
    title: "Project One",
    description: "A short, punchy description of what this project does and the problem it solves.",
    tech: ["React", "Tailwind", "Vite"],
    link: "https://github.com/yourname/project-one",
  },
  {
    title: "Project Two",
    description: "Another project — mention your specific role and any interesting technical challenge.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/yourname/project-two",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-10">Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div
            key={p.title}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-600 mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map((t) => (
                <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
            <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">
              View project →
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}