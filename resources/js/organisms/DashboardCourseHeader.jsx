import React from "react"
import { BookOpen } from "lucide-react"

export default function DashboardCourseHeader() {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
          Materi Pembelajaran
        </h1>
      </div>
      <p className="text-slate-500 ml-12">
        Jelajahi dan pelajari berbagai kursus berkualitas
      </p>
    </div>
  )
}
