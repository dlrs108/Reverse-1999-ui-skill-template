import { useState, useEffect } from 'react'

export default function ConstellationScale() {
  const [energy, setEnergy] = useState(40)
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

  // Constellation node positions
  const nodes = [
    { x: 80, y: 60, label: 'I' },
    { x: 160, y: 40, label: 'II' },
    { x: 240, y: 70, label: 'III' },
    { x: 320, y: 45, label: 'IV' },
    { x: 400, y: 65, label: 'V' },
    { x: 480, y: 35, label: 'VI' },
  ]

  const activeNodes = Math.floor((energy / 100) * nodes.length)

  return (
    <div className="thin-border bg-[var(--bg-panel)] p-6 geo-pattern">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-[var(--font-en)] text-[var(--energy-glow)] text-xs tracking-wider">THE SCALE</span>
          <span className="font-[var(--font-mono)] text-[var(--text-secondary)] text-[10px]">
            {energy}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[var(--energy-glow)] animate-pulse" />
          <span className="font-[var(--font-mono)] text-[10px] text-[var(--energy-glow)]">
            {charging ? 'CHARGING' : energy >= 100 ? 'FULL' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* SVG Constellation */}
      <div className="relative w-full h-32 mb-4">
        <svg className="w-full h-full" viewBox="0 0 560 100" preserveAspectRatio="xMidYMid meet">
          {/* Connection lines */}
          {nodes.map((node, i) => {
            if (i === 0) return null
            const prev = nodes[i - 1]
            const isActive = i <= activeNodes
            return (
              <line
                key={`line-${i}`}
                x1={prev.x}
                y1={prev.y}
                x2={node.x}
                y2={node.y}
                stroke={isActive ? 'var(--energy-glow)' : 'rgba(242, 203, 91, 0.2)'}
                strokeWidth={isActive ? '2' : '1'}
                strokeDasharray={isActive ? 'none' : '4 4'}
                style={{
                  transition: 'all 0.5s ease',
                  ...(isActive && charging ? {
                    animation: 'constellationCharge 1s linear forwards',
                    strokeDasharray: '1000',
                    strokeDashoffset: '0'
                  } : {})
                }}
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isActive = i < activeNodes
            const isCurrent = i === activeNodes - 1
            return (
              <g key={`node-${i}`}>
                {/* Glow effect for active nodes */}
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
                      animation: isCurrent ? 'nodeSnap 0.5s ease forwards' : 'none'
                    }}
                  />
                )}
                {/* Node shape */}
                <polygon
                  points={`${node.x},${node.y - 8} ${node.x + 7},${node.y} ${node.x},${node.y + 8} ${node.x - 7},${node.y}`}
                  fill={isActive ? 'var(--energy-glow)' : 'none'}
                  stroke={isActive ? 'var(--energy-glow)' : 'rgba(242, 203, 91, 0.3)'}
                  strokeWidth="1.5"
                  style={{
                    transition: 'all 0.3s ease',
                    filter: isActive ? 'drop-shadow(0 0 4px rgba(242, 203, 91, 0.6))' : 'none'
                  }}
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + 22}
                  textAnchor="middle"
                  fill={isActive ? 'var(--energy-glow)' : 'var(--text-secondary)'}
                  fontSize="8"
                  fontFamily="var(--font-en)"
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  {node.label}
                </text>
              </g>
            )
          })}

          {/* Decorative crosshairs */}
          <g opacity="0.15">
            <line x1="30" y1="50" x2="50" y2="50" stroke="var(--text-secondary)" strokeWidth="0.5" />
            <line x1="40" y1="40" x2="40" y2="60" stroke="var(--text-secondary)" strokeWidth="0.5" />
            <line x1="510" y1="50" x2="530" y2="50" stroke="var(--text-secondary)" strokeWidth="0.5" />
            <line x1="520" y1="40" x2="520" y2="60" stroke="var(--text-secondary)" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      {/* Energy number display */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="font-[var(--font-en)] text-3xl text-[var(--energy-glow)]" style={{
            textShadow: energy >= 100 ? '0 0 10px rgba(242, 203, 91, 0.5)' : 'none'
          }}>
            {energy}
          </span>
          <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-sm ml-1">/ 100</span>
        </div>
        <span className="font-[var(--font-script)] text-[var(--text-secondary)] text-sm">
          {energy >= 100 ? 'fully charged!' : energy >= 60 ? 'building up...' : 'gathering...'}
        </span>
      </div>

      {/* Control */}
      <button
        onClick={() => {
          if (energy >= 100) {
            setEnergy(0)
          } else {
            setCharging(!charging)
          }
        }}
        className="w-full thin-border py-2.5 text-xs font-[var(--font-cjk)] text-[var(--text-secondary)] 
          hover:text-[var(--energy-glow)] hover:border-[var(--energy-glow)] transition-colors"
      >
        {charging ? '停止充能' : energy >= 100 ? '重置能量' : '开始充能'}
      </button>
    </div>
  )
}
