import React from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

import CreateCourseForm from "@/components/dashboard/management-course/CreateCourseForm";

export default function CreateCoursePage() {
  return (
    <>
      <Head title="Buat Kursus Baru | Dashboard Manajemen" />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* HEADER */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="space-y-4">
              {/* BREADCRUMB */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    {/* Kalau BreadcrumbLink kamu support asChild (shadcn), pakai Link */}
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
                      Buat Kursus Baru
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* TITLE & DESCRIPTION */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">
                    Buat Kursus Baru
                  </h1>
                </div>
                <p className="text-gray-600 text-base max-w-2xl">
                  Buat kursus pembelajaran online yang menarik dengan mudah. Isi detail kursus
                  terlebih dulu, lalu lanjutkan pengaturan section dan module setelah kursus tersimpan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <CreateCourseForm />
          </div>
        </div>
      </div>
    </>
  );
}

CreateCoursePage.layout = (page) => <DashboardLayout children={page} />
