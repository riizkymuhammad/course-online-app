import React from "react"
import { Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogOut } from "lucide-react"

export function NavActions() {
  const { props } = usePage()
  const user = props?.auth?.user

  if (user) {
    const name = user.name || "User"
    const initials = name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

    return (
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-border/70 bg-white/80 px-3 py-1.5 shadow-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="leading-tight">
            <p className="text-xs text-muted-foreground">Halo,</p>
            <p className="text-sm font-semibold text-foreground line-clamp-1">{name}</p>
          </div>
        </div>

        <div className="inline-flex items-center rounded-lg border border-border/70 bg-white/80 shadow-sm overflow-hidden">
          <Button
            asChild
            variant="ghost"
            className="rounded-none gap-2 border-r border-border/70 hover:bg-primary/10"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="rounded-none gap-2 text-red-600 hover:text-red-600 hover:bg-red-50"
          >
            <Link href="/logout" method="post">
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    )
  }

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
