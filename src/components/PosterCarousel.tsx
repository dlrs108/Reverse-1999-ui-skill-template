import { useState } from 'react'

const characters = [
  {
    name: '维尔汀',
    en: 'Vertin',
    role: '时间系谱者',
    rarity: 6,
    color: '#c56032',
    symbol: '✦'
  },
  {
    name: '星锑',
    en: 'Regulus',
    role: '星辰观测者',
    rarity: 6,
    color: '#4a6fa5',
    symbol: '☆'
  },
  {
    name: '百夫长',
    en: 'Centurion',
    role: '战场指挥官',
    rarity: 6,
    color: '#9e3e35',
    symbol: '⚔'
  },
  {
    name: '红弩箭',
    en: 'Pavia',
    role: '疾风使者',
    rarity: 6,
    color: '#5c8c63',
    symbol: '➤'
  },
  {
    name: '苏芙比',
    en: 'Sotheby',
    role: '秘术收藏家',
    rarity: 6,
    color: '#8b5e9c',
    symbol: '◈'
  },
]

export default function PosterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const total = characters.length

    // Wrap around
    let normalizedDiff = diff
    if (diff > total / 2) normalizedDiff = diff - total
    if (diff < -total / 2) normalizedDiff = diff + total

    const absDiff = Math.abs(normalizedDiff)

    if (absDiff === 0) {
      // Active card
      return {
        transform: 'scale(1) rotate(0deg)',
        zIndex: 10,
        opacity: 1,
        marginLeft: '0px',
        marginRight: '0px',
      }
    }

    const direction = normalizedDiff > 0 ? 1 : -1
    const rotation = direction * (2 + absDiff) * (Math.random() > 0.5 ? 1 : -1)

    return {
      transform: `scale(${1 - absDiff * 0.12}) rotate(${(direction * (absDiff * 1.5))}deg)`,
      zIndex: 10 - absDiff,
      opacity: Math.max(0.3, 1 - absDiff * 0.25),
      marginLeft: `${direction * -30}px`,
      marginRight: `${-direction * -30}px`,
    }
  }

  return (
    <div className="thin-border bg-[var(--bg-panel)] p-6 geo-pattern">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-xs tracking-wider">ARCHIVE</span>
          <span className="font-[var(--font-mono)] text-[var(--text-secondary)] text-[10px]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(characters.length).padStart(2, '0')}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveIndex((activeIndex - 1 + characters.length) % characters.length)}
            className="w-8 h-8 thin-border flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-orange)] transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => setActiveIndex((activeIndex + 1) % characters.length)}
            className="w-8 h-8 thin-border flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-orange)] transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      {/* Carousel - Collage Style */}
      <div className="relative flex items-center justify-center h-64 overflow-hidden">
        {characters.map((char, index) => {
          const style = getCardStyle(index)
          return (
            <div
              key={index}
              className="absolute cursor-pointer transition-all duration-500"
              style={{
                ...style,
                transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1.2)',
              }}
              onClick={() => setActiveIndex(index)}
            >
              {/* Card */}
              <div
                className="w-36 h-52 thin-border bg-[var(--bg-main)] card-shadow relative overflow-hidden group"
                style={{
                  animation: `filmStagger 0.5s var(--ease-snap) ${index * 0.05}s both`
                }}
              >
                {/* Character art area - silhouette style */}
                <div
                  className="w-full h-36 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(180deg, ${char.color}15 0%, transparent 100%)`
                  }}
                >
                  {/* Decorative geometric background */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <polygon points="50,10 90,90 10,90" fill="none" stroke={char.color} strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke={char.color} strokeWidth="0.3" />
                    </svg>
                  </div>
                  {/* Character symbol */}
                  <span
                    className="text-5xl relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: char.color, filter: `drop-shadow(0 0 8px ${char.color}40)` }}
                  >
                    {char.symbol}
                  </span>
                  {/* Rarity stars */}
                  <div className="absolute bottom-2 left-2 flex gap-0.5">
                    {Array.from({ length: char.rarity }).map((_, i) => (
                      <span key={i} className="text-[8px]" style={{ color: char.color }}>★</span>
                    ))}
                  </div>
                </div>

                {/* Info area */}
                <div className="p-2.5 border-t border-white/10">
                  <h4 className="font-[var(--font-cjk)] text-[var(--text-primary)] text-xs mb-0.5">
                    {char.name}
                  </h4>
                  <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-[9px] tracking-wider block">
                    {char.en}
                  </span>
                  <span className="font-[var(--font-script)] text-[10px] block mt-0.5" style={{ color: char.color }}>
                    {char.role}
                  </span>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-1 right-1 w-3 h-3 border-t border-r" style={{ borderColor: `${char.color}60` }} />
                <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l" style={{ borderColor: `${char.color}60` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {characters.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 transition-all duration-300 ${
              i === activeIndex
                ? 'bg-[var(--accent-orange)] scale-125'
                : 'bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]'
            }`}
          />
        ))}
      </div>

      {/* Decorative bottom line */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
      <div className="mt-2 flex justify-between items-center">
        <span className="font-[var(--font-mono)] text-[9px] text-[var(--text-secondary)]">
          ◇ COLLAGE LAYOUT
        </span>
        <span className="font-[var(--font-script)] text-[11px] text-[var(--text-secondary)]">
          vintage archive
        </span>
      </div>
    </div>
  )
}
