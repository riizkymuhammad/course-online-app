import React from "react";
import { BookOpen, Layers, Users } from "lucide-react";
import { StatPill } from "@/atoms/StatPill";
import { StatusBadge } from "@/atoms/StatusBadge";
import { RowActions } from "@/atoms/RowActions";

export function ManagementCourseTable({ courses = [], onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Judul Course</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Kategori</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Pelajaran</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Siswa</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Status</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={[
                  "border-b border-slate-50 hover:bg-blue-50/30 transition-colors",
                  index === courses.length - 1 ? "border-b-0" : "",
                ].join(" ")}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-slate-800">{course.title}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">
                    {course.category}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <StatPill icon={Layers} value={course.lessons} />
                </td>

                <td className="px-6 py-4">
                  <StatPill icon={Users} value={course.students} />
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={course.status} />
                </td>

                <td className="px-6 py-4">
                  <RowActions
                    onView={() => onView?.(course)}
                    onEdit={() => onEdit?.(course)}
                    onDelete={() => onDelete?.(course)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
