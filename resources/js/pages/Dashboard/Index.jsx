import React from "react"
import DashboardLayout from "@/layouts/DashboardLayout"
import { BookOpen, Users, ShoppingCart, TrendingUp, ArrowUpRight, Sparkles } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function DashboardIndex() {
  const stats = [
    {
      title: "Total Materi",
      value: "156",
      description: "Materi pembelajaran tersedia",
      icon: BookOpen,
      trend: "+12%",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Pengguna",
      value: "2,847",
      description: "Pengguna aktif terdaftar",
      icon: Users,
      trend: "+8%",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Pembeli Bulan Ini",
      value: "428",
      description: "Pembelian dalam 30 hari terakhir",
      icon: ShoppingCart,
      trend: "+24%",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ]

  const managementMenus = [
    {
      title: "Manajemen Materi",
      description: "Kelola, tambah, dan edit materi pembelajaran",
      href: "/dashboard/materials",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Manajemen Pengguna",
      description: "Kelola data pengguna dan aktivitas",
      href: "/dashboard/users",
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Manajemen Pembelian",
      description: "Pantau transaksi dan pembayaran",
      href: "/dashboard/purchases",
      icon: ShoppingCart,
      color: "from-amber-500 to-amber-600",
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">Dashboard</h1>
        </div>
        <p className="text-slate-500 ml-12">
          Selamat datang kembali! Berikut ringkasan statistik platform Anda.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
            <p className="text-xs text-slate-400">{stat.description}</p>
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* Management */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-slate-100">
            <TrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Menu Manajemen</h2>
            <p className="text-sm text-slate-500">Kelola berbagai aspek platform Anda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {managementMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${menu.color} opacity-5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${menu.color} shadow-lg`}>
                    <menu.icon className="w-5 h-5 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {menu.title}
                </h3>
                <p className="text-sm text-slate-500">{menu.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Integrasi layout Inertia */
DashboardIndex.layout = (page) => <DashboardLayout children={page} />
