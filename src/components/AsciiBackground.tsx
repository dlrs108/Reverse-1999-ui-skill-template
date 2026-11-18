import { useEffect, useState, useMemo } from 'react'

interface AsciiChar {
  id: number
  char: string
  x: number
  delay: number
  duration: number
  size: number
}

export default function AsciiBackground() {
  const [chars, setChars] = useState<AsciiChar[]>([])

  const asciiChars = useMemo(() => ['0', '>', '*', '+', '◇', '△', '□', '☆', '·', '|', '/', '\\'], [])

  useEffect(() => {
    const generated: AsciiChar[] = []
    for (let i = 0; i < 30; i++) {
      generated.push({
        id: i,
        char: asciiChars[Math.floor(Math.random() * asciiChars.length)],
        x: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 10 + Math.random() * 15,
        size: 10 + Math.random() * 6,
      })
    }
    setChars(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {chars.map((c) => (
        <span
          key={c.id}
          className="absolute font-[var(--font-mono)] text-[var(--energy-glow)]"
          style={{
            left: `${c.x}%`,
            fontSize: `${c.size}px`,
            animation: `asciiDrift ${c.duration}s linear ${c.delay}s infinite`,
            opacity: 0,
          }}
        >
          {c.char}
        </span>
      ))}

      {/* Decorative geometric grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        {/* Vertical lines */}
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="white" strokeWidth="0.5" />
        {/* Horizontal lines */}
        <line x1="0" y1="33%" x2="100%" y2="33%" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="66%" x2="100%" y2="66%" stroke="white" strokeWidth="0.5" />
        {/* Crosshairs */}
        <circle cx="25%" cy="33%" r="20" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="75%" cy="66%" r="20" fill="none" stroke="white" strokeWidth="0.5" />
      </svg>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 opacity-[0.06]">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon points="30,5 55,30 30,55 5,30" fill="none" stroke="white" strokeWidth="0.5" />
          <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="0.3" />
          <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-8 opacity-[0.06]">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <polygon points="40,5 75,40 40,75 5,40" fill="none" stroke="white" strokeWidth="0.5" />
          <polygon points="40,15 65,40 40,65 15,40" fill="none" stroke="white" strokeWidth="0.3" />
          <circle cx="40" cy="40" r="10" fill="none" stroke="white" strokeWidth="0.3" />
        </svg>
      </div>
    </div>
  )
}
