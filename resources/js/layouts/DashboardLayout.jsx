import React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
