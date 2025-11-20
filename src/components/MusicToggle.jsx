import React, { useEffect, useRef, useState } from 'react'
import { Music2, Pause } from 'lucide-react'

export default function MusicToggle({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = new Audio(src)
    a.loop = true
    a.volume = 0.35
    audioRef.current = a
    return () => { a.pause(); audioRef.current = null }
  }, [src])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
    } else {
      a.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  const Icon = playing ? Pause : Music2

  return (
    <button onClick={toggle} className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]">
      <Icon className="w-6 h-6" />
    </button>
  )
}
