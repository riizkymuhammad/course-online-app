import React, { useMemo, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/molecules/PageHeader";
import { ActionBar } from "@/molecules/ActionBar";
import { ManagementCourseTable } from "@/organisms/ManagementCourseTable";
import { router } from "@inertiajs/react";

export default function ManagementCourseIndex({ courses = [] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return courses;

    return courses.filter((c) => {
      const categoryLabel = Array.isArray(c.categories) && c.categories.length > 0
        ? c.categories.map((cat) => cat.name).join(", ")
        : "";

      return (
        c.title.toLowerCase().includes(keyword) ||
        categoryLabel.toLowerCase().includes(keyword) ||
        c.status.toLowerCase().includes(keyword)
      );
    });
  }, [q, courses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <PageHeader
        title="Manajemen Course"
        subtitle="Kelola dan organisir semua course pembelajaran dengan mudah"
        icon={BookOpen}
      />

      <ActionBar
        searchPlaceholder="Cari course..."
        buttonLabel="Tambah Course"
        onSearchChange={setQ}
        onAdd={() => router.get(route("dashboard.management-course.create"))}
      />

      <ManagementCourseTable
        courses={filtered}
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
    </div>
  );
}

ManagementCourseIndex.layout = (page) => <DashboardLayout children={page} />;
