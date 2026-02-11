import React from "react"
import { CourseCard } from "@/molecules/CourseCard"

export function CourseGrid({ courses }) {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Menampilkan{" "}
            <span className="font-semibold text-foreground">{courses.length}</span>{" "}
            materi
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Tidak ada materi yang ditemukan</p>
            <p className="text-muted-foreground text-sm mt-2">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
