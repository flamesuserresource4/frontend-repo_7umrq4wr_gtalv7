import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Mountain, Smile, Waves, Stars } from 'lucide-react'
import Hero from './components/Hero'
import Chapter from './components/Chapter'
import Candles from './components/Candles'
import OrbHunt from './components/OrbHunt'
import GlowButton from './components/GlowButton'
import MusicToggle from './components/MusicToggle'
import Typewriter from './components/Typewriter'
import BubblesGame from './components/BubblesGame'
import BoatGame from './components/BoatGame'
import RocksGame from './components/RocksGame'
import UploadField from './components/UploadField'
import CakeWithCandles from './components/CakeWithCandles'

const PATHS = {
  strength: {
    name: 'Jack Daniels',
    color: 'indigo',
    introTitle: 'The First Spark',
    introText: 'Every hero begins with a spark. Nanna, yours lit our world.',
    gameTitle: 'Move the Rocks',
    gameText: 'Drag the rocks from the left pile to the right zone. Your strength carried our family through storms.',
    reward: 'Strength Guardian',
    icon: Mountain,
  },
  laughter: {
    name: 'Black Dog',
    color: 'fuchsia',
    introTitle: 'The Hidden Playground',
    introText: 'memories? lets make lot of them',
    gameTitle: 'Catch the Laugh Bubbles',
    gameText: 'Tap 5 bubbles to reveal bright little memories.',
    reward: 'Joy Bringer',
    icon: Smile,
  },
  calm: {
    name: 'Absolute Vodka',
    color: 'cyan',
    introTitle: 'The Calm Current',
    introText: 'thank you for being the constant support in my life nanna',
    gameTitle: 'Guide the Boat',
    gameText: 'Drag the tiny glowing boat left and right. You were our safe harbor.',
    reward: 'Peace Maker',
    icon: Waves,
  },
  secret: {
    name: 'The Path of Infinite Wishes',
    color: 'violet',
    introTitle: 'The Cosmic Beacon',
    introText: 'how to survive with idli for breakfast, lunch, dinner ?, ask my dad.',
    gameTitle: 'Cake & Candles',
    gameText: 'Tap to blow out the candles and make a wish.',
    reward: 'Infinite Wishes',
    icon: Stars,
  }
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [currentPath, setCurrentPath] = useState(null)
  const [screen, setScreen] = useState(0) // 0 choose, 1 intro, 2 game, 3 reward or ending, 4 orb hunt, 5 finale
  const [bgImage, setBgImage] = useState(null)

  const path = currentPath ? PATHS[currentPath] : null

  const ChooseScreen = (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,rgba(236,72,153,0.12),transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center text-white">
          <h2 className="text-3xl font-black drop-shadow-[0_0_24px_rgba(99,102,241,0.55)]">Choose a Path</h2>
          <p className="text-indigo-100/90 mt-2">Each realm holds a blessing. Follow your heart.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
            {(['strength','laughter','calm','secret']).map((k) => {
              const P = PATHS[k]; const Icon = P.icon
              const glow = k==='strength' ? 'shadow-indigo-500/40' : k==='laughter' ? 'shadow-fuchsia-500/40' : k==='calm' ? 'shadow-cyan-400/40' : 'shadow-violet-500/40'
              const border = k==='strength' ? 'border-indigo-400/40' : k==='laughter' ? 'border-fuchsia-400/40' : k==='calm' ? 'border-cyan-400/40' : 'border-violet-400/40'
              const bg = k==='strength' ? 'bg-indigo-500/15' : k==='laughter' ? 'bg-fuchsia-500/15' : k==='calm' ? 'bg-cyan-500/15' : 'bg-violet-500/15'
              return (
                <button key={k} onClick={() => { setCurrentPath(k); setScreen(1); }} className={`rounded-3xl ${bg} border ${border} p-5 text-left backdrop-blur-md hover:scale-[1.02] active:scale-[0.99] transition shadow-[0_0_28px] ${glow}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="text-xl font-bold text-white">{P.name}</h3>
                  <p className="text-indigo-100/90 text-sm mt-1">{P.introTitle}</p>
                </button>
              )
            })}
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
        <Chapter index={1} title={path.introTitle} text="" onNext={() => setScreen(2)} onBack={() => { setCurrentPath(null); setScreen(0) }}>
          <Typewriter text={path.introText} className="text-indigo-100/90" />
        </Chapter>
      )
    }

    if (path && screen === 2) {
      if (currentPath === 'strength') {
        return (
          <Chapter index={2} title={path.gameTitle} text={path.gameText} onNext={() => setScreen(3)} onBack={() => setScreen(1)}>
            <RocksGame onDone={() => setScreen(3)} />
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
            <CakeWithCandles candles={6} onAllBlown={() => setScreen(3)} />
          </Chapter>
        )
      }
    }

    if (path && screen === 3) {
      // Strength: show badge + heartfelt letter, then continue to orb hunt
      if (currentPath === 'strength') {
        const BadgeIcon = path.icon
        return (
          <Chapter index={3} title="Reward" text="A token from this realm appears." onNext={() => setScreen(4)} onBack={() => setScreen(2)}>
            <div className="text-white space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 rounded-2xl px-5 py-4 border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                  <BadgeIcon className="w-7 h-7 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-white/70">Badge Unlocked</p>
                    <p className="text-lg font-semibold">{path.reward}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 leading-relaxed text-indigo-100/95">
                “Hi Nanna, you’ve always put every one of us before yourself, every single day of your life. As you turn 51, I hope you finally start choosing you too — your happiness, your dreams, your peace. You deserve all of it and more.
                I love you so much.
                — Your daughter”
              </div>
            </div>
          </Chapter>
        )
      }
      // Calm: skip reward, go straight to ending screen with custom message
      if (currentPath === 'calm') {
        return (
          <Finale title="happy 51 nanna , i love you soo much, drink less  and lets stay happy - shiny" continuous hideExtras onReplay={() => { setCurrentPath(null); setScreen(0) }} />
        )
      }
      // Secret: replace chapter 3 with ending screen, allow bg image upload
      if (currentPath === 'secret') {
        return (
          <Finale title="Happy Birthday Nanna!" continuous hideExtras allowUpload bgImage={bgImage} onUpload={(file, url) => setBgImage(url)} onReplay={() => { setCurrentPath(null); setScreen(0) }} />
        )
      }
      // Laughter default reward
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

    if (screen === 5) {
      // Final global ending used after orb hunt (e.g., from strength or laughter). Always-on confetti and simplified layout
      return (
        <Finale title="Happy birthday nanna!!!" continuous hideExtras onReplay={() => { setCurrentPath(null); setScreen(0) }} />
      )
    }

    return null
  }, [started, currentPath, screen, path, bgImage])

  const musicSrc = currentPath === 'secret'
    ? 'https://cdn.pixabay.com/download/audio/2021/09/07/audio_1f2c85f3e0.mp3?filename=lofi-study-112191.mp3'
    : 'https://cdn.pixabay.com/download/audio/2022/03/23/audio_3c0b0b572e.mp3?filename=ambient-110253.mp3'

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 overflow-hidden relative">
      <AnimatePresence mode="wait">{Scene}</AnimatePresence>
      <MusicToggle src={musicSrc} />
    </div>
  )
}

function Finale({ title = 'Happy Birthday Nanna!', continuous = false, hideExtras = false, allowUpload = false, bgImage, onUpload, onReplay }) {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center p-4">
      {bgImage && <div className="absolute inset-0"><img src={bgImage} alt="background" className="w-full h-full object-cover opacity-20"/></div>}
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,rgba(236,72,153,0.16),transparent_60%)]" />
      {continuous && <ConfettiBackground />}
      <div className="relative z-10 w-full max-w-md text-center text-white">
        <Gift className="w-14 h-14 mx-auto text-fuchsia-300 drop-shadow-[0_0_16px_rgba(236,72,153,0.6)]" />
        <h2 className="text-4xl font-black mt-3 drop-shadow-[0_0_28px_rgba(99,102,241,0.55)]">{title}</h2>
        {!hideExtras && <p className="mt-2 text-indigo-100/90">May your day be filled with joy, health, and endless love. We celebrate you today and always.</p>}
        {allowUpload && (
          <div className="mt-4 text-left">
            <UploadField label="Upload a photo for the background" onChange={onUpload} />
          </div>
        )}
        <div className="mt-5 grid grid-cols-1 gap-3">
          <button onClick={onReplay} className="py-3 rounded-full bg-white/10 border border-white/20">Replay Adventure</button>
        </div>
      </div>
    </section>
  )
}

function ConfettiBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <div className="absolute inset-0 overflow-hidden">
        {new Array(140).fill(0).map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: -20, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 360), rotate: 0, opacity: 1 }}
            animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 640) + 20, rotate: 360 }}
            transition={{ repeat: Infinity, repeatType: 'loop', duration: 3 + Math.random()*1.2, ease: 'linear', delay: Math.random()*1.2 }}
            className="absolute block w-2 h-3"
            style={{ backgroundColor: `hsl(${Math.random()*360}, 90%, 60%)`, borderRadius: 2 }}
          />
        ))}
      </div>
    </div>
  )
}
