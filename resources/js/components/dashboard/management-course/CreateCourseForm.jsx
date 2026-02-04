import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";

import CourseDetailTab from "./CourseDetailTab";
import SectionsTab from "./SectionsTab";
import ModulesTab from "./ModulesTab";

export default function CreateCourseForm() {
  const [activeTab, setActiveTab] = useState("detail");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: [],
    price: "",
    instructor: "",
    duration: "",
    image: "",
    features: [""],
    sections: [
      {
        id: "s1",
        title: "",
        description: "",
        modules: [{ id: "m1", title: "", description: "", url: "", duration: "", type: "video" }],
      },
    ],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    router.post("/dashboard/management-course", formData, {
      preserveScroll: true,
      onSuccess: () => console.log("Course created"),
      onError: (errors) => console.log("Validation errors", errors),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-200 p-0 h-auto rounded-none gap-2">
          <TabsTrigger
            value="detail"
            className="rounded-lg border-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-600 font-medium py-3 transition-all hover:bg-gray-100 data-[state=active]:hover:bg-blue-700"
          >
            Detail Kursus
          </TabsTrigger>
          <TabsTrigger
            value="sections"
            className="rounded-lg border-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-600 font-medium py-3 transition-all hover:bg-gray-100 data-[state=active]:hover:bg-blue-700"
          >
            Section
          </TabsTrigger>
          <TabsTrigger
            value="modules"
            className="rounded-lg border-0 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-600 font-medium py-3 transition-all hover:bg-gray-100 data-[state=active]:hover:bg-blue-700"
          >
            Module
          </TabsTrigger>
        </TabsList>

        {/* DETAIL */}
        <TabsContent value="detail" className="space-y-4">
          <CourseDetailTab
            title={formData.title}
            description={formData.description}
            category={formData.category}
            price={formData.price}
            instructor={formData.instructor}
            duration={formData.duration}
            features={formData.features}
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
        </TabsContent>

        {/* SECTIONS */}
        <TabsContent value="sections" className="space-y-4">
          <SectionsTab
            sections={formData.sections}
            onSectionChange={(i, field, value) =>
              setFormData((p) => {
                const sections = [...p.sections];
                sections[i] = { ...sections[i], [field]: value };
                return { ...p, sections };
              })
            }
            onAddSection={() =>
              setFormData((p) => ({
                ...p,
                sections: [
                  ...p.sections,
                  {
                    id: `s${Date.now()}`,
                    title: "",
                    description: "",
                    modules: [
                      {
                        id: `m${Date.now()}`,
                        title: "",
                        description: "",
                        url: "",
                        duration: "",
                        type: "video",
                      },
                    ],
                  },
                ],
              }))
            }
            onRemoveSection={(idx) =>
              setFormData((p) => ({
                ...p,
                sections:
                  p.sections.length > 1 ? p.sections.filter((_, i) => i !== idx) : p.sections,
              }))
            }
          />
        </TabsContent>

        {/* MODULES */}
        <TabsContent value="modules" className="space-y-4">
          <ModulesTab
            sections={formData.sections}
            onModuleChange={(sIdx, mIdx, field, value) =>
              setFormData((p) => {
                const sections = [...p.sections];
                const modules = [...sections[sIdx].modules];
                modules[mIdx] = { ...modules[mIdx], [field]: value };
                sections[sIdx] = { ...sections[sIdx], modules };
                return { ...p, sections };
              })
            }
            onAddModule={(sIdx) =>
              setFormData((p) => {
                const sections = [...p.sections];
                sections[sIdx] = {
                  ...sections[sIdx],
                  modules: [
                    ...sections[sIdx].modules,
                    { id: `m${Date.now()}`, title: "", description: "", url: "", duration: "", type: "video" },
                  ],
                };
                return { ...p, sections };
              })
            }
            onRemoveModule={(sIdx, mIdx) =>
              setFormData((p) => {
                const sections = [...p.sections];
                const modules = sections[sIdx].modules;
                if (modules.length <= 1) return p;
                sections[sIdx] = { ...sections[sIdx], modules: modules.filter((_, i) => i !== mIdx) };
                return { ...p, sections };
              })
            }
            onAddYouTubeModule={(sIdx, moduleData) =>
              setFormData((p) => {
                const sections = [...p.sections];
                sections[sIdx] = {
                  ...sections[sIdx],
                  modules: [
                    ...sections[sIdx].modules,
                    {
                      id: `m${Date.now()}`,
                      title: moduleData.title || "",
                      description: moduleData.description || "",
                      url: `https://www.youtube.com/watch?v=${moduleData.videoId}`,
                      duration: moduleData.duration || "",
                      type: "video",
                      thumbnail: moduleData.thumbnail,
                      videoId: moduleData.videoId,
                    },
                  ],
                };
                return { ...p, sections };
              })
            }
          />
        </TabsContent>
      </Tabs>

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

        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 gap-2 font-medium">
          <Save className="w-4 h-4" /> Buat Kursus
        </Button>
      </div>
    </form>
  );
}
