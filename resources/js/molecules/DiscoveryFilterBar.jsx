import React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input" // kalau ui kamu ada di Components/ui, ubah path
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DiscoveryFilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceChange,
}) {
  return (
    <div className="bg-muted/30 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari materi..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[160px] bg-background border-border">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Populer</SelectItem>
                <SelectItem value="newest">Terbaru</SelectItem>
                <SelectItem value="price-low">Harga Terendah</SelectItem>
                <SelectItem value="price-high">Harga Tertinggi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={onPriceChange}>
              <SelectTrigger className="w-[160px] bg-background border-border">
                <SelectValue placeholder="Harga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Harga</SelectItem>
                <SelectItem value="under-100k">Di bawah 100rb</SelectItem>
                <SelectItem value="100k-300k">100rb - 300rb</SelectItem>
                <SelectItem value="above-300k">Di atas 300rb</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
