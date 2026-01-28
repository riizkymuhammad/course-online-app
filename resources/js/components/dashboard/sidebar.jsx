import React from "react"
import { Link, usePage } from "@inertiajs/react"
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  Layers,
  Users,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* =========================
   MENU CONFIG
========================= */
const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Materi", href: "/dashboard/course", icon: BookOpen },
  { name: "Pembelajaran", href: "/dashboard/learning", icon: BookMarked },
  { name: "Profil", href: "/dashboard/profile", icon: User },
]

const managementItems = [
  { name: "Manajemen Materi", href: "/dashboard/materials", icon: Layers },
  { name: "Manajemen Pengguna", href: "/dashboard/users", icon: Users },
  { name: "Manajemen Pembelian", href: "/dashboard/purchases", icon: ShoppingCart },
]

function NavSection({ title, items, currentUrl }) {
  return (
    <div>
      <p className="px-4 mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const active =
            currentUrl === item.href ||
            (item.href !== "/dashboard" && currentUrl.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                active
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const { url } = usePage()

  const name = "Admin"
  const email = "admin@edukursus.com"

  const onLogout = () => {
    alert("Logout (UI dulu). Hubungkan ke route POST /logout.")
  }

  // tinggi kira-kira header kamu (px-6 py-4 + border)
  const headerHeight = 64

  return (
    <aside className="w-[300px] shrink-0 h-screen bg-white border-r border-slate-200/70 flex flex-col">
      {/* ===== HEADER (sticky) ===== */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/70 shadow-[0_6px_18px_rgba(15,23,42,0.06)]">
        <div className="px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white grid place-items-center font-bold shadow-lg shadow-blue-500/30">
              EK
            </div>
            <div className="min-w-0">
              <h1 className="text-[15px] font-bold text-slate-800 leading-tight">
                EduKursus
              </h1>
              <p className="text-[11px] text-slate-400">Admin Dashboard</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ===== NAV (ini yang scroll) ===== */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-8">
          <NavSection title="Menu Utama" items={menuItems} currentUrl={url} />
          <NavSection title="Manajemen" items={managementItems} currentUrl={url} />
        </div>
      </div>

      {/* ===== FOOTER (sticky bottom) ===== */}
      <div className="sticky bottom-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200/70">
        <div className="mx-3 my-3 rounded-2xl border border-slate-200/70 bg-white shadow-[0_-10px_28px_rgba(15,23,42,0.10)]">
          <div className="px-3 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white grid place-items-center font-bold text-xs">
              {name?.slice(0, 2)?.toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{name}</p>
              <p className="text-[11px] text-slate-500 truncate">{email}</p>
            </div>

            <Link
              href="/dashboard/profile"
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200/70 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition"
              aria-label="Profil"
              title="Profil"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
              aria-label="Keluar"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="h-[2px] w-full rounded-b-2xl bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-blue-500/60" />
        </div>
      </div>
    </aside>
  )
}
