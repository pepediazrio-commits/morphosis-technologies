import { useEffect, useRef, useState } from 'react'

const steps = [
  { id: 1, label: 'Data Ingestion', icon: '⬇', desc: 'Raw inputs collected' },
  { id: 2, label: 'AI Processing', icon: '⚡', desc: 'Model inference running' },
  { id: 3, label: 'Decision Engine', icon: '🔀', desc: 'Rules evaluation' },
  { id: 4, label: 'Action Dispatch', icon: '📤', desc: 'Output triggered' },
]

const logPool = [
  { msg: 'Pipeline triggered — 847 records queued', type: 'info' },
  { msg: 'AI model loaded — latency 12ms', type: 'success' },
  { msg: 'Processing batch 1/4 — 212 records', type: 'info' },
  { msg: 'Anomaly detected in record #204 — flagged', type: 'warn' },
  { msg: 'Batch 1/4 complete — 0 errors', type: 'success' },
  { msg: 'Processing batch 2/4 — 212 records', type: 'info' },
  { msg: 'Confidence score 0.97 — threshold passed', type: 'success' },
  { msg: 'Decision engine: rule #14 matched', type: 'info' },
  { msg: 'Batch 2/4 complete — 1 warning', type: 'warn' },
  { msg: 'Processing batch 3/4 — 212 records', type: 'info' },
  { msg: 'Model inference — avg 11ms per record', type: 'success' },
  { msg: 'External API call — status 200 OK', type: 'success' },
  { msg: 'Rate limit warning — throttling at 95%', type: 'warn' },
  { msg: 'Batch 3/4 complete — 0 errors', type: 'success' },
  { msg: 'Processing batch 4/4 — 211 records', type: 'info' },
  { msg: 'Action dispatched — webhook triggered', type: 'success' },
  { msg: 'Output written to destination store', type: 'info' },
  { msg: 'Batch 4/4 complete — 0 errors', type: 'success' },
  { msg: 'Pipeline complete — 847/847 records processed', type: 'success' },
  { msg: 'Next run scheduled — T+00:15:00', type: 'info' },
  { msg: 'Pipeline triggered — 912 records queued', type: 'info' },
  { msg: 'AI model warm — latency 9ms', type: 'success' },
  { msg: 'Processing batch 1/4 — 228 records', type: 'info' },
  { msg: 'Record #88 flagged for review', type: 'warn' },
  { msg: 'Batch 1/4 complete — 0 errors', type: 'success' },
  { msg: 'Decision engine: 3 rules matched', type: 'info' },
  { msg: 'Confidence score 0.99 — threshold passed', type: 'success' },
  { msg: 'Batch 2/4 complete — 0 errors', type: 'success' },
  { msg: 'Processing batch 3/4 — 228 records', type: 'info' },
  { msg: 'Memory usage nominal — 42% utilised', type: 'info' },
  { msg: 'Batch 3/4 complete — 0 errors', type: 'success' },
  { msg: 'Processing batch 4/4 — 228 records', type: 'info' },
  { msg: 'Action dispatched — 912 outputs sent', type: 'success' },
  { msg: 'Pipeline complete — 912/912 records processed', type: 'success' },
  { msg: 'Idle — awaiting next trigger', type: 'info' },
]

const MAX_VISIBLE = 10

const metrics = [
  { label: 'Records/min', value: '1,240' },
  { label: 'Accuracy', value: '99.4%' },
  { label: 'Avg latency', value: '14ms' },
  { label: 'Uptime', value: '99.9%' },
]

type LogEntry = { time: string; msg: string; type: string }

export default function AutomationMockup() {
  const [activeStep, setActiveStep] = useState(1)
  const [pulse, setPulse] = useState(false)
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([])
  const poolIndexRef = useRef(0)


  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1)
      setPulse(true)
      setTimeout(() => setPulse(false), 400)
    }, 2000)
    return () => clearInterval(stepTimer)
  }, [])

  useEffect(() => {
    const addLog = () => {
      const entry = logPool[poolIndexRef.current % logPool.length]
      poolIndexRef.current += 1
      const time = new Date().toTimeString().slice(0, 8)
      setDisplayedLogs((prev) => {
        const next = [...prev, { time, msg: entry.msg, type: entry.type }]
        return next.length > MAX_VISIBLE ? next.slice(next.length - MAX_VISIBLE) : next
      })
    }
    addLog()
    const t = setInterval(addLog, 1200)
    return () => clearInterval(t)
  }, [])

  const statusColor = (stepId: number) => {
    if (stepId < activeStep) return '#34d399'
    if (stepId === activeStep) return '#a78bfa'
    return 'rgba(255,255,255,0.2)'
  }

  const logColor = (type: string) => {
    if (type === 'success') return '#34d399'
    if (type === 'warn') return '#fbbf24'
    return 'rgba(255,255,255,0.55)'
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(69,83,236,0.08)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Outer glow wrapper */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* Glow halo */}
          <div style={{
            position: 'absolute', inset: -3, borderRadius: 26,
            background: 'linear-gradient(135deg,#7C6FFF 0%,#2563EB 50%,#06B6D4 100%)',
            filter: 'blur(28px)', opacity: 0.6, zIndex: 0,
          }} />
        <div className="rounded-2xl overflow-hidden" style={{ position: 'relative', zIndex: 1, background: 'rgba(8,5,38,0.9)', border: '1px solid rgba(124,111,255,0.3)', boxShadow: '0 60px 120px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(124,111,255,0.15)' }}>

          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            </div>
            <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}>morphosis-automation-engine · v2.4.1</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#34d399' }} />
              <span className="text-xs" style={{ color: '#34d399', fontFamily: "'JetBrains Mono', monospace" }}>RUNNING</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>

            {/* Left: pipeline steps */}
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest mb-5 font-mono" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}>Pipeline · active</p>

              <div className="relative space-y-3">
                {steps.map((step, i) => {
                  const isActive = step.id === activeStep
                  const isDone = step.id < activeStep
                  return (
                    <div key={step.id} className="relative">
                      {i < steps.length - 1 && (
                        <div className="absolute left-[19px] top-[38px] w-[2px] h-[16px]" style={{ background: isDone ? '#34d399' : 'rgba(255,255,255,0.1)' }} />
                      )}
                      <div
                        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300"
                        style={{
                          background: isActive ? 'rgba(167,139,250,0.12)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${isActive ? 'rgba(167,139,250,0.35)' : 'rgba(255,255,255,0.07)'}`,
                          transform: isActive && pulse ? 'scale(1.01)' : 'scale(1)',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm transition-all duration-300"
                          style={{ background: isDone ? 'rgba(52,211,153,0.15)' : isActive ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.06)', border: `1px solid ${statusColor(step.id)}` }}
                        >
                          {isDone ? '✓' : step.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white">{step.label}</div>
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'JetBrains Mono', monospace" }}>{step.desc}</div>
                        </div>
                        <div className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: isDone ? 'rgba(52,211,153,0.1)' : isActive ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.05)', color: statusColor(step.id), fontFamily: "'JetBrains Mono', monospace" }}>
                          {isDone ? 'done' : isActive ? 'running' : 'queued'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Metrics row */}
              <div className="grid grid-cols-4 gap-2 mt-6">
                {metrics.map((m) => (
                  <div key={m.label} className="rounded-lg p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="text-sm font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.value}</div>
                    <div className="text-[9px] uppercase tracking-wide mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: live log */}
            <div className="p-6 flex flex-col" style={{ minHeight: '320px' }}>
              <p className="text-xs uppercase tracking-widest mb-4 font-mono" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'JetBrains Mono', monospace" }}>System log</p>
              <div className="flex-1 space-y-2 overflow-hidden">
                {displayedLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", opacity: i === displayedLogs.length - 1 ? 1 : 0.65 }}>
                    <span className="flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{log.time}</span>
                    <span style={{ color: logColor(log.type) }}>{log.msg}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.3)' }}>
                  <span className="animate-pulse">▋</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
