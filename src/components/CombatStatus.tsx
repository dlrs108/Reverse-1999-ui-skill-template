import { useState } from 'react'

export default function CombatStatus() {
  const [health, setHealth] = useState(72)
  const [moxie, setMoxie] = useState(3)

  return (
    <div className="thin-border bg-[var(--bg-panel)] p-6 geo-pattern">
      {/* Character Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 thin-border bg-[var(--bg-main)] flex items-center justify-center">
          <span className="text-[var(--accent-orange)] text-lg">✦</span>
        </div>
        <div>
          <h3 className="font-[var(--font-cjk)] text-[var(--text-primary)] text-sm">维尔汀</h3>
          <span className="font-[var(--font-script)] text-[var(--accent-orange)] text-xs">Vertin</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-xs">Lv.</span>
          <span className="font-[var(--font-en)] text-[var(--text-primary)] text-lg">40</span>
        </div>
      </div>

      {/* Health Bar - Parallelogram */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="font-[var(--font-mono)] text-[10px] text-[var(--text-secondary)]">HP</span>
          <div className="flex-1 relative h-6">
            {/* Background */}
            <div className="absolute inset-0 clip-parallelogram bg-[var(--accent-red)]/40" />
            {/* Fill */}
            <div
              className="absolute inset-0 clip-parallelogram bg-[var(--health-green)] transition-all duration-500"
              style={{ width: `${health}%` }}
            />
            {/* Border overlay */}
            <div className="absolute inset-0 clip-parallelogram border border-white/10" />
            {/* Value text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-[var(--font-mono)] text-white text-xs drop-shadow-lg">
                {Math.round(health * 45.8)} / 4580
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Moxie Slots - 5 Diamonds */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="font-[var(--font-mono)] text-[10px] text-[var(--text-secondary)]">MP</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                  i <= moxie ? 'animate-[breathingGlow_2s_ease-in-out_infinite]' : ''
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <polygon
                    points="12,2 22,12 12,22 2,12"
                    fill={i <= moxie ? 'var(--energy-glow)' : 'none'}
                    stroke={i <= moxie ? 'var(--energy-glow)' : 'rgba(255,255,255,0.3)'}
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            ))}
          </div>
          <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-xs ml-2">
            MOXIE
          </span>
        </div>
      </div>

      {/* Combat Cards */}
      <div className="flex gap-3 mt-6">
        {[
          { type: 'ATTACK', color: '#c56032', label: '攻击' },
          { type: 'BUFF', color: '#5c8c63', label: '增益' },
          { type: 'DEFEND', color: '#4a6fa5', label: '防御' },
        ].map((card, i) => (
          <div
            key={i}
            className="flex-1 thin-border bg-[var(--bg-main)] p-3 hover:bg-[var(--bg-panel)] transition-colors cursor-pointer group"
            style={{
              animation: `filmStagger 0.4s var(--ease-snap) ${i * 0.1}s both`
            }}
          >
            {/* Card art placeholder - silhouette style */}
            <div className="w-full h-16 bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-transparent mb-2 flex items-center justify-center">
              <span className="text-2xl opacity-30 group-hover:opacity-60 transition-opacity">
                {i === 0 ? '⚔' : i === 1 ? '✧' : '◈'}
              </span>
            </div>
            {/* Bottom colored bar */}
            <div className="h-[2px] mb-1.5" style={{ backgroundColor: card.color }} />
            <div className="flex justify-between items-center">
              <span className="font-[var(--font-cjk)] text-[var(--text-secondary)] text-[10px]">{card.label}</span>
              <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-[8px] tracking-wider">{card.type}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setHealth(Math.max(0, health - 15))}
          className="flex-1 thin-border py-2 text-xs font-[var(--font-cjk)] text-[var(--text-secondary)] hover:text-[var(--accent-red)] hover:border-[var(--accent-red)] transition-colors"
        >
          受伤 -15%
        </button>
        <button
          onClick={() => setHealth(Math.min(100, health + 15))}
          className="flex-1 thin-border py-2 text-xs font-[var(--font-cjk)] text-[var(--text-secondary)] hover:text-[var(--health-green)] hover:border-[var(--health-green)] transition-colors"
        >
          回复 +15%
        </button>
        <button
          onClick={() => setMoxie(moxie >= 5 ? 0 : moxie + 1)}
          className="flex-1 thin-border py-2 text-xs font-[var(--font-cjk)] text-[var(--text-secondary)] hover:text-[var(--energy-glow)] hover:border-[var(--energy-glow)] transition-colors"
        >
          激情 +1
        </button>
      </div>
    </div>
  )
}
