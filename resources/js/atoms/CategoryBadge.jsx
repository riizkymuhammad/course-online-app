import React from "react"

export function CategoryBadge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-blue-600">
      {children}
    </span>
  )
}
