import React from 'react'

export default function MessageCard({ title = 'For Nanna', body }) {
  return (
    <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 text-white shadow-[0_0_30px_rgba(147,51,234,0.25)]">
      <h3 className="text-xl font-semibold mb-2 drop-shadow-[0_0_14px_rgba(59,130,246,0.45)]">{title}</h3>
      <p className="text-indigo-100/90 text-sm leading-relaxed">{body}</p>
    </div>
  )
}
