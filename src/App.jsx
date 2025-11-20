import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowLeft, Gift } from 'lucide-react'
import Hero from './components/Hero'
import Chapter from './components/Chapter'
import Candles from './components/Candles'
import OrbHunt from './components/OrbHunt'
import MessageCard from './components/MessageCard'
import GlowButton from './components/GlowButton'
import MusicToggle from './components/MusicToggle'

const messages = {
  intro: `On this special day, the stars hum softly and the neon winds carry a single word: Nanna.\nFollow the light, choose your path, and unlock the memories that glow.`,
  pathA: `Path A — The Way of Laughter. \nTap your way through to gather smiles and silly moments.`,
  pathB: `Path B — The Trail of Wisdom. \nEvery step rings with lessons you gifted us.`,
  secret: `Secret Path — The Heart Circuit. \nOnly those with curious eyes find it.`,
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [branch, setBranch] = useState(null)
  const [confetti, setConfetti] = useState(false)

  const go = (n=1) => setStep(s => s + n)
  const back = () => setStep(s => Math.max(0, s-1))

  const reset = () => { setStarted(false); setStep(0); setBranch(null); setConfetti(false) }

  const Scene = useMemo(() => {
    if (!started) return (
      <Hero onStart={() => { setStarted(true); setStep(1) }} />
    )

    // Chapter 1: Intro & choices
    if (step === 1) return (
      <Chapter index={1} title="The Neon Gate" text={messages.intro} onNext={() => setStep(2)} onBack={back} showBack={false}>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={() => { setBranch('A'); setStep(2) }} className="py-3 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-100">Path A</button>
          <button onClick={() => { setBranch('B'); setStep(2) }} className="py-3 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-100">Path B</button>
          <button onClick={() => { setBranch('S'); setStep(2) }} className="col-span-2 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-100">Secret Path</button>
        </div>
      </Chapter>
    )

    // Chapter 2: Mini game by branch
    if (step === 2) return (
      <Chapter
        index={2}
        title={branch === 'A' ? 'Gather the Giggles' : branch === 'B' ? 'Echoes of Wisdom' : 'Heart Circuit'}
        text={branch === 'A' ? messages.pathA : branch === 'B' ? messages.pathB : messages.secret}
        onNext={() => setStep(3)}
        onBack={back}
      >
        {branch === 'A' && (
          <div>
            <p className="text-sm text-indigo-100/80 mb-2">Tap rapidly to fill the joy meter!</p>
            <TapGame onDone={() => setStep(3)} />
          </div>
        )}
        {branch === 'B' && (
          <div className="space-y-3">
            <MessageCard body="The calm strength you carry taught us to stand tall. Your stories, your patience, your kindness — they shape us every day." />
            <MessageCard body="Today we celebrate not just your years, but your wisdom that lights our path." />
            <GlowButton onClick={() => setStep(3)} className="w-full justify-center">Continue</GlowButton>
          </div>
        )}
        {branch === 'S' && (
          <div className="space-y-3">
            <Candles />
            <GlowButton onClick={() => setStep(3)} className="w-full justify-center mt-3">Continue</GlowButton>
          </div>
        )}
      </Chapter>
    )

    // Chapter 3: Orb hunt
    if (step === 3) return (
      <Chapter index={3} title="Treasure of Light" text="Collect the glowing orbs to unlock a memory chest." onNext={() => setStep(4)} onBack={back}>
        <OrbHunt onComplete={() => {}} />
      </Chapter>
    )

    // Chapter 4: Final Surprise
    if (step === 4) return (
      <Finale onReplay={reset} onConfetti={() => setConfetti(true)} />
    )

    return null
  }, [started, step, branch])

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 overflow-hidden relative">
      <AnimatePresence mode="wait">{Scene}</AnimatePresence>
      <MusicToggle src="/ambient.mp3" />
      {confetti && <ConfettiOverlay onDone={() => setConfetti(false)} />}
    </div>
  )
}

function TapGame({ onDone }) {
  const [score, setScore] = useState(0)
  const max = 20
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" style={{ width: `${(score/max)*100}%` }} />
      </div>
      <button onClick={() => { const s = Math.min(max, score+1); setScore(s); if (s === max) onDone?.() }} className="mt-3 w-full py-3 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/40 text-white">Tap!</button>
    </div>
  )
}

function Finale({ onReplay, onConfetti }) {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,rgba(236,72,153,0.16),transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md text-center text-white">
        <Gift className="w-14 h-14 mx-auto text-fuchsia-300 drop-shadow-[0_0_16px_rgba(236,72,153,0.6)]" />
        <h2 className="text-4xl font-black mt-3 drop-shadow-[0_0_28px_rgba(99,102,241,0.55)]">Happy Birthday Nanna!</h2>
        <p className="mt-2 text-indigo-100/90">May your day be filled with joy, health, and endless love. We celebrate you today and always.</p>
        <div className="mt-5 flex gap-3">
          <GlowButton onClick={onConfetti} className="flex-1 justify-center">Confetti!</GlowButton>
          <button onClick={onReplay} className="flex-1 py-3 rounded-full bg-white/10 border border-white/20">Replay</button>
        </div>
        <p className="mt-4 text-sm text-indigo-200/80">Tap Confetti for a burst of celebration.</p>
      </div>
    </section>
  )
}

function ConfettiOverlay({ onDone }) {
  const [show, setShow] = useState(true)
  React.useEffect(() => {
    const t = setTimeout(() => { setShow(false); onDone?.() }, 2000)
    return () => clearTimeout(t)
  }, [onDone])
  if (!show) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="absolute inset-0 overflow-hidden">
        {new Array(80).fill(0).map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: -20, x: Math.random() * window.innerWidth, rotate: 0, opacity: 1 }}
            animate={{ y: window.innerHeight + 20, rotate: 360 }}
            transition={{ duration: 1.8 + Math.random()*0.5, ease: 'easeIn', delay: Math.random()*0.15 }}
            className="absolute block w-2 h-3"
            style={{ backgroundColor: `hsl(${Math.random()*360}, 90%, 60%)`, borderRadius: 2 }}
          />
        ))}
      </div>
    </div>
  )
}
