import { useState } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'

const services = ['AI Development', 'Blockchain Development', 'Custom Software', 'MVP & Product Strategy', 'Not sure yet']
const budgets = ['< €20k', '€20k – €50k', '€50k – €150k', '€150k+', 'To be defined']

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      {/* Header */}
      <section className="bg-slate-50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            Tell us about your project
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            We respond to every inquiry within 24 hours. If we're not the right fit, we'll tell you honestly and point you in the right direction.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Get in touch</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Whether you have a fully-formed brief or just an early idea, we're happy to talk. No hard sell — just a straightforward conversation about what you're building and whether we can help.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Email</div>
                    <a href="mailto:hello@morphosis.tech" className="text-sm text-slate-700 hover:text-sky-600 transition-colors">hello@morphosis.tech</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Location</div>
                    <span className="text-sm text-slate-700">Spain — serving clients across Europe</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Response time</div>
                    <span className="text-sm text-slate-700">Within 24 hours, Monday – Friday</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm mb-2">Prefer a call?</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  We offer free 30-minute discovery calls for new projects. Mention it in your message and we'll suggest a time.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message received</h3>
                  <p className="text-slate-500 max-w-sm">We'll review your project and get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your name"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@company.com"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={set('company')}
                      placeholder="Your company name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Service needed</label>
                      <select
                        value={form.service}
                        onChange={set('service')}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white cursor-pointer"
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Estimated budget</label>
                      <select
                        value={form.budget}
                        onChange={set('budget')}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white cursor-pointer"
                      >
                        <option value="">Select range</option>
                        {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Tell us about your project *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={set('message')}
                      rows={5}
                      placeholder="What are you building? What problem are you solving? What's your timeline?"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-150 cursor-pointer"
                  >
                    Send message
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
