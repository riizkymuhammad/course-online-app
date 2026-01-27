import React, { useCallback, useEffect, useState } from "react"
import { Link } from "@inertiajs/react"
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
  Award,
  MessageCircle,
  ArrowRight,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Languages,
  FileText,
  School,
  BookOpen,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// ============================================
// DATA
// ============================================

const slides = [
  {
    id: 1,
    title: "Diskon 50% Semua Kursus!",
    subtitle: "Promo Spesial Tahun Baru - Berlaku hingga 31 Januari 2026",
    cta: "Ambil Promo",
    icon: Sparkles,
    gradient: "from-primary to-accent",
  },
  {
    id: 2,
    title: "Kursus CPNS 2026 Dibuka!",
    subtitle: "Persiapkan dirimu dengan materi terlengkap dan tryout berkala",
    cta: "Daftar Sekarang",
    icon: Award,
    gradient: "from-accent to-primary",
  },
  {
    id: 3,
    title: "Gratis Tryout UTBK",
    subtitle: "Latihan soal UTBK dengan pembahasan lengkap dari mentor berpengalaman",
    cta: "Mulai Tryout",
    icon: GraduationCap,
    gradient: "from-primary to-accent",
  },
]

const categories = [
  {
    title: "Bahasa Inggris",
    description: "TOEFL, IELTS, dan percakapan sehari-hari",
    icon: "languages",
    href: "/discovery?kategori=bahasa-inggris",
    courseCount: 24,
  },
  {
    title: "CPNS",
    description: "Persiapan tes CPNS lengkap dengan tryout",
    icon: "cpns",
    href: "/discovery?kategori=cpns",
    courseCount: 18,
  },
  {
    title: "SD",
    description: "Matematika, IPA, Bahasa Indonesia",
    icon: "school",
    href: "/discovery?kategori=sd",
    courseCount: 32,
  },
  {
    title: "SMP",
    description: "Semua mata pelajaran kurikulum SMP",
    icon: "school",
    href: "/discovery?kategori=smp",
    courseCount: 28,
  },
  {
    title: "SMA",
    description: "IPA, IPS, dan persiapan ujian nasional",
    icon: "school",
    href: "/discovery?kategori=sma",
    courseCount: 45,
  },
  {
    title: "UTBK",
    description: "Persiapan UTBK SNBT dengan tryout",
    icon: "graduation",
    href: "/discovery?kategori=utbk",
    courseCount: 20,
  },
]

const courses = [
  {
    id: "1",
    title: "Complete TOEFL Preparation - Score 550+",
    image: "https://picsum.photos/seed/toefl/800/500",
    category: "Bahasa Inggris",
    price: 299000,
  },
  {
    id: "2",
    title: "Persiapan CPNS 2026 - Paket Lengkap TWK TIU TKP",
    image: "https://picsum.photos/seed/cpns/800/500",
    category: "CPNS",
    price: 399000,
  },
  {
    id: "3",
    title: "Matematika SMA Kelas 12 - Persiapan UN",
    image: "https://picsum.photos/seed/sma-math/800/500",
    category: "SMA",
    price: 149000,
  },
  {
    id: "4",
    title: "UTBK SNBT 2026 - TPS & Literasi",
    image: "https://picsum.photos/seed/utbk/800/500",
    category: "UTBK",
    price: 349000,
  },
  {
    id: "5",
    title: "Bahasa Indonesia SMP - Paket Lengkap",
    image: "https://picsum.photos/seed/smp/800/500",
    category: "SMP",
    price: 99000,
  },
  {
    id: "6",
    title: "Matematika SD Kelas 6 - Persiapan UN",
    image: "https://picsum.photos/seed/sd/800/500",
    category: "SD",
    price: 79000,
  },
  {
    id: "7",
    title: "IELTS Academic Preparation - Band 7+",
    image: "https://picsum.photos/seed/ielts/800/500",
    category: "Bahasa Inggris",
    price: 449000,
  },
  {
    id: "8",
    title: "Fisika SMA - Mekanika dan Termodinamika",
    image: "https://picsum.photos/seed/physics/800/500",
    category: "SMA",
    price: 179000,
  },
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
// ICON MAP
// ============================================

const iconMap = {
  languages: Languages,
  cpns: FileText,
  school: School,
  graduation: GraduationCap,
  book: BookOpen,
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Welcome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const whatsappNumber = "6281234567890"
  const whatsappMessage = encodeURIComponent("Halo, saya ingin konsultasi mengenai kursus yang tersedia.")
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EduKursus</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-medium">Daftar</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
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

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/50">
              <div className="flex flex-col gap-2">
                <Link href="/masuk" className="w-full">
                  <Button variant="ghost" className="w-full font-medium">
                    Masuk
                  </Button>
                </Link>
                <Link href="/daftar" className="w-full">
                  <Button className="w-full font-medium">Daftar</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        {/* HERO SLIDER */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="relative">
              {/* Cards Container */}
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
                            {/* Icon */}
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                              <slide.icon className="w-10 h-10 md:w-14 md:h-14 text-white" />
                            </div>

                            {/* Content */}
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

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-md hidden md:flex"
                onClick={prevSlide}
                type="button"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-md hidden md:flex"
                onClick={nextSlide}
                type="button"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    type="button"
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-primary w-8" : "bg-primary/30 w-2 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Kategori Pembelajaran</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Pilih kategori sesuai kebutuhan belajar Anda</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon] || BookOpen
                return (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="group flex flex-col items-center p-5 rounded-xl border border-border/50 bg-card hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-card-foreground mb-1 text-center">{category.title}</h3>
                    <span className="text-xs text-muted-foreground">{category.courseCount} Materi</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* COURSES SECTION */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Populer</h2>
                <p className="text-muted-foreground">Materi pilihan dengan kualitas terbaik</p>
              </div>

              <Link href="/discovery">
                <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 font-medium gap-2 p-0 h-auto">
                  Lihat Semua Materi
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {courses.map((course) => (
                <Link key={course.id} href={`/course/${course.id}`} className="block h-full">
                  <Card className="group overflow-hidden border border-border/50 bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 py-0 h-full">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={course.image || "/images/placeholder.svg"}
                        alt={course.title}
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
          </div>
        </section>

        {/* WHATSAPP CTA */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Butuh Bantuan?</h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">Tim kami siap membantu Anda memilih materi yang tepat sesuai kebutuhan</p>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 shadow-lg">
                  Hubungi via WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-card border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            {/* Logo & Description */}
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

            {/* Links Sections */}
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

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground text-center">© 2026 EduKursus. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
