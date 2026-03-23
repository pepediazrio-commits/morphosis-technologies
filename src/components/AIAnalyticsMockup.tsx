/**
 * AIAnalyticsMockup.tsx
 * Morphosis Technologies — AI Analytics Dashboard Mockup
 *
 * A fully self-contained React component. No external dependencies required
 * beyond React itself. Drop this file into your project and import it anywhere.
 *
 * Usage:
 *   import AIAnalyticsMockup from './AIAnalyticsMockup'
 *   <AIAnalyticsMockup />
 *
 * Fonts (add to your index.html or _document.tsx):
 *   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface LogLine {
  id: number
  type: 'info' | 'success' | 'warn' | 'run' | 'data'
  time: string
  msg: string
}

interface MetricBar {
  label: string
  value: number
  target: number
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const PROMPTS = [
  'What do you want to know today?',
  'Show me anomalies from last week',
  'Compare Q1 vs Q2 accuracy',
  'Which model version performs best?',
  "Predict next month's throughput",
  'Flag any low-confidence predictions',
]

const LOG_MESSAGES: Array<{ type: LogLine['type']; msg: string }> = [
  { type: 'run',     msg: '→ model-v3 · running inference on batch #8821' },
  { type: 'data',    msg: '  confidence: 0.97 · latency: 11ms' },
  { type: 'success', msg: '✓ 128 predictions committed to store' },
  { type: 'run',     msg: '→ anomaly-detector · scanning window t-5m' },
  { type: 'data',    msg: '  0 anomalies found in current window' },
  { type: 'run',     msg: '→ model-v3 · batch #8822 queued' },
  { type: 'success', msg: '✓ accuracy checkpoint: 98.4%' },
  { type: 'info',    msg: '  throughput: 1,240 predictions/min' },
  { type: 'run',     msg: '→ feature-pipeline · recomputing embeddings' },
  { type: 'data',    msg: '  embedding dim: 768 · norm: 0.99' },
  { type: 'warn',    msg: '⚠ batch #8819 · 2 low-confidence rows flagged' },
  { type: 'run',     msg: '→ fallback-model · re-evaluating flagged rows' },
  { type: 'success', msg: '✓ fallback resolved · confidence now 0.91' },
  { type: 'data',    msg: '  model drift index: 0.003 (within threshold)' },
  { type: 'run',     msg: '→ model-v3 · batch #8823 processing' },
  { type: 'success', msg: '✓ daily prediction count: 24,891' },
  { type: 'info',    msg: '  GPU utilisation: 68% · memory: 4.1 GB' },
]

const INFER_TIMES = ['11ms', '13ms', '10ms', '14ms', '12ms', '9ms']

const INITIAL_BARS: MetricBar[] = [
  { label: 'Accuracy',  value: 98.4, target: 95 },
  { label: 'Precision', value: 97.1, target: 95 },
  { label: 'Recall',    value: 96.8, target: 94 },
  { label: 'F1 Score',  value: 96.9, target: 94 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Chart helpers
// ─────────────────────────────────────────────────────────────────────────────

const CW = 560, CH = 160, PL = 28, PT = 8, PB = 8

function genChartData(): number[] {
  const pts: number[] = []
  let v = 90 + Math.random() * 4
  for (let i = 0; i < 80; i++) {
    v += (Math.random() - 0.42) * 2.2
    v = Math.max(74, Math.min(100, v))
    pts.push(v)
  }
  return pts
}

function toY(v: number) { return PT + ((100 - v) / 28) * (CH - PT - PB) }

function buildLine(pts: number[]): string {
  const xs = (CW - PL) / (pts.length - 1)
  let d = `M ${PL} ${toY(pts[0])}`
  for (let i = 1; i < pts.length; i++) {
    const x = PL + i * xs, y = toY(pts[i])
    const px = PL + (i - 1) * xs, py = toY(pts[i - 1])
    const cx = (px + x) / 2
    d += ` C ${cx} ${py} ${cx} ${y} ${x} ${y}`
  }
  return d
}

function buildArea(pts: number[]): string {
  const xs = (CW - PL) / (pts.length - 1)
  let d = `M ${PL} ${CH - PB} L ${PL} ${toY(pts[0])}`
  for (let i = 1; i < pts.length; i++) {
    const x = PL + i * xs, y = toY(pts[i])
    const px = PL + (i - 1) * xs, py = toY(pts[i - 1])
    const cx = (px + x) / 2
    d += ` C ${cx} ${py} ${cx} ${y} ${x} ${y}`
  }
  d += ` L ${PL + (pts.length - 1) * xs} ${CH - PB} Z`
  return d
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, '0') }
function nowTime() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function StatusDot() {
  return (
    <span style={{
      display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
      background: '#10b981', boxShadow: '0 0 6px #10b981',
      animation: 'morpho-ai-pulse 2s infinite', flexShrink: 0,
    }} />
  )
}

function LogRow({ line }: { line: LogLine }) {
  const colourMap: Record<string, string> = {
    info: 'rgba(255,255,255,0.5)', success: '#10b981',
    warn: '#f59e0b', run: '#7C6FFF', data: '#06B6D4',
  }
  const bgMap: Record<string, string> = {
    success: 'rgba(16,185,129,0.05)', run: 'rgba(124,111,255,0.05)',
  }
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, lineHeight: 1.6,
      padding: '4px 8px', borderRadius: 5, display: 'flex', gap: 8,
      background: bgMap[line.type] || 'transparent',
      animation: 'morpho-ai-log-appear 0.3s ease forwards',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{line.time}</span>
      <span style={{ flex: 1, color: colourMap[line.type] || 'rgba(255,255,255,0.5)' }}>{line.msg}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function AIAnalyticsMockup() {
  const [chartData, setChartData]         = useState<number[]>(() => genChartData())
  const [scanX, setScanX]                 = useState(PL)
  const [scanY, setScanY]                 = useState(toY(90))
  const [predCount, setPredCount]         = useState(24891)
  const [confScore, setConfScore]         = useState('94.2')
  const [inferTime, setInferTime]         = useState('12ms')
  const [bars, setBars]                   = useState<MetricBar[]>(INITIAL_BARS)
  const [miniHeights, setMiniHeights]     = useState<number[]>(() =>
    Array.from({ length: 18 }, () => Math.random() * 75 + 25)
  )
  const [logLines, setLogLines]           = useState<LogLine[]>([
    { id: 0, type: 'info',    time: '09:41:00', msg: 'Analytics engine initialised' },
    { id: 1, type: 'success', time: '09:41:01', msg: '✓ model-v3 loaded · all systems nominal' },
  ])
  const [promptText, setPromptText]       = useState(PROMPTS[0])
  const [promptVisible, setPromptVisible] = useState(true)

  const logIdRef     = useRef(2)
  const logIndexRef  = useRef(0)
  const logEndRef    = useRef<HTMLDivElement>(null)
  const scanXRef     = useRef(PL)
  const chartRef     = useRef(chartData)
  const promptIdxRef = useRef(0)
  chartRef.current   = chartData

  // ── Keyframes ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = 'morpho-ai-keyframes'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes morpho-ai-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 6px #10b981; }
        50%       { opacity: 0.6; box-shadow: 0 0 12px #10b981; }
      }
      @keyframes morpho-ai-log-appear {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes morpho-ai-blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      @keyframes morpho-ai-float {
        0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
        50%       { transform: translate(-50%, -50%) translateY(-6px); }
      }
      @keyframes morpho-ai-shimmer {
        0%        { transform: translateX(-100%); }
        60%, 100% { transform: translateX(100%); }
      }
    `
    document.head.appendChild(style)
  }, [])

  // ── Scan line ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      scanXRef.current += 2
      if (scanXRef.current > CW) {
        scanXRef.current = PL
        setChartData(genChartData())
      }
      const idx = Math.round(((scanXRef.current - PL) / (CW - PL)) * (chartRef.current.length - 1))
      const si = Math.min(Math.max(idx, 0), chartRef.current.length - 1)
      setScanX(scanXRef.current)
      setScanY(toY(chartRef.current[si]))
    }, 40)
    return () => clearInterval(iv)
  }, [])

  // ── Mini bars ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setMiniHeights(prev => [...prev.slice(1), Math.random() * 75 + 25])
    }, 700)
    return () => clearInterval(iv)
  }, [])

  // ── Prediction counter ─────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setPredCount(prev => prev + Math.floor(Math.random() * 60 + 10))
    }, 1100)
    return () => clearInterval(iv)
  }, [])

  // ── Confidence ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setConfScore((93 + Math.random() * 3).toFixed(1))
    }, 2200)
    return () => clearInterval(iv)
  }, [])

  // ── Inference time ─────────────────────────────────────────────────────────
  useEffect(() => {
    let idx = 0
    const iv = setInterval(() => {
      idx = (idx + 1) % INFER_TIMES.length
      setInferTime(INFER_TIMES[idx])
    }, 1900)
    return () => clearInterval(iv)
  }, [])

  // ── Metric bars nudge ──────────────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setBars(prev => prev.map(b => ({
        ...b,
        value: Math.max(b.target, Math.min(100, b.value + (Math.random() - 0.45) * 0.6)),
      })))
    }, 2500)
    return () => clearInterval(iv)
  }, [])

  // ── Log streamer ───────────────────────────────────────────────────────────
  const scheduleLog = useCallback(() => {
    const entry = LOG_MESSAGES[logIndexRef.current % LOG_MESSAGES.length]
    logIndexRef.current++
    setLogLines(prev => [...prev, {
      id: logIdRef.current++,
      type: entry.type,
      time: nowTime(),
      msg: entry.msg,
    }].slice(-40))
    setTimeout(scheduleLog, 700 + Math.random() * 800)
  }, [])

  useEffect(() => {
    const t = setTimeout(scheduleLog, 900)
    return () => clearTimeout(t)
  }, [scheduleLog])

  useEffect(() => {
    const el = logEndRef.current?.parentElement; if (el) el.scrollTop = el.scrollHeight
  }, [logLines])

  // ── Prompt typer ───────────────────────────────────────────────────────────
  useEffect(() => {
    const outer = setInterval(() => {
      setPromptVisible(false)
      setTimeout(() => {
        promptIdxRef.current = (promptIdxRef.current + 1) % PROMPTS.length
        const text = PROMPTS[promptIdxRef.current]
        let i = 0
        setPromptText('')
        setPromptVisible(true)
        const typer = setInterval(() => {
          setPromptText(text.slice(0, ++i))
          if (i >= text.length) clearInterval(typer)
        }, 42)
      }, 300)
    }, 5000)
    return () => clearInterval(outer)
  }, [])

  // ── Derived ────────────────────────────────────────────────────────────────
  const avg  = chartData.reduce((a, b) => a + b, 0) / chartData.length
  const avgY = toY(avg)

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div style={{
      background: 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '60px 40px',
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* ── Outer glow wrapper ── */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 1280 }}>

        {/* Glow halo */}
        <div style={{
          position: 'absolute', inset: -3, borderRadius: 26,
          background: 'linear-gradient(135deg,#7C6FFF 0%,#2563EB 50%,#06B6D4 100%)',
          filter: 'blur(28px)', opacity: 0.6, zIndex: 0,
        }} />

        {/* ── Browser chrome ── */}
        <div style={{
          position: 'relative', zIndex: 1,
          background: '#0d0f1a', borderRadius: 22, overflow: 'hidden',
          border: '1px solid rgba(124,111,255,0.3)',
          boxShadow: '0 60px 120px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(124,111,255,0.15)',
        }}>

          {/* Browser bar */}
          <div style={{
            background: '#13152a', padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: 14,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)', borderRadius: 9,
              padding: '7px 16px', fontFamily: "'JetBrains Mono',monospace",
              fontSize: 13, color: 'rgba(255,255,255,0.45)',
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
              <span style={{ color: '#28c840', fontSize: 10 }}>🔒</span>
              app.morphosis.io / analytics / model-performance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#10b981', fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>
              <StatusDot />
              LIVE
            </div>
          </div>

          {/* ── App grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', height: 640 }}>

            {/* Sidebar */}
            <div style={{
              background: '#0a0c1b', borderRight: '1px solid rgba(255,255,255,0.05)',
              padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{ padding: '0 18px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#7C6FFF,#2563EB)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', fontFamily: "'Space Grotesk',sans-serif" }}>M</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.02em' }}>Morphosis AI</div>
              </div>

              {[
                { icon: '⚡', label: 'Workflows' },
                { icon: '🤖', label: 'Agents' },
                { icon: '📊', label: 'Analytics', active: true },
                { icon: '🔗', label: 'Integrations' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 11,
                  fontSize: 13.5, cursor: 'pointer',
                  color: item.active ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: item.active ? 'rgba(124,111,255,0.12)' : 'transparent',
                  borderRight: item.active ? '2px solid #7C6FFF' : 'none',
                }}>
                  <span style={{ fontSize: 14, width: 18, textAlign: 'center' }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}

              <div style={{ padding: '16px 18px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Models</div>
              {['🧠 model-v3 (active)', '🧠 model-v2', '🧪 model-v4 (beta)'].map(item => (
                <div key={item} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 11, fontSize: 13.5, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>{item}</div>
              ))}

              <div style={{ padding: '16px 18px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Settings</div>
              <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 11, fontSize: 13.5, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>⚙️ Config</div>
            </div>

            {/* Main panel */}
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

              {/* ── AI Prompt overlay ── */}
              {promptVisible && (
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  zIndex: 20, pointerEvents: 'none',
                  animation: 'morpho-ai-float 3s ease-in-out infinite',
                }}>
                  <div style={{
                    background: 'rgba(19,21,42,0.95)',
                    border: '1px solid rgba(124,111,255,0.55)',
                    borderRadius: 16, padding: '14px 22px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 40px rgba(124,111,255,0.35)',
                    whiteSpace: 'nowrap',
                  }}>
                    <div style={{
                      width: 30, height: 30,
                      background: 'linear-gradient(135deg,#7C6FFF,#06B6D4)',
                      borderRadius: 9, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 14, flexShrink: 0,
                    }}>✦</div>
                    <span style={{ fontSize: 15, fontWeight: 500, color: '#fff', letterSpacing: '-0.01em', fontFamily: "'Space Grotesk',sans-serif" }}>
                      {promptText}
                    </span>
                    <span style={{
                      display: 'inline-block', width: 2, height: 17,
                      background: '#a78bfa', marginLeft: 1,
                      animation: 'morpho-ai-blink 1s step-end infinite',
                      verticalAlign: 'middle',
                    }} />
                  </div>
                </div>
              )}

              {/* Topbar */}
              <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                  AI Analytics
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'JetBrains Mono',monospace", cursor: 'pointer' }}>
                    Last 24h ▾
                  </div>
                  <button style={{
                    background: 'linear-gradient(135deg,#7C6FFF,#2563EB)', color: 'white',
                    border: 'none', padding: '9px 20px', borderRadius: 9,
                    fontSize: 13, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif",
                    cursor: 'pointer', letterSpacing: '0.01em', position: 'relative', overflow: 'hidden',
                  }}>
                    <span style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)',
                      animation: 'morpho-ai-shimmer 2.5s ease-in-out infinite',
                    }} />
                    Export Report
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {[
                  { label: 'Predictions Today', value: predCount.toLocaleString(), sub: '',       delta: '↑ +18% vs yesterday',   up: true },
                  { label: 'Avg Confidence',    value: confScore,                  sub: '%',      delta: '↑ above threshold',     up: true },
                  { label: 'Avg Inference',     value: inferTime,                  sub: '',       delta: '↓ GPU-accelerated',     up: true },
                  { label: 'Anomalies',         value: '3',                        sub: ' flagged', delta: '↓ -72% vs last period', up: true },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#0d0f1a', padding: '16px 22px' }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 5 }}>{stat.label}</div>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                      {stat.value}{stat.sub && <span style={{ fontSize: 11, fontWeight: 400, marginLeft: 4 }}>{stat.sub}</span>}
                    </div>
                    <div style={{ fontSize: 10, marginTop: 2, color: stat.up ? '#10b981' : '#f43f5e' }}>{stat.delta}</div>
                  </div>
                ))}
              </div>

              {/* Content area */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', flex: 1, overflow: 'hidden' }}>

                {/* Left: chart + metric bars */}
                <div style={{ padding: '18px 20px', overflowY: 'auto', scrollbarWidth: 'none' }}>

                  {/* Chart section header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 3, height: 14, background: 'linear-gradient(#7C6FFF,#2563EB)', borderRadius: 2, display: 'inline-block' }} />
                      Prediction Accuracy — Live
                    </div>
                    <div style={{ display: 'flex', gap: 14 }}>
                      {[['#7C6FFF', 'Accuracy'], ['#06B6D4', 'Avg baseline']].map(([color, label]) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'JetBrains Mono',monospace" }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SVG chart */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '16px 16px 10px', marginBottom: 20 }}>
                    <svg viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" style={{ width: '100%', height: 160, display: 'block' }}>
                      <defs>
                        <linearGradient id="aam-area" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7C6FFF" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#7C6FFF" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="aam-line" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#7C6FFF" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                      </defs>
                      {[40, 80, 120].map(y => (
                        <line key={y} x1={0} y1={y} x2={CW} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
                      ))}
                      {([['100', 8], ['90', 48], ['80', 88]] as [string, number][]).map(([label, y]) => (
                        <text key={label} x={4} y={y} fill="rgba(255,255,255,0.2)" fontSize={9} fontFamily="JetBrains Mono">{label}</text>
                      ))}
                      <path d={buildArea(chartData)} fill="url(#aam-area)" />
                      <path d={buildLine(chartData)} fill="none" stroke="url(#aam-line)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                      <line x1={PL} y1={avgY} x2={CW} y2={avgY} stroke="rgba(6,182,212,0.45)" strokeWidth={1} strokeDasharray="5 4" />
                      <text x={CW - 58} y={avgY - 4} fill="rgba(6,182,212,0.7)" fontSize={9} fontFamily="JetBrains Mono">Avg {avg.toFixed(1)}</text>
                      <line x1={scanX} y1={0} x2={scanX} y2={CH} stroke="rgba(124,111,255,0.55)" strokeWidth={1.5} />
                      <circle cx={scanX} cy={scanY} r={4} fill="#7C6FFF" />
                      <circle cx={scanX} cy={scanY} r={7} fill="none" stroke="rgba(124,111,255,0.3)" strokeWidth={1} />
                    </svg>
                  </div>

                  {/* Metric bars */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 3, height: 14, background: 'linear-gradient(#7C6FFF,#2563EB)', borderRadius: 2, display: 'inline-block' }} />
                      Model Metrics
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {bars.map(bar => (
                      <div key={bar.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.7)', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>{bar.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk',sans-serif" }}>{bar.value.toFixed(1)}%</span>
                        </div>
                        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                          <div style={{ height: '100%', width: `${bar.value}%`, background: 'linear-gradient(90deg,#7C6FFF,#06B6D4)', borderRadius: 2, transition: 'width 0.8s ease' }} />
                          <div style={{ position: 'absolute', top: -2, bottom: -2, left: `${bar.target}%`, width: 1.5, background: 'rgba(251,191,36,0.7)' }} />
                        </div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>target: {bar.target}%</div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right: histogram + live log */}
                <div style={{ background: '#080a16', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                  {/* Confidence histogram */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
                        Confidence Dist.
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: '#fff' }}>{confScore}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 52 }}>
                      {miniHeights.map((h, i) => (
                        <div key={i} style={{
                          flex: 1, borderRadius: '2px 2px 0 0',
                          background: i === miniHeights.length - 1
                            ? 'linear-gradient(180deg,#7C6FFF,#06B6D4)'
                            : `rgba(124,111,255,${0.15 + (h / 100) * 0.5})`,
                          height: `${h}%`, minHeight: 3,
                          transition: 'height 0.5s ease',
                        }} />
                      ))}
                    </div>
                  </div>

                  {/* Live log header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 7 }}>
                    <StatusDot />
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
                      Live Log
                    </span>
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 4, scrollbarWidth: 'none' }}>
                    {logLines.map(line => <LogRow key={line.id} line={line} />)}
                    <div ref={logEndRef} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
