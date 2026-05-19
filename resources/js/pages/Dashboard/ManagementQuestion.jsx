import React, { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { router } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader } from "@/molecules/PageHeader";
import { ActionBar } from "@/molecules/ActionBar";
import { ManagementQuestionTable } from "@/organisms/ManagementQuestionTable";
import { PaginationBar } from "@/components/dashboard/PaginationBar";

const COPY = {
  tryout: {
    title: "Manajemen Tryout",
    subtitle:
      "Kelola daftar tryout berdasarkan kategori, pemateri, dan status publikasi. Tryout diposisikan sebagai simulasi evaluasi yang urutannya bisa diacak dan tidak harus selalu mengikuti alur materi.",
    searchPlaceholder: "Cari judul tryout, kategori, pemateri, atau status...",
    buttonLabel: "Tambah Tryout",
    itemLabel: "tryout",
    titleLabel: "Judul Tryout",
    deleteLabel: "tryout",
    indexRoute: "dashboard.management-questions",
    context: "tryout",
    detailUrl: (id) => `/dashboard/management-questions/${id}?context=tryout`,
    editUrl: (id) => `/dashboard/management-questions/${id}/edit?context=tryout`,
  },
  quiz: {
    title: "Manajemen Quiz",
    subtitle:
      "Kelola daftar quiz pembelajaran yang soal-soalnya diharapkan runtut, bertahap, dan tetap selaras dengan materi yang sedang dipelajari.",
    searchPlaceholder: "Cari judul quiz, kategori, pemateri, atau status...",
    buttonLabel: "Tambah Quiz",
    itemLabel: "quiz",
    titleLabel: "Judul Quiz",
    deleteLabel: "quiz",
    indexRoute: "dashboard.management-quiz",
    context: "quiz",
    createUrl: "/dashboard/management-quiz/create",
    detailUrl: (id) => `/dashboard/management-quiz/${id}`,
    editUrl: (id) => `/dashboard/management-quiz/${id}/edit`,
  },
};

export default function ManagementQuestion({
  questions = [],
  pagination = null,
  filters = {},
  context = "tryout",
}) {
  const copy = COPY[context] || COPY.tryout;
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
        route(copy.indexRoute),
        { search: keyword || undefined, page: 1 },
        { preserveState: true, replace: true, preserveScroll: true }
      );
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [keyword]);

  const handleDelete = (question) => {
    if (!window.confirm(`Hapus ${copy.deleteLabel} "${question.title}"?`)) return;

    setRows((current) => current.filter((item) => item.id !== question.id));
  };

  const handlePageChange = (page) => {
    router.get(
      route(copy.indexRoute),
      { search: keyword || undefined, page },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <PageHeader
        title={copy.title}
        subtitle={copy.subtitle}
        icon={FileText}
      />

      <ActionBar
        searchPlaceholder={copy.searchPlaceholder}
        searchValue={keyword}
        buttonLabel={copy.buttonLabel}
        onSearchChange={setKeyword}
        onAdd={() => router.get(copy.createUrl || `/dashboard/management-questions/create?context=${copy.context}`)}
      />

      <ManagementQuestionTable
        questions={rows}
        itemName={copy.itemLabel}
        titleLabel={copy.titleLabel}
        onView={(question) => router.get(copy.detailUrl(question.id))}
        onEdit={(question) => router.get(copy.editUrl(question.id))}
        onDelete={handleDelete}
      />

      <PaginationBar
        pagination={pagination}
        itemLabel={copy.itemLabel}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

ManagementQuestion.layout = (page) => <DashboardLayout children={page} />;
