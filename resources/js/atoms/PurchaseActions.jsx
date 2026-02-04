import { Eye, FileText, Trash2 } from "lucide-react";

export function PurchaseActions({ onView, onDownload, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button
        className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
        title="Lihat"
        onClick={onView}
      >
        <Eye className="w-4 h-4" />
      </button>

      <button
        className="p-2 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600 transition-colors"
        title="Unduh Invoice"
        onClick={onDownload}
      >
        <FileText className="w-4 h-4" />
      </button>

      <button
        className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
        title="Hapus"
        onClick={onDelete}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
