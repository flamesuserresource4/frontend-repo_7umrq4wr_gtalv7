import React, { useEffect, useRef, useState } from 'react'
import { Wind, Sparkles } from 'lucide-react'

function Candle({ lit }) {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className={`w-2 h-10 rounded bg-gradient-to-b from-rose-200 to-rose-400 ${lit ? 'opacity-100' : 'opacity-50'}`}></div>
      <div className="relative -mt-1">
        <div className={`w-3 h-3 rounded-full ${lit ? 'bg-amber-400' : 'bg-slate-400'} shadow-[0_0_12px_rgba(251,191,36,0.8)]`} />
        {lit && <Sparkles className="absolute -top-3 left-1 w-4 h-4 text-amber-300" />}
      </div>
    </div>
  )
}

export default function Candles({ count = 6 }) {
  const [lit, setLit] = useState(new Array(count).fill(true))
  const [prompt, setPrompt] = useState('Blow into the mic or swipe over the candles!')
  const areaRef = useRef(null)

  // Swipe to extinguish
  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    let touching = false
    const onStart = () => { touching = true }
    const onMove = (e) => {
      if (!touching) return
      const rect = el.getBoundingClientRect()
      const y = (e.touches?.[0]?.clientY || e.clientY) - rect.top
      if (y > rect.height * 0.2 && y < rect.height * 0.8) {
        setLit(prev => prev.map(() => false))
        setPrompt('Nice! Candles are out!')
      }
    }
    const onEnd = () => { touching = false }
    el.addEventListener('touchstart', onStart)
    el.addEventListener('touchmove', onMove)
    el.addEventListener('touchend', onEnd)
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  // Mic blow detection (simple/approximate)
  useEffect(() => {
    let audioContext, analyser, mic, raf

    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
        analyser = audioContext.createAnalyser()
        mic = audioContext.createMediaStreamSource(stream)
        mic.connect(analyser)
        analyser.fftSize = 2048
        const dataArray = new Uint8Array(analyser.fftSize)

        const tick = () => {
          analyser.getByteTimeDomainData(dataArray)
          // measure loudness variance
          let sum = 0
          for (let i = 0; i < dataArray.length; i++) {
            const v = (dataArray[i] - 128) / 128
            sum += v * v
          }
          const rms = Math.sqrt(sum / dataArray.length)
          if (rms > 0.06) {
            setLit(prev => prev.map(() => false))
            setPrompt('Great blow! Candles are out!')
          }
          raf = requestAnimationFrame(tick)
        }
        tick()
      } catch (e) {
        setPrompt('Swipe over the candles to blow them out!')
      }
    }

    initMic()
    return () => { cancelAnimationFrame(raf); mic && mic.disconnect(); analyser && analyser.disconnect(); audioContext && audioContext.close() }
  }, [])

  const relight = () => {
    setLit(new Array(count).fill(true))
    setPrompt('Blow into the mic or swipe over the candles!')
  }

  const allOut = lit.every(l => !l)

  return (
    <div className="text-white">
      <div ref={areaRef} className="relative rounded-2xl p-5 border border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-900/30 backdrop-blur-xl">
        <div className="flex items-end justify-center h-24">
          {new Array(count).fill(0).map((_, i) => <Candle key={i} lit={lit[i]} />)}
        </div>
        <p className="mt-3 text-sm text-indigo-100/80 flex items-center justify-center gap-2"><Wind className="w-4 h-4" /> {prompt}</p>
      </div>

      <div className="mt-3 flex gap-2">
        {!allOut && <button onClick={() => setLit(prev => prev.map(() => false))} className="flex-1 py-2 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/40">Blow Out</button>}
        {allOut && <button onClick={relight} className="flex-1 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/40">Relight</button>}
      </div>
    </div>
  )
}
