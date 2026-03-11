import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Brain, Blocks, Code2, Rocket, Zap, ChevronRight, CheckCircle2 } from 'lucide-react'

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Development',
    tagline: 'Intelligent systems, purpose-built for your product.',
    color: 'text-sky-600',
    activeBg: 'bg-sky-500',
    bg: 'bg-sky-50',
    desc: 'We design, train, and deploy machine learning models and AI-powered features that solve real operational problems — from intelligent document processing to predictive analytics and natural language interfaces.',
    points: ['Custom ML model development', 'LLM integration & AI assistants', 'Predictive analytics & forecasting', 'AI pipeline architecture & MLOps'],
  },
  {
    id: 'blockchain',
    icon: Blocks,
    title: 'Blockchain',
    tagline: 'Production-grade on-chain infrastructure.',
    color: 'text-indigo-600',
    activeBg: 'bg-indigo-500',
    bg: 'bg-indigo-50',
    desc: 'From smart contracts to DeFi protocols and cross-chain bridges, we build blockchain infrastructure that is auditable, secure, and ready for real-world usage — not just demos.',
    points: ['Smart contract development', 'DeFi protocol design', 'Token & NFT standards', 'Cross-chain interoperability'],
  },
  {
    id: 'software',
    icon: Code2,
    title: 'Custom Software',
    tagline: 'Scalable products, built to last.',
    color: 'text-violet-600',
    activeBg: 'bg-violet-500',
    bg: 'bg-violet-50',
    desc: 'End-to-end web applications, APIs, and backend systems for fintech platforms, internal tools, and enterprise software — with clean architecture, full testing, and documentation.',
    points: ['Full-stack web development', 'Backend API & microservices', 'Fintech platform development', 'Cloud infrastructure & DevOps'],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation',
    tagline: 'Eliminate repetition. Amplify output.',
    color: 'text-amber-600',
    activeBg: 'bg-amber-500',
    bg: 'bg-amber-50',
    desc: 'We identify the workflows slowing your business down and replace them with intelligent automated systems — reducing errors, cutting costs, and freeing your team to focus on what matters.',
    points: ['Business process automation', 'AI-powered workflow design', 'System integrations & APIs', 'Document & data processing'],
  },
  {
    id: 'mvp',
    icon: Rocket,
    title: 'MVP & Strategy',
    tagline: 'From idea to working product — fast.',
    color: 'text-emerald-600',
    activeBg: 'bg-emerald-500',
    bg: 'bg-emerald-50',
    desc: 'We work with founders and product teams to define, scope, and deliver a first version of their product — validating assumptions and attracting early users without burning months on the wrong features.',
    points: ['Product scoping & roadmapping', 'Rapid prototyping & validation', 'MVP delivery in 6–12 weeks', 'Investor-ready documentation'],
  },
]

const process = [
  { step: '01', title: 'Discover', desc: 'We start by deeply understanding your business context, goals, and the outcomes that matter most.' },
  { step: '02', title: 'Design', desc: 'Architecture, UX, and technical plan — aligned with your team before a single line of code is written.' },
  { step: '03', title: 'Build', desc: 'Iterative development with full transparency. Regular demos, clean code, no black boxes.' },
  { step: '04', title: 'Launch & Scale', desc: 'We deploy, monitor, and stay engaged as your product grows. We build for the long run.' },
]

const collaborators = [
  {
    name: 'Carbono Solutions',
    desc: 'Sustainability and carbon management technology.',
    initials: 'CS',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Lila Labs',
    desc: 'Creative technology and design systems.',
    initials: 'LL',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Partner',
    desc: 'Highly specialized technology collaborator.',
    initials: '?',
    color: 'from-slate-400 to-slate-500',
    placeholder: true,
  },
  {
    name: 'Partner',
    desc: 'Highly specialized technology collaborator.',
    initials: '?',
    color: 'from-slate-400 to-slate-500',
    placeholder: true,
  },
]

export default function Home() {
  const [activeService, setActiveService] = useState(0)
  const navigate = useNavigate()
  const active = services[activeService]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-100/60 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.08] tracking-tight max-w-4xl mx-auto">
            Software that thinks,<br />
            <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
              infrastructure that lasts.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Morphosis Technologies builds custom AI and blockchain solutions for companies worldwide — with active projects across Europe, Latin America, and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors duration-150"
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-6 py-3.5 rounded-xl transition-colors duration-150"
            >
              See our services
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-10 mt-20 pt-10 border-t border-slate-100">
            {[['50+', 'Projects delivered'], ['8+', 'Years of experience'], ['3', 'Continents served'], ['100%', 'On-time delivery rate']].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-extrabold text-slate-900">{val}</div>
                <div className="text-sm text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — horizontal accordion tabs */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">What we build</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">End-to-end technology services</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">Select a service to learn more about how we approach it.</p>
          </div>

          {/* Tab row */}
          <div className="flex flex-wrap justify-center gap-3 mb-0">
            {services.map((s, i) => {
              const isActive = i === activeService
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(i)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? `${s.activeBg} text-white border-transparent shadow-md`
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  {s.title}
                </button>
              )
            })}
          </div>

          {/* Panel */}
          <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className={`w-12 h-12 rounded-xl ${active.bg} flex items-center justify-center mb-5`}>
                  <active.icon className={`w-6 h-6 ${active.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{active.title}</h3>
                <p className={`text-sm font-semibold ${active.color} mb-4`}>{active.tagline}</p>
                <p className="text-slate-500 leading-relaxed mb-5">{active.desc}</p>
                <button
                  onClick={() => navigate(`/services#${active.id}`)}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${active.color} hover:gap-3 transition-all duration-150 cursor-pointer`}
                >
                  Full details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {active.points.map((p) => (
                  <div key={p} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className={`w-4 h-4 ${active.color} flex-shrink-0`} />
                    <span className="text-sm text-slate-700 font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborators */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">Collaborators</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Highly specialized partners</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              We work alongside a curated network of specialized companies to bring the right expertise to every project.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {collaborators.map((c) => (
              <div key={c.name + c.desc} className={`border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-md transition-all duration-200 ${c.placeholder ? 'opacity-40' : ''}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4`}>
                  <span className="text-white font-extrabold text-lg">{c.initials}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{c.placeholder ? 'Coming soon' : c.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — gradient background matching logo */}
      <section className="bg-gradient-to-br from-sky-500 to-indigo-600 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-white/70 font-semibold text-sm uppercase tracking-wider mb-3">How we work</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A process built for clarity</h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">No surprises. No handoffs into the void. Just a structured approach that keeps your project moving.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={p.step} className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-white/50 font-mono text-xs font-bold mb-3 tracking-wider">{p.step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Morphosis — the bridge */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sky-600 font-semibold text-sm uppercase tracking-wider mb-3">Our approach</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight max-w-3xl mx-auto mb-6">
            We are the bridge between your business and the future.
          </h2>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed mb-6">
            Every company is different. The industries, the processes, the people — the context. We believe that truly great technology solutions can only come from genuinely understanding that context first.
          </p>
          <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed mb-10">
            That's why we don't offer off-the-shelf answers. We bring together experts from across every field — technology, finance, operations, design — to understand your world, and then translate that understanding into the right solution, built specifically for you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors duration-150"
          >
            Talk to us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Ready to build something significant?</h2>
          <p className="text-slate-500 text-lg mb-8 max-w-lg mx-auto">Tell us about your project and we'll get back to you within 24 hours.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-150"
          >
            Start the conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
