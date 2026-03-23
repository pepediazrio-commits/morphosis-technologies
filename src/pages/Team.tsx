import TeamCarousel from '../components/TeamCarousel'
import { LogosCarousel } from '../components/ui/logos-carousel'

export default function Team() {
  return (
    <div style={{ position: 'relative' }}>
      {/* Decorative arch */}
      <div className="pointer-events-none" style={{
        position: 'absolute',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        border: '1px solid rgba(160,140,255,0.20)',
        background: 'none',
        left: '50%',
        top: '370px',
        transform: 'translate(-50%, -50%)',
        clipPath: 'inset(0 0 50% 0)',
        zIndex: 0,
      }} />

      {/* Header */}
      <section className="pt-24 pb-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="mb-5 leading-tight">
            <span className="block text-3xl md:text-4xl lg:text-[48px] font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Partnered with most of the</span>
            <span className="block text-4xl md:text-5xl lg:text-[62px] font-semibold italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#8B5CF6' }}>top people at each industry</span>
          </h1>
        </div>
      </section>

      {/* Team carousel */}
      <section className="pt-4 pb-12" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-6xl mx-auto px-6">
          <TeamCarousel />
        </div>
      </section>

      {/* Collaborators */}
      <LogosCarousel />

    </div>
  )
}
