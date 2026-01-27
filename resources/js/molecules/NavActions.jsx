import React from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

export function NavActions() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link href="/login">
        <Button variant="ghost" className="font-medium">Masuk</Button>
      </Link>
      <Link href="/register">
        <Button className="font-medium">Daftar</Button>
      </Link>
    </div>
  )
}
