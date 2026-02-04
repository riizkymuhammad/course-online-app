import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SliderNavButtons({ onPrev, onNext }) {
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-md hidden md:flex"
        onClick={onPrev}
        type="button"
      >
        <ChevronLeft className="w-5 h-5 text-primary" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-md hidden md:flex"
        onClick={onNext}
        type="button"
      >
        <ChevronRight className="w-5 h-5 text-primary" />
      </Button>
    </>
  )
}
