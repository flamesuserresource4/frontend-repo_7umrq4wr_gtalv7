import React, { useEffect, useRef } from 'react'

export default function Particles({ density = 60 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrame
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class P {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.r = Math.random() * 1.6 + 0.4
        this.a = Math.random() * 0.35 + 0.15
        this.h = 220 + Math.random() * 60
      }
      step() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.h},100%,70%,${this.a})`
        ctx.shadowColor = `hsla(${this.h},100%,70%,0.9)`
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    particles = new Array(Math.floor((canvas.width * canvas.height) / (10000 / (density / 50)))).fill(0).map(() => new P())

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.step(); p.draw() })
      animationFrame = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [density])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}
