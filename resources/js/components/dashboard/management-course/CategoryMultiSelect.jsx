import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { X, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const AVAILABLE_CATEGORIES = [
  "Bahasa Inggris",
  "CPNS",
  "SD",
  "SMP",
  "SMA",
  "UTBK",
  "Matematika",
  "Sains",
  "Umum",
  "Pemrograman",
  "Design",
  "Bisnis",
];

export default function CategoryMultiSelect({ value = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = AVAILABLE_CATEGORIES.filter(
    (cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()) && !value.includes(cat)
  );

  const handleSelect = (category) => {
    onChange([...value, category]);
    setSearchTerm("");
  };

  const handleRemove = (category) => {
    onChange(value.filter((cat) => cat !== category));
  };

  return (
    <div className="relative w-full">
      <div
        className="border border-gray-200 rounded-lg p-2 bg-white cursor-pointer hover:border-gray-300 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? (
          <div className="flex items-center justify-between h-8">
            <span className="text-gray-500 text-sm">Pilih kategori...</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {value.map((cat) => (
                <div
                  key={cat}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2"
                >
                  {cat}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(cat);
                    }}
                    className="hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
          </div>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 border-0 shadow-lg z-50 p-0">
          <div className="p-3 border-b border-gray-100">
            <Input
              type="text"
              placeholder="Cari kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-200 rounded-lg h-9 text-sm focus:border-blue-400 focus:ring-blue-200"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-64 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <p className="text-xs text-gray-500 p-2">Kategori tidak ditemukan</p>
            ) : (
              filtered.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleSelect(cat)}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-blue-50 text-gray-700 transition-colors"
                >
                  {cat}
                </button>
              ))
            )}
          </div>
        </Card>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}
