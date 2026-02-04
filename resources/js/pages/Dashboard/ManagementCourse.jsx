import React, { useMemo, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/molecules/PageHeader";
import { ActionBar } from "@/molecules/ActionBar";
import { ManagementCourseTable } from "@/organisms/ManagementCourseTable";
import { router } from "@inertiajs/react";

export default function ManagementCourseIndex() {
  const [q, setQ] = useState("");

  const courses = [
    { id: 1, title: "React Basics", category: "Web Development", lessons: 12, students: 345, status: "Published" },
    { id: 2, title: "Advanced JavaScript", category: "Programming", lessons: 18, students: 298, status: "Published" },
    { id: 3, title: "UI/UX Design Principles", category: "Design", lessons: 10, students: 156, status: "Draft" },
    { id: 4, title: "Python for Data Science", category: "Data Science", lessons: 15, students: 402, status: "Published" },
  ];

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return courses;

    return courses.filter((c) => {
      return (
        c.title.toLowerCase().includes(keyword) ||
        c.category.toLowerCase().includes(keyword) ||
        c.status.toLowerCase().includes(keyword)
      );
    });
  }, [q]);

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
        onView={(course) => console.log("View:", course)}
        onEdit={(course) => console.log("Edit:", course)}
        onDelete={(course) => console.log("Delete:", course)}
      />
    </div>
  );
}

ManagementCourseIndex.layout = (page) => <DashboardLayout children={page} />;
