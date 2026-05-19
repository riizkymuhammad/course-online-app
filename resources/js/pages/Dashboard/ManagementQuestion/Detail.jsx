import React, { useMemo, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  Clock3,
  FileText,
  FolderOpen,
  ListChecks,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status) {
  return status === "published" ? "Terbit" : "Draft";
}

function sourceLabel(question) {
  return question.is_generate_ai ? "AI dari materi" : "Ekstraksi dari file";
}

function trimText(text, maxLength = 130) {
  if (!text) return "-";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function HeroStat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-white/75">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 text-white">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-sm leading-6 text-slate-500">{description}</p> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SidebarStat({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function QuestionCard({ item }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              <ListChecks className="h-3.5 w-3.5" />
              Soal {item.order}
            </div>
            <h3 className="max-w-4xl text-base font-semibold leading-7 text-slate-900">{item.prompt}</h3>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            Kunci: {item.correct_option}
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="grid gap-3 md:grid-cols-2">
          {item.answers.map((answer) => (
            <div
              key={answer.id}
              className={[
                "rounded-2xl border p-4 transition-colors",
                answer.is_correct
                  ? "border-emerald-200 bg-emerald-50/80"
                  : "border-slate-200 bg-slate-50/70",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-xs font-bold",
                    answer.is_correct
                      ? "bg-emerald-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600",
                  ].join(" ")}
                >
                  {answer.option_label}
                </div>
                <div className="space-y-2">
                  <p className="text-sm leading-6 text-slate-700">{answer.answer_text}</p>
                  {answer.is_correct ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      <CircleCheck className="h-3.5 w-3.5" />
                      Jawaban benar
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {item.explanation ? (
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Pembahasan
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.explanation}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function QuestionDetailPage({ question, context = "tryout" }) {
  const [activeTab, setActiveTab] = useState("overview");
  const isQuiz = context === "quiz";
  const managementLabel = isQuiz ? "Manajemen Quiz" : "Manajemen Tryout";
  const managementUrl = isQuiz ? "/dashboard/management-quiz" : "/dashboard/management-questions";
  const editUrl = isQuiz
    ? `/dashboard/management-quiz/${question.id}/edit`
    : `/dashboard/management-questions/${question.id}/edit?context=tryout`;
  const packageLabel = isQuiz ? "quiz" : "tryout";
  const detailLabel = isQuiz ? "Detail Quiz" : "Detail Tryout";
  const packageAboutTitle = isQuiz ? "Tentang Paket Quiz" : "Tentang Paket Soal";
  const openExamLabel = isQuiz ? "Buka Halaman Quiz" : "Buka Halaman Exam";

  const generatedCount = question.ai_question_count || question.items.length;

  const highlightedTopics = useMemo(() => {
    return question.items.slice(0, 4).map((item, index) => ({
      id: item.id,
      number: index + 1,
      title: trimText(item.prompt, 110),
    }));
  }, [question.items]);

  const files = [
    { label: "Materi", data: question.files.material },
    { label: "Soal", data: question.files.question },
    { label: "Kunci", data: question.files.answer_key },
  ].filter((entry) => Boolean(entry.data));

  return (
    <>
      <Head title={`${question.title} | ${managementLabel}`} />

      <div className="min-h-screen bg-slate-50">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard" className="text-slate-500 hover:text-slate-900">
                      Dashboard
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={managementUrl}
                      className="text-slate-500 hover:text-slate-900"
                    >
                      {managementLabel}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium text-slate-900">
                    {detailLabel}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="space-y-6">
            <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-900/10">
              <div className="p-6 md:p-8 lg:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                      <Sparkles className="h-4 w-4" />
                      {isQuiz ? "Quiz Pembelajaran" : "Tryout Pilihan Ganda"}
                    </div>

                    <h1 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
                      {question.title}
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/85">
                      Paket soal ini disusun untuk ditinjau dan dikerjakan dengan pola yang lebih dekat
                      ke platform ujian modern: ringkasan jelas di depan, struktur soal rapi, dan daftar
                      butir yang mudah dipindai.
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                        {statusLabel(question.status)}
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                        {sourceLabel(question)}
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                        {question.category}
                      </span>
                    </div>
                  </div>

                  <div className="w-full max-w-xl grid gap-4 md:grid-cols-3">
                    <HeroStat label="Total Soal" value={question.items.length} icon={ListChecks} />
                    <HeroStat label="Estimasi" value={`${Math.max(10, question.items.length * 2)} min`} icon={Clock3} />
                    <HeroStat label="Format" value="ABCD" icon={CheckCircle2} />
                  </div>
                </div>
              </div>
            </section>

            <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-slate-100 p-1">
                  <TabsTrigger
                    value="overview"
                    className="rounded-2xl py-3 text-sm font-semibold text-slate-600 transition data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                  >
                    Detail Soal
                  </TabsTrigger>
                  <TabsTrigger
                    value="questions"
                    className="rounded-2xl py-3 text-sm font-semibold text-slate-600 transition data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
                  >
                    List Soal
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="px-3 pb-3">
                  <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                      <SectionCard
                        title={packageAboutTitle}
                        description="Blok ini mengikuti pola halaman detail ujian modern: menjelaskan konteks ujian sebelum peserta atau admin masuk ke daftar soal."
                      >
                        <div className="space-y-4 text-sm leading-7 text-slate-600">
                          <p>
                            Paket ini berisi soal pilihan ganda yang tersusun satu soal per row dan satu
                            opsi jawaban per row, sehingga lebih mudah ditinjau, diacak, atau diperbarui.
                          </p>
                          <p>
                            {question.processing_notes ||
                              "Belum ada catatan tambahan dari proses pembuatan soal. Anda tetap bisa meninjau struktur soal, sumber berkas, dan butir soal di halaman ini."}
                          </p>
                        </div>
                      </SectionCard>

                      <SectionCard
                        title="Materi yang Diujikan"
                        description="Daftar ini dibentuk dari beberapa butir awal soal agar cepat memberi gambaran cakupan topik."
                      >
                        <div className="space-y-4">
                          {highlightedTopics.length > 0 ? (
                            highlightedTopics.map((topic) => (
                              <div
                                key={topic.id}
                                className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4"
                              >
                                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                                  {topic.number}
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">Topik {topic.number}</p>
                                  <p className="mt-1 text-sm leading-6 text-slate-600">{topic.title}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
                              Belum ada daftar topik yang bisa ditampilkan.
                            </div>
                          )}
                        </div>
                      </SectionCard>

                      <SectionCard
                        title="Syarat dan Catatan"
                        description="Bagian ini menggantikan blok aturan pada referensi desain agar tetap relevan untuk data bank soal yang ada."
                      >
                        <div className="space-y-3 text-sm text-slate-700">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                            <span>Semua butir disusun dalam format pilihan ganda dengan opsi A sampai D.</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                            <span>Kunci jawaban tersimpan per soal sehingga mudah ditinjau atau dikembangkan ke mode pengerjaan.</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                            <span>Gunakan tab <strong>List Soal</strong> untuk melihat semua butir dan opsi jawaban secara rinci.</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
                            <span>Struktur ini siap dilanjutkan ke fitur pengerjaan soal, randomisasi, dan penilaian otomatis.</span>
                          </div>
                        </div>
                      </SectionCard>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="space-y-6 lg:sticky lg:top-8">
                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                          <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                              Kategori
                            </p>
                            <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                              <BookOpen className="h-4 w-4" />
                              {question.category}
                            </div>
                          </div>

                          <div className="space-y-5 border-b border-slate-100 pb-6">
                            <SidebarStat label="Jumlah Soal" value={question.items.length} />
                            <SidebarStat
                              label="Estimasi Waktu"
                              value={`${Math.max(10, question.items.length * 2)} menit`}
                            />
                            <SidebarStat label="Tipe Soal" value="Pilihan Ganda" />
                            <SidebarStat label="Mode" value={sourceLabel(question)} />
                          </div>

                          <div className="mt-6 space-y-3">
                            <Button
                              type="button"
                              className="h-11 w-full rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
                              onClick={() => setActiveTab("questions")}
                            >
                              Lihat List Soal
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              className="h-11 w-full rounded-2xl border-slate-200"
                              asChild
                            >
                              <Link href={editUrl}>
                                Edit Paket
                              </Link>
                            </Button>

                            <Button
                              type="button"
                              variant="outline"
                              className="h-11 w-full rounded-2xl border-slate-200"
                              onClick={() => window.history.back()}
                            >
                                Kembali ke daftar
                            </Button>

                            <Link
                              href={`/exam/quiz/${question.id}`}
                              className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              {openExamLabel}
                            </Link>
                          </div>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-slate-900">Informasi Paket</h3>
                          <div className="mt-5 space-y-4">
                            <div className="flex items-start gap-3">
                              <Bot className="mt-0.5 h-5 w-5 text-slate-400" />
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Target AI</p>
                                <p className="text-sm text-slate-500">{generatedCount} soal</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <CalendarDays className="mt-0.5 h-5 w-5 text-slate-400" />
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Dibuat</p>
                                <p className="text-sm text-slate-500">{formatDate(question.created_at)}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <ShieldCheck className="mt-0.5 h-5 w-5 text-slate-400" />
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Status</p>
                                <p className="text-sm text-slate-500">{statusLabel(question.status)}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <UserRound className="mt-0.5 h-5 w-5 text-slate-400" />
                              <div>
                                <p className="text-sm font-semibold text-slate-900">Pemateri</p>
                                <p className="text-sm text-slate-500">
                                  {question.instructors.length > 0
                                    ? question.instructors.map((instructor) => instructor.name).join(", ")
                                    : "-"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </section>

                        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                          <h3 className="text-lg font-semibold text-slate-900">Sumber Berkas</h3>
                          <div className="mt-4 space-y-3">
                            {files.length > 0 ? (
                              files.map((file) => (
                                <a
                                  key={file.label}
                                  href={file.data.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                                >
                                  <span className="flex items-center gap-3">
                                    <FolderOpen className="h-4 w-4 text-slate-400" />
                                    {file.label}
                                  </span>
                                  <span className="font-semibold text-slate-900">Buka</span>
                                </a>
                              ))
                            ) : (
                              <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
                                Tidak ada berkas terhubung.
                              </div>
                            )}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="questions" className="px-3 pb-3">
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-slate-900">List Butir Soal</h2>
                          <p className="mt-1 text-sm text-slate-500">
                            Daftar ini menyesuaikan gaya kartu pada referensi agar setiap butir, opsi,
                            dan kunci lebih mudah dipindai.
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200">
                          Total {question.items.length} soal pilihan ganda dalam paket {packageLabel}
                        </div>
                      </div>
                    </div>

                    {question.items.length > 0 ? (
                      question.items.map((item) => <QuestionCard key={item.id} item={item} />)
                    ) : (
                      <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                          <FileText className="h-7 w-7" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-800">Belum ada butir soal</h3>
                        <p className="mt-2 text-sm text-slate-500">
                          Data soal detail belum tersedia atau proses generate belum menghasilkan butir soal.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

QuestionDetailPage.layout = (page) => <DashboardLayout children={page} />;
