import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import NoticeModal from './components/NoticeModal'
import CombatStatus from './components/CombatStatus'
import ConstellationScale from './components/ConstellationScale'
import PosterCarousel from './components/PosterCarousel'
import AsciiBackground from './components/AsciiBackground'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-main)] relative overflow-hidden">
      {/* ASCII Drift Background */}
      <AsciiBackground />

      {/* CRT Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10 pt-24 px-6 md:px-12 lg:px-20 pb-20">
        {/* Hero Section */}
        <section className={`mb-16 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[var(--accent-orange)] font-mono text-xs tracking-widest">▲</span>
            <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-xs tracking-[0.3em] uppercase">Reverse: 1999</span>
          </div>
          <h1 className="font-[var(--font-cjk)] text-3xl md:text-5xl font-extralight text-[var(--text-primary)] mb-3"
            style={{ animation: loaded ? 'typewriter 1s steps(20) forwards' : 'none' }}>
            重返未来：1999
          </h1>
          <p className="font-[var(--font-script)] text-xl text-[var(--accent-orange)] opacity-80">
            A journey through time and mystery...
          </p>
          <div className="thin-border mt-6 w-32 h-px bg-gradient-to-r from-[var(--accent-orange)] to-transparent" />
        </section>

        {/* Component Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Combat Status */}
          <section className="space-y-6">
            <SectionTitle title="战斗状态" subtitle="Combat Status" />
            <CombatStatus />
          </section>

          {/* Constellation Scale */}
          <section className="space-y-6">
            <SectionTitle title="星图能量" subtitle="The Scale" />
            <ConstellationScale />
          </section>

          {/* Poster Carousel */}
          <section className="space-y-6 lg:col-span-2">
            <SectionTitle title="角色图鉴" subtitle="Character Archive" />
            <PosterCarousel />
          </section>
        </div>

        {/* Modal Trigger */}
        <section className="mt-16 text-center">
          <div className="thin-border inline-block p-8 geo-pattern">
            <p className="font-[var(--font-cjk)] text-[var(--text-secondary)] text-sm mb-4">
              点击下方按钮触发米色横幅弹窗
            </p>
            <p className="font-[var(--font-en)] text-[var(--text-secondary)] text-xs tracking-wider mb-6">
              TRIGGER NOTICE MODAL
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="glitch-btn clip-chamfer bg-[var(--accent-orange)] text-white px-8 py-3 font-[var(--font-cjk)] text-sm tracking-wider
                hover:bg-[#d4703f] transition-colors relative"
            >
              <span className="relative z-10">打开提示</span>
              {/* Down triangle indicator */}
              <span className="absolute top-1 right-2 text-[8px] opacity-60">▼</span>
            </button>
          </div>
        </section>
      </main>

      {/* Notice Modal */}
      {showModal && <NoticeModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[var(--accent-orange)] text-lg">◇</span>
      <div>
        <h2 className="font-[var(--font-cjk)] text-lg font-extralight text-[var(--text-primary)]">
          {title}
        </h2>
        <span className="font-[var(--font-en)] text-[10px] text-[var(--text-secondary)] tracking-[0.2em] uppercase">
          {subtitle}
        </span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-[rgba(255,255,255,0.2)] to-transparent ml-4" />
    </div>
  )
}

export default App
