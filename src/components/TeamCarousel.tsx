import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
  gradient: string
  photoBg: string
  photoBgSize?: string
  photoBgPosition?: string
}

const team: TeamMember[] = [
  {
    name: 'John Osorno',
    role: 'Founder & CEO',
    bio: 'Founder and CEO of Morphosis Technologies. Brings hands-on experience building and scaling tech businesses across multiple industries, with a focus on payment gateways, AI, and Blockchain since 2014.',
    initials: 'JO',
    gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)',
    photoBg: "url('/team/john2.png')",
    photoBgSize: '130%',
    photoBgPosition: 'center calc(100% + 120px)',
  },
  {
    name: 'Jose Luis Diaz-Rio',
    role: 'AI Engineer',
    bio: 'Builds AI and blockchain systems for financial infrastructure, turning complex market and transaction data into tools that automate analysis and support better decision-making.',
    initials: 'JL',
    gradient: 'linear-gradient(135deg, #06B6D4, #7C3AED)',
    photoBg: "url('/team/joseluis.png')",
  },
  {
    name: 'Stephania Osorno',
    role: 'Product Owner',
    bio: "Bridges strategy and execution — defining product vision, managing delivery roadmaps, and ensuring every solution shipped reflects both the client's needs and Morphosis's commitment to quality and precision.",
    initials: 'SO',
    gradient: 'linear-gradient(135deg, #7C3AED, #2563EB)',
    photoBg: "url('/team/newstephania.png')",
  },
  {
    name: 'Sebastian Novoa',
    role: 'Head of Tech',
    bio: 'Leads the technical vision and engineering excellence at Morphosis. Brings deep expertise in building scalable, resilient systems — from architecture to deployment — that perform under real-world enterprise demands.',
    initials: 'SN',
    gradient: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
    photoBg: "url('/team/sebastianteam.png')",
  },
]

const AUTO_CLOSE_DELAY = 5000

interface TeamCardProps {
  member: TeamMember
  isActive: boolean
  onClick: () => void
}

function TeamCard({ member, isActive, onClick }: TeamCardProps) {
  const autoCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (autoCloseRef.current) { clearTimeout(autoCloseRef.current); autoCloseRef.current = null }
  }, [])

  useEffect(() => {
    if (!isActive) { clearTimers(); return }
    autoCloseRef.current = setTimeout(() => { onClick() }, AUTO_CLOSE_DELAY)
    return () => { clearTimers() }
  }, [isActive, onClick, clearTimers])

  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        height: '360px',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        flexShrink: 0,
        transform: isActive ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
        boxShadow: isActive
          ? '0 24px 50px rgba(124,111,255,0.45)'
          : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(124,111,255,0.3)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)'
        }
      }}
    >
      {/* Gradient / photo background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: member.photoBg ? undefined : member.gradient,
        backgroundImage: member.photoBg || undefined,
        backgroundSize: member.photoBg ? (member.photoBgSize || 'cover') : undefined,
        backgroundPosition: member.photoBg ? (member.photoBgPosition || 'center top') : undefined,
        opacity: isActive ? 0 : 1,
        transition: 'opacity 0.45s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {!member.photoBg && (
          <span style={{ fontSize: '56px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Grotesk', sans-serif" }}>
            {member.initials}
          </span>
        )}
      </div>

      {/* Bottom gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(4,6,15,0.92) 100%)',
        opacity: isActive ? 0 : 1,
        transition: 'opacity 0.45s ease',
        pointerEvents: 'none',
      }} />

      {/* Nameplate */}
      <div style={{
        position: 'absolute', bottom: '18px', left: '18px',
        opacity: isActive ? 0 : 1,
        transition: 'opacity 0.45s ease',
        pointerEvents: 'none',
      }}>
        <div style={{ color: 'white', fontSize: '17px', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2 }}>
          {member.name}
        </div>
        <div style={{ color: 'rgba(124,111,255,0.9)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
          {member.role}
        </div>
      </div>

      {/* Bio overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(60,50,180,0.97), rgba(30,20,100,0.99))',
        opacity: isActive ? 1 : 0,
        transition: 'opacity 0.45s ease',
        pointerEvents: isActive ? 'auto' : 'none',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2, marginBottom: '5px' }}>
            {member.name}
          </div>
          <div style={{ color: 'rgba(180,170,255,0.85)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, marginBottom: '16px' }}>
            {member.role}
          </div>
          <div style={{ height: '2px', width: '36px', background: 'linear-gradient(90deg, #7C6FFF, #38BDF8)', borderRadius: '2px', marginBottom: '16px' }} />
          <p style={{ color: 'rgba(220,220,255,0.88)', fontSize: '13px', fontFamily: 'Inter, sans-serif', lineHeight: 1.65, margin: 0 }}>
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TeamCarousel() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)
  const visibleCount = 3

  const handleCardClick = useCallback((index: number) => {
    setActiveIndex(prev => prev === index ? null : index)
  }, [])

  const prev = () => {
    setActiveIndex(null)
    setCurrent(c => (c - 1 + team.length) % team.length)
  }

  const next = () => {
    setActiveIndex(null)
    setCurrent(c => (c + 1) % team.length)
  }

  const visibleMembers = Array.from({ length: visibleCount }, (_, i) => ({
    member: team[(current + i) % team.length],
    globalIndex: (current + i) % team.length,
  }))

  return (
    <div style={{ position: 'relative' }}>
      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {visibleMembers.map(({ member, globalIndex }, slotIndex) => (
          <TeamCard
            key={`${globalIndex}-${slotIndex}`}
            member={member}
            isActive={activeIndex === globalIndex}
            onClick={() => handleCardClick(globalIndex)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
        <button
          onClick={prev}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#ffffff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.16)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(null); setCurrent(i) }}
              style={{
                width: i === current ? 20 : 6,
                height: 6, borderRadius: 3,
                background: i === current ? '#8B5CF6' : 'rgba(255,255,255,0.25)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#ffffff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.16)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
