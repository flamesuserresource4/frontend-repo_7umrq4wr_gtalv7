import React from 'react'

export default function CakeWithCandles({ candles = 5, onAllBlown }) {
  const [blown, setBlown] = React.useState(0)

  const blowOne = (i) => {
    setBlown(n => {
      const v = Math.min(candles, n + 1)
      if (v >= candles) onAllBlown?.()
      return v
    })
    if (navigator.vibrate) navigator.vibrate(10)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-56 h-40">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-28 bg-gradient-to-b from-pink-300 to-pink-500 rounded-2xl border border-white/20 shadow-[0_0_24px_rgba(236,72,153,0.4)]" />
        {[...Array(candles)].map((_, i) => (
          <button key={i} onClick={()=>blowOne(i)} className="absolute -top-2" style={{ left: `${20 + i*(60/(candles-1||1))}px` }}>
            <div className="w-1.5 h-6 bg-yellow-200 rounded-full" />
            {i < blown ? (
              <div className="w-3 h-3 bg-white/40 rounded-full mt-0.5" />
            ) : (
              <div className="w-3 h-3 bg-amber-400 rounded-full mt-0.5 animate-pulse" />
            )}
          </button>
        ))}
      </div>
      <p className="text-sm text-white/80">Tap candles to blow them out</p>
    </div>
  )
}
