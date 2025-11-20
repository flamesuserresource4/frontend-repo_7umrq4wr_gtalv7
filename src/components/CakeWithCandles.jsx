import React from 'react'

export default function CakeWithCandles({ candles = 5, onAllBlown }) {
  const [blown, setBlown] = React.useState(0)
  const audioRef = React.useRef(null)
  const rafRef = React.useRef(null)

  const blowNext = () => {
    setBlown(n => {
      const v = Math.min(candles, n + 1)
      if (v >= candles) onAllBlown?.()
      return v
    })
    if (navigator.vibrate) navigator.vibrate(15)
  }

  const handleTap = () => blowNext()

  React.useEffect(() => {
    let stream, ctx, analyser, dataArray

    const startMic = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        ctx = new (window.AudioContext || window.webkitAudioContext)()
        const source = ctx.createMediaStreamSource(stream)
        analyser = ctx.createAnalyser()
        analyser.fftSize = 1024
        source.connect(analyser)
        dataArray = new Uint8Array(analyser.frequencyBinCount)

        const tick = () => {
          analyser.getByteFrequencyData(dataArray)
          // Compute average volume
          let sum = 0
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i]
          const avg = sum / dataArray.length
          // Heuristic threshold for a "blow"
          if (avg > 75 && blown < candles) {
            blowNext()
          }
          rafRef.current = requestAnimationFrame(tick)
        }
        tick()
      } catch (e) {
        // Mic not available or permission denied; gracefully degrade to taps only
      }
    }

    startMic()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (stream) stream.getTracks().forEach(t => t.stop())
      if (audioRef.current && audioRef.current.close) audioRef.current.close()
    }
  }, [blown, candles])

  // Layout constants
  const cakeWidth = 256 // px
  const cakeHeight = 160
  const topY = 56 // y-position of cake top
  const leftPad = 24
  const rightPad = 24

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width: cakeWidth, height: cakeHeight }}>
        {/* Cake base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[256px] h-[120px] bg-gradient-to-b from-pink-300 to-pink-500 rounded-2xl border border-white/20 shadow-[0_0_24px_rgba(236,72,153,0.4)]" />
        {/* Frosting top */}
        <div className="absolute" style={{ left: 16, right: 16, top: topY }}>
          <div className="h-4 bg-pink-200/90 rounded-full border border-white/30 shadow-inner" />
        </div>
        {/* Candles evenly spaced along the top */}
        {[...Array(candles)].map((_, i) => {
          const x = leftPad + (i * ((cakeWidth - leftPad - rightPad) / (candles - 1 || 1)))
          const isBlown = i < blown
          return (
            <button
              key={i}
              onClick={handleTap}
              className="absolute -translate-x-1/2"
              style={{ left: x, top: topY - 30 }}
              aria-label={`Candle ${i + 1}`}
            >
              <div className="w-1.5 h-8 bg-yellow-200 rounded-full border border-yellow-300/50" />
              {isBlown ? (
                <div className="w-3 h-3 bg-white/40 rounded-full mt-1" />
              ) : (
                <div className="w-3 h-3 bg-amber-400 rounded-full mt-1 animate-pulse" />
              )}
            </button>
          )
        })}
      </div>
      <p className="text-sm text-white/80">Blow into the mic or tap candles to blow them out</p>
    </div>
  )
}
