import React from "react"
import { Link } from "@inertiajs/react"
import { Card, CardContent } from "@/components/ui/card"
import { PriceText } from "@/atoms/PriceText"
import { formatPriceIDR } from "@/lib/formatters"

export function CourseCard({
  id,
  uuid,
  slug,
  title,
  image,
  category,
  price,
  description,
}) {
  const maxChars = 90
  const rawDescription = (description && description.trim()) || ""
  const shortDescription =
    rawDescription.length > maxChars
      ? `${rawDescription.slice(0, maxChars).trim()}...`
      : rawDescription

  const href = uuid && slug ? `/course/${uuid}/${slug}` : `/course/${id}`

  return (
    <Link href={href} className="block h-full">
      <Card className="group overflow-hidden border border-slate-200/80 bg-white hover:border-blue-200 hover:shadow-2xl transition-all duration-300 py-0 h-full">
        <div className="relative h-44 overflow-hidden bg-slate-50">
          <img
            src={image || "/images/placeholder.svg"}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-white/70 to-slate-100/90" />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
              {category}
            </span>
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="text-sm font-semibold text-blue-700/80">Course</div>
            <h3 className="text-xl md:text-2xl font-bold text-blue-800 leading-snug line-clamp-2">
              {title}
            </h3>
          </div>
        </div>

        <CardContent className="p-4">
          {shortDescription ? (
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {shortDescription}
            </p>
          ) : (
            <p className="text-sm text-red-400 italic line-clamp-2 mb-3">
              belum ada deskripsi
            </p>
          )}
          <div className="flex items-center justify-between">
            <PriceText>{formatPriceIDR(price)}</PriceText>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
