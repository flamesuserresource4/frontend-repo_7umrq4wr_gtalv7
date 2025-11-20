import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Chapter({ index, title, text, children, onNext, onBack, showBack = true }) {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,rgba(236,72,153,0.12),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={`chapter-${index}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-[0_0_40px_rgba(99,102,241,0.25)] text-white"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-200/80 mb-2">Chapter {index}</p>
            <h2 className="text-2xl font-bold mb-2 drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]">{title}</h2>
            <p className="text-indigo-100/90 text-sm leading-relaxed">{text}</p>

            {children && <div className="mt-4">{children}</div>}

            <div className="mt-5 flex gap-3">
              {showBack && (
                <button onClick={onBack} className="flex-1 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition text-white">Back</button>
              )}
              <button onClick={onNext} className="flex-[2] py-3 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white font-semibold shadow-[0_0_14px_rgba(99,102,241,0.4)]">Continue</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
