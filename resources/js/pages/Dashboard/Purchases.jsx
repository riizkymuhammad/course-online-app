import { useMemo, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout"
import { ShoppingCart, Calendar, CreditCard, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { InvoiceBadge } from "@/atoms/InvoiceBadge";
import { PurchaseStatusBadge } from "@/atoms/PurhcaseStatusBadge";
import { PurchaseActions } from "@/atoms/PurchaseActions";
import { PurchaseBuyer } from "@/molecules/PurchaseBuyer";

export default function PurchasesIndex() {
  const [search, setSearch] = useState("");

  const purchases = [
    { id: "INV001", buyer: "Ahmad Rizki", course: "React Basics", amount: "Rp 299.000", date: "10 Mar 2024", status: "Completed", avatar: "AR" },
    { id: "INV002", buyer: "Siti Nurhaliza", course: "Python for Data Science", amount: "Rp 399.000", date: "09 Mar 2024", status: "Completed", avatar: "SN" },
    { id: "INV003", buyer: "Budi Santoso", course: "Advanced JavaScript", amount: "Rp 349.000", date: "09 Mar 2024", status: "Pending", avatar: "BS" },
  ];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return purchases.filter(
      (p) =>
        p.id.toLowerCase().includes(q) ||
        p.buyer.toLowerCase().includes(q) ||
        p.course.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Pembelian</h1>
        </div>
        <p className="text-slate-500 ml-12">
          Pantau dan kelola semua transaksi pembelian
        </p>
      </div>

      {/* ACTION BAR (sama pola dengan Users) */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Cari invoice atau pembeli..."
            className="pl-12 h-11 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button className="gap-2 h-11 rounded-xl">
          <Plus className="w-5 h-5" />
          Tambah Pembelian
        </Button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50/50">
              <th className="px-6 py-4 text-left text-sm font-semibold">Invoice</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Pembeli</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Kursus</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Jumlah</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b hover:bg-blue-50/30">
                <td className="px-6 py-4">
                  <InvoiceBadge id={p.id} />
                </td>

                <td className="px-6 py-4">
                  <PurchaseBuyer avatar={p.avatar} buyer={p.buyer} />
                </td>

                <td className="px-6 py-4 text-slate-600">{p.course}</td>

                <td className="px-6 py-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold">{p.amount}</span>
                </td>

                <td className="px-6 py-4 flex items-center gap-2 text-slate-500">
                  <Calendar className="w-4 h-4" />
                  {p.date}
                </td>

                <td className="px-6 py-4">
                  <PurchaseStatusBadge status={p.status} />
                </td>

                <td className="px-6 py-4">
                  <PurchaseActions />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

PurchasesIndex.layout = (page) => <DashboardLayout children={page} />
