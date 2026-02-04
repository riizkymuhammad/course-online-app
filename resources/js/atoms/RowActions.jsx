import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";

const baseBtn =
  "p-2 rounded-lg transition-colors";

export function RowActions({ onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className={`${baseBtn} hover:bg-blue-50 text-slate-400 hover:text-blue-600`}
        title="Lihat"
        onClick={onView}
      >
        <Eye className="w-4 h-4" />
      </button>

      <button
        type="button"
        className={`${baseBtn} hover:bg-amber-50 text-slate-400 hover:text-amber-600`}
        title="Edit"
        onClick={onEdit}
      >
        <Edit2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        className={`${baseBtn} hover:bg-red-50 text-slate-400 hover:text-red-600`}
        title="Hapus"
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
