import React from "react"
import { Link } from "@inertiajs/react"
import { Card, CardContent } from "@/components/ui/card"
import { PriceText } from "@/atoms/PriceText"
import { formatPriceIDR } from "@/lib/formatters"

export function CourseCard({ id, title, image, category, price }) {
  return (
    <Link href={`/course/${id}`} className="block h-full">
      <Card className="group overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 py-0 h-full">
        <div className="relative h-44 overflow-hidden">
          <img
            src={image || "/images/placeholder.svg"}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white shadow-md">
              {category}
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <PriceText>{formatPriceIDR(price)}</PriceText>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
