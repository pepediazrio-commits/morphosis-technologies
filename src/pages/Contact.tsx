import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Clock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'

const services = ['AI Development', 'Blockchain Development', 'Custom Software', 'Automation', 'Not sure yet']
const budgets = ['< €20k', '€20k – €50k', '€50k – €150k', '€150k+', 'To be defined']

export default function Contact() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const inputClass = "w-full bg-transparent border-b border-white/20 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/60 transition-colors duration-200"

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium cursor-pointer transition-opacity duration-200"
        style={{ background: '#ffffff', color: '#1a1a2e', opacity: 0.5 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
      >
        <ArrowLeft className="w-3 h-3" />
        Back
      </button>

      {/* ── Left: headline + contact info ── */}
      <div className="relative flex flex-col justify-center px-10 py-32 lg:py-0 overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />

        <div className="relative max-w-lg">
          <h1 className="font-display text-5xl md:text-6xl lg:text-[64px] font-bold text-white leading-[1.05] tracking-[-0.03em] mb-6">
            Let's get<br />in <span className="gradient-text-vibrant">touch.</span>
          </h1>

          <p className="text-lg leading-[1.7] mb-12" style={{ color: 'rgba(255,255,255,0.7)' }}>
            If you are exploring a project involving blockchain, automation, or custom software infrastructure, we would be pleased to hear from you.
            <br /><br />
            Whether you have a detailed brief or are simply at the early stages of an idea, feel free to reach out. We are always happy to have an initial conversation and explore how we might support your project.
          </p>

          <div className="space-y-7">
            {[
              { icon: Mail, label: 'Email', value: 'hello@morphosis.tech', href: 'mailto:hello@morphosis.tech' },
              { icon: Clock, label: 'Response time', value: 'Within 24 hours, Monday – Friday', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <Icon className="w-4 h-4 text-white/80" />
                </div>
                <div>
                  <div className="font-mono-brand text-[10px] uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
                  {href ? (
                    <a href={href} className="text-sm font-medium text-white hover:text-white/80 transition-colors duration-200">{value}</a>
                  ) : (
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 mt-16" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <ArrowRight className="w-4 h-4" />
            <span className="text-xs font-mono-brand uppercase tracking-widest">Fill in the form</span>
          </div>
        </div>
      </div>

      {/* ── Right: dark form panel ── */}
      <div className="relative flex flex-col justify-center px-10 py-20 lg:py-0" style={{ background: 'rgba(10, 5, 40, 0.6)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: 'rgba(112,64,236,0.1)' }} />

        <div className="relative max-w-lg w-full mx-auto">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Message received</h3>
              <p className="max-w-sm leading-[1.7]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                We'll review your project brief and come back to you within 24 hours with our honest assessment.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-white mb-2">Contact</h2>
                <p className="text-sm leading-[1.7]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  We're excited to hear from you. Tell us what you're building and we'll get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono-brand uppercase tracking-widest mb-2" style={{ color: '#ffffff' }}>Name *</label>
                    <input type="text" required value={form.name} onChange={set('name')} placeholder="Full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono-brand uppercase tracking-widest mb-2" style={{ color: '#ffffff' }}>Email *</label>
                    <input type="email" required value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono-brand uppercase tracking-widest mb-2" style={{ color: '#ffffff' }}>Company</label>
                    <input type="text" value={form.company} onChange={set('company')} placeholder="Company name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono-brand uppercase tracking-widest mb-2" style={{ color: '#ffffff' }}>Service</label>
                    <select value={form.service} onChange={set('service')} className={inputClass + ' cursor-pointer'} style={{ appearance: 'none' }}>
                      <option value="" style={{ background: '#0d0828' }}>Select service</option>
                      {services.map((s) => <option key={s} value={s} style={{ background: '#0d0828' }}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-brand uppercase tracking-widest mb-2" style={{ color: '#ffffff' }}>Estimated budget</label>
                  <select value={form.budget} onChange={set('budget')} className={inputClass + ' cursor-pointer'} style={{ appearance: 'none' }}>
                    <option value="" style={{ background: '#0d0828' }}>Select a range</option>
                    {budgets.map((b) => <option key={b} value={b} style={{ background: '#0d0828' }}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-brand uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>Tell us about your project *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={set('message')}
                    rows={1}
                    placeholder="What are you building? What problem are you solving?"
                    className={inputClass + ' resize-none overflow-hidden'}
                    style={{ lineHeight: '1.4', color: '#ffffff' }}
                    onInput={e => {
                      const el = e.currentTarget
                      el.style.height = 'auto'
                      el.style.height = el.scrollHeight + 'px'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-display font-bold text-white text-base tracking-wide transition-all duration-200 cursor-pointer focus-visible:outline-none"
                  style={{ background: 'linear-gradient(135deg, #4553ec, #7040ec)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                  onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
                  onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                >
                  Send message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
