import { Link } from 'react-router-dom'
import { Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="text-white">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 mb-5">
              <img src="/logo-icon.png" alt="Morphosis Technologies" className="w-auto object-contain" style={{ height: '52px', maxHeight: '52px', background: 'none' }} />
              <div className="flex flex-col leading-none gap-[3px]">
                <span className="text-white font-black text-[17px]" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.12em' }}>MORPHOSIS</span>
                <span className="font-black text-[8.5px] text-white" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.45em' }}>TECHNOLOGIES</span>
              </div>
            </Link>
            <p className="text-sm leading-[1.75] max-w-xs" style={{ color: '#ffffff' }}>
              We don't adapt your business to technology. We build the right technology around your business.
            </p>
            <div className="mt-4">
              <a
                href="mailto:hello@morphosis.tech"
                className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)', color: '#ffffff' }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
                onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                <Mail className="w-3.5 h-3.5" />
                hello@morphosis.tech
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#ffffff' }}>Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About us', to: '/about' },
                { label: 'Our team', to: '/team' },
                { label: 'Services', to: '/services' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="transition-colors duration-150 hover:text-white flex items-center gap-1.5 group"
                    style={{ color: '#ffffff' }}
                  >
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-4 md:col-start-10">
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#ffffff' }}>Services</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'AI Development', to: '/services#ai' },
                { label: 'Blockchain', to: '/services#blockchain' },
                { label: 'Custom Software', to: '/services#software' },
                { label: 'Automation', to: '/services#automation' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="transition-colors duration-150 hover:text-white flex items-center gap-1.5 group"
                    style={{ color: '#ffffff' }}
                  >
                    {label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs" style={{ color: '#ffffff' }}>
            © 2026 Morphosis Technologies S.L. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
