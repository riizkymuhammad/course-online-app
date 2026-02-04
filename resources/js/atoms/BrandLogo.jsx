import React from "react"
import { Link } from "@inertiajs/react"
import { GraduationCap } from "lucide-react"

export function BrandLogo({ href = "/", label = "EduKursus" }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
        <GraduationCap className="w-5 h-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground">{label}</span>
    </Link>
  )
}
