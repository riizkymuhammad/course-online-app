import React from "react"
import { cn } from "@/lib/utils"

export function CategoryPills({ categories, selected, onSelect }) {
  return (
    <div className="border-b border-border bg-background sticky top-16 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                selected === category.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
