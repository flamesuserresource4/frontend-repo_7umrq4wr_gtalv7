import React from 'react'

export default function Typewriter({ text = '', speed = 30, className = '' }) {
  const [shown, setShown] = React.useState('')
  React.useEffect(() => {
    let i = 0
    const chars = Array.from(text)
    const t = setInterval(() => {
      i++
      setShown(chars.slice(0, i).join(''))
      if (i >= chars.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return <p className={className}>{shown}</p>
}
