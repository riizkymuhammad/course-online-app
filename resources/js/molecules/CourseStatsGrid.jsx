import React from "react"
import { Layers, BookOpen, Clock } from "lucide-react"

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="bg-card rounded-xl p-3 border border-border/50">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}

export function CourseStatsGrid({ totalSections, totalModules, duration }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard icon={Layers} value={totalSections} label="Section" />
      <StatCard icon={BookOpen} value={totalModules} label="Modul" />
      <StatCard icon={Clock} value={duration} label="Durasi" />
    </div>
  )
}
