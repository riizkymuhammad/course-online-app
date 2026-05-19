import React from "react";
import { Button } from "@/components/ui/button";

export function PaginationBar({
  pagination,
  itemLabel = "data",
  onPageChange,
}) {
  if (!pagination) return null;

  const currentPage = pagination.current_page ?? 1;
  const lastPage = pagination.last_page ?? 1;
  const from = pagination.from ?? 0;
  const to = pagination.to ?? 0;
  const total = pagination.total ?? 0;

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-500">
        Menampilkan <span className="font-semibold text-slate-700">{from}</span>
        {" - "}
        <span className="font-semibold text-slate-700">{to}</span>
        {" dari "}
        <span className="font-semibold text-slate-700">{total}</span>
        {" "}
        {itemLabel}
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Sebelumnya
        </Button>
        <span className="min-w-24 text-center text-sm font-medium text-slate-600">
          Halaman {currentPage} / {lastPage}
        </span>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= lastPage}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}
