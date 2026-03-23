import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Brain, Blocks, Code2, Zap, ChevronRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import AutomationMockup from '../components/AutomationMockup'
import AIAnalyticsMockup from '../components/AIAnalyticsMockup'
import WorkflowMockup from '../components/WorkflowMockup'

const services = [
  {
    id: 'ai',
    icon: Brain,
    title: 'AI Development',
    tagline: 'Intelligent systems engineered for your product.',
    color: '#a5b4fc',
    activeBg: '#4553ec',
    bg: 'rgba(255,255,255,0.1)',
    desc: 'We design, train, and deploy machine learning models and AI-powered features that solve real operational challenges — from intelligent document processing and predictive analytics to natural language interfaces and decision automation.',
    points: ['Custom ML model development & fine-tuning', 'LLM integration & AI assistant development', 'Predictive analytics & forecasting systems', 'AI pipeline architecture & MLOps'],
  },
  {
    id: 'blockchain',
    icon: Blocks,
    title: 'Blockchain',
    tagline: 'Production-grade on-chain infrastructure.',
    color: '#c4b5fd',
    activeBg: '#7040ec',
    bg: 'rgba(255,255,255,0.1)',
    desc: 'From smart contracts to DeFi protocols and cross-chain bridges, we build blockchain infrastructure that is auditable, secure, and ready for real-world usage — built for production, not just demos.',
    points: ['Smart contract development (Solidity, Rust, Move)', 'DeFi protocol design & implementation', 'Token & NFT standards (ERC-20, ERC-721)', 'Cross-chain interoperability solutions'],
  },
  {
    id: 'software',
    icon: Code2,
    title: 'Custom Software',
    tagline: 'Scalable products, architected to last.',
    color: '#c4b5fd',
    activeBg: '#8B5CF6',
    bg: 'rgba(255,255,255,0.1)',
    desc: 'End-to-end web applications, APIs, and backend systems for fintech platforms, internal tools, and enterprise software — with clean architecture, full test coverage, and documentation built for your team to own.',
    points: ['Full-stack web development (React, Next.js, Node.js)', 'Backend API & microservices architecture', 'Fintech platform & enterprise development', 'Cloud infrastructure & DevOps (AWS, GCP, Azure)'],
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation',
    tagline: 'Eliminate repetition. Amplify your team.',
    color: '#67e8f9',
    activeBg: '#06B6D4',
    bg: 'rgba(255,255,255,0.1)',
    desc: 'We identify the workflows slowing your business down and replace them with intelligent automated systems — reducing errors, cutting operational costs, and freeing your team for the work that actually moves the needle.',
    points: ['Business process mapping & automation design', 'AI-powered workflow & decision automation', 'System integrations & API orchestration', 'Document processing & data extraction'],
  },
]


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const collaborators = [
  {
    name: 'Carbono Solutions',
    desc: 'Sustainability and carbon management technology.',
    initials: 'CS',
    gradient: 'linear-gradient(135deg, #10b981, #0d9488)',
  },
  {
    name: 'Lila Labs',
    desc: 'Creative technology and design systems.',
    initials: 'LL',
    gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)',
  },
  {
    name: 'Partner',
    desc: 'Highly specialized technology collaborator.',
    initials: '?',
    gradient: 'linear-gradient(135deg, #94a3b8, #64748b)',
    placeholder: true,
  },
  {
    name: 'Partner',
    desc: 'Highly specialized technology collaborator.',
    initials: '?',
    gradient: 'linear-gradient(135deg, #94a3b8, #64748b)',
    placeholder: true,
  },
]

function PlatformDemos() {
  const [tab, setTab] = useState<'analytics' | 'workflow' | 'automation'>('analytics')
  return (
    <section className="pt-20 pb-16 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="section-tag section-tag-no-line justify-center mb-4">Platform in action</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            See the intelligence behind every decision.
          </h2>
        </div>
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {([
            { id: 'analytics', label: 'AI Analytics Dashboard' },
            { id: 'workflow',  label: 'Workflow Builder' },
            { id: 'automation', label: 'Live Automation Pipeline' },
          ] as const).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer border focus-visible:outline-none"
              style={tab === id
                ? { background: 'linear-gradient(to right, #6D28D9, #9333EA)', color: '#ffffff', borderColor: 'transparent', boxShadow: '0 4px 18px rgba(109,40,217,0.35)' }
                : { background: 'rgba(6,4,28,0.85)', color: '#ffffff', borderColor: 'transparent' }
              }
            >
              {label}
            </button>
          ))}
        </div>
        {tab === 'analytics' && <AIAnalyticsMockup />}
        {tab === 'workflow' && <WorkflowMockup />}
        {tab === 'automation' && <AutomationMockup />}
      </div>
    </section>
  )
}

export default function Home() {
  const [activeService, setActiveService] = useState(0)
  const navigate = useNavigate()
  const active = services[activeService]

  return (
    <>
      {/* Hero */}
      <HeroHighlight containerClassName="min-h-[calc(100vh-4rem)] flex items-center">
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center -mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="section-tag section-tag-no-line justify-center mb-6" style={{ color: '#ffffff', fontSize: '15px' }}>Custom AI · Blockchain · Software</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -4, 0] }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-[-0.03em] max-w-4xl mx-auto"
          >
            Orchestrating{' '}
            <Highlight className="text-white">
              Digital Advantage.
            </Highlight>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            className="mt-7 text-lg md:text-xl max-w-2xl mx-auto leading-[1.7]"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            We design AI, blockchain, and Automation platforms that connect data, streamline workflows, and make operations easier to manage at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-10"
          >
            <Link to="/contact" className="btn-brand">
              Start a project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-outline">
              Explore our services
            </Link>
          </motion.div>

        </div>
      </HeroHighlight>

      {/* Services */}
      <section className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-tag justify-center mb-4">What we build</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
              Enterprise-grade solutions, delivered.
            </h2>
            <p className="mt-4 max-w-xl mx-auto leading-[1.7]" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Secure, scalable, and built to perform from day one. Select a service to see exactly how we approach it — and what you get when we deliver it.
            </p>
          </div>

          {/* Tab row */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-0">
            {services.map((s, i) => {
              const isActive = i === activeService
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(i)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-semibold text-sm transition-all duration-200 cursor-pointer border focus-visible:outline-none"
                  style={
                    isActive
                      ? { background: 'linear-gradient(to right, #6D28D9, #9333EA)', color: '#fff', borderColor: 'transparent', boxShadow: '0 4px 18px rgba(109,40,217,0.35)' }
                      : { background: 'rgba(6,4,28,0.85)', color: '#ffffff', borderColor: 'transparent' }
                  }
                  onMouseOver={e => { if (!isActive) e.currentTarget.style.opacity = '0.8' }}
                  onMouseOut={e => { if (!isActive) e.currentTarget.style.opacity = '1' }}
                >
                  <s.icon className="w-4 h-4" />
                  {s.title}
                </button>
              )
            })}
          </div>

          {/* Panel */}
          <div className="mt-4 rounded-2xl p-8" style={{ background: 'rgba(6,4,28,0.5)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-fadeIn" key={active.id}>
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(255,255,255,0.12)' }}>
                  <active.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">{active.title}</h3>
                <p className="font-display text-sm font-semibold mb-4" style={{ color: active.color }}>{active.tagline}</p>
                <p className="leading-[1.7] mb-5 text-[15px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{active.desc}</p>
                <button
                  onClick={() => navigate(`/services#${active.id}`)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-150 cursor-pointer hover:gap-3 focus-visible:outline-none text-white/70 hover:text-white"
                >
                  Full details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {active.points.map((p) => (
                  <div key={p} className="flex items-center gap-3 p-3.5 rounded-xl border" style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)' }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: active.color }} />
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborators — temporarily hidden */}

      <PlatformDemos />

      {/* CTA */}
      <section className="py-20" style={{ background: 'rgba(0,0,0,0.18)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Working through a problem or building something new?</h2>
          <p className="text-lg mb-8 leading-[1.7]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Let's talk. Book a 30-minute call with us!
          </p>
          <Link to="/contact" className="btn-brand">
            Book a discovery call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </>
  )
}
