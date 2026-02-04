import React from "react"
import { Clock, Play, Star } from "lucide-react"

export default function DashboardCourseCardMedia({
  image,
  title,
  category,
  rating,
  duration,
}) {
  return (
    <div className="relative h-44 overflow-hidden">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Category Badge */}
      <div className="absolute top-3 left-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-blue-600">
          {category}
        </span>
      </div>

      {/* Rating Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-400 text-white text-xs font-bold">
        <Star className="w-3 h-3 fill-white" />
        {rating}
      </div>

      {/* Play Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-xl">
          <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
        </div>
      </div>

      {/* Duration */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
        <Clock className="w-3 h-3 text-white" />
        <span className="text-xs font-medium text-white">{duration}</span>
      </div>
    </div>
  )
}
