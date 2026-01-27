import React from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { formatPriceIDR } from "@/lib/formatters"

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
            <Link key={rc.id} href={`/course/${rc.id}`} className="block h-full">
              <Card className="group overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 py-0 h-full">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={rc.image}
                    alt={rc.title}
                    onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/fallback/900/600")}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white shadow-md">
                      {rc.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {rc.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{formatPriceIDR(rc.price)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
