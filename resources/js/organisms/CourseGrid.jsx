import React from "react"
import { Link } from "@inertiajs/react"
import { Card, CardContent } from "@/components/ui/card"
import { formatPriceIDR } from "@/lib/formatters"

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
              <Link key={course.id} href={`/course/${course.id}`} className="block h-full">
                <Card className="group overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 py-0 h-full">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/fallback/800/500")}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white shadow-md">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {formatPriceIDR(course.price)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
