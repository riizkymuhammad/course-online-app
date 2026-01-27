import React from "react"
import { CategoryBadge } from "@/atoms/CategoryBadge"
import { StatusBadge } from "@/atoms/StatusBadge"
import { PlayOverlayButton } from "@/atoms/PlayOverlayButton"
import { DurationPill } from "@/atoms/DurationPill"

export function LearningCardMedia({ image, course, category, progress, status, duration, onPlay }) {
  return (
    <div className="relative h-44 overflow-hidden">
      <img
        src={image}
        alt={course}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Category Badge */}
      <div className="absolute top-3 left-3">
        <CategoryBadge>{category}</CategoryBadge>
      </div>

      {/* Progress Badge */}
      <div className="absolute top-3 right-3">
        <StatusBadge progress={progress} status={status} />
      </div>

      {/* Play Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <PlayOverlayButton onClick={onPlay} />
      </div>

      {/* Duration */}
      <div className="absolute bottom-3 right-3">
        <DurationPill>{duration}</DurationPill>
      </div>
    </div>
  )
}
