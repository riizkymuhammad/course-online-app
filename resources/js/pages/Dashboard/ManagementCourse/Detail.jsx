import React, { useMemo, useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toast } from "@/components/ui/toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CheckCircle2Icon, ChevronRight, Save } from "lucide-react";

import CourseDetailTab from "@/components/dashboard/management-course/CourseDetailTab";
import SectionsTab from "@/components/dashboard/management-course/SectionsTab";
import ModulesTab from "@/components/dashboard/management-course/ModulesTab";

const createEmptyModule = () => ({
  id: `m${Date.now()}`,
  title: "",
  description: "",
  url: "",
  duration: "",
  type: "video",
});

const createEmptySection = () => ({
  id: `s${Date.now()}`,
  title: "",
  description: "",
  modules: [createEmptyModule()],
});

function normalizeCourse(rawCourse = {}, fallbackId, fallbackSlug) {
  const course = rawCourse || {};
  const categoryNames = Array.isArray(course.categories)
    ? course.categories.map((cat) => cat.name)
    : course.category;
  return {
    id: course.id ?? fallbackId ?? "",
    uuid: course.uuid ?? "",
    slug: course.slug ?? fallbackSlug ?? "",
    title: course.title ?? "",
    description: course.description ?? "",
    category: Array.isArray(categoryNames) ? categoryNames : [],
    price: course.price ?? "",
    instructor: course.instructor ?? "",
    duration: course.duration ?? "",
    image: course.image ?? "",
    features: Array.isArray(course.features) && course.features.length > 0 ? course.features : [""],
    status: course.status ?? "draft",
    sections: Array.isArray(course.sections) ? course.sections : [],
  };
}

export default function CourseDetailPage({ course }) {
  const { props } = usePage();
  const successMessage = props?.flash?.success;
  const initialCourse = useMemo(() => normalizeCourse(course), [course]);
  const [activeTab, setActiveTab] = useState("detail");
  const [formData, setFormData] = useState(initialCourse);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFormData(initialCourse);
  }, [initialCourse]);

  useEffect(() => {
    if (!successMessage) return;
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const isDirty = useMemo(() => {
    const snapshot = (value) => JSON.stringify(value ?? null);
    return (
      snapshot(formData) !== snapshot(initialCourse)
    );
  }, [formData, initialCourse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseId = formData.uuid || formData.id;

    router.post(`/dashboard/management-course/${courseId}`, formData, {
      preserveScroll: true,
      onSuccess: () => console.log("Course updated"),
      onError: (errors) => console.log("Validation errors", errors),
    });
  };

  return (
    <>
      <Head title="Detail Kursus | Dashboard Manajemen" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* HEADER */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="space-y-4">
              {/* BREADCRUMB */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                        Dashboard
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </BreadcrumbSeparator>

                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href="/dashboard/management-course"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Manajemen Kursus
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </BreadcrumbSeparator>

                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-gray-900 font-medium">
                      Detail Kursus
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* TITLE & DESCRIPTION */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
                    {formData.title || "Detail Kursus"}
                  </h1>
                </div>
                <p className="text-gray-600 text-base max-w-2xl">
                  Kelola detail kursus, section, dan module pembelajaran pada halaman ini.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            {showToast && successMessage && (
              <Toast
                title="Berhasil"
                description={successMessage}
                icon={CheckCircle2Icon}
                onClose={() => setShowToast(false)}
              />
            )}

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
                    status={formData.status}
                    onInputChange={(field, value) =>
                      setFormData((p) => ({ ...p, [field]: value }))
                    }
                    onFeatureChange={(idx, value) =>
                      setFormData((p) => {
                        const features = [...p.features];
                        features[idx] = value;
                        return { ...p, features };
                      })
                    }
                    onAddFeature={() =>
                      setFormData((p) => ({ ...p, features: [...p.features, ""] }))
                    }
                    onRemoveFeature={(idx) =>
                      setFormData((p) => ({
                        ...p,
                        features: p.features.filter((_, i) => i !== idx),
                      }))
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
                        sections: [...p.sections, createEmptySection()],
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
                          modules: [...sections[sIdx].modules, createEmptyModule()],
                        };
                        return { ...p, sections };
                      })
                    }
                    onRemoveModule={(sIdx, mIdx) =>
                      setFormData((p) => {
                        const sections = [...p.sections];
                        const modules = sections[sIdx].modules;
                        if (modules.length <= 1) return p;
                        sections[sIdx] = {
                          ...sections[sIdx],
                          modules: modules.filter((_, i) => i !== mIdx),
                        };
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
                  Kembali
                </Button>

                {activeTab === "detail" && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg h-10 font-medium bg-transparent"
                    onClick={() => setActiveTab("sections")}
                  >
                    Lanjut ke Section
                  </Button>
                )}

                {activeTab === "sections" && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg h-10 font-medium bg-transparent"
                    onClick={() => setActiveTab("modules")}
                  >
                    Lanjut ke Module
                  </Button>
                )}

                {isDirty && (
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 gap-2 font-medium"
                  >
                    <Save className="w-4 h-4" /> Simpan Perubahan
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

CourseDetailPage.layout = (page) => <DashboardLayout children={page} />;
