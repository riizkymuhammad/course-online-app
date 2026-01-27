import React, { useMemo } from "react"
import { Navbar } from "@/organisms/Navbar"
import { Footer } from "@/organisms/Footer"

import { CourseHeader } from "@/organisms/CourseHeader"
import { PurchaseCard } from "@/organisms/PurchaseCard"
import { CourseContentAccordion } from "@/organisms/CourseContentAccordion"
import { CourseFeaturesGrid } from "@/organisms/CourseFeaturesGrid"
import { RelatedCoursesSection } from "@/organisms/RelatedCoursesSection"

import { Instagram, Facebook, Youtube, Twitter } from "lucide-react"

/* =====================================================
   DATA (SEMUA DI COURSE PAGE)
===================================================== */

const coursesData = {
  "1": {
    id: "1",
    title: "Complete TOEFL Preparation - Score 550+",
    description:
      "Persiapan lengkap untuk ujian TOEFL dengan materi komprehensif meliputi Reading, Listening, Speaking, dan Writing. Kursus ini dirancang oleh instruktur berpengalaman dengan track record siswa yang berhasil mencapai skor 550+. Dilengkapi dengan simulasi ujian dan pembahasan detail untuk setiap jenis soal.",
    image: "https://picsum.photos/seed/toefl/1200/700",
    category: "Bahasa Inggris",
    price: 299000,
    totalSections: 8,
    totalModules: 45,
    duration: "24 jam",
    students: 1250,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    features: [
      "Akses seumur hidup",
      "Sertifikat penyelesaian",
      "45 video pembelajaran",
      "10 simulasi ujian",
      "Forum diskusi",
      "Konsultasi dengan instruktur",
    ],
    sections: [
      {
        id: "s1",
        title: "Introduction to TOEFL",
        modules: [
          { id: "m1", title: "Apa itu TOEFL?", duration: "15 menit", type: "video" },
          { id: "m2", title: "Struktur Ujian TOEFL", duration: "20 menit", type: "video" },
          { id: "m3", title: "Tips Persiapan Umum", duration: "25 menit", type: "video" },
        ],
      },
      {
        id: "s2",
        title: "Reading Comprehension",
        modules: [
          { id: "m4", title: "Strategi Membaca Cepat", duration: "30 menit", type: "video" },
          { id: "m5", title: "Memahami Main Idea", duration: "25 menit", type: "video" },
          { id: "m6", title: "Inference Questions", duration: "30 menit", type: "video" },
          { id: "m7", title: "Vocabulary in Context", duration: "20 menit", type: "video" },
          { id: "m8", title: "Latihan Reading Section", duration: "45 menit", type: "quiz" },
        ],
      },
    ],
  },

  "2": {
    id: "2",
    title: "Persiapan CPNS 2026 - Paket Lengkap TWK TIU TKP",
    description:
      "Paket persiapan CPNS terlengkap dengan materi TWK (Tes Wawasan Kebangsaan), TIU (Tes Intelegensia Umum), dan TKP (Tes Karakteristik Pribadi). Dilengkapi dengan tryout nasional dan pembahasan soal-soal tahun sebelumnya.",
    image: "https://picsum.photos/seed/cpns/1200/700",
    category: "CPNS",
    price: 399000,
    totalSections: 6,
    totalModules: 52,
    duration: "32 jam",
    students: 2340,
    rating: 4.9,
    instructor: "Tim Pengajar CPNS Expert",
    features: [
      "Akses seumur hidup",
      "Sertifikat penyelesaian",
      "52 video pembelajaran",
      "15 tryout nasional",
      "Grup diskusi eksklusif",
      "Update materi terbaru",
    ],
    sections: [
      {
        id: "s1",
        title: "Pengenalan CPNS",
        modules: [
          { id: "m1", title: "Sistem Seleksi CPNS 2026", duration: "20 menit", type: "video" },
          { id: "m2", title: "Passing Grade & Strategi", duration: "25 menit", type: "video" },
        ],
      },
      {
        id: "s2",
        title: "TWK - Tes Wawasan Kebangsaan",
        modules: [
          { id: "m3", title: "Pancasila", duration: "45 menit", type: "video" },
          { id: "m4", title: "UUD 1945", duration: "40 menit", type: "video" },
          { id: "m5", title: "NKRI & Bhinneka Tunggal Ika", duration: "35 menit", type: "video" },
          { id: "m6", title: "Sejarah Indonesia", duration: "50 menit", type: "video" },
          { id: "m7", title: "Latihan Soal TWK", duration: "60 menit", type: "quiz" },
        ],
      },
    ],
  },
}

const defaultCourse = {
  id: "default",
  title: "Kursus Pembelajaran Online",
  description:
    "Kursus pembelajaran online dengan materi lengkap dan terstruktur untuk membantu Anda mencapai tujuan belajar. Dilengkapi dengan video pembelajaran berkualitas tinggi dan latihan soal interaktif.",
  image: "https://picsum.photos/seed/default/1200/700",
  category: "Umum",
  price: 199000,
  totalSections: 5,
  totalModules: 25,
  duration: "15 jam",
  students: 500,
  rating: 4.5,
  instructor: "Tim Pengajar",
  features: [
    "Akses seumur hidup",
    "Sertifikat penyelesaian",
    "Video pembelajaran HD",
    "Latihan soal",
    "Forum diskusi",
  ],
  sections: [
    {
      id: "s1",
      title: "Pendahuluan",
      modules: [
        { id: "m1", title: "Pengenalan Materi", duration: "15 menit", type: "video" },
        { id: "m2", title: "Tujuan Pembelajaran", duration: "10 menit", type: "video" },
      ],
    },
  ],
}

const allCourses = [
  { id: "1", title: "Complete TOEFL Preparation - Score 550+", image: "https://picsum.photos/seed/toefl-rel/900/600", category: "Bahasa Inggris", price: 299000 },
  { id: "2", title: "Persiapan CPNS 2026 - Paket Lengkap TWK TIU TKP", image: "https://picsum.photos/seed/cpns-rel/900/600", category: "CPNS", price: 399000 },
  { id: "3", title: "Matematika SMA Kelas 12 - Persiapan UN", image: "https://picsum.photos/seed/sma-rel/900/600", category: "SMA", price: 149000 },
  { id: "4", title: "UTBK SNBT 2026 - TPS & Literasi", image: "https://picsum.photos/seed/utbk-rel/900/600", category: "UTBK", price: 349000 },
  { id: "5", title: "Bahasa Indonesia SMP - Paket Lengkap", image: "https://picsum.photos/seed/smp-rel/900/600", category: "SMP", price: 99000 },
  { id: "6", title: "Matematika SD Kelas 6 - Persiapan UN", image: "https://picsum.photos/seed/sd-rel/900/600", category: "SD", price: 79000 },
  { id: "7", title: "IELTS Academic Preparation - Band 7+", image: "https://picsum.photos/seed/ielts-rel/900/600", category: "Bahasa Inggris", price: 449000 },
  { id: "8", title: "Fisika SMA - Mekanika dan Termodinamika", image: "https://picsum.photos/seed/physics-rel/900/600", category: "SMA", price: 179000 },
  { id: "9", title: "Speaking English Fluently - Conversation Course", image: "https://picsum.photos/seed/speaking-rel/900/600", category: "Bahasa Inggris", price: 199000 },
  { id: "10", title: "SKD CPNS - Tryout Nasional", image: "https://picsum.photos/seed/tryout-rel/900/600", category: "CPNS", price: 249000 },
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

const slugKategori = (label) => label.toLowerCase().replace(/\s+/g, "-")

/* =====================================================
   PAGE
===================================================== */

export default function Show({ id }) {
  // ✅ FIX: sekarang coursesData ada di file ini
  const course = coursesData[id] ? coursesData[id] : { ...defaultCourse, id }

  const relatedCourses = useMemo(() => {
    const rel = allCourses
      .filter((c) => c.category === course.category && c.id !== course.id)
      .slice(0, 4)

    if (rel.length >= 4) return rel

    const popular = allCourses
      .filter((c) => c.id !== course.id && !rel.find((r) => r.id === c.id))
      .slice(0, 4 - rel.length)

    return [...rel, ...popular]
  }, [course.category, course.id])

  const handleAddToCart = () => alert("Ditambahkan ke keranjang!")
  const handleBuyNow = () => alert("Menuju halaman pembayaran...")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <CourseHeader course={course} />

              {/* MOBILE PURCHASE */}
              <div className="lg:hidden">
                <PurchaseCard course={course} onBuyNow={handleBuyNow} onAddToCart={handleAddToCart} />
              </div>

              {/* COURSE CONTENT */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Materi Pembelajaran
                </h2>
                <CourseContentAccordion sections={course.sections} />
              </div>

              {/* WHAT YOU'LL LEARN */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  Yang Akan Anda Pelajari
                </h2>
                <CourseFeaturesGrid features={course.features} />
              </div>
            </div>

            {/* RIGHT (DESKTOP) */}
            <div className="hidden lg:block">
              <div className="sticky top-20">
                <PurchaseCard course={course} onBuyNow={handleBuyNow} onAddToCart={handleAddToCart} />
              </div>
            </div>
          </div>
        </div>

        <RelatedCoursesSection
          courses={relatedCourses}
          categorySlug={slugKategori(course.category)}
        />
      </main>

      <Footer footerSections={footerSections} socialLinks={socialLinks} />
    </div>
  )
}
