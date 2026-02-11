import React, { useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/atoms/BrandLogo"
import { NavActions } from "@/molecules/NavActions"
import { MobileMenuToggle } from "@/molecules/MobileMenuToggle"
import { LayoutDashboard, LogOut } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { props } = usePage()
  const user = props?.auth?.user

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <BrandLogo />

          <NavActions />

          <MobileMenuToggle isOpen={isMenuOpen} onToggle={() => setIsMenuOpen((v) => !v)} />
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-2 pb-2 text-sm text-muted-foreground">
                    Halo, <span className="font-semibold text-foreground">{user.name || "User"}</span>
                  </div>
                  <div className="inline-flex w-full overflow-hidden rounded-lg border border-border/70 bg-white/80 shadow-sm">
                    <Button asChild variant="ghost" className="w-1/2 rounded-none gap-2 border-r border-border/70">
                      <Link href="/dashboard">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-1/2 rounded-none gap-2 text-red-600 hover:text-red-600 hover:bg-red-50"
                    >
                      <Link href="/logout" method="post">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="w-full">
                    <Button variant="ghost" className="w-full font-medium">Masuk</Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full font-medium">Daftar</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
