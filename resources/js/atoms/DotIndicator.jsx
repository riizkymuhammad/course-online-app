import React from "react"

export function DotIndicator({ total, activeIndex, onSelect }) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          type="button"
          className={`h-2 rounded-full transition-all duration-300 ${
            index === activeIndex ? "bg-primary w-8" : "bg-primary/30 w-2 hover:bg-primary/50"
          }`}
        />
      ))}
    </div>
  )
}
