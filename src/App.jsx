import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift, Mountain, Smile, Waves, Stars, GalleryVerticalEnd, PenLine } from 'lucide-react'
import Hero from './components/Hero'
import Chapter from './components/Chapter'
import Candles from './components/Candles'
import OrbHunt from './components/OrbHunt'
import MessageCard from './components/MessageCard'
import GlowButton from './components/GlowButton'
import MusicToggle from './components/MusicToggle'
import Typewriter from './components/Typewriter'
import BubblesGame from './components/BubblesGame'
import BoatGame from './components/BoatGame'

const PATHS = {
  strength: {
    name: 'The Light of Strength',
    color: 'indigo',
    introTitle: 'The First Spark',
    introText: 'Every hero begins with a spark. Nanna, yours lit our world.',
    gameTitle: 'Mountains You Moved',
    gameText: 'Tap to shift the floating stones. Your strength carried our family through storms.',
    reward: 'Strength Guardian',
    icon: Mountain,
  },
  laughter: {
    name: 'The Path of Laughter',
    color: 'fuchsia',
    introTitle: 'The Hidden Playground',
    introText: 'The air hums with giggles. Neon toys glow as memories awaken…',
    gameTitle: 'Catch the Laugh Bubbles',
    gameText: 'Tap 5 bubbles to reveal bright little memories.',
    reward: 'Joy Bringer',
    icon: Smile,
  },
  calm: {
    name: 'The River of Calm',
    color: 'cyan',
    introTitle: 'The Calm Current',
    introText: 'A blue river glows softly. The world slows. Peace settles in.',
    gameTitle: 'Guide the Boat',
    gameText: 'Drag the tiny glowing boat left and right. You were our safe harbor.',
    reward: 'Peace Maker',
    icon: Waves,
  },
  secret: {
    name: 'The Path of Infinite Wishes',
    color: 'violet',
    introTitle: 'The Cosmic Beacon',
    introText: 'Deep space opens in purple light. Stars blink in Kamui rhythm. The Birthday Beacon shines brightest.',
    gameTitle: 'The Candle Rite',
    gameText: 'Blow into the mic or swipe up to send wishes into the stars.',
    reward: 'Infinite Wishes',
    icon: Stars,
  }
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [currentPath, setCurrentPath] = useState(null) // 'strength' | 'laughter' | 'calm' | 'secret'
  const [screen, setScreen] = useState(0) // 0 choose, 1 intro, 2 game, 3 reward, 4 orb hunt, 5 finale
  const [confetti, setConfetti] = useState(false)
  const [unlockedSecret, setUnlockedSecret] = useState(false)

  const resetAdventure = () => {
    setStarted(false)
    setCurrentPath(null)
    setScreen(0)
    setConfetti(false)
    setUnlockedSecret(false)
  }

  const goToChoosePath = () => { setCurrentPath(null); setScreen(0) }

  const startPath = (key) => { setCurrentPath(key); setScreen(1) }

  const path = currentPath ? PATHS[currentPath] : null

  const ChooseScreen = (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,rgba(236,72,153,0.12),transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center text-white">
          <h2 className="text-3xl font-black drop-shadow-[0_0_24px_rgba(99,102,241,0.55)]">Choose a Path</h2>
          <p className="text-indigo-100/90 mt-2">Each realm holds a blessing. Follow your heart.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['strength','laughter','calm']).map((k) => {
              const P = PATHS[k]; const Icon = P.icon
              const glow = k==='strength' ? 'shadow-indigo-500/40' : k==='laughter' ? 'shadow-fuchsia-500/40' : 'shadow-cyan-400/40'
              const border = k==='strength' ? 'border-indigo-400/40' : k==='laughter' ? 'border-fuchsia-400/40' : 'border-cyan-400/40'
              const bg = k==='strength' ? 'bg-indigo-500/15' : k==='laughter' ? 'bg-fuchsia-500/15' : 'bg-cyan-500/15'
              return (
                <button key={k} onClick={() => startPath(k)} className={`rounded-3xl ${bg} border ${border} p-5 text-left backdrop-blur-md hover:scale-[1.02] active:scale-[0.99] transition shadow-[0_0_28px] ${glow}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <p className="text-sm uppercase tracking-widest text-white/70">{P.name.split(' ')[2]}</p>
                  <h3 className="text-xl font-bold text-white">{P.name}</h3>
                  <p className="text-indigo-100/90 text-sm mt-1">{P.introTitle}</p>
                </button>
              )
            })}
            {unlockedSecret && (
              <button onClick={() => startPath('secret')} className={`rounded-3xl bg-violet-500/15 border border-violet-400/40 p-5 text-left backdrop-blur-md hover:scale-[1.02] active:scale-[0.99] transition shadow-[0_0_28px_rgba(139,92,246,0.45)]`}>
                <Stars className="w-8 h-8 text-violet-200 mb-3" />
                <p className="text-sm uppercase tracking-widest text-violet-200/80">Unlocked</p>
                <h3 className="text-xl font-bold text-white">{PATHS.secret.name}</h3>
                <p className="text-indigo-100/90 text-sm mt-1">Explore beyond the veil</p>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )

  const Scene = useMemo(() => {
    if (!started) return <Hero onStart={() => { setStarted(true); setScreen(0) }} />

    if (currentPath === null && screen === 0) return ChooseScreen

    if (path && screen === 1) {
      return (
        <Chapter index={1} title={path.introTitle} text="" onNext={() => setScreen(2)} onBack={goToChoosePath}>
          <Typewriter text={path.introText} className="text-indigo-100/90" />
        </Chapter>
      )
    }

    if (path && screen === 2) {
      if (currentPath === 'strength') {
        return (
          <Chapter index={2} title={path.gameTitle} text={path.gameText} onNext={() => setScreen(3)} onBack={() => setScreen(1)}>
            <TapGame onDone={() => setScreen(3)} label="Move Rocks" />
          </Chapter>
        )
      }
      if (currentPath === 'laughter') {
        return (
          <Chapter index={2} title={path.gameTitle} text={path.gameText} onNext={() => setScreen(3)} onBack={() => setScreen(1)}>
            <BubblesGame target={5} onDone={() => setScreen(3)} lines={[
              'Remember the kite that wouldn\'t land?',
              'Your laugh turns rainy days neon.',
              'Ice-cream runs after school — best detours.',
              'That time we danced like no one watched.',
              'Every silly story still sparkles.'
            ]} />
          </Chapter>
        )
      }
      if (currentPath === 'calm') {
        return (
          <Chapter index={2} title={path.gameTitle} text={path.gameText} onNext={() => setScreen(3)} onBack={() => setScreen(1)}>
            <BoatGame onDone={() => setScreen(3)} />
          </Chapter>
        )
      }
      if (currentPath === 'secret') {
        return (
          <Chapter index={2} title={path.gameTitle} text={path.gameText} onNext={() => setScreen(3)} onBack={() => setScreen(1)}>
            <Candles />
          </Chapter>
        )
      }
    }

    if (path && screen === 3) {
      const BadgeIcon = path.icon
      return (
        <Chapter index={3} title="Reward" text="A token from this realm appears." onNext={() => setScreen(4)} onBack={() => setScreen(2)}>
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-3 rounded-2xl px-5 py-4 border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.12)]">
              <BadgeIcon className="w-7 h-7 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-white/70">Badge Unlocked</p>
                <p className="text-lg font-semibold">{path.reward}</p>
              </div>
            </div>
            <div className="mt-4">
              <GlowButton onClick={() => { setUnlockedSecret(true); setCurrentPath(null); setScreen(0) }} className="w-full justify-center">Explore More</GlowButton>
            </div>
          </div>
        </Chapter>
      )
    }

    if (screen === 4) {
      return (
        <Chapter index={4} title="Treasure of Light" text="Collect the glowing orbs to open the Hall of Wishes." onNext={() => setScreen(5)} onBack={() => setScreen(3)}>
          <OrbHunt onComplete={() => {}} />
        </Chapter>
      )
    }

    if (screen === 5) return (
      <Finale onReplay={resetAdventure} onConfetti={() => setConfetti(true)} />
    )

    return null
  }, [started, currentPath, screen, unlockedSecret])

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 overflow-hidden relative">
      <AnimatePresence mode="wait">{Scene}</AnimatePresence>
      <MusicToggle src="https://cdn.pixabay.com/download/audio/2022/03/23/audio_3c0b0b572e.mp3?filename=ambient-110253.mp3" />
      {confetti && <ConfettiOverlay onDone={() => setConfetti(false)} />}
    </div>
  )
}

function TapGame({ onDone, label = 'Tap!' }) {
  const [score, setScore] = useState(0)
  const max = 20
  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500" style={{ width: `${(score/max)*100}%` }} />
      </div>
      <button onClick={() => { const s = Math.min(max, score+1); setScore(s); if (s === max) onDone?.() }} className="mt-3 w-full py-3 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400/40 text-white">{label}</button>
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
        <div className="mt-5 grid grid-cols-3 gap-3">
          <GlowButton onClick={onConfetti} className="justify-center">Confetti</GlowButton>
          <button onClick={() => alert('Opening personal message…')} className="py-3 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center gap-2"><PenLine className="w-4 h-4"/>Message</button>
          <button onClick={() => alert('Opening memory gallery…')} className="py-3 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center gap-2"><GalleryVerticalEnd className="w-4 h-4"/>Gallery</button>
        </div>
        <button onClick={onReplay} className="mt-3 w-full py-3 rounded-full bg-white/10 border border-white/20">Replay Adventure</button>
        <p className="mt-4 text-sm text-indigo-200/80">Tap Confetti for a burst of celebration.</p>
      </div>
    </section>
  )
}

function ConfettiOverlay({ onDone }) {
  const [show, setShow] = useState(true)
  React.useEffect(() => {
    const t = setTimeout(() => { setShow(false); onDone?.() }, 2200)
    return () => clearTimeout(t)
  }, [onDone])
  if (!show) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="absolute inset-0 overflow-hidden">
        {new Array(100).fill(0).map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: -20, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 360), rotate: 0, opacity: 1 }}
            animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 640) + 20, rotate: 360 }}
            transition={{ duration: 1.8 + Math.random()*0.6, ease: 'easeIn', delay: Math.random()*0.2 }}
            className="absolute block w-2 h-3"
            style={{ backgroundColor: `hsl(${Math.random()*360}, 90%, 60%)`, borderRadius: 2 }}
          />
        ))}
      </div>
    </div>
  )
}
