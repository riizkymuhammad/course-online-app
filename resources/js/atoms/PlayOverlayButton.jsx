import React from "react"
import { Play } from "lucide-react"

export function PlayOverlayButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:scale-110 transition-transform"
      aria-label="Play"
    >
      <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
    </button>
  )
}
