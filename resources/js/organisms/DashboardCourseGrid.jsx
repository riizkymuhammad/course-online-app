import React from "react"
import DashboardCourseCard from "@/organisms/DashboardCourseCard"

export default function DashboardCourseGrid({ courses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((course) => (
        <DashboardCourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
