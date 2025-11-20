import React from 'react'

export default function BoatGame({ onDone }) {
  const boxRef = React.useRef(null)
  const [x, setX] = React.useState(50)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const el = boxRef.current
    if (!el) return

    const handle = (clientX) => {
      const rect = el.getBoundingClientRect()
      const rel = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      setX(rel * 100)
      setProgress((p) => {
        const nv = Math.min(100, p + 0.4)
        if (nv >= 100) onDone?.()
        return nv
      })
    }

    const onMove = (e) => {
      if (e.touches && e.touches[0]) handle(e.touches[0].clientX)
      else if (e.clientX) handle(e.clientX)
    }

    el.addEventListener('touchstart', onMove)
    el.addEventListener('touchmove', onMove)
    el.addEventListener('mousemove', onMove)

    return () => {
      el.removeEventListener('touchstart', onMove)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('mousemove', onMove)
    }
  }, [onDone])

  return (
    <div className="space-y-2">
      <div ref={boxRef} className="relative h-64 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-indigo-900/60 to-blue-900/60">
        <div className="absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(34,211,238,0.15),transparent)]" />
        <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'repeating-linear-gradient( to bottom, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 8px)'}} />
        <div className="absolute bottom-6" style={{ left: `calc(${x}% - 14px)` }}>
          <div className="w-7 h-7 rounded-[40%_40%_0_0] bg-white/90 shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
          <div className="w-7 h-3 bg-white/70 blur-[1px]" />
        </div>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-sm text-indigo-100/80">Guide the glowing boat across the calm river.</p>
    </div>
  )
}
