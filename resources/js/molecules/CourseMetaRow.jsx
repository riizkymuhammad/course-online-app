import React from "react"
import { Star, Users, Clock } from "lucide-react"

export function CourseMetaRow({ rating, students, duration }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="font-semibold text-foreground">{rating}</span>
        <span>rating</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Users className="w-4 h-4" />
        <span>{Number(students).toLocaleString("id-ID")} siswa</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{duration}</span>
      </div>
    </div>
  )
}
