import React from "react"
import { Link } from "@inertiajs/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/molecules/CourseCard"

export function CoursesSection({ courses }) {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Populer</h2>
            <p className="text-muted-foreground">Materi pilihan dengan kualitas terbaik</p>
          </div>

          <Link href="/discovery">
            <Button
              variant="ghost"
              className="text-primary hover:text-primary hover:bg-primary/10 font-medium gap-2 p-0 h-auto"
            >
              Lihat Semua Materi
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  )
}
