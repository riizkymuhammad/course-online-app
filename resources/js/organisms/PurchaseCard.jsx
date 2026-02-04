import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingCart, Zap, User } from "lucide-react"
import { formatPriceIDR } from "@/lib/formatters"

export function PurchaseCard({ course, onBuyNow, onAddToCart }) {
  return (
    <Card className="overflow-hidden border border-border/50 bg-card shadow-xl">
      <div className="relative aspect-video hidden lg:block">
        <img
          src={course.image}
          alt={course.title}
          onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/fallback/1200/700")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <CardContent className="p-5 space-y-5">
        <div className="lg:text-left text-center">
          <p className="text-3xl font-bold text-primary">{formatPriceIDR(course.price)}</p>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-12 text-base font-semibold gap-2" onClick={onBuyNow} type="button">
            <Zap className="w-5 h-5" /> Beli Sekarang
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-base font-semibold gap-2 bg-transparent"
            onClick={onAddToCart}
            type="button"
          >
            <ShoppingCart className="w-5 h-5" /> Tambah ke Keranjang
          </Button>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-border/50">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Instruktur</p>
            <p className="text-sm font-semibold text-foreground">{course.instructor}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-border/50">
          <p className="text-sm font-semibold text-foreground mb-3">Termasuk:</p>
          <ul className="space-y-2">
            {course.features.slice(0, 5).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
