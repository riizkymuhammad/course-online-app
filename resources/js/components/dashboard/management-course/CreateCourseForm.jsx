import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

import CourseDetailTab from "./CourseDetailTab";

export default function CreateCourseForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: [],
    price: "",
    instructor: "",
    duration: "",
    image: "",
    features: [""],
    status: "draft",
    sections: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      ...formData,
      image: formData.image || "",
      status: formData.status || "draft",
    };

    router.post("/dashboard/management-course", payload, {
      preserveScroll: true,
      onSuccess: () => {
        setIsSubmitting(false);
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
      onError: (errors) => console.log("Validation errors", errors),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CourseDetailTab
        title={formData.title}
        description={formData.description}
        category={formData.category}
            price={formData.price}
            instructor={formData.instructor}
            duration={formData.duration}
            features={formData.features}
            status={formData.status}
            onInputChange={(field, value) => setFormData((p) => ({ ...p, [field]: value }))}
        onFeatureChange={(idx, value) =>
          setFormData((p) => {
            const features = [...p.features];
            features[idx] = value;
            return { ...p, features };
          })
        }
        onAddFeature={() => setFormData((p) => ({ ...p, features: [...p.features, ""] }))}
        onRemoveFeature={(idx) =>
          setFormData((p) => ({ ...p, features: p.features.filter((_, i) => i !== idx) }))
        }
      />

      {/* SUBMIT */}
      <div className="flex gap-3 justify-end sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200 rounded-lg">
        <Button
          type="button"
          variant="outline"
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-10 font-medium bg-transparent"
          onClick={() => window.history.back()}
        >
          Batal
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 gap-2 font-medium disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
              Menyimpan...
            </span>
          ) : (
            <>
              <Save className="w-4 h-4" /> Buat Kursus
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
