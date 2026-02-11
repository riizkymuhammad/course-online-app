import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, Clock, DollarSign, Plus, Trash2 } from "lucide-react";

import CategoryMultiSelect from "./CategoryMultiSelect";

export default function CourseDetailTab({
  title,
  description,
  category,
  price,
  instructor,
  duration,
  features,
  status,
  onInputChange,
  onFeatureChange,
  onAddFeature,
  onRemoveFeature,
}) {
  return (
    <div className="space-y-6">
      {/* PREVIEW CARD */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 line-clamp-2 mb-1">
                {title || "Judul Kursus Anda"}
              </h2>
              <p className="text-sm text-gray-500">Ringkasan kursus Anda</p>
            </div>

            <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
              {description || "Deskripsi akan muncul di sini..."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
              <SummaryItem
                icon={BookOpen}
                label="Kategori"
                value={Array.isArray(category) && category.length > 0 ? category[0] : "-"}
              />
              <SummaryItem icon={Clock} label="Durasi" value={duration || "-"} />
              <SummaryItem
                icon={DollarSign}
                label="Harga"
                value={`Rp ${price ? parseInt(price, 10).toLocaleString("id-ID") : "-"}`}
              />
              <SummaryItem icon={Users} label="Instruktur" value={instructor || "-"} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FORM SECTION */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* JUDUL & KATEGORI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                Judul Kursus
              </Label>
              <Input
                placeholder="Contoh: Complete TOEFL Preparation"
                value={title}
                onChange={(e) => onInputChange("title", e.target.value)}
                className="border border-gray-200 rounded-lg h-10 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                Kategori (Multi-Select)
              </Label>
              <CategoryMultiSelect
                value={Array.isArray(category) ? category : []}
                onChange={(values) => onInputChange("category", values)}
              />
            </div>
          </div>

          {/* DURASI & HARGA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                Durasi Total
              </Label>
              <Input
                placeholder="Contoh: 24 jam"
                value={duration}
                onChange={(e) => onInputChange("duration", e.target.value)}
                className="border border-gray-200 rounded-lg h-10 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                Harga (IDR)
              </Label>
              <Input
                type="number"
                placeholder="Contoh: 299000"
                value={price}
                onChange={(e) => onInputChange("price", e.target.value)}
                className="border border-gray-200 rounded-lg h-10 focus:border-blue-400 focus:ring-blue-200"
              />
            </div>
          </div>

          {/* INSTRUKTUR & DESKRIPSI */}
          <div>
            <Label className="text-sm font-semibold text-gray-900 mb-2 block">
              Nama Instruktur
            </Label>
            <Input
              placeholder="Contoh: Dr. Sarah Johnson"
              value={instructor}
              onChange={(e) => onInputChange("instructor", e.target.value)}
              className="border border-gray-200 rounded-lg h-10 focus:border-blue-400 focus:ring-blue-200"
            />
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-900 mb-2 block">
              Status
            </Label>
            <Select
              value={status || "draft"}
              onValueChange={(value) => onInputChange("status", value)}
            >
              <SelectTrigger className="h-10 border border-gray-200 rounded-lg text-sm focus:border-blue-400 focus:ring-blue-200">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-semibold text-gray-900 mb-2 block">
              Deskripsi Kursus
            </Label>
            <Textarea
              placeholder="Jelaskan secara detail tentang apa yang akan dipelajari siswa..."
              value={description}
              onChange={(e) => onInputChange("description", e.target.value)}
              className="border border-gray-200 rounded-lg min-h-32 focus:border-blue-400 focus:ring-blue-200 resize-none"
            />
          </div>


        </CardContent>
      </Card>
    </div>
  );
}

function SummaryItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
