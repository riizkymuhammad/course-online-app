import React, { useEffect, useMemo, useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

import { Navbar } from "@/organisms/Navbar"
import { Footer } from "@/organisms/Footer"
import { CategoryPills } from "@/molecules/CategoryPills"
import { DiscoveryFilterBar } from "@/molecules/DiscoveryFilterBar"
import { CourseGrid } from "@/organisms/CourseGrid"

/* =========================
   DATA
========================= */

const buildCourseImage = (title, category) => {
  const params = new URLSearchParams({ title, category })
  return `/course-image?${params.toString()}`
}

const allCourses = [
  { id: "1", title: "Complete TOEFL Preparation - Score 550+", description: "Persiapan TOEFL lengkap dengan latihan dan simulasi ujian.", category: "Bahasa Inggris", price: 299000 },
  { id: "2", title: "Persiapan CPNS 2026 - Paket Lengkap TWK TIU TKP", description: "Materi CPNS terstruktur plus tryout nasional.", category: "CPNS", price: 399000 },
  { id: "3", title: "Matematika SMA Kelas 12 - Persiapan UN", description: "Ringkasan konsep dan latihan soal UN Matematika.", category: "SMA", price: 149000 },
  { id: "4", title: "UTBK SNBT 2026 - TPS & Literasi", description: "Strategi TPS & literasi dengan pembahasan soal.", category: "UTBK", price: 349000 },
  { id: "5", title: "Bahasa Indonesia SMP - Paket Lengkap", description: "Materi bahasa Indonesia lengkap dan mudah dipahami.", category: "SMP", price: 99000 },
  { id: "6", title: "Matematika SD Kelas 6 - Persiapan UN", description: "Latihan intensif untuk persiapan UN SD.", category: "SD", price: 79000 },
  { id: "7", title: "IELTS Academic Preparation - Band 7+", description: "Fokus listening, reading, writing, speaking IELTS.", category: "Bahasa Inggris", price: 449000 },
  { id: "8", title: "Fisika SMA - Mekanika dan Termodinamika", description: "Penjelasan konsep + latihan soal fisika SMA.", category: "SMA", price: 179000 },
  { id: "9", title: "Speaking English Fluently - Conversation Course", description: "Latihan speaking dengan metode percakapan.", category: "Bahasa Inggris", price: 199000 },
  { id: "10", title: "SKD CPNS - Tryout Nasional", description: "Simulasi SKD CPNS dan pembahasan lengkap.", category: "CPNS", price: 249000 },
  { id: "11", title: "IPA SD Kelas 5 - Lengkap", description: "IPA SD lengkap dengan contoh dan latihan.", category: "SD", price: 69000 },
  { id: "12", title: "UTBK Penalaran Matematika", description: "Kumpulan soal penalaran matematika UTBK.", category: "UTBK", price: 299000 },
].map((course) => ({
  ...course,
  image: buildCourseImage(course.title, course.category),
}))

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

/* =========================
   HELPERS
========================= */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

/* =========================
   PAGE
========================= */
export default function Discovery() {
  const { url } = usePage()

  const initialCategory = useMemo(() => {
    return getQueryParam("kategori") || "semua"
  }, [url])

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [priceRange, setPriceRange] = useState("all")

  useEffect(() => {
    const cat = getQueryParam("kategori") || "semua"
    setSelectedCategory(cat)
  }, [url])

  const syncCategoryToUrl = (categoryId) => {
    router.get(
      "/discovery",
      categoryId === "semua" ? {} : { kategori: categoryId },
      { preserveState: true, replace: true }
    )
  }

  const filteredCourses = useMemo(() => {
    let filtered = [...allCourses]

    if (selectedCategory !== "semua") {
      const categoryLabel = categories.find((c) => c.id === selectedCategory)?.label
      filtered = filtered.filter(
        (course) => course.category.toLowerCase() === (categoryLabel || "").toLowerCase()
      )
    }

    if (searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (priceRange !== "all") {
      if (priceRange === "under-100k") filtered = filtered.filter((c) => c.price < 100000)
      if (priceRange === "100k-300k") filtered = filtered.filter((c) => c.price >= 100000 && c.price <= 300000)
      if (priceRange === "above-300k") filtered = filtered.filter((c) => c.price > 300000)
    }

    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price)
    if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price)
    if (sortBy === "newest") filtered.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10))

    return filtered
  }, [selectedCategory, searchQuery, sortBy, priceRange])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <CategoryPills
          categories={categories}
          selected={selectedCategory}
          onSelect={(id) => {
            setSelectedCategory(id)
            syncCategoryToUrl(id)
          }}
        />

        <DiscoveryFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
        />

        <CourseGrid courses={filteredCourses} />
      </main>

      <Footer footerSections={footerSections} socialLinks={socialLinks} />
    </div>
  )
}
