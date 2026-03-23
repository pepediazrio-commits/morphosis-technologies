/**
 * WorkflowMockup.tsx
 * Morphosis Technologies — Workflow Automation Builder Mockup
 *
 * A fully self-contained React component. No external dependencies required
 * beyond React itself. Drop this file into your project and import it anywhere.
 *
 * Usage:
 *   import WorkflowMockup from './WorkflowMockup'
 *   <WorkflowMockup />
 *
 * Fonts (add to your index.html or _document.tsx):
 *   <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type NodeStatus = 'idle' | 'running' | 'done' | 'skipped'

interface WFNode {
  id: string
  label: string
  sub: string
  icon: string
  type: 'trigger' | 'condition' | 'action-ok' | 'action-err' | 'action-db'
  status: NodeStatus
  /** SVG canvas position */
  x: number
  y: number
  w: number
  h: number
}

interface LogLine {
  id: number
  type: 'info' | 'success' | 'warn' | 'run'
  time: string
  msg: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────

const INITIAL_NODES: WFNode[] = [
  { id: 'trigger',  label: 'New Client Request',  sub: 'trigger · webhook',   icon: '⚡', type: 'trigger',    status: 'idle', x: 220, y: 20,  w: 200, h: 68 },
  { id: 'approval', label: 'Manager Approval?',   sub: 'condition · boolean', icon: '◈', type: 'condition',  status: 'idle', x: 220, y: 140, w: 200, h: 68 },
  { id: 'approve',  label: 'Send Approval Email', sub: 'action · email',      icon: '✉', type: 'action-ok',  status: 'idle', x: 40,  y: 265, w: 180, h: 62 },
  { id: 'deny',     label: 'Send Denial Email',   sub: 'action · email',      icon: '✕', type: 'action-err', status: 'idle', x: 420, y: 265, w: 180, h: 62 },
  { id: 'crm',      label: 'Update CRM Record',   sub: 'action · database',   icon: '⬡', type: 'action-db',  status: 'idle', x: 220, y: 385, w: 200, h: 62 },
]

// Each step: [nodeId, status] pairs to apply simultaneously
const EXEC_SEQUENCE: Array<Array<[string, NodeStatus]>> = [
  [['trigger',  'running']],
  [['trigger',  'done'],   ['approval', 'running']],
  [['approval', 'done'],   ['approve',  'running'], ['deny', 'skipped']],
  [['approve',  'done'],   ['crm',      'running']],
  [['crm',      'done']],
  // reset
  [['trigger','idle'],['approval','idle'],['approve','idle'],['deny','idle'],['crm','idle']],
]

const LOG_POOL: Array<{ type: LogLine['type']; msg: string }> = [
  { type: 'info',    msg: '  workflow v2.1.0 · listening for triggers' },
  { type: 'run',     msg: '→ trigger · incoming webhook POST /onboard' },
  { type: 'run',     msg: '→ condition · evaluating isApproved flag' },
  { type: 'success', msg: '✓ approval granted — routing to Send Approval' },
  { type: 'run',     msg: '→ action · dispatching email via SendGrid' },
  { type: 'success', msg: '✓ email delivered to client@acme.com' },
  { type: 'run',     msg: '→ action · writing record to CRM database' },
  { type: 'success', msg: '✓ CRM updated · deal_id #4821 status: approved' },
  { type: 'info',    msg: '  execution complete · 1.2s' },
  { type: 'run',     msg: '→ trigger · new request from partner@globex.io' },
  { type: 'run',     msg: '→ condition · evaluating isApproved flag' },
  { type: 'warn',    msg: '⚠ approval denied — routing to Send Denial' },
  { type: 'run',     msg: '→ action · dispatching denial email' },
  { type: 'success', msg: '✓ denial email delivered' },
  { type: 'run',     msg: '→ action · writing record to CRM database' },
  { type: 'success', msg: '✓ CRM updated · deal_id #4822 status: denied' },
  { type: 'info',    msg: '  execution complete · 0.9s' },
]

const EXEC_DURATIONS = ['1.2s', '0.9s', '1.4s', '1.1s', '1.3s', '0.8s']

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, '0') }
function nowTime() {
  const d = new Date()
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function nodeCenter(n: WFNode) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 }
}

function edgePath(from: WFNode, to: WFNode): string {
  const f = nodeCenter(from)
  const t = nodeCenter(to)
  const midY = (f.y + t.y) / 2
  return `M ${f.x} ${f.y + from.h / 2} C ${f.x} ${midY} ${t.x} ${midY} ${t.x} ${t.y - to.h / 2}`
}

function nodeColors(type: WFNode['type'], status: NodeStatus) {
  const base: Record<WFNode['type'], { bg: string; border: string }> = {
    trigger:      { bg: 'rgba(124,111,255,0.14)', border: 'rgba(124,111,255,0.55)' },
    condition:    { bg: 'rgba(37,99,235,0.14)',   border: 'rgba(37,99,235,0.5)'   },
    'action-ok':  { bg: 'rgba(16,185,129,0.10)',  border: 'rgba(16,185,129,0.4)'  },
    'action-err': { bg: 'rgba(239,68,68,0.10)',   border: 'rgba(239,68,68,0.35)'  },
    'action-db':  { bg: 'rgba(251,191,36,0.10)',  border: 'rgba(251,191,36,0.35)' },
  }
  const badge: Record<NodeStatus, { bg: string; text: string }> = {
    idle:    { bg: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.35)' },
    running: { bg: 'rgba(124,111,255,0.25)', text: '#a78bfa' },
    done:    { bg: 'rgba(16,185,129,0.18)',  text: '#10b981' },
    skipped: { bg: 'rgba(239,68,68,0.12)',   text: '#f87171' },
  }
  return { ...base[type], badge: badge[status] }
}

function statusLabel(s: NodeStatus) {
  return { idle: 'Waiting', running: 'Running', done: 'Done', skipped: 'Skipped' }[s]
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function StatusDot() {
  return (
    <span style={{
      display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
      background: '#10b981', boxShadow: '0 0 6px #10b981',
      animation: 'morpho-wf-pulse 2s infinite', flexShrink: 0,
    }} />
  )
}

function LogRow({ line }: { line: LogLine }) {
  const colourMap: Record<string, string> = {
    info: 'rgba(255,255,255,0.5)', success: '#10b981', warn: '#f59e0b', run: '#7C6FFF',
  }
  const bgMap: Record<string, string> = {
    success: 'rgba(16,185,129,0.05)', run: 'rgba(124,111,255,0.05)',
  }
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, lineHeight: 1.6,
      padding: '4px 8px', borderRadius: 5, display: 'flex', gap: 8,
      background: bgMap[line.type] || 'transparent',
      animation: 'morpho-wf-log-appear 0.3s ease forwards',
    }}>
      <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{line.time}</span>
      <span style={{ flex: 1, color: colourMap[line.type] || 'rgba(255,255,255,0.5)' }}>{line.msg}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function WorkflowMockup() {
  const [nodes, setNodes]           = useState<WFNode[]>(INITIAL_NODES)
  const [selectedId, setSelectedId] = useState<string>('trigger')
  const [runsToday, setRunsToday]   = useState(247)
  const [successRate, setSuccessRate] = useState('98.4')
  const [avgDuration, setAvgDuration] = useState('1.2s')
  const [logLines, setLogLines]     = useState<LogLine[]>([
    { id: 0, type: 'info',    time: '09:41:00', msg: '  workflow engine initialised' },
    { id: 1, type: 'success', time: '09:41:01', msg: '✓ v2.1.0 deployed · listening for triggers' },
  ])

  const logIdRef    = useRef(2)
  const logIndexRef = useRef(0)
  const logEndRef   = useRef<HTMLDivElement>(null)
  const seqRef      = useRef(0)
  const durIdxRef   = useRef(0)

  // ── Keyframes ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = 'morpho-wf-keyframes'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes morpho-wf-pulse {
        0%, 100% { opacity: 1; box-shadow: 0 0 6px #10b981; }
        50%       { opacity: 0.6; box-shadow: 0 0 12px #10b981; }
      }
      @keyframes morpho-wf-log-appear {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes morpho-wf-node-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(124,111,255,0); }
        50%       { box-shadow: 0 0 0 4px rgba(124,111,255,0.25); }
      }
      @keyframes morpho-wf-badge-pulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.6; }
      }
      @keyframes morpho-wf-dash {
        from { stroke-dashoffset: 20; }
        to   { stroke-dashoffset: 0; }
      }
      @keyframes morpho-wf-shimmer {
        0%        { transform: translateX(-100%); }
        60%, 100% { transform: translateX(100%); }
      }
    `
    document.head.appendChild(style)
  }, [])

  // ── Execution sequencer ────────────────────────────────────────────────────
  useEffect(() => {
    const advance = () => {
      const step = EXEC_SEQUENCE[seqRef.current % EXEC_SEQUENCE.length]
      seqRef.current++

      setNodes(prev => {
        const next = prev.map(n => ({ ...n }))
        step.forEach(([id, status]) => {
          const node = next.find(n => n.id === id)
          if (node) node.status = status
        })
        return next
      })

      // When a full run completes (last step before reset)
      if (seqRef.current % EXEC_SEQUENCE.length === 0) {
        setRunsToday(r => r + 1)
        setSuccessRate((97 + Math.random() * 2).toFixed(1))
        durIdxRef.current = (durIdxRef.current + 1) % EXEC_DURATIONS.length
        setAvgDuration(EXEC_DURATIONS[durIdxRef.current])
      }
    }
    const iv = setInterval(advance, 1400)
    return () => clearInterval(iv)
  }, [])

  // ── Log streamer ───────────────────────────────────────────────────────────
  const scheduleLog = useCallback(() => {
    const entry = LOG_POOL[logIndexRef.current % LOG_POOL.length]
    logIndexRef.current++
    setLogLines(prev => [...prev, {
      id: logIdRef.current++,
      type: entry.type,
      time: nowTime(),
      msg: entry.msg,
    }].slice(-40))
    setTimeout(scheduleLog, 800 + Math.random() * 700)
  }, [])

  useEffect(() => {
    const t = setTimeout(scheduleLog, 1000)
    return () => clearTimeout(t)
  }, [scheduleLog])

  useEffect(() => {
    const el = logEndRef.current?.parentElement; if (el) el.scrollTop = el.scrollHeight
  }, [logLines])

  // ── Derived ────────────────────────────────────────────────────────────────
  const selectedNode = nodes.find(n => n.id === selectedId) ?? nodes[0]
  const SVG_W = 640, SVG_H = 490

  const EDGES: Array<{ from: string; to: string; label?: string }> = [
    { from: 'trigger',  to: 'approval' },
    { from: 'approval', to: 'approve',  label: 'Yes' },
    { from: 'approval', to: 'deny',     label: 'No'  },
    { from: 'approve',  to: 'crm' },
    { from: 'deny',     to: 'crm' },
  ]

  // Config fields per node type
  const cfgFields: Record<string, string[]> = {
    trigger:      ['webhook · POST /onboard', 'auth: Bearer token', 'retry: 3 attempts'],
    approval:     ['eval: isApproved === true', 'fallback: deny path', 'timeout: 48h'],
    'approve':    ['smtp · SendGrid', 'template: approval_v2', 'cc: ops@morphosis.io'],
    'deny':       ['smtp · SendGrid', 'template: denial_v1', 'cc: ops@morphosis.io'],
    crm:          ['provider: HubSpot', 'table: contacts', 'field: deal_status'],
  }

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
              app.morphosis.io / automation / workflow-builder
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
              {/* Logo */}
              <div style={{ padding: '0 18px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#7C6FFF,#2563EB)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', fontFamily: "'Space Grotesk',sans-serif" }}>M</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.02em' }}>Morphosis AI</div>
              </div>

              {[
                { icon: '⚡', label: 'Workflows', active: true, badge: 3 },
                { icon: '🤖', label: 'Agents' },
                { icon: '📊', label: 'Analytics' },
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
                  {item.badge !== undefined && (
                    <span style={{ marginLeft: 'auto', background: '#7C6FFF', color: 'white', fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20 }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}

              <div style={{ padding: '16px 18px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Variables</div>
              {[
                { name: 'currentUser', type: 'Person',  color: '#fbbf24' },
                { name: 'isApproved',  type: 'Boolean', color: '#06B6D4' },
                { name: 'isSent',      type: 'Boolean', color: '#06B6D4' },
                { name: 'assignedTo',  type: 'Person',  color: '#fbbf24' },
              ].map(v => (
                <div key={v.name} style={{ padding: '7px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, cursor: 'pointer' }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.55)' }}>{v.name}</span>
                  <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: v.color, background: `${v.color}18`, border: `1px solid ${v.color}30`, borderRadius: 4, padding: '1px 6px' }}>{v.type}</span>
                </div>
              ))}

              <div style={{ padding: '16px 18px 6px', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Settings</div>
              <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 11, fontSize: 13.5, color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>⚙️ Config</div>
            </div>

            {/* Main panel */}
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

              {/* Topbar */}
              <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                  Client Onboarding Workflow
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840' }} />
                    All changes saved
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
                      animation: 'morpho-wf-shimmer 2.5s ease-in-out infinite',
                    }} />
                    ▶ Run Workflow
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {[
                  { label: 'Runs Today',    value: String(runsToday), sub: '',   delta: '↑ +12 this hour',    up: true  },
                  { label: 'Success Rate',  value: successRate,       sub: '%',  delta: '↑ above threshold',  up: true  },
                  { label: 'Avg Duration',  value: avgDuration,       sub: '',   delta: '↓ 0.2s faster',      up: true  },
                  { label: 'Active Nodes',  value: '5',               sub: '',   delta: '↑ all healthy',      up: true  },
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

                {/* Canvas */}
                <div style={{ padding: '20px', overflowY: 'auto', scrollbarWidth: 'none', position: 'relative' }}>

                  {/* Section header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 3, height: 14, background: 'linear-gradient(#7C6FFF,#2563EB)', borderRadius: 2, display: 'inline-block' }} />
                      Flow Canvas
                    </div>
                    <span style={{ fontSize: 11, color: '#7C6FFF', cursor: 'pointer', fontWeight: 500 }}>+ Add Node</span>
                  </div>

                  {/* SVG canvas with dot grid + nodes */}
                  <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
                    {/* Dot grid */}
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
                      <defs>
                        <pattern id="wfm-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                          <circle cx="1" cy="1" r="1" fill="rgba(124,111,255,0.6)" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#wfm-dots)" />
                    </svg>

                    {/* Flow SVG */}
                    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: '100%', height: SVG_H, display: 'block', position: 'relative', zIndex: 1 }}>
                      <defs>
                        <marker id="wfm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L8,3 Z" fill="rgba(124,111,255,0.55)" />
                        </marker>
                        <marker id="wfm-arrow-active" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L8,3 Z" fill="#7C6FFF" />
                        </marker>
                      </defs>

                      {/* Edges */}
                      {EDGES.map(e => {
                        const fromNode = nodes.find(n => n.id === e.from)!
                        const toNode   = nodes.find(n => n.id === e.to)!
                        const active   = fromNode.status === 'running' || fromNode.status === 'done'
                        const fc       = nodeCenter(fromNode)
                        const tc       = nodeCenter(toNode)
                        return (
                          <g key={`${e.from}-${e.to}`}>
                            <path
                              d={edgePath(fromNode, toNode)}
                              fill="none"
                              stroke={active ? '#7C6FFF' : 'rgba(255,255,255,0.12)'}
                              strokeWidth={active ? 2 : 1.5}
                              strokeDasharray={active ? '6 4' : undefined}
                              style={active ? { animation: 'morpho-wf-dash 0.5s linear infinite' } : undefined}
                              markerEnd={active ? 'url(#wfm-arrow-active)' : 'url(#wfm-arrow)'}
                            />
                            {e.label && (
                              <text
                                x={(fc.x + tc.x) / 2 + (e.label === 'Yes' ? -28 : 28)}
                                y={(fc.y + tc.y) / 2 - 4}
                                fill={e.label === 'Yes' ? 'rgba(16,185,129,0.8)' : 'rgba(239,68,68,0.8)'}
                                fontSize={11} fontFamily="JetBrains Mono" textAnchor="middle"
                              >{e.label}</text>
                            )}
                          </g>
                        )
                      })}

                      {/* Nodes */}
                      {nodes.map(node => {
                        const colors  = nodeColors(node.type, node.status)
                        const isRun   = node.status === 'running'
                        const isSel   = node.id === selectedId
                        return (
                          <g key={node.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedId(node.id)}>
                            <rect
                              x={node.x} y={node.y} width={node.w} height={node.h} rx={12}
                              fill={colors.bg}
                              stroke={isSel ? '#7C6FFF' : colors.border}
                              strokeWidth={isSel ? 2 : 1.5}
                              style={isRun ? { animation: 'morpho-wf-node-glow 1s ease-in-out infinite' } : undefined}
                            />
                            {/* Left accent */}
                            <rect x={node.x} y={node.y + 8} width={3} height={node.h - 16} rx={1.5} fill={colors.border} />
                            {/* Icon + label */}
                            <text x={node.x + 16} y={node.y + 24} fill="#fff" fontSize={13} fontFamily="Space Grotesk" fontWeight={600}>
                              {node.icon}  {node.label}
                            </text>
                            <text x={node.x + 16} y={node.y + 40} fill="rgba(255,255,255,0.38)" fontSize={10} fontFamily="JetBrains Mono">
                              {node.sub}
                            </text>
                            {/* Status badge */}
                            <rect x={node.x + 14} y={node.y + 48} width={72} height={14} rx={7} fill={colors.badge.bg} />
                            <text
                              x={node.x + 50} y={node.y + 59}
                              fill={colors.badge.text} fontSize={9} fontFamily="JetBrains Mono" textAnchor="middle"
                              style={isRun ? { animation: 'morpho-wf-badge-pulse 1s ease-in-out infinite' } : undefined}
                            >
                              {isRun ? '● ' : ''}{statusLabel(node.status)}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>

                </div>

                {/* Right: properties + log */}
                <div style={{ background: '#080a16', borderLeft: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                  {/* Properties panel */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 10 }}>
                      Selected Node
                    </div>
                    <div style={{ background: 'rgba(124,111,255,0.15)', border: '1px solid rgba(124,111,255,0.35)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#a78bfa', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500, marginBottom: 10 }}>
                      {selectedNode.icon} {selectedNode.label}
                    </div>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Configuration</div>
                    {(cfgFields[selectedNode.id] ?? cfgFields['trigger']).map((cfg, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, padding: '7px 10px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 5 }}>
                        {cfg}
                      </div>
                    ))}
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, marginTop: 10 }}>Mappings</div>
                    {['currentUser → payload.user', 'isApproved → payload.approved'].map((m, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 7, padding: '7px 10px', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 5 }}>
                        {m}
                      </div>
                    ))}
                  </div>

                  {/* Live log */}
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
