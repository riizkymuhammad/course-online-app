import React from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenuToggle({ isOpen, onToggle }) {
  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggle} type="button">
      {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </Button>
  )
}
