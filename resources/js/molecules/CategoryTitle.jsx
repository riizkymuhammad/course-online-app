import React from "react"
import { Link } from "@inertiajs/react"
import { BookOpen } from "lucide-react"
import { iconMap } from "@/lib/icons"

export function CategoryTitle({ title, courseCount, href, iconKey }) {
  const Icon = iconMap[iconKey] || BookOpen

  return (
    <Link
      href={href}
      className="group flex flex-col items-center p-5 rounded-xl border border-border/50 bg-card hover:border-primary hover:shadow-lg transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-sm font-semibold text-card-foreground mb-1 text-center">{title}</h3>
      <span className="text-xs text-muted-foreground">{courseCount} Materi</span>
    </Link>
  )
}
