import { useEffect, useState } from 'react'

interface NoticeModalProps {
  onClose: () => void
}

export default function NoticeModal({ onClose }: NoticeModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`} />

      {/* Modal Content - Paper Growth Animation */}
      <div
        className={`relative w-full max-w-2xl transition-all duration-500 ${visible ? '' : 'opacity-0'}`}
        style={{
          animation: visible ? 'paperGrowth 0.6s var(--ease-snap) forwards' : 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top wireframe symbol */}
        <div className="flex flex-col items-center mb-4">
          <span className="text-[var(--accent-orange)] text-2xl font-mono">^</span>
          <span className="font-[var(--font-cjk)] text-[var(--text-primary)] text-sm mt-1">提示</span>
          <span className="font-[var(--font-en)] text-[var(--text-secondary)] text-[10px] tracking-[0.3em]">NOTICE</span>
        </div>

        {/* Main beige banner */}
        <div className="bg-[var(--modal-light)] w-full">
          {/* Top decorative line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.2)] to-transparent" />

          {/* Content */}
          <div className="px-8 md:px-16 py-10 text-center">
            <p className="font-[var(--font-cjk)] text-black/80 text-base leading-relaxed mb-2">
              您的体力已经恢复至上限。
            </p>
            <p className="font-[var(--font-cjk)] text-black/60 text-sm leading-relaxed mb-1">
              当前体力：240 / 240
            </p>
            <p className="font-[var(--font-en)] text-black/40 text-xs tracking-wider mt-4">
              STAMINA FULL — READY FOR EXPEDITION
            </p>
          </div>

          {/* Geometric fold lines decoration */}
          <div className="px-8 md:px-16 pb-4">
            <svg className="w-full h-4 opacity-10" viewBox="0 0 400 16">
              <line x1="0" y1="8" x2="400" y2="8" stroke="black" strokeWidth="0.5" strokeDasharray="4 4" />
              <polygon points="195,4 200,12 205,4" fill="none" stroke="black" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 px-8 pb-8">
            {/* Cancel Button */}
            <button
              onClick={onClose}
              className="glitch-btn relative clip-chamfer bg-white border border-black/20 px-8 py-3 
                hover:bg-gray-100 transition-colors group"
            >
              <span className="font-[var(--font-cjk)] text-black/70 text-sm">稍后再说</span>
              <span className="absolute top-1 right-2 text-[6px] text-black/30">▼</span>
            </button>

            {/* Confirm Button */}
            <button
              onClick={onClose}
              className="glitch-btn relative clip-chamfer bg-[var(--accent-orange)] px-8 py-3
                hover:bg-[#d4703f] transition-colors group"
            >
              {/* Geometric line pattern inside button */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 40">
                  <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.5" />
                  <line x1="20" y1="0" x2="20" y2="40" stroke="white" strokeWidth="0.3" />
                  <line x1="80" y1="0" x2="80" y2="40" stroke="white" strokeWidth="0.3" />
                </svg>
              </div>
              <span className="relative z-10 font-[var(--font-cjk)] text-white text-sm">确认</span>
              <span className="absolute top-1 right-2 text-[6px] text-white/50">▼</span>
            </button>
          </div>
        </div>

        {/* Bottom decorative border */}
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-orange)] to-transparent mt-4" />
      </div>
    </div>
  )
}
