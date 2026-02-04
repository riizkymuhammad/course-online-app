import React from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import DashboardCourseHeader from "@/organisms/DashboardCourseHeader"
import DashboardCourseGrid from "@/organisms/DashboardCourseGrid"

export default function CoursePage() {
  const courses = [
    {
      id: 1,
      title: "React Basics",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
      duration: "6 jam",
      lessons: 12,
      students: 345,
      rating: 4.8,
      instructor: "John Doe",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
      duration: "12 jam",
      lessons: 18,
      students: 298,
      rating: 4.9,
      instructor: "Jane Smith",
    },
    {
      id: 3,
      title: "Python for Data Science",
      category: "Data Science",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60",
      duration: "10 jam",
      lessons: 15,
      students: 402,
      rating: 4.7,
      instructor: "Mike Johnson",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
      duration: "8 jam",
      lessons: 10,
      students: 156,
      rating: 4.6,
      instructor: "Sarah Wilson",
    },
    {
      id: 5,
      title: "Node.js Backend Development",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
      duration: "14 jam",
      lessons: 20,
      students: 289,
      rating: 4.8,
      instructor: "David Brown",
    },
    {
      id: 6,
      title: "Mobile App with Flutter",
      category: "Mobile Dev",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
      duration: "16 jam",
      lessons: 24,
      students: 178,
      rating: 4.7,
      instructor: "Emily Chen",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <DashboardCourseHeader />
      <DashboardCourseGrid courses={courses} />
    </div>
  )
}

CoursePage.layout = (page) => <DashboardLayout children={page} />
