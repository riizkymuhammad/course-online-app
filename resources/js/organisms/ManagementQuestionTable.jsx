import React from "react";
import { FileText } from "lucide-react";
import { StatusBadge } from "@/atoms/StatusBadge";
import { RowActions } from "@/atoms/RowActions";

export function ManagementQuestionTable({
  questions = [],
  onView,
  onEdit,
  onDelete,
}) {
  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-blue-50">
          <FileText className="h-7 w-7 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">Belum ada soal</h3>
        <p className="mt-2 text-sm text-slate-500">
          Data soal akan tampil di sini setelah ditambahkan.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Judul Soal</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Kategori</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Pemateri</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question, index) => (
              <tr
                key={question.id}
                className={[
                  "border-b border-slate-50 transition-colors hover:bg-blue-50/30",
                  index === questions.length - 1 ? "border-b-0" : "",
                ].join(" ")}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-50">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-slate-800">{question.title}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600">
                    {question.category || "-"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {question.instructor || "-"}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={question.status} />
                </td>

                <td className="px-6 py-4">
                  <RowActions
                    onView={() => onView?.(question)}
                    onEdit={() => onEdit?.(question)}
                    onDelete={() => onDelete?.(question)}
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
