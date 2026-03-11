import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Blocks, Code2, Rocket, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Development',
    tagline: 'Intelligent systems, built for your product.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    gradient: 'from-sky-500 to-indigo-600',
    desc: 'Custom ML models, LLM integrations, and AI-powered features that solve real operational problems — from document intelligence to predictive analytics.',
    capabilities: [
      'Custom ML model development & fine-tuning',
      'LLM integration & AI assistant development',
      'Computer vision & document intelligence',
      'Predictive analytics & forecasting',
      'AI pipeline architecture & MLOps',
      'Integration with existing platforms & APIs',
    ],
  },
  {
    id: 'blockchain',
    icon: Blocks,
    title: 'Blockchain',
    tagline: 'Production-grade on-chain infrastructure.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    gradient: 'from-indigo-500 to-violet-600',
    desc: 'EVM smart contracts, Layer 2 deployments, and cross-chain bridges — built to be auditable, secure, and production-ready.',
    capabilities: [
      'Smart contract development (Solidity, Rust, Move)',
      'DeFi protocol design & implementation',
      'Token & NFT standards (ERC-20, ERC-721, ERC-1155)',
      'Cross-chain bridge & interoperability solutions',
      'Wallet & custody integrations',
      'Smart contract auditing & security review',
    ],
  },
  {
    id: 'software',
    icon: Code2,
    title: 'Custom Software',
    tagline: 'Scalable products, built to last.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    gradient: 'from-violet-500 to-purple-600',
    desc: 'Robust web applications, APIs, and backend systems for fintech platforms, internal tools, and enterprise software.',
    capabilities: [
      'Full-stack web development (React, Next.js, Node.js)',
      'Backend API & microservices architecture',
      'Database design & optimization',
      'Fintech platform development',
      'Cloud infrastructure & DevOps (AWS, GCP, Azure)',
      'Technical documentation & knowledge transfer',
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation',
    tagline: 'Eliminate repetition. Amplify output.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    gradient: 'from-amber-400 to-orange-500',
    desc: 'Intelligent automated systems that cut errors, reduce operational costs, and free your team for the work that matters.',
    capabilities: [
      'Business process mapping & automation design',
      'AI-powered workflow & decision automation',
      'System integrations & API orchestration',
      'Document processing & data extraction',
      'Reporting & alerting pipelines',
      'Robotic Process Automation (RPA)',
    ],
  },
  {
    id: 'mvp',
    icon: Rocket,
    title: 'MVP Strategy',
    tagline: 'From idea to working product — fast.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    gradient: 'from-emerald-400 to-teal-500',
    desc: 'Define, scope, and ship a first version that validates assumptions and attracts early users or investors — without wasting months on the wrong features.',
    capabilities: [
      'Product scoping & technical roadmapping',
      'Architecture decisions & technology selection',
      'Rapid prototyping & user validation',
      'MVP delivery in 6–12 weeks',
      'Investor-ready technical documentation',
      'Post-launch iteration support',
    ],
  },
]

export default function Services() {
  const [activeId, setActiveId] = useState('ai')
  const active = services.find((s) => s.id === activeId)!

  return (
    <>
      {/* Header */}
      <section className="bg-slate-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            What we build
          </h1>
          <p className="text-slate-500 text-lg">Pick a service to see what's inside.</p>
        </div>
      </section>

      {/* Icon selector + panel */}
      <section className="bg-slate-50 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          {/* Circular icon tabs */}
          <div className="flex items-start justify-center gap-6 md:gap-10 mb-10 flex-wrap">
            {services.map((s) => {
              const isActive = s.id === activeId
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-br ${s.gradient} shadow-lg scale-110`
                        : 'bg-slate-100 group-hover:bg-slate-200'
                    }`}
                  >
                    <s.icon
                      className={`w-7 h-7 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs text-center leading-tight max-w-[72px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-slate-900 font-semibold' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div
            key={activeId}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-fadeIn"
          >
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">

              {/* Left: description */}
              <div className="p-8">
                <div className={`w-12 h-12 rounded-xl ${active.bg} flex items-center justify-center mb-5`}>
                  <active.icon className={`w-6 h-6 ${active.color}`} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{active.title}</h2>
                <p className={`text-sm font-semibold ${active.color} mb-4`}>{active.tagline}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{active.desc}</p>
              </div>

              {/* Right: features + CTA */}
              <div className="p-8 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">What's included</h3>
                  <ul className="space-y-2.5">
                    {active.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className={`w-4 h-4 ${active.color} mt-0.5 flex-shrink-0`} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${active.gradient} text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity duration-150 text-sm`}
                >
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-sky-500 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Not sure where to start?</h2>
          <p className="text-white/80 text-lg mb-8">Book a free 30-minute discovery call. No pitch, just honest advice.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-7 py-3.5 rounded-xl hover:bg-sky-50 transition-colors duration-150"
          >
            Book a discovery call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
