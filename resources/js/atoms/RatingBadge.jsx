import React from "react"
import { Star } from "lucide-react"

export function RatingBadge({ rating }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400 text-white text-xs font-bold">
      <Star className="w-3 h-3 fill-white" />
      {rating}
    </div>
  )
}
