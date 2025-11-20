import React, { useEffect, useMemo, useRef, useState } from 'react'

function Orb({ x, y, size, collected }) {
  const glow = collected ? 'shadow-[0_0_0_rgba(0,0,0,0)] opacity-50' : 'shadow-[0_0_20px_rgba(99,102,241,0.8)]'
  return (
    <div
      className={`absolute rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-cyan-300 ${glow}`}
      style={{ left: x, top: y, width: size, height: size }}
    />
  )
}

export default function OrbHunt({ count = 6, onComplete }) {
  const areaRef = useRef(null)
  const [collected, setCollected] = useState(Array(count).fill(false))
  const [positions, setPositions] = useState(() => Array(count).fill(0).map(() => ({ x: Math.random(), y: Math.random(), s: Math.random() * 18 + 18 })))

  useEffect(() => {
    const onTouch = (e) => {
      const rect = areaRef.current.getBoundingClientRect()
      const x = (e.touches?.[0]?.clientX || e.clientX) - rect.left
      const y = (e.touches?.[0]?.clientY || e.clientY) - rect.top
      setCollected(prev => prev.map((c, i) => {
        if (c) return c
        const px = positions[i].x * rect.width
        const py = positions[i].y * rect.height
        const s = positions[i].s
        const dx = px - x
        const dy = py - y
        return Math.sqrt(dx*dx + dy*dy) < s
      }))
    }
    const el = areaRef.current
    el.addEventListener('touchstart', onTouch)
    el.addEventListener('touchmove', onTouch)
    el.addEventListener('mousemove', onTouch)
    return () => {
      el.removeEventListener('touchstart', onTouch)
      el.removeEventListener('touchmove', onTouch)
      el.removeEventListener('mousemove', onTouch)
    }
  }, [positions])

  useEffect(() => {
    if (collected.every(Boolean)) onComplete?.()
  }, [collected, onComplete])

  const progress = useMemo(() => collected.filter(Boolean).length, [collected])

  return (
    <div className="text-white">
      <div ref={areaRef} className="relative h-64 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-indigo-950/60 to-slate-900/30">
        {positions.map((p, i) => (
          <Orb key={i} x={`calc(${p.x*100}% - ${p.s/2}px)`} y={`calc(${p.y*100}% - ${p.s/2}px)`} size={p.s} collected={collected[i]} />
        ))}
      </div>
      <p className="mt-3 text-sm text-indigo-100/80">Collect the glowing orbs: {progress} / {count}</p>
      {progress === count && <p className="text-emerald-300 mt-1">Treasure complete! 🎁</p>}
    </div>
  )
}
