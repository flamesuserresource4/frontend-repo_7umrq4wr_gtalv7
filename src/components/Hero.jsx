import React from 'react'
import Spline from '@splinetool/react-spline'
import Particles from './Particles'
import GlowButton from './GlowButton'

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* gradient overlay for neon vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-fuchsia-900/20 to-slate-950/70 pointer-events-none" />

      <Particles density={70} />

      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-24 px-6 text-center">
        <div className="max-w-sm mx-auto">
          <p className="text-fuchsia-200/90 text-sm tracking-widest mb-3">A birthday micro-adventure</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white drop-shadow-[0_0_24px_rgba(99,102,241,0.55)] leading-tight">
            Kamui Wishes: For Nanna
          </h1>
          <p className="mt-3 text-indigo-100/90 text-base">
            Enter the neon gateway and follow the paths to unlock surprises, memories, and love.
          </p>
        </div>

        <GlowButton onClick={onStart} className="mt-8">
          Start the Journey
        </GlowButton>
      </div>
    </section>
  )
}
