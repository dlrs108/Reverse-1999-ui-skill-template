import { useState } from 'react'

const navItems = [
  { label: '大厅', en: 'Lobby', icon: '⬡' },
  { label: '战斗', en: 'Combat', icon: '△' },
  { label: '档案', en: 'Archive', icon: '◇' },
  { label: '召唤', en: 'Summon', icon: '☆' },
  { label: '商店', en: 'Shop', icon: '□' },
]

export default function Navigation() {
  const [active, setActive] = useState(0)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--bg-main)]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 thin-border border-t-0 border-l-0 border-r-0">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[var(--accent-orange)] flex items-center justify-center relative">
            <span className="text-[var(--accent-orange)] text-xs font-mono">19</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent-orange)]" />
          </div>
          <span className="font-[var(--font-en)] text-[var(--text-primary)] text-sm tracking-[0.2em] hidden md:block">
            REVERSE:1999
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="vacuum-glow relative px-3 py-2 group transition-colors"
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className={`text-base transition-colors ${active === i ? 'text-[var(--accent-orange)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                  {item.icon}
                </span>
                <span className={`font-[var(--font-cjk)] text-[10px] transition-colors ${active === i ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                  {item.label}
                </span>
              </div>
              {/* Active indicator - hand-drawn underline */}
              {active === i && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <div className="w-6 h-[2px] bg-[var(--accent-orange)]" />
                  <span className="font-[var(--font-script)] text-[8px] text-[var(--accent-orange)] block text-center -mt-0.5 opacity-70">
                    {item.en.toLowerCase()}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right side decorations */}
        <div className="flex items-center gap-4">
          <span className="font-[var(--font-mono)] text-[10px] text-[var(--text-secondary)] hidden md:block">
            + 01
          </span>
          <div className="w-6 h-6 thin-border flex items-center justify-center">
            <span className="text-[var(--text-secondary)] text-xs">≡</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
