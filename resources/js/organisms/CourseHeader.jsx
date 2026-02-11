import React from "react"
import { CourseMetaRow } from "@/molecules/CourseMetaRow"
import { CourseStatsGrid } from "@/molecules/CourseStatsGrid"

export function CourseHeader({ course }) {
  return (
    <div className="space-y-4">
      <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white">
        {course.category}
      </span>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
        {course.title}
      </h1>

      <p className="text-muted-foreground leading-relaxed">{course.description}</p>

      <CourseMetaRow rating={course.rating} students={course.students} duration={course.duration} />

      <CourseStatsGrid
        totalSections={course.totalSections}
        totalModules={course.totalModules}
        duration={course.duration}
      />

      <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200/80 bg-white lg:hidden">
        <img
          src={course.image}
          alt={course.title}
          onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/fallback/1200/700")}
          className="absolute inset-0 w-full h-full object-cover opacity-6"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 lg:hidden">
          <div className="text-sm font-semibold text-blue-700/80">{course.category}</div>
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 leading-snug line-clamp-2">
            {course.title}
          </h2>
        </div>
      </div>
    </div>
  )
}
