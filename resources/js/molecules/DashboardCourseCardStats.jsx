import React from "react"
import { BookOpen, Users } from "lucide-react"

export default function DashboardCourseCardStats({ lessons, students }) {
  return (
    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>{lessons} Pelajaran</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{students}</span>
        </div>
      </div>
    </div>
  )
}
