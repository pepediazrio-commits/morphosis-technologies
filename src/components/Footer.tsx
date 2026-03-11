import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-white text-base tracking-tight">Morphosis<span className="text-sky-400">.</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-500">
              We are the bridge between your business and the future — building custom AI and blockchain solutions that are uniquely designed for each client's context.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-sm">
              <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
              <span>Founded in Madrid, Spain · Active projects globally</span>
            </div>
            <div className="flex gap-3 mt-5">
              <a href="mailto:hello@morphosis.tech" className="flex items-center gap-2 text-xs bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors cursor-pointer">
                <Mail className="w-3.5 h-3.5" />
                hello@morphosis.tech
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services#ai" className="hover:text-white transition-colors">AI Development</Link></li>
              <li><Link to="/services#blockchain" className="hover:text-white transition-colors">Blockchain Development</Link></li>
              <li><Link to="/services#software" className="hover:text-white transition-colors">Custom Software</Link></li>
              <li><Link to="/services#automation" className="hover:text-white transition-colors">Automation</Link></li>
              <li><Link to="/services#mvp" className="hover:text-white transition-colors">MVP & Strategy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© 2026 Morphosis Technologies S.L. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
