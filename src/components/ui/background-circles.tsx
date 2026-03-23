import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

interface BackgroundCirclesProps {
  title?: string
  description?: string
  className?: string
  variant?: 'default' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary' | 'senary' | 'septenary' | 'octonary'
}

const VARIANTS = {
  default:    { outer: 'border-slate-300/40',   inner: 'border-slate-400/30'   },
  secondary:  { outer: 'border-emerald-500/50', inner: 'border-emerald-400/40' },
  tertiary:   { outer: 'border-orange-500/50',  inner: 'border-orange-400/40'  },
  quaternary: { outer: 'border-pink-500/50',    inner: 'border-pink-400/40'    },
  quinary:    { outer: 'border-yellow-500/50',  inner: 'border-yellow-400/40'  },
  senary:     { outer: 'border-blue-500/60',    inner: 'border-sky-400/50'     },
  septenary:  { outer: 'border-violet-500/50',  inner: 'border-violet-400/40'  },
  octonary:   { outer: 'border-red-500/50',     inner: 'border-red-400/40'     },
}

// How many px each ring shifts per ring index (outer rings move more)
const PARALLAX_FACTOR = [28, 22, 16, 11, 7, 3]

export function BackgroundCircles({
  title,
  description,
  className,
  variant = 'senary',
}: BackgroundCirclesProps) {
  const colors = VARIANTS[variant]
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springX = useSpring(rawX, { stiffness: 60, damping: 20 })
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.set(e.clientX - cx)
    rawY.set(e.clientY - cy)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative flex items-center justify-center overflow-hidden', className)}
    >
      {/* Concentric animated + parallax circles */}
      {[600, 500, 400, 320, 240, 160].map((size, i) => {
        const factor = PARALLAX_FACTOR[i] / 100
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const x = useTransform(springX, (v) => v * factor * (i % 2 === 0 ? 1 : -0.7))
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const y = useTransform(springY, (v) => v * factor * (i % 2 === 0 ? 1 : -0.7))

        return (
          <motion.div
            key={size}
            className={cn(
              'absolute rounded-full border',
              i % 2 === 0 ? colors.outer : colors.inner
            )}
            style={{ width: size, height: size, x, y }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 20 + i * 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
      })}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 35% at 50% 50%, rgba(37,99,235,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      {(title || description) && (
        <div className="relative z-10 text-center px-4">
          {title && (
            <h1 className="font-display text-5xl md:text-6xl lg:text-[72px] font-bold text-[#0A0F1E] leading-[1.06] tracking-[-0.03em]">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-5 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-[1.7]">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
