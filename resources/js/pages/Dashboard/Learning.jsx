import React from "react"
import DashboardLayout from "@/layouts/DashboardLayout"

import { LearningHeader } from "@/organisms/LearningHeader"
import { LearningGrid } from "@/organisms/LearningGrid"

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

  const handlePlay = (item) => {
    alert(`Play course: ${item.course}`)
  }

  const handleAction = (item) => {
    if (item.status === "Completed") alert(`Lihat sertifikat: ${item.course}`)
    else alert(`Lanjutkan belajar: ${item.course}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <LearningHeader />
      <LearningGrid items={learningData} onPlay={handlePlay} onAction={handleAction} />
    </div>
  )
}

/** Integrasi layout Inertia */
LearningPage.layout = (page) => <DashboardLayout children={page} />
