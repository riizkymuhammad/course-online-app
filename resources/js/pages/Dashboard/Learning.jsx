import React from "react"
import { BookMarked, Play, Clock } from "lucide-react"
import DashboardLayout from "@/layouts/DashboardLayout"

export default function LearningPage() {
  const learningData = [
    {
      id: 1,
      course: "React Basics",
      progress: 75,
      lessons: "9/12",
      status: "In Progress",
      category: "Web Development",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
      duration: "6 jam",
    },
    {
      id: 2,
      course: "Advanced JavaScript",
      progress: 100,
      lessons: "18/18",
      status: "Completed",
      category: "Programming",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
      duration: "12 jam",
    },
    {
      id: 3,
      course: "Python for Data Science",
      progress: 45,
      lessons: "6/15",
      status: "In Progress",
      category: "Data Science",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60",
      duration: "10 jam",
    },
    {
      id: 4,
      course: "UI/UX Design Principles",
      progress: 30,
      lessons: "3/10",
      status: "In Progress",
      category: "Design",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
      duration: "8 jam",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
            <BookMarked className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
            Pembelajaran Saya
          </h1>
        </div>
        <p className="text-slate-500 ml-12">
          Pantau dan lanjutkan progress pembelajaran Anda
        </p>
      </div>

      {/* Learning Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {learningData.map((learning) => (
          <div
            key={learning.id}
            className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 flex flex-col"
          >
            {/* Course Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={learning.image}
                alt={learning.course}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-blue-600">
                  {learning.category}
                </span>
              </div>

              {/* Progress Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={[
                    "px-3 py-1 rounded-full text-xs font-bold",
                    learning.status === "Completed"
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-500 text-white",
                  ].join(" ")}
                >
                  {learning.progress}%
                </span>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-xl hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
                </button>
              </div>

              {/* Duration */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
                <Clock className="w-3 h-3 text-white" />
                <span className="text-xs font-medium text-white">
                  {learning.duration}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {learning.course}
              </h3>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">
                    Progress
                  </span>
                  <span className="text-xs font-bold text-blue-600">
                    {learning.lessons} Pelajaran
                  </span>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={[
                      "h-full rounded-full transition-all duration-500",
                      learning.status === "Completed"
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                        : "bg-gradient-to-r from-blue-400 to-blue-500",
                    ].join(" ")}
                    style={{ width: `${learning.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span
                    className={[
                      "text-xs font-semibold",
                      learning.status === "Completed"
                        ? "text-emerald-600"
                        : "text-blue-600",
                    ].join(" ")}
                  >
                    {learning.status === "Completed" ? "Selesai" : "Berlangsung"}
                  </span>
                  <button
                    type="button"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {learning.status === "Completed"
                      ? "Lihat Sertifikat"
                      : "Lanjutkan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Integrasi layout Inertia */
LearningPage.layout = (page) => <DashboardLayout children={page} />
