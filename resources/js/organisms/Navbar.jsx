import React, { useState } from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/atoms/BrandLogo"
import { NavActions } from "@/molecules/NavActions"
import { MobileMenuToggle } from "@/molecules/MobileMenuToggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              <Link href="/masuk" className="w-full">
                <Button variant="ghost" className="w-full font-medium">Masuk</Button>
              </Link>
              <Link href="/daftar" className="w-full">
                <Button className="w-full font-medium">Daftar</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
