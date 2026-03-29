import React, { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { router } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader } from "@/molecules/PageHeader";
import { ActionBar } from "@/molecules/ActionBar";
import { ManagementQuestionTable } from "@/organisms/ManagementQuestionTable";
import { PaginationBar } from "@/components/dashboard/PaginationBar";

export default function ManagementQuestion({ questions = [], pagination = null, filters = {} }) {
  const [keyword, setKeyword] = useState(filters.search ?? "");
  const [rows, setRows] = useState(questions);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setRows(questions);
  }, [questions]);

  useEffect(() => {
    setKeyword(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.get(
        route("dashboard.management-questions"),
        { search: keyword || undefined, page: 1 },
        { preserveState: true, replace: true, preserveScroll: true }
      );
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [keyword]);

  const handleDelete = (question) => {
    if (!window.confirm(`Hapus soal "${question.title}"?`)) return;

    setRows((current) => current.filter((item) => item.id !== question.id));
  };

  const handlePageChange = (page) => {
    router.get(
      route("dashboard.management-questions"),
      { search: keyword || undefined, page },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <PageHeader
        title="Manajemen Tryout"
        subtitle="Kelola daftar tryout berdasarkan kategori, pemateri, dan status publikasi."
        icon={FileText}
      />

      <ActionBar
        searchPlaceholder="Cari judul tryout, kategori, pemateri, atau status..."
        searchValue={keyword}
        buttonLabel="Tambah Tryout"
        onSearchChange={setKeyword}
        onAdd={() => router.get("/dashboard/management-questions/create")}
      />

      <ManagementQuestionTable
        questions={rows}
        onView={(question) => router.get(`/dashboard/management-questions/${question.id}`)}
        onEdit={(question) => window.alert(`Edit soal "${question.title}" belum tersedia.`)}
        onDelete={handleDelete}
      />

      <PaginationBar
        pagination={pagination}
        itemLabel="soal"
        onPageChange={handlePageChange}
      />
    </div>
  );
}

ManagementQuestion.layout = (page) => <DashboardLayout children={page} />;
