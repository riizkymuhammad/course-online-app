import React from "react"
import { Link, usePage } from "@inertiajs/react"
import {
  BookOpen,
  Users,
  ShoppingCart,
  LayoutDashboard,
  BookMarked,
  User,
  LogOut,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Materi", href: "/dashboard/materi", icon: BookOpen },
  { name: "Pembelajaran", href: "/dashboard/learning", icon: BookMarked },
  { name: "Profil", href: "/dashboard/profile", icon: User },
]

const managementItems = [
  { name: "Manajemen Materi", href: "/dashboard/materials", icon: Layers },
  { name: "Manajemen Pengguna", href: "/dashboard/users", icon: Users },
  { name: "Manajemen Pembelian", href: "/dashboard/purchases", icon: ShoppingCart },
]

export function DashboardSidebar({
  isOpen = true,
  onToggle = () => {},
  onClose = () => {},
}) {
  const { url } = usePage()

  const name = "Admin"
  const email = "admin@edukursus.com"
  const initials = "AE"

  const handleLogout = () => {
    // TODO: Hubungkan ke Inertia post('/logout') jika sudah siap
    console.log("Logout clicked")
  }

  const isActive = (href) => {
    if (url === href) return true
    if (href === "/dashboard") return url === "/dashboard"
    return url.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "bg-white border-r border-slate-200 flex flex-col h-screen transition-all duration-300 ease-in-out",
        isOpen ? "w-72" : "w-20"
      )}
    >
      {/* Header */}
      <div className="px-4 py-5 flex items-center justify-between border-b border-slate-200">
        {isOpen && (
          <Link href="/dashboard" className="flex items-center gap-3 flex-1 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              EK
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-900">EduKursus</h1>
            </div>
          </Link>
        )}

        <button
          type="button"
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all ml-auto flex-shrink-0"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 py-5 overflow-y-auto space-y-5">
        {/* Main Menu */}
        <div>
          {isOpen && (
            <p className="px-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Menu
            </p>
          )}
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!isOpen ? item.name : undefined}
                  onClick={onClose} // agar mobile bisa auto-close bila dipakai
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                    active
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="truncate">{item.name}</span>}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Management Menu */}
        <div>
          {isOpen && (
            <p className="px-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Manajemen
            </p>
          )}
          <div className="space-y-1">
            {managementItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!isOpen ? item.name : undefined}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                    active
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="truncate">{item.name}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Footer Card */}
      <div className="px-2.5 py-4 border-t border-slate-200">
        {isOpen ? (
          <div className="px-3.5 py-3 rounded-xl border border-blue-200/70 bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white grid place-items-center font-bold text-xs flex-shrink-0 shadow-md shadow-blue-500/20">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{name}</p>
                <p className="text-[11px] text-slate-500 truncate">{email}</p>
              </div>

              <Link
                href="/dashboard/profile"
                className={cn(
                  "inline-flex items-center justify-center w-10 h-10 rounded-xl",
                  "border border-blue-200 bg-white",
                  "text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                )}
                aria-label="Profil"
                title="Profil"
              >
                <User className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className={cn(
                  "inline-flex items-center justify-center w-10 h-10 rounded-xl",
                  "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all",
                  "shadow-md shadow-blue-500/20 hover:shadow-blue-500/40",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                )}
                aria-label="Keluar"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/profile"
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 rounded-lg mx-auto",
                "border border-blue-200 bg-white",
                "text-blue-600 hover:bg-blue-50 transition-all",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              )}
              aria-label="Profil"
              title="Profil"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                "inline-flex items-center justify-center w-10 h-10 rounded-lg mx-auto",
                "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all",
                "shadow-md shadow-blue-500/20 hover:shadow-blue-500/40",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
              )}
              aria-label="Keluar"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
