import React, { useMemo, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout"
import { Users as UsersIcon } from "lucide-react";
import { PageHeader } from "@/molecules/PageHeader";
import { ActionBar } from "@/molecules/ActionBar";
import { UsersTable } from "@/organisms/UserTable";
import { PaginationBar } from "@/components/dashboard/PaginationBar";

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

  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const pagination = {
    current_page: page,
    last_page: totalPages,
    per_page: perPage,
    total: filtered.length,
    from: filtered.length === 0 ? 0 : (page - 1) * perPage + 1,
    to: Math.min(page * perPage, filtered.length),
  };

  React.useEffect(() => {
    setPage(1);
  }, [q]);

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <PageHeader
        title="Manajemen Pengguna"
        subtitle="Kelola dan pantau semua pengguna platform Anda"
        icon={UsersIcon}
      />

      <ActionBar
        searchPlaceholder="Cari pengguna..."
        searchValue={q}
        buttonLabel="Tambah Pengguna"
        onSearchChange={setQ}
        onAdd={() => console.log("Tambah pengguna")}
      />

      <UsersTable
        users={paginatedUsers}
        onView={(u) => console.log("View:", u)}
        onEdit={(u) => console.log("Edit:", u)}
        onDelete={(u) => console.log("Delete:", u)}
      />

      <PaginationBar
        pagination={pagination}
        itemLabel="pengguna"
        onPageChange={setPage}
      />
    </div>
  );
}

UsersIndex.layout = (page) => <DashboardLayout children={page} />
