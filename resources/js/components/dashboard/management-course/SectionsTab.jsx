import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, Play, HelpCircle, Zap, BookOpen } from "lucide-react";

export default function SectionsTab({ sections = [], onSectionChange, onAddSection, onRemoveSection }) {
  const getTypeIcon = (type) => {
    if (type === "quiz") return <HelpCircle className="w-3 h-3" />;
    if (type === "practice") return <Zap className="w-3 h-3" />;
    return <Play className="w-3 h-3" />;
  };

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {sections.map((section, sectionIndex) => (
          <AccordionItem key={section.id} value={section.id} className="border-0">
            <Card className="border-0 shadow-sm overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:no-underline border-0">
                <div className="flex items-start gap-4 w-full text-left">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {sectionIndex + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {section.title || `Untitled Section ${sectionIndex + 1}`}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {(section.modules?.length || 0)} module •{" "}
                      {section.description ? section.description.substring(0, 50) : "Tanpa deskripsi"}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="p-0 border-t border-gray-100">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Nama Section
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Contoh: Introduction to TOEFL"
                        value={section.title}
                        onChange={(e) => onSectionChange(sectionIndex, "title", e.target.value)}
                        className="flex-1 border border-gray-200 rounded-lg h-9 text-sm focus:border-blue-400 focus:ring-blue-200"
                      />
                      {sections.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => onRemoveSection(sectionIndex)}
                          className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0 border border-gray-200"
                          title="Hapus section"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                      Deskripsi Section
                    </Label>
                    <Textarea
                      placeholder="Jelaskan apa yang dipelajari di section ini"
                      value={section.description}
                      onChange={(e) => onSectionChange(sectionIndex, "description", e.target.value)}
                      className="border border-gray-200 rounded-lg min-h-16 text-sm focus:border-blue-400 focus:ring-blue-200 resize-none"
                    />
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        {(section.modules?.length || 0)} Module
                      </p>
                    </div>

                    {(section.modules?.length || 0) === 0 ? (
                      <p className="text-xs text-gray-500 italic">Belum ada modul. Tambahkan di tab Module</p>
                    ) : (
                      <div className="space-y-2">
                        {section.modules.slice(0, 3).map((module) => (
                          <div key={module.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs">
                            <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                              {getTypeIcon(module.type)}
                            </div>
                            <span className="text-gray-700 truncate font-medium">
                              {module.title || "Untitled"}
                            </span>
                            <span className="text-gray-400 ml-auto flex-shrink-0">{module.duration}</span>
                          </div>
                        ))}
                        {(section.modules?.length || 0) > 3 && (
                          <p className="text-xs text-gray-400 px-2">
                            + {(section.modules.length - 3)} lebih
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      <Button
        type="button"
        onClick={onAddSection}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 gap-2 font-medium"
      >
        <Plus className="w-4 h-4" /> Tambah Section
      </Button>
    </div>
  );
}
