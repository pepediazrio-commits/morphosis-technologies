import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Home, Briefcase, Users, Mail } from 'lucide-react'
import { TubelightNavBar } from './ui/tubelight-navbar'

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Services', url: '/services', icon: Briefcase },
  { name: 'Team', url: '/team', icon: Users },
  { name: 'Contact', url: '/contact', icon: Mail },
]

const mobileLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location])

  if (location.pathname === '/contact') return null

  return (
    <header className="relative z-50">
      <div className="px-14 h-[88px] flex items-center">
        {/* Left: Logo — flex-1 so it takes equal space as the right side */}
        <div className="flex-1 flex items-center">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/logo-icon.png"
              alt="Morphosis Technologies"
              className="w-auto object-contain"
              style={{ height: '60px', maxHeight: '60px', background: 'none' }}
            />
            <div className="flex flex-col leading-none gap-[4px]">
              <span className="text-white font-black text-[20px]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.12em' }}>MORPHOSIS</span>
              <span className="font-black text-[10px] text-white" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.45em' }}>TECHNOLOGIES</span>
            </div>
          </Link>
        </div>

        {/* Center: Tubelight nav — shrinks to its own width, stays centered */}
        <div className="hidden md:flex flex-shrink-0 items-center">
          <TubelightNavBar items={navItems} className="static translate-x-0 translate-y-0 bottom-auto top-auto pt-0 sm:pt-0 mb-0" />
        </div>

        {/* Right: CTA — flex-1 pushes button to far right */}
        <div className="flex-1 hidden md:flex items-center justify-end">
          <Link to="/contact" className="btn-brand !text-base !py-[11px] !px-6 !rounded-lg">
            Get in touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-auto p-2 text-white/70 hover:text-white transition-colors cursor-pointer focus-visible:outline-none"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 py-5 space-y-1" style={{ backdropFilter: 'blur(12px)', background: 'rgba(6, 4, 30, 0.7)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {mobileLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`block font-display text-sm font-medium py-2.5 transition-colors ${
                location.pathname === l.to ? 'text-white' : 'text-white/65 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link to="/contact" className="btn-brand w-full justify-center text-sm !py-3">
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
