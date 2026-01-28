import React from "react"
import { Link } from "@inertiajs/react"
import DashboardCourseCardMedia from "@/molecules/DashboardCourseCardMedia"
import DashboardCourseCardStats from "@/molecules/DashboardCourseCardStats"

export default function DashboardCourseCard({ course }) {
  return (
    <Link
      href={`/dashboard/materi/${course.id}`}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 flex flex-col"
    >
      <DashboardCourseCardMedia
        image={course.image}
        title={course.title}
        category={course.category}
        rating={course.rating}
        duration={course.duration}
      />

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-slate-500 mb-4">oleh {course.instructor}</p>

        <DashboardCourseCardStats lessons={course.lessons} students={course.students} />
      </div>
    </Link>
  )
}
