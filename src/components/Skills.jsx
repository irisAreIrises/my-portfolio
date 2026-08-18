const skills = [
  "React", "JavaScript", "TypeScript", "HTML/CSS",
  "Tailwind CSS", "Git", "Node.js", "REST APIs",
]

export default function Skills() {
  return (
    <section id="skills" className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}