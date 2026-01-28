import React, { useMemo, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout"
import { Users as UsersIcon } from "lucide-react";
import { PageHeader } from "@/molecules/PageHeader";
import { ActionBar } from "@/molecules/ActionBar";
import { UsersTable } from "@/organisms/UserTable";

export default function UsersIndex() {
  const [q, setQ] = useState("");

  const users = [
    { id: 1, name: "Ahmad Rizki", email: "ahmad@example.com", joinDate: "15 Jan 2024", status: "Active", courses: 3, avatar: "AR" },
    { id: 2, name: "Siti Nurhaliza", email: "siti@example.com", joinDate: "20 Feb 2024", status: "Active", courses: 5, avatar: "SN" },
    { id: 3, name: "Budi Santoso", email: "budi@example.com", joinDate: "10 Jan 2024", status: "Inactive", courses: 2, avatar: "BS" },
    { id: 4, name: "Eka Putri", email: "eka@example.com", joinDate: "05 Mar 2024", status: "Active", courses: 4, avatar: "EP" },
  ];

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return users;

    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword) ||
        u.status.toLowerCase().includes(keyword)
      );
    });
  }, [q]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <PageHeader
        title="Manajemen Pengguna"
        subtitle="Kelola dan pantau semua pengguna platform Anda"
        icon={UsersIcon}
      />

      <ActionBar
        searchPlaceholder="Cari pengguna..."
        buttonLabel="Tambah Pengguna"
        onSearchChange={setQ}
        onAdd={() => console.log("Tambah pengguna")}
      />

      <UsersTable
        users={filtered}
        onView={(u) => console.log("View:", u)}
        onEdit={(u) => console.log("Edit:", u)}
        onDelete={(u) => console.log("Delete:", u)}
      />
    </div>
  );
}

UsersIndex.layout = (page) => <DashboardLayout children={page} />