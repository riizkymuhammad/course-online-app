import React from "react"
import { LearningCard } from "@/organisms/LearningCard"

export function LearningGrid({ items, onPlay, onAction }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <LearningCard
          key={item.id}
          data={item}
          onPlay={onPlay}
          onAction={onAction}
        />
      ))}
    </div>
  )
}
