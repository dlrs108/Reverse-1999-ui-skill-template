import { useState, useEffect } from 'react'

export default function ConstellationScale() {
  const [energy, setEnergy] = useState(35)
  const [charging, setCharging] = useState(false)

  useEffect(() => {
    if (charging) {
      const interval = setInterval(() => {
        setEnergy(prev => {
          if (prev >= 100) {
            setCharging(false)
            return 100
          }
          return prev + 2
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [charging])

  // Generate constellation nodes
  const nodes = [
    { x: 80, y: 60 },
    { x: 150, y: 40 },
    { x: 220, y: 70 },
    { x: 280, y: 45 },
    { x: 340, y: 80 },
    { x: 300, y: 110 },
    { x: 200, y: 120 },
    { x: 120, y: 100 },
  ]

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    [1, 6], [2, 5]
  ]

  const activeConnections = Math.floor((energy / 100) * connections.length)

  return (
    <div className="thin-border bg-[var(--bg-panel)] p-6 geo-pattern">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[var(--energy-glow)] text-lg">✧</span>
          <span className="font-[var(--font-cjk)] text-[var(--text-primary)] text-sm">能量槽</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-[var(--font-en)] text-[var(--energy-glow)] text-lg">{energy}</span>
          <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-xs">/ 100</span>
        </div>
      </div>

      {/* SVG Constellation */}
      <div className="relative w-full h-40 mb-4">
        <svg viewBox="0 0 420 160" className="w-full h-full">
          {/* Background constellation lines (dim) */}
          {connections.map((conn, i) => (
            <line
              key={`bg-${i}`}
              x1={nodes[conn[0]].x}
              y1={nodes[conn[0]].y}
              x2={nodes[conn[1]].x}
              y2={nodes[conn[1]].y}
              stroke={i < activeConnections ? 'var(--energy-glow)' : 'rgba(242, 203, 91, 0.15)'}
              strokeWidth={i < activeConnections ? '2' : '1'}
              strokeDasharray={i < activeConnections ? 'none' : '4 4'}
              style={{
                transition: 'all 0.3s ease',
                filter: i < activeConnections ? 'drop-shadow(0 0 4px rgba(242, 203, 91, 0.5))' : 'none'
              }}
            />
          ))}

          {/* Animated charging line */}
          {charging && activeConnections < connections.length && (
            <line
              x1={nodes[connections[activeConnections][0]].x}
              y1={nodes[connections[activeConnections][0]].y}
              x2={nodes[connections[activeConnections][1]].x}
              y2={nodes[connections[activeConnections][1]].y}
              stroke="var(--energy-glow)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
              style={{
                animation: 'constellationCharge 0.5s linear forwards'
              }}
            />
          )}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isActive = i < Math.ceil((energy / 100) * nodes.length)
            return (
              <g key={i}>
                {/* Glow effect */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill="none"
                    stroke="var(--energy-glow)"
                    strokeWidth="0.5"
                    opacity="0.3"
                    style={{
                      animation: 'breathingGlow 2s ease-in-out infinite',
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                )}
                {/* Node polygon */}
                <polygon
                  points={`${node.x},${node.y - 6} ${node.x + 5},${node.y} ${node.x},${node.y + 6} ${node.x - 5},${node.y}`}
                  fill={isActive ? 'var(--energy-glow)' : 'none'}
                  stroke={isActive ? 'var(--energy-glow)' : 'rgba(255,255,255,0.3)'}
                  strokeWidth="1"
                  style={{
                    transition: 'all 0.3s var(--ease-snap)',
                    transform: isActive ? 'scale(1)' : 'scale(0.8)',
                    transformOrigin: `${node.x}px ${node.y}px`,
                    filter: isActive ? 'drop-shadow(0 0 3px rgba(242, 203, 91, 0.6))' : 'none'
                  }}
                />
                {/* Node number */}
                <text
                  x={node.x}
                  y={node.y + 18}
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="8"
                  fill={isActive ? 'var(--energy-glow)' : 'rgba(255,255,255,0.2)'}
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              </g>
            )
          })}

          {/* Decorative circle */}
          <ellipse
            cx="210"
            cy="80"
            rx="180"
            ry="60"
            fill="none"
            stroke="rgba(242, 203, 91, 0.08)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </svg>
      </div>

      {/* Control */}
      <div className="flex gap-3">
        <button
          onClick={() => { setEnergy(0); setCharging(false) }}
          className="flex-1 thin-border py-2 text-xs font-[var(--font-cjk)] text-[var(--text-secondary)] hover:text-[var(--energy-glow)] hover:border-[var(--energy-glow)] transition-colors"
        >
          重置
        </button>
        <button
          onClick={() => setCharging(!charging)}
          className={`flex-1 thin-border py-2 text-xs font-[var(--font-cjk)] transition-colors ${
            charging 
              ? 'text-[var(--energy-glow)] border-[var(--energy-glow)]' 
              : 'text-[var(--text-secondary)] hover:text-[var(--energy-glow)] hover:border-[var(--energy-glow)]'
          }`}
        >
          {charging ? '充能中...' : '开始充能'}
        </button>
      </div>

      {/* Status text */}
      <div className="mt-4 text-center">
        <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-[10px] tracking-[0.3em]">
          {energy >= 100 ? '★ FULLY CHARGED ★' : energy > 60 ? 'CHARGING...' : 'AWAITING ENERGY'}
        </span>
      </div>
    </div>
  )
}
