import React from 'react'

function Bubble({ x, size, speed, onPop, label }) {
  const [y, setY] = React.useState(110)
  const [popped, setPopped] = React.useState(false)

  React.useEffect(() => {
    if (popped) return
    const interval = setInterval(() => {
      setY((prev) => prev - speed)
    }, 16)
    return () => clearInterval(interval)
  }, [speed, popped])

  const handleTap = () => {
    if (popped) return
    setPopped(true)
    onPop?.(label)
  }

  if (y < -10 || popped) return null

  return (
    <button
      onClick={handleTap}
      className="absolute rounded-full bg-gradient-to-br from-cyan-300/70 to-fuchsia-300/70 backdrop-blur-md border border-white/30 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
      style={{ left: `${x}%`, bottom: `${y}%`, width: size, height: size }}
      aria-label="bubble"
    />
  )
}

export default function BubblesGame({ target = 5, onDone, lines = [] }) {
  const [popped, setPopped] = React.useState(0)
  const [memIndex, setMemIndex] = React.useState(0)

  const handlePop = (label) => {
    setPopped((n) => {
      const v = n + 1
      if (v >= target) onDone?.()
      return v
    })
    setMemIndex((i) => (i + 1) % Math.max(1, lines.length))
    if (navigator.vibrate) navigator.vibrate(15)
  }

  const bubbles = React.useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    size: Math.random() * 36 + 28,
    speed: Math.random() * 0.6 + 0.3,
  })), [])

  return (
    <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-indigo-950/60 to-slate-900/30">
      {bubbles.map((b) => (
        <Bubble key={b.id} x={b.x} size={b.size} speed={b.speed} onPop={handlePop} />
      ))}
      <div className="absolute top-2 left-2 text-xs text-white/80">Caught: {popped} / {target}</div>
      {lines.length > 0 && (
        <div className="absolute inset-x-0 bottom-2 text-center text-sm text-white/90 px-3">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 border border-white/20">
            {lines[memIndex]}
          </span>
        </div>
      )}
    </div>
  )
}
