import React from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CourseCard } from "@/molecules/CourseCard"

export function RelatedCoursesSection({ courses, categorySlug }) {
  if (!courses?.length) return null

  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Materi Terkait</h2>
            <p className="text-sm text-muted-foreground mt-1">Kursus lain yang mungkin Anda suka</p>
          </div>

          <Link href={`/discovery?kategori=${categorySlug}`}>
            <Button variant="ghost" className="gap-2 font-medium">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((rc) => (
            <CourseCard key={rc.id} {...rc} />
          ))}
        </div>
      </div>
    </section>
  )
}
