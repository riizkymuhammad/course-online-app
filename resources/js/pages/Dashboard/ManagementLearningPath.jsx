import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { BookMarked, BookOpen, ClipboardCheck, Layers, Trophy } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader } from "@/molecules/PageHeader";
import { PaginationBar } from "@/components/dashboard/PaginationBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/atoms/StatusBadge";

function SummaryChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Icon className="h-4 w-4 text-blue-600" />
        <span>{label}</span>
      </div>
      <div className="text-lg font-bold text-slate-800">{value}</div>
    </div>
  );
}

export default function ManagementLearningPath({ paths = [], pagination = null, filters = {} }) {
  const [keyword, setKeyword] = useState(filters.search ?? "");
  const isFirstRender = useRef(true);

  useEffect(() => {
    setKeyword(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.get(
        route("dashboard.management-learning-path"),
        { search: keyword || undefined, page: 1 },
        { preserveState: true, replace: true, preserveScroll: true }
      );
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [keyword]);

  const handlePageChange = (page) => {
    router.get(
      route("dashboard.management-learning-path"),
      { search: keyword || undefined, page },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <PageHeader
        title="Manajemen Learning Path"
        subtitle="Kelompokkan materi, quiz, dan tryout berdasarkan kategori agar alur belajar lebih terstruktur."
        icon={BookMarked}
      />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex-1">
          <Input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Cari kategori, materi, atau quiz..."
            className="h-11 rounded-xl border-slate-200 bg-white"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl"
          onClick={() => router.reload({ only: ["paths", "pagination", "filters"] })}
        >
          Muat Ulang Data
        </Button>
      </div>

      <div className="space-y-6">
        {paths.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-blue-50">
              <BookMarked className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Belum ada learning path</h2>
            <p className="mt-2 text-sm text-slate-500">
              Learning path akan muncul saat materi atau quiz sudah memiliki kategori yang sama.
            </p>
          </div>
        )}

        {paths.map((path) => (
          <section
            key={path.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-white px-6 py-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                    Learning Path
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">{path.name}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Semua materi dan evaluasi di bawah ini berada pada kategori yang sama sehingga bisa dipakai
                    sebagai alur belajar terstruktur.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <SummaryChip icon={BookOpen} label="Materi" value={path.courses_count} />
                  <SummaryChip icon={ClipboardCheck} label="Quiz" value={path.questions_count} />
                  <SummaryChip icon={Layers} label="Modul" value={path.total_modules} />
                  <SummaryChip
                    icon={Trophy}
                    label="Tryout selesai"
                    value={path.total_finished_tryouts}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6 px-6 py-6 xl:grid-cols-[1.2fr_1fr]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">Materi dalam kategori ini</h3>
                  <span className="text-sm text-slate-500">{path.total_sections} section</span>
                </div>

                {path.courses.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                    Belum ada materi pada kategori ini.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {path.courses.map((course) => (
                      <div
                        key={course.id}
                        className="rounded-2xl border border-slate-200 px-4 py-4 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
                      >
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0">
                            <div className="mb-2 flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-blue-600" />
                              <h4 className="truncate text-base font-semibold text-slate-800">{course.title}</h4>
                            </div>
                            <p className="text-sm text-slate-500">
                              Pemateri: {course.instructor || "-"} • {course.sections_count} section •{" "}
                              {course.modules_count} modul
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <StatusBadge status={course.status} />
                            <Link
                              href={course.detail_url}
                              className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                            >
                              Lihat materi
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">Quiz dan tryout terkait</h3>
                  <span className="text-sm text-slate-500">
                    Rata-rata skor {path.average_score !== null ? `${path.average_score}%` : "-"}
                  </span>
                </div>

                {path.questions.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500">
                    Belum ada quiz pada kategori ini.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {path.questions.map((question) => (
                      <div
                        key={question.id}
                        className="rounded-2xl border border-slate-200 px-4 py-4 transition-colors hover:border-blue-200 hover:bg-blue-50/30"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="mb-2 flex items-center gap-2">
                              <ClipboardCheck className="h-4 w-4 text-blue-600" />
                              <h4 className="truncate text-base font-semibold text-slate-800">{question.title}</h4>
                            </div>
                            <p className="text-sm text-slate-500">
                              Pemateri: {question.instructors.join(", ") || "-"}
                            </p>
                          </div>
                          <StatusBadge status={question.status} />
                        </div>

                        <div className="mb-4 grid gap-3 sm:grid-cols-3">
                          <SummaryChip icon={ClipboardCheck} label="Jumlah soal" value={question.questions_count} />
                          <SummaryChip icon={Trophy} label="Tryout selesai" value={question.finished_tryouts_count} />
                          <SummaryChip
                            icon={Trophy}
                            label="Rerata skor"
                            value={question.average_score !== null ? `${question.average_score}%` : "-"}
                          />
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Link
                            href={question.detail_url}
                            className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            Detail soal
                          </Link>
                          <Link
                            href={question.quiz_url}
                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                          >
                            Buka quiz
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <PaginationBar
        pagination={pagination}
        itemLabel="learning path"
        onPageChange={handlePageChange}
      />
    </div>
  );
}

ManagementLearningPath.layout = (page) => <DashboardLayout children={page} />;
