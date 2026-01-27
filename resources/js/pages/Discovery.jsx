import React, { useEffect, useMemo, useState } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import {
  Menu,
  X,
  Search,
  GraduationCap,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ============================================
// DATA (pakai CDN gratis untuk gambar)
// ============================================

const allCourses = [
  { id: "1", title: "Complete TOEFL Preparation - Score 550+", image: "https://picsum.photos/seed/toefl/800/500", category: "Bahasa Inggris", price: 299000 },
  { id: "2", title: "Persiapan CPNS 2026 - Paket Lengkap TWK TIU TKP", image: "https://picsum.photos/seed/cpns/800/500", category: "CPNS", price: 399000 },
  { id: "3", title: "Matematika SMA Kelas 12 - Persiapan UN", image: "https://picsum.photos/seed/sma-math/800/500", category: "SMA", price: 149000 },
  { id: "4", title: "UTBK SNBT 2026 - TPS & Literasi", image: "https://picsum.photos/seed/utbk/800/500", category: "UTBK", price: 349000 },
  { id: "5", title: "Bahasa Indonesia SMP - Paket Lengkap", image: "https://picsum.photos/seed/smp-indo/800/500", category: "SMP", price: 99000 },
  { id: "6", title: "Matematika SD Kelas 6 - Persiapan UN", image: "https://picsum.photos/seed/sd-math/800/500", category: "SD", price: 79000 },
  { id: "7", title: "IELTS Academic Preparation - Band 7+", image: "https://picsum.photos/seed/ielts/800/500", category: "Bahasa Inggris", price: 449000 },
  { id: "8", title: "Fisika SMA - Mekanika dan Termodinamika", image: "https://picsum.photos/seed/physics/800/500", category: "SMA", price: 179000 },
  { id: "9", title: "Speaking English Fluently - Conversation Course", image: "https://picsum.photos/seed/speaking/800/500", category: "Bahasa Inggris", price: 199000 },
  { id: "10", title: "SKD CPNS - Tryout Nasional", image: "https://picsum.photos/seed/tryout/800/500", category: "CPNS", price: 249000 },
  { id: "11", title: "IPA SD Kelas 5 - Lengkap", image: "https://picsum.photos/seed/ipa/800/500", category: "SD", price: 69000 },
  { id: "12", title: "UTBK Penalaran Matematika", image: "https://picsum.photos/seed/utbk-math/800/500", category: "UTBK", price: 299000 },
]

const categories = [
  { id: "semua", label: "Semua" },
  { id: "bahasa-inggris", label: "Bahasa Inggris" },
  { id: "cpns", label: "CPNS" },
  { id: "sd", label: "SD" },
  { id: "smp", label: "SMP" },
  { id: "sma", label: "SMA" },
  { id: "utbk", label: "UTBK" },
]

const footerSections = [
  {
    title: "Kategori",
    links: [
      { label: "Bahasa Inggris", href: "/kategori/bahasa-inggris" },
      { label: "CPNS", href: "/kategori/cpns" },
      { label: "SD", href: "/kategori/sd" },
      { label: "SMP", href: "/kategori/smp" },
      { label: "SMA", href: "/kategori/sma" },
      { label: "UTBK", href: "/kategori/utbk" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Karir", href: "/karir" },
      { label: "Blog", href: "/blog" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
      { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    ],
  },
]

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
]

// ============================================
// HELPERS
// ============================================

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

// ============================================
// PAGE
// ============================================

export default function Discovery() {
  const { url } = usePage()
  const initialCategory = useMemo(() => {
    // url contoh: /discovery?kategori=cpns
    // fallback: baca dari window.location.search agar stabil
    return getQueryParam("kategori") || "semua"
  }, [url])

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState("all")

  // kalau query param berubah (misal user datang dari link /discovery?kategori=sd)
  useEffect(() => {
    const cat = getQueryParam("kategori") || "semua"
    setSelectedCategory(cat)
  }, [url])

  // Optional: sync kategori ke URL agar bisa di-refresh/share
  const syncCategoryToUrl = (categoryId) => {
    router.get(
      "/discovery",
      categoryId === "semua" ? {} : { kategori: categoryId },
      { preserveState: true, replace: true }
    )
  }

  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses]

    // Filter by category
    if (selectedCategory !== "semua") {
      const categoryLabel = categories.find((c) => c.id === selectedCategory)?.label
      filtered = filtered.filter(
        (course) => course.category.toLowerCase() === (categoryLabel || "").toLowerCase()
      )
    }

    // Search
    if (searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price filter
    if (priceRange !== "all") {
      if (priceRange === "under-100k") filtered = filtered.filter((c) => c.price < 100000)
      if (priceRange === "100k-300k") filtered = filtered.filter((c) => c.price >= 100000 && c.price <= 300000)
      if (priceRange === "above-300k") filtered = filtered.filter((c) => c.price > 300000)
    }

    // Sort
    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price)
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price)
    if (sortBy === "newest") filtered.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10))

    return filtered
  }, [selectedCategory, searchQuery, sortBy, priceRange])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EduKursus</span>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">Masuk</Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium">Daftar</Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <div className="flex flex-col gap-2">
                <Link href="/login" className="w-full">
                  <Button variant="ghost" className="w-full font-medium">Masuk</Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button className="w-full font-medium">Daftar</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        {/* CATEGORY NAVBAR */}
        <div className="border-b border-border bg-background sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.id)
                    syncCategoryToUrl(category.id) // opsional (biar url ikut berubah)
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari materi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>

              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
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

                <Select value={priceRange} onValueChange={setPriceRange}>
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

        {/* COURSE GRID */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Menampilkan <span className="font-semibold text-foreground">{filteredCourses.length}</span> materi
              </p>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredCourses.map((course) => (
                  <Link key={course.id} href={`/course/${course.id}`} className="block h-full">
                    <Card className="group overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 py-0 h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/fallback/800/500")}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white shadow-md">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {course.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{formatPrice(course.price)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Tidak ada materi yang ditemukan</p>
                <p className="text-muted-foreground text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">EduKursus</span>
              </Link>

              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                Platform pembelajaran online terbaik untuk mencapai tujuan akademik dan karir Anda.
              </p>

              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-foreground mb-4 text-sm">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center">© 2026 EduKursus. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
