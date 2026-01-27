import React, { useMemo, useState } from "react"
import { Link } from "@inertiajs/react"
import {
  Menu,
  X,
  GraduationCap,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  BookOpen,
  Layers,
  Clock,
  Users,
  Star,
  CheckCircle,
  ShoppingCart,
  Zap,
  User,
  PlayCircle,
  FileText,
  HelpCircle,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// ============================================
// DATA (pakai CDN gratis agar gambar langsung muncul)
// ============================================

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
  features: ["Akses seumur hidup", "Sertifikat penyelesaian", "Video pembelajaran HD", "Latihan soal", "Forum diskusi"],
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

// ============================================
// HELPERS
// ============================================

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value)

const getModuleIcon = (type) => {
  if (type === "video") return <PlayCircle className="w-4 h-4 text-primary" />
  if (type === "quiz") return <HelpCircle className="w-4 h-4 text-orange-500" />
  if (type === "practice") return <FileText className="w-4 h-4 text-green-500" />
  return <PlayCircle className="w-4 h-4 text-primary" />
}

const getModuleTypeLabel = (type) => {
  if (type === "video") return "Video"
  if (type === "quiz") return "Quiz"
  if (type === "practice") return "Latihan"
  return "Materi"
}

const slugKategori = (label) => label.toLowerCase().replace(/\s+/g, "-")

// ============================================
// PAGE
// ============================================

export default function Show({ id }) {
  const course = coursesData[id] ? coursesData[id] : { ...defaultCourse, id }
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const relatedCourses = useMemo(() => {
    const rel = allCourses.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 4)
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
              <Link href="/login"><Button variant="ghost" className="font-medium">Masuk</Button></Link>
              <Link href="/register"><Button className="font-medium">Daftar</Button></Link>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} type="button">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <div className="flex flex-col gap-2">
                <Link href="/login" className="w-full"><Button variant="ghost" className="w-full font-medium">Masuk</Button></Link>
                <Link href="/register" className="w-full"><Button className="w-full font-medium">Daftar</Button></Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white">
                  {course.category}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
                  {course.title}
                </h1>

                <p className="text-muted-foreground leading-relaxed">{course.description}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-foreground">{course.rating}</span>
                    <span>rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{Number(course.students).toLocaleString("id-ID")} siswa</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{course.totalSections}</p>
                        <p className="text-xs text-muted-foreground">Section</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{course.totalModules}</p>
                        <p className="text-xs text-muted-foreground">Modul</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-xl p-3 border border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{course.duration}</p>
                        <p className="text-xs text-muted-foreground">Durasi</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile image */}
                <div className="lg:hidden relative aspect-video rounded-xl overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/fallback/1200/700")}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>

              {/* MOBILE PURCHASE */}
              <div className="lg:hidden">
                <Card className="overflow-hidden border border-border/50 bg-card shadow-xl">
                  <CardContent className="p-5 space-y-5">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">{formatPrice(course.price)}</p>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full h-12 text-base font-semibold gap-2" onClick={handleBuyNow} type="button">
                        <Zap className="w-5 h-5" /> Beli Sekarang
                      </Button>
                      <Button variant="outline" className="w-full h-12 text-base font-semibold gap-2 bg-transparent" onClick={handleAddToCart} type="button">
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
              </div>

              {/* COURSE CONTENT */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Materi Pembelajaran</h2>
                <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <Accordion type="multiple" className="w-full" defaultValue={["s1"]}>
                    {course.sections.map((section, index) => (
                      <AccordionItem key={section.id} value={section.id} className="border-border/50">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-3 text-left">
                            <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-foreground">{section.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{section.modules.length} modul</p>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="px-5 pb-4">
                          <div className="space-y-2 pl-10">
                            {section.modules.map((module) => (
                              <div
                                key={module.id}
                                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  {getModuleIcon(module.type)}
                                  <div>
                                    <p className="text-sm font-medium text-foreground">{module.title}</p>
                                    <p className="text-xs text-muted-foreground">{getModuleTypeLabel(module.type)}</p>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                                  {module.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* WHAT YOU'LL LEARN */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Yang Akan Anda Pelajari</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT (DESKTOP) */}
            <div className="hidden lg:block">
              <div className="sticky top-20">
                <Card className="overflow-hidden border border-border/50 bg-card shadow-xl">
                  <div className="relative aspect-video">
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
                    <div className="text-left">
                      <p className="text-3xl font-bold text-primary">{formatPrice(course.price)}</p>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full h-12 text-base font-semibold gap-2" onClick={handleBuyNow} type="button">
                        <Zap className="w-5 h-5" /> Beli Sekarang
                      </Button>
                      <Button variant="outline" className="w-full h-12 text-base font-semibold gap-2 bg-transparent" onClick={handleAddToCart} type="button">
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
              </div>
            </div>
          </div>
        </div>

        {/* RELATED COURSES */}
        {relatedCourses.length > 0 && (
          <section className="py-10 md:py-14 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">Materi Terkait</h2>
                  <p className="text-sm text-muted-foreground mt-1">Kursus lain yang mungkin Anda suka</p>
                </div>

                <Link href={`/discovery?kategori=${slugKategori(course.category)}`}>
                  <Button variant="ghost" className="gap-2 font-medium">
                    Lihat Semua <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {relatedCourses.map((rc) => (
                  <Link key={rc.id} href={`/course/${rc.id}`} className="block h-full">
                    <Card className="group overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 py-0 h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={rc.image}
                          alt={rc.title}
                          onError={(e) => (e.currentTarget.src = "https://picsum.photos/seed/fallback/900/600")}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-white shadow-md">
                            {rc.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                          {rc.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{formatPrice(rc.price)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
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
