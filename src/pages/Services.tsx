import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Blocks, Code2, Zap, ArrowRight, CheckCircle2, Target, ShieldCheck, MessageSquare } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Context is everything',
    desc: 'We take the time to understand your business before we build. The right solution comes from getting the problem right first.',
  },
  {
    icon: ShieldCheck,
    title: 'Security at the core',
    desc: 'Every system we build is designed with security as a foundational requirement, not an afterthought. From smart contract audits to encrypted data pipelines, we engineer for resilience against real-world threats from day one.',
  },
  {
    icon: MessageSquare,
    title: 'We build with purpose',
    desc: "If it doesn't make sense, we'll tell you. If there's a better way, we'll show you.",
  },
]

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Development',
    tagline: 'Intelligent systems engineered for your product.',
    color: '#67e8f9',
    bg: 'rgba(255,255,255,0.1)',
    gradient: 'linear-gradient(135deg, #06B6D4, #4553ec)',
    desc: 'Custom ML models, LLM integrations, and AI-powered features that solve real operational challenges — from document intelligence and predictive analytics to automated decision systems.',
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
    color: '#67e8f9',
    bg: 'rgba(255,255,255,0.1)',
    gradient: 'linear-gradient(135deg, #06B6D4, #4553ec)',
    desc: 'EVM smart contracts, Layer 2 deployments, and cross-chain bridges — built to be auditable, secure, and production-ready from day one, not just functional in a test environment.',
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
    tagline: 'Scalable products, architected to last.',
    color: '#67e8f9',
    bg: 'rgba(255,255,255,0.1)',
    gradient: 'linear-gradient(135deg, #06B6D4, #4553ec)',
    desc: 'Robust web applications, APIs, and backend systems for fintech platforms, internal tools, and enterprise software — with clean architecture, full test coverage, and documentation built for long-term ownership.',
    capabilities: [
      'Full-stack web development (React, Next.js, Node.js)',
      'Backend API & microservices architecture',
      'Database design & optimization',
      'Cloud infrastructure & DevOps (AWS, GCP, Azure)',
      'Technical documentation & knowledge transfer',
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation',
    tagline: 'Eliminate repetition. Amplify your team.',
    color: '#67e8f9',
    bg: 'rgba(255,255,255,0.1)',
    gradient: 'linear-gradient(135deg, #06B6D4, #4553ec)',
    desc: 'Intelligent automated systems that eliminate errors, reduce operational costs, and free your team to focus on the work that actually drives growth — not the manual tasks eating their time.',
    capabilities: [
      'Business process mapping & automation design',
      'AI-powered workflow & decision automation',
      'System integrations & API orchestration',
      'Document processing & data extraction',
      'Reporting & alerting pipelines',
      'Robotic Process Automation (RPA)',
    ],
  },
]


export default function Services() {
  const [activeId, setActiveId] = useState('ai')
  const active = services.find((s) => s.id === activeId)!

  return (
    <>
      {/* Header */}
      <section className="pt-12 pb-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="mb-4 font-display font-semibold text-base tracking-wide" style={{ color: '#67e8f9' }}>Our Services</div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 leading-tight">
            From complexity to competitive edge.
          </h1>
          <p className="text-lg leading-[1.7] max-w-2xl mx-auto text-white">
            We solve complex operational problems by building systems that actually work in practice. Everything we deliver is designed to improve performance, reduce inefficiencies, and drive <strong style={{ color: '#ffffff' }}>real results</strong>.
          </p>
        </div>
      </section>

      {/* Icon selector + panel */}
      <section className="pb-0">
        <div className="max-w-3xl mx-auto px-6">

          {/* Circular icon tabs */}
          <div className="flex items-start justify-center gap-6 md:gap-10 mb-10 flex-wrap">
            {services.map((s) => {
              const isActive = s.id === activeId
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className="flex flex-col items-center gap-2 group focus-visible:outline-none"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200"
                    style={
                      isActive
                        ? { background: 'linear-gradient(to right, #6D28D9, #9333EA)', boxShadow: '0 6px 20px rgba(109,40,217,0.4)', transform: 'scale(1.1)' }
                        : { background: 'rgba(6,4,28,0.45)', border: '1px solid rgba(109,40,217,0.3)' }
                    }
                  >
                    <s.icon
                      className="w-7 h-7 transition-colors duration-200"
                      style={{ color: '#ffffff' }}
                    />
                  </div>
                  <span
                    className="text-xs text-center leading-tight max-w-[72px] font-display font-medium transition-colors duration-200"
                    style={{ color: '#ffffff', fontWeight: isActive ? '600' : '500' }}
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
            className="rounded-2xl overflow-hidden animate-fadeIn"
            style={{ background: 'rgba(6,4,28,0.5)' }}
          >
            <div className="grid md:grid-cols-2">

              {/* Left: description */}
              <div className="p-8">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <active.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-1">{active.title}</h2>
                <p className="font-display text-sm font-semibold mb-4" style={{ color: active.color }}>{active.tagline}</p>
                <p className="text-sm leading-[1.75]" style={{ color: 'rgba(255,255,255,0.7)' }}>{active.desc}</p>
              </div>

              {/* Right: features + CTA */}
              <div className="p-8 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-mono-brand text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>What's included</h3>
                  <ul className="space-y-2.5">
                    {active.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: active.color }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 text-white font-display font-semibold px-6 py-3 rounded-lg hover:opacity-90 active:opacity-80 transition-opacity duration-150 text-sm"
                  style={{ background: active.gradient, boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}
                >
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* How we operate */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-tag section-tag-no-line justify-center mb-4" style={{ color: '#67e8f9' }}>How we operate</div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Three principles that guide every engagement
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl p-7 card-hover" style={{ background: 'rgba(6,4,28,0.65)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-white mb-3">{v.title}</h3>
                <p className="text-sm leading-[1.75] text-white">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-6">
            <div className="section-tag section-tag-no-line justify-center mb-4" style={{ color: '#67e8f9' }}>Why we exist</div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              The thinking behind Morphosis
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="leading-[1.8] text-[17px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Morphosis builds advanced infrastructure that helps companies move beyond the limits of their current systems. We design and implement AI, blockchain, and automation solutions with a focus on what actually works, not pre-packaged tools or superficial integrations. Our team brings together expertise across software, product, and operations to understand how businesses really function and to solve problems at their core. We work closely with each client to deliver technology that becomes a lasting part of their operations, whether that's a fully owned product, a scalable platform, or custom systems integrated into existing workflows, with a clear goal to help companies operate more efficiently, adapt faster, and make better decisions.
            </p>
          </div>
        </div>
      </section>

    </>
  )
}
