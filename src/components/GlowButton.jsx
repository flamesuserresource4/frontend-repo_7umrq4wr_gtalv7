import React from 'react'
import { motion } from 'framer-motion'

export default function GlowButton({ children, onClick, className = '', icon: Icon }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.03 }}
      className={`relative inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold tracking-wide shadow-[0_0_20px_rgba(99,102,241,0.35)] bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 ring-1 ring-white/20 overflow-hidden ${className}`}
    >
      <span className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_10%,rgba(255,255,255,0.25),transparent_40%)] pointer-events-none" />
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      <span className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">{children}</span>
    </motion.button>
  )
}
