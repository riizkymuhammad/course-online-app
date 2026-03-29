import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/molecules/PageHeader";
import { ActionBar } from "@/molecules/ActionBar";
import { ManagementCourseTable } from "@/organisms/ManagementCourseTable";
import { router } from "@inertiajs/react";
import { PaginationBar } from "@/components/dashboard/PaginationBar";

export default function ManagementCourseIndex({ courses = [], pagination = null, filters = {} }) {
  const [q, setQ] = useState(filters.search ?? "");
  const isFirstRender = useRef(true);

  useEffect(() => {
    setQ(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.get(
        route("dashboard.management-course"),
        { search: q || undefined, page: 1 },
        { preserveState: true, replace: true, preserveScroll: true }
      );
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [q]);

  const handlePageChange = (page) => {
    router.get(
      route("dashboard.management-course"),
      { search: q || undefined, page },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <PageHeader
        title="Manajemen Course"
        subtitle="Kelola dan organisir semua course pembelajaran dengan mudah"
        icon={BookOpen}
      />

      <ActionBar
        searchPlaceholder="Cari course..."
        searchValue={q}
        buttonLabel="Tambah Course"
        onSearchChange={setQ}
        onAdd={() => router.get(route("dashboard.management-course.create"))}
      />

      <ManagementCourseTable
        courses={courses}
        onView={(course) =>
          router.get(
            route("dashboard.management-course.detail", {
              course: course.uuid || course.id,
              slug: course.slug || "detail",
            })
          )
        }
        onEdit={(course) =>
          router.get(
            route("dashboard.management-course.detail", {
              course: course.uuid || course.id,
              slug: course.slug || "detail",
            })
          )
        }
        onDelete={(course) => {
          if (!window.confirm(`Hapus kursus "${course.title}"?`)) return;
          router.delete(route("dashboard.management-course.destroy", course.uuid || course.id), {
            preserveScroll: true,
          });
        }}
      />

      <PaginationBar
        pagination={pagination}
        itemLabel="course"
        onPageChange={handlePageChange}
      />
    </div>
  );
}

ManagementCourseIndex.layout = (page) => <DashboardLayout children={page} />;
