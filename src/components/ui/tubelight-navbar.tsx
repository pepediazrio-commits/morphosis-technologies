import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function TubelightNavBar({ items, className }: NavBarProps) {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(
    items.find((item) => item.url === location.pathname)?.name ?? items[0].name
  )
  useEffect(() => {
    const match = items.find((item) => item.url === location.pathname)
    if (match) setActiveTab(match.name)
  }, [location.pathname, items])

  return (
    <div className={cn('fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6', className)}>
      <div className="flex items-center gap-1 border backdrop-blur-lg py-1 px-1 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
        style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.18)' }}>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 font-display',
                isActive ? 'text-white' : 'text-white hover:text-white'
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-full -z-10"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full" style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <div className="absolute w-12 h-6 rounded-full blur-md -top-2 -left-2" style={{ background: 'rgba(255,255,255,0.2)' }} />
                    <div className="absolute w-8 h-6 rounded-full blur-md -top-1" style={{ background: 'rgba(255,255,255,0.15)' }} />
                    <div className="absolute w-4 h-4 rounded-full blur-sm top-0 left-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
