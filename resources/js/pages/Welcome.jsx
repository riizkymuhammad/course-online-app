import React from "react"
import {
  Sparkles,
  GraduationCap,
  Award,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react"

import { Navbar } from "@/organisms/Navbar"
import { HeroSlider } from "@/organisms/HeroSlider"
import { CategoriesSection } from "@/organisms/CategoriesSection"
import { CoursesSection } from "@/organisms/CoursesSection"
import { WhatsAppCTA } from "@/organisms/WhatsAppCTA"
import { Footer } from "@/organisms/Footer"

/* =====================================================
   DATA (SEMUA DI WELCOME)
===================================================== */

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
    subtitle: "Latihan soal UTBK dengan pembahasan lengkap",
    cta: "Mulai Tryout",
    icon: GraduationCap,
    gradient: "from-primary to-accent",
  },
]

const categories = [
  { title: "Bahasa Inggris", icon: "languages", href: "/discovery?kategori=bahasa-inggris", courseCount: 24 },
  { title: "CPNS", icon: "cpns", href: "/discovery?kategori=cpns", courseCount: 18 },
  { title: "SD", icon: "school", href: "/discovery?kategori=sd", courseCount: 32 },
  { title: "SMP", icon: "school", href: "/discovery?kategori=smp", courseCount: 28 },
  { title: "SMA", icon: "school", href: "/discovery?kategori=sma", courseCount: 45 },
  { title: "UTBK", icon: "graduation", href: "/discovery?kategori=utbk", courseCount: 20 },
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
    title: "Persiapan CPNS 2026 - Paket Lengkap",
    image: "https://picsum.photos/seed/cpns/800/500",
    category: "CPNS",
    price: 399000,
  },
  {
    id: "3",
    title: "Matematika SMA Kelas 12",
    image: "https://picsum.photos/seed/sma/800/500",
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

/* =====================================================
   PAGE
===================================================== */

export default function Welcome() {
  const whatsappNumber = "6281234567890"
  const whatsappMessage = encodeURIComponent(
    "Halo, saya ingin konsultasi mengenai kursus yang tersedia."
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSlider slides={slides} />
        <CategoriesSection categories={categories} />
        <CoursesSection courses={courses} />
        <WhatsAppCTA whatsappLink={whatsappLink} />
      </main>

      <Footer
        footerSections={footerSections}
        socialLinks={socialLinks}
      />
    </div>
  )
}
