export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
        <span className="font-bold text-lg">Your Name</span>
        <div className="flex gap-6 text-sm font-medium text-gray-600">
          <a href="#about" className="hover:text-black">About</a>
          <a href="#projects" className="hover:text-black">Projects</a>
          <a href="#skills" className="hover:text-black">Skills</a>
          <a href="#contact" className="hover:text-black">Contact</a>
        </div>
      </div>
    </nav>
  )
}