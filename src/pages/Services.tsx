import { useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Brain, Blocks, Code2, Rocket, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Development',
    tagline: 'Intelligent systems, purpose-built for your product.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    accentBorder: 'border-l-sky-500',
    stats: [['95%', 'model accuracy avg.'], ['3×', 'faster than internal builds'], ['60%', 'ops cost reduction']],
    desc: 'We design, train, and deploy machine learning models and AI-powered features that solve real operational problems — from intelligent document processing to predictive analytics and natural language interfaces.',
    capabilities: [
      'Custom ML model development and fine-tuning',
      'LLM integration and AI assistant development',
      'Computer vision and document intelligence',
      'Predictive analytics and forecasting systems',
      'AI pipeline architecture and MLOps',
      'Integration with existing platforms and APIs',
    ],
  },
  {
    id: 'blockchain',
    icon: Blocks,
    title: 'Blockchain Development',
    tagline: 'Production-grade on-chain infrastructure.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    accentBorder: 'border-l-indigo-500',
    stats: [['100%', 'audited contracts'], ['40+', 'protocols deployed'], ['$0', 'in exploits to date']],
    desc: 'From EVM smart contracts to Layer 2 deployments and cross-chain bridges, we build blockchain infrastructure that is auditable, secure, and ready for real-world usage — not just demos.',
    capabilities: [
      'Smart contract development (Solidity, Rust, Move)',
      'DeFi protocol design and implementation',
      'Token and NFT standards (ERC-20, ERC-721, ERC-1155)',
      'Cross-chain bridge and interoperability solutions',
      'Wallet and custody integrations',
      'Smart contract auditing and security review',
    ],
  },
  {
    id: 'software',
    icon: Code2,
    title: 'Custom Software',
    tagline: 'Scalable products, built to last.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    accentBorder: 'border-l-violet-500',
    stats: [['50+', 'platforms delivered'], ['99.9%', 'uptime SLA'], ['Full', 'code ownership']],
    desc: 'We develop robust web applications, APIs, and backend systems for fintech platforms, internal tools, and enterprise software. Clean architecture, solid testing, and full technical documentation included.',
    capabilities: [
      'Full-stack web development (React, Next.js, Node.js)',
      'Backend API and microservices architecture',
      'Database design and optimization',
      'Fintech platform development (payments, compliance, reporting)',
      'Cloud infrastructure and DevOps (AWS, GCP, Azure)',
      'Technical documentation and knowledge transfer',
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation',
    tagline: 'Eliminate repetition. Amplify output.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    accentBorder: 'border-l-amber-500',
    stats: [['80%', 'time saved on avg.'], ['Day 1', 'measurable ROI'], ['Any stack', 'integration ready']],
    desc: 'We identify the workflows slowing your business down and replace them with intelligent automated systems — reducing errors, cutting operational costs, and freeing your team to focus on the work that actually moves the needle.',
    capabilities: [
      'Business process mapping and automation design',
      'AI-powered workflow and decision automation',
      'System integrations and API orchestration',
      'Document processing and data extraction',
      'Reporting and alerting pipelines',
      'Robotic Process Automation (RPA)',
    ],
  },
  {
    id: 'mvp',
    icon: Rocket,
    title: 'MVP & Product Strategy',
    tagline: 'From idea to working product — fast.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    accentBorder: 'border-l-emerald-500',
    stats: [['6–12 wks', 'to first launch'], ['3×', 'faster to market'], ['Founder-tested', 'approach']],
    desc: 'We work with founders and product teams to define, scope, and deliver a first version of their product that validates assumptions and attracts early users or investors — without burning months on the wrong features.',
    capabilities: [
      'Product scoping and technical roadmapping',
      'Architecture decisions and technology selection',
      'Rapid prototyping and user validation',
      'MVP delivery in 6–12 weeks',
      'Investor-ready technical documentation',
      'Post-launch iteration and growth support',
    ],
  },
]

export default function Services() {
  const location = useLocation()
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [location.hash])

  return (
    <>
      {/* Header */}
      <section className="bg-slate-50 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">Services</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            What we build — and how
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Five areas where we bring focused expertise and real-world results. Every engagement is led by specialists who understand both the technology and the business context behind it.
          </p>
        </div>
      </section>

      {/* Sticky nav */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  sectionRefs.current[s.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  window.history.pushState(null, '', `#${s.id}`)
                }}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${s.color} hover:bg-slate-50`}
              >
                <s.icon className="w-4 h-4" />
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Service sections */}
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6 space-y-10">
          {services.map((s) => (
            <div
              key={s.id}
              id={s.id}
              ref={(el) => { sectionRefs.current[s.id] = el }}
              className={`border ${s.border} border-l-4 ${s.accentBorder} rounded-2xl p-8 md:p-10 scroll-mt-32`}
            >
              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-slate-100">
                {s.stats.map(([val, label]) => (
                  <div key={label}>
                    <div className={`text-2xl font-extrabold ${s.color}`}>{val}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div>
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center mb-5`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{s.title}</h2>
                  <p className={`text-sm font-semibold ${s.color} mb-4`}>{s.tagline}</p>
                  <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">What's included</h3>
                  <ul className="space-y-2.5">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className={`w-4 h-4 ${s.color} mt-0.5 flex-shrink-0`} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-sky-500 to-indigo-600 py-20 mt-10">
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
