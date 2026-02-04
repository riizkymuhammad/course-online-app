import React from "react"
import { Clock } from "lucide-react"

export function DurationPill({ children }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
      <Clock className="w-3 h-3 text-white" />
      <span className="text-xs font-medium text-white">{children}</span>
    </div>
  )
}
