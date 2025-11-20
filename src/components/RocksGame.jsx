import React from 'react'

export default function RocksGame({ onDone }) {
  const [rocks, setRocks] = React.useState(() => Array.from({length:6}, (_,i)=>({id:i, x:0, y:Math.random()*140+20, dragging:false, placed:false})))
  const zoneRef = React.useRef(null)

  const onPointerDown = (id, e) => {
    e.preventDefault()
    setRocks(rs => rs.map(r => r.id===id ? {...r, dragging:true} : r))
  }
  const onPointerMove = (e) => {
    setRocks(rs => rs.map(r => {
      if (!r.dragging || r.placed) return r
      const clientX = e.touches?.[0]?.clientX ?? e.clientX
      const clientY = e.touches?.[0]?.clientY ?? e.clientY
      const container = zoneRef.current?.parentElement?.getBoundingClientRect()
      if (!container) return r
      const relX = Math.min(100, Math.max(0, ((clientX - container.left) / container.width) * 100))
      const relY = Math.min(160, Math.max(0, ((clientY - container.top) / container.height) * 160))
      return { ...r, x: relX, y: relY }
    }))
  }
  const onPointerUp = () => {
    setRocks(rs => {
      let placedCount = 0
      const rect = zoneRef.current?.getBoundingClientRect()
      const cont = zoneRef.current?.parentElement?.getBoundingClientRect()
      const next = rs.map(r => {
        if (!r.dragging || !rect || !cont) return { ...r, dragging:false }
        const absX = (r.x/100)*cont.width + cont.left
        const absY = (r.y/160)*cont.height + cont.top
        const inside = absX > rect.left && absX < rect.right && absY > rect.top && absY < rect.bottom
        if (inside) return { ...r, dragging:false, placed:true, x:85, y:Math.random()*140+10 }
        return { ...r, dragging:false }
      })
      placedCount = next.filter(n=>n.placed).length
      if (placedCount >= rs.length) onDone?.()
      return next
    })
  }

  React.useEffect(() => {
    const move = (e)=>onPointerMove(e)
    const up = ()=>onPointerUp()
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, {passive:false})
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [])

  return (
    <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/40">
      <div className="absolute inset-y-0 left-0 w-1/2 flex items-center justify-center">
        <div className="text-xs text-white/70 bg-white/5 border border-white/10 px-2 py-1 rounded-full">Pile A</div>
      </div>
      <div ref={zoneRef} className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-center bg-emerald-400/5">
        <div className="text-xs text-emerald-200/80 bg-emerald-400/10 border border-emerald-300/20 px-2 py-1 rounded-full">Move here</div>
      </div>
      {rocks.map(r => (
        <button
          key={r.id}
          onMouseDown={(e)=>onPointerDown(r.id,e)}
          onTouchStart={(e)=>onPointerDown(r.id,e)}
          className={`absolute rounded-[40%] border ${r.placed? 'border-emerald-300/40':'border-white/20'} shadow-[0_0_18px_rgba(255,255,255,0.08)] active:scale-[0.98]`}
          style={{ left: `calc(${r.x}% - 18px)`, top: `calc(${r.y}px)`, width: 36, height: 28, background: 'linear-gradient(145deg, #64748b, #334155)'}}
          aria-label="rock"
        />
      ))}
      <div className="absolute bottom-2 left-2 text-xs text-white/80">Moved: {rocks.filter(r=>r.placed).length} / {rocks.length}</div>
    </div>
  )
}
