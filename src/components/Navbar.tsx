import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-slate-900 text-base tracking-tight">Morphosis<span className="text-sky-500">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors duration-150 ${location.pathname === l.to ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Get in touch
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-600 hover:text-slate-900 cursor-pointer">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm font-medium text-slate-700 py-1.5">
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="block w-full text-center bg-slate-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg mt-2">
            Get in touch
          </Link>
        </div>
      )}
    </header>
  )
}
