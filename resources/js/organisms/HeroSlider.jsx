import React, { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DotIndicator } from "@/atoms/DotIndicator"
import { SliderNavButtons } from "@/molecules/SliderNavButtons"

export function HeroSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0 px-1">
                  <Card className={`relative overflow-hidden bg-gradient-to-br ${slide.gradient} border-0 shadow-lg`}>
                    <div className="p-8 md:p-12 lg:p-16">
                      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                          <slide.icon className="w-10 h-10 md:w-14 md:h-14 text-white" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance">
                            {slide.title}
                          </h2>
                          <p className="text-white/90 text-base md:text-lg mb-6 text-pretty max-w-xl">
                            {slide.subtitle}
                          </p>
                          <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-md">
                            {slide.cta}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <SliderNavButtons onPrev={prevSlide} onNext={nextSlide} />

          <DotIndicator
            total={slides.length}
            activeIndex={currentSlide}
            onSelect={(index) => setCurrentSlide(index)}
          />
        </div>
      </div>
    </section>
  )
}
