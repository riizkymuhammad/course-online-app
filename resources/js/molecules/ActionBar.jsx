import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export function ActionBar({
  searchPlaceholder = "Cari...",
  buttonLabel = "Tambah",
  onAdd,
  onSearchChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-12 h-11 rounded-xl border-slate-200 bg-white focus:border-blue-400 focus:ring-blue-100"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <Button
        type="button"
        onClick={onAdd}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white gap-2 rounded-xl px-6 h-11 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all"
      >
        <Plus className="w-5 h-5" />
        {buttonLabel}
      </Button>
    </div>
  );
}
