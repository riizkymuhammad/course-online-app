import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Youtube, CreditCard } from "lucide-react";

import YouTubeModuleInput from "./YouTubeModuleInput";

export default function ModulesTab({
  sections = [],
  onModuleChange,
  onAddModule,
  onRemoveModule,
  onAddYouTubeModule,
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [showYouTubeInput, setShowYouTubeInput] = useState(null);

  const moduleTypes = [
    { value: "video", label: "Video" },
    { value: "quiz", label: "Quiz" },
    { value: "practice", label: "Latihan Praktek" },
  ];

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500">Buat section terlebih dahulu untuk menambahkan modul.</p>
      </div>
    );
  }

  const currentSection = sections[activeSection];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-screen">
      {/* LEFT PANEL */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="border-0 shadow-sm sticky top-4">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Pilih Section</p>

            <div className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(index)}
                  className={[
                    "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    activeSection === index
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  ].join(" ")}
                >
                  <div className="truncate">{section.title || `Section ${index + 1}`}</div>
                  <div className={`text-xs mt-1 ${activeSection === index ? "text-blue-100" : "text-gray-500"}`}>
                    {(section.modules?.length || 0)} module
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MODULE LIST */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Module dalam Section Ini
            </p>

            {(currentSection.modules?.length || 0) === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500">Belum ada modul</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {currentSection.modules.map((module) => (
                  <div
                    key={module.id}
                    className="p-2 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      {module.thumbnail && (
                        <img
                          src={module.thumbnail}
                          alt={module.title}
                          className="w-8 h-6 rounded object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {module.title || "Untitled"}
                        </p>
                        <p className="text-xs text-gray-500">{module.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* RIGHT PANEL */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 text-lg">
              {currentSection.title || "Untitled Section"}
            </h3>
            {currentSection.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{currentSection.description}</p>
            )}
          </CardContent>
        </Card>

        {/* YouTube Input */}
        {showYouTubeInput === activeSection ? (
          <YouTubeModuleInput
            onModuleAdded={(moduleData) => {
              onAddYouTubeModule(activeSection, moduleData);
              setShowYouTubeInput(null);
            }}
          />
        ) : (
          <Button
            type="button"
            onClick={() => setShowYouTubeInput(activeSection)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 gap-2 font-medium"
          >
            <Youtube className="w-4 h-4" /> Tambah dari YouTube
          </Button>
        )}

        {/* MODULE CARDS */}
        <div className="space-y-3">
          {currentSection.modules.map((module, moduleIndex) => (
            <Card key={module.id} className="border border-blue-200 shadow-sm overflow-hidden hover:shadow-md transition-all hover:border-blue-400">
              <CardContent className="p-5 space-y-4 bg-gradient-to-br from-white to-blue-50">
                <div className="flex gap-4">
                  {module.thumbnail && (
                    <div className="flex-shrink-0 relative">
                      <img
                        src={module.thumbnail}
                        alt={module.title}
                        className="w-28 h-16 rounded-lg object-cover bg-gray-200 border border-gray-300"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
                        {moduleIndex + 1}
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {module.title || "Untitled Module"}
                        </h4>

                        {module.description && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {module.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {module.type && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                              {moduleTypes.find((t) => t.value === module.type)?.label}
                            </span>
                          )}
                          {module.duration && (
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
                              {module.duration}
                            </span>
                          )}
                        </div>
                      </div>

                      {currentSection.modules.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveModule(activeSection, moduleIndex)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 h-8 w-8"
                          title="Hapus modul"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Judul Modul
                    </Label>
                    <Input
                      placeholder="Contoh: Apa itu TOEFL?"
                      value={module.title}
                      onChange={(e) => onModuleChange(activeSection, moduleIndex, "title", e.target.value)}
                      className="border border-gray-200 rounded-lg h-9 text-sm focus:border-blue-400 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Tipe Modul
                    </Label>
                    <Select
                      value={module.type}
                      onValueChange={(value) => onModuleChange(activeSection, moduleIndex, "type", value)}
                    >
                      <SelectTrigger className="h-9 border border-gray-200 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {moduleTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">URL</Label>
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      value={module.url}
                      onChange={(e) => onModuleChange(activeSection, moduleIndex, "url", e.target.value)}
                      className="border border-gray-200 rounded-lg h-9 text-sm focus:border-blue-400 focus:ring-blue-200"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">Durasi</Label>
                    <Input
                      placeholder="15 menit atau 15m 30s"
                      value={module.duration}
                      onChange={(e) => onModuleChange(activeSection, moduleIndex, "duration", e.target.value)}
                      className="border border-gray-200 rounded-lg h-9 text-sm focus:border-blue-400 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                    Deskripsi Modul
                  </Label>
                  <Textarea
                    placeholder="Jelaskan ringkas tentang modul ini..."
                    value={module.description}
                    onChange={(e) => onModuleChange(activeSection, moduleIndex, "description", e.target.value)}
                    className="border border-gray-200 rounded-lg min-h-16 text-sm focus:border-blue-400 focus:ring-blue-200 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          type="button"
          onClick={() => onAddModule(activeSection)}
          className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg h-10 gap-2 font-medium"
        >
          <Plus className="w-4 h-4" /> Tambah Modul Manual
        </Button>
      </div>
    </div>
  );
}
