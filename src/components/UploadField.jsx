import React from 'react'

export default function UploadField({ label = 'Upload image', onChange }) {
  const inputRef = React.useRef(null)
  const [preview, setPreview] = React.useState(null)

  const handle = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    onChange?.(file, url)
  }

  return (
    <div className="w-full">
      <label className="block text-sm text-white/80 mb-2">{label}</label>
      <div className="flex items-center gap-3">
        <input ref={inputRef} type="file" accept="image/*" onChange={handle} className="text-white/80" />
        {preview && (
          <img src={preview} alt="preview" className="h-12 w-12 object-cover rounded-lg border border-white/20" />
        )}
      </div>
    </div>
  )
}
