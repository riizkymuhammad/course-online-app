import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, FileQuestion, Save, Sparkles } from "lucide-react";

function ToggleField({ checked, onChange, label, description, disabled = false }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        className={[
          "relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-blue-600" : "bg-slate-200",
          disabled ? "cursor-not-allowed opacity-60" : "",
        ].join(" ")}
        aria-pressed={checked}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-red-500">{message}</p>;
}

export default function CreateQuestionPage({ instructors = [], statuses = [] }) {
  const form = useForm({
    title: "",
    category_name: "",
    is_generate_ai: true,
    ai_question_count: 10,
    instructor_ids: [],
    status: "draft",
    material_file: null,
    question_file: null,
    has_answer_key: false,
    answer_key_file: null,
    generate_answer_key: true,
  });

  const submit = (event) => {
    event.preventDefault();
    form.post("/dashboard/management-questions", {
      forceFormData: true,
      onSuccess: () => {
        window.alert("Soal berhasil diproses dan disimpan.");
        window.location.href = "/dashboard/management-questions";
      },
      onError: (errors) => {
        const firstError = Object.values(errors || {}).find(Boolean);
        window.alert(firstError || "Proses simpan soal gagal. Periksa input dan coba lagi.");
      },
    });
  };

  const toggleInstructor = (id) => {
    const exists = form.data.instructor_ids.includes(id);

    form.setData(
      "instructor_ids",
      exists
        ? form.data.instructor_ids.filter((item) => item !== id)
        : [...form.data.instructor_ids, id]
    );
  };

  return (
    <>
      <Head title="Buat Soal Baru | Dashboard Manajemen" />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {form.processing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Sedang memproses soal
                  </h2>
                  <p className="text-sm text-slate-500">
                    {form.progress
                      ? `Mengunggah file ${form.progress.percentage}%... setelah itu Gemini akan menyusun soal pilihan ganda, jawaban, dan kunci jawabannya.`
                      : "File sedang diunggah, lalu Gemini menyusun soal pilihan ganda, jawaban, dan kunci jawabannya sebelum data disimpan ke database."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="space-y-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
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
                        href="/dashboard/management-questions"
                        className="text-slate-600 hover:text-slate-900"
                      >
                        Manajemen Tryout
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </BreadcrumbSeparator>

                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium text-slate-900">
                      Buat Soal Baru
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <FileQuestion className="h-7 w-7" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Buat Soal Baru</h1>
                  <p className="max-w-3xl text-sm text-slate-500 md:text-base">
                    Soal bersifat pilihan ganda. Anda bisa membuat soal dari materi menggunakan AI
                    atau mengunggah file soal lalu meminta AI membuat kunci jawabannya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          <form onSubmit={submit} className="mx-auto max-w-6xl space-y-6">
            {form.errors.ai && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {form.errors.ai}
              </div>
            )}

            <fieldset disabled={form.processing} className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
              <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-slate-900">Detail Soal</h2>
                  <p className="text-sm text-slate-500">
                    Lengkapi informasi dasar, sumber soal, dan konfigurasi AI.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Judul Soal</label>
                    <Input
                      value={form.data.title}
                      onChange={(event) => form.setData("title", event.target.value)}
                      placeholder="Contoh: Ujian Akhir Dasar Pemrograman"
                      className="h-11 rounded-xl border-slate-200"
                    />
                    <FieldError message={form.errors.title} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Kategori</label>
                    <Input
                      value={form.data.category_name}
                      onChange={(event) => form.setData("category_name", event.target.value)}
                      placeholder="Contoh: Pemrograman Web"
                      className="h-11 rounded-xl border-slate-200"
                    />
                    <FieldError message={form.errors.category_name} />
                  </div>

                  <div className="md:col-span-2">
                    <ToggleField
                      checked={form.data.is_generate_ai}
                      onChange={(value) => {
                        form.setData("is_generate_ai", value);
                        if (value) {
                          form.setData("has_answer_key", false);
                          form.setData("generate_answer_key", true);
                          form.setData("question_file", null);
                          form.setData("answer_key_file", null);
                        } else {
                          form.setData("material_file", null);
                        }
                      }}
                      label="Generate AI"
                      description="Jika aktif, AI membuat soal pilihan ganda dari file materi yang Anda unggah."
                    />
                    <FieldError message={form.errors.is_generate_ai} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Status</label>
                    <Select value={form.data.status} onValueChange={(value) => form.setData("status", value)}>
                      <SelectTrigger className="h-11 rounded-xl border-slate-200">
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError message={form.errors.status} />
                  </div>

                  {form.data.is_generate_ai ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Jumlah Soal</label>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={form.data.ai_question_count}
                          onChange={(event) => form.setData("ai_question_count", event.target.value)}
                          className="h-11 rounded-xl border-slate-200"
                        />
                        <FieldError message={form.errors.ai_question_count} />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Upload Materi</label>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(event) => form.setData("material_file", event.target.files?.[0] ?? null)}
                          className="h-11 rounded-xl border-slate-200"
                        />
                        <p className="text-xs text-slate-500">
                          AI akan membaca materi ini untuk membuat soal pilihan ganda dan kunci jawabannya.
                        </p>
                        <FieldError message={form.errors.material_file} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-slate-700">Upload Soal</label>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(event) => form.setData("question_file", event.target.files?.[0] ?? null)}
                          className="h-11 rounded-xl border-slate-200"
                        />
                        <p className="text-xs text-slate-500">
                          Unggah dokumen soal pilihan ganda. AI akan dipakai bila Anda ingin membuat kunci jawaban otomatis.
                        </p>
                        <FieldError message={form.errors.question_file} />
                      </div>

                      <div className="md:col-span-2">
                        <ToggleField
                          checked={form.data.has_answer_key}
                          onChange={(value) => {
                            form.setData("has_answer_key", value);
                            if (value) {
                              form.setData("generate_answer_key", false);
                            } else {
                              form.setData("answer_key_file", null);
                              form.setData("generate_answer_key", true);
                            }
                          }}
                          label="Kunci Jawaban Tersedia"
                          description="Aktifkan jika file soal sudah memuat kunci jawaban atau Anda ingin menambahkan file kunci jawaban terpisah."
                        />
                        <FieldError message={form.errors.has_answer_key} />
                      </div>

                      {form.data.has_answer_key ? (
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-slate-700">
                            Upload File Kunci Jawaban (Opsional)
                          </label>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={(event) =>
                              form.setData("answer_key_file", event.target.files?.[0] ?? null)
                            }
                            className="h-11 rounded-xl border-slate-200"
                          />
                          <p className="text-xs text-slate-500">
                            Biarkan kosong jika kunci jawaban sudah menyatu di file soal. Jika ada file terpisah, unggah di sini agar Gemini membacanya juga.
                          </p>
                          <FieldError message={form.errors.answer_key_file} />
                        </div>
                      ) : (
                        <div className="md:col-span-2">
                          <ToggleField
                            checked={form.data.generate_answer_key}
                            onChange={(value) => form.setData("generate_answer_key", value)}
                            label="Generate Jawaban"
                            description="Jika file kunci jawaban tidak ada, AI akan membuat kunci jawaban berdasarkan file soal."
                          />
                          <FieldError message={form.errors.generate_answer_key} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </section>

              <aside className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-100 text-amber-600">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">Pemateri</h2>
                      <p className="text-sm text-slate-500">Pilih satu atau lebih pemateri.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {instructors.length === 0 && (
                      <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
                        Belum ada data pemateri yang bisa dipilih.
                      </p>
                    )}

                    {instructors.map((instructor) => {
                      const active = form.data.instructor_ids.includes(instructor.id);

                      return (
                        <button
                          key={instructor.id}
                          type="button"
                          onClick={() => toggleInstructor(instructor.id)}
                          className={[
                            "flex w-full items-start justify-between rounded-2xl border px-4 py-3 text-left transition-colors",
                            active
                              ? "border-blue-200 bg-blue-50"
                              : "border-slate-200 bg-white hover:border-slate-300",
                          ].join(" ")}
                        >
                          <div>
                            <p className="font-medium text-slate-800">{instructor.name}</p>
                            <p className="text-sm text-slate-500">{instructor.email}</p>
                          </div>
                          <span
                            className={[
                              "mt-1 inline-flex h-5 w-5 rounded-full border-2",
                              active ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-white",
                            ].join(" ")}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <FieldError message={form.errors.instructor_ids} />
                </section>

                <section className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/10">
                  <h2 className="text-lg font-semibold">Catatan Proses</h2>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    <li>Mode AI: file materi digunakan untuk membangkitkan soal pilihan ganda.</li>
                    <li>Mode unggah manual: AI membaca file soal dan file kunci untuk membentuk struktur soal.</li>
                    <li>Jika tidak ada file kunci jawaban, aktifkan generate jawaban.</li>
                  </ul>
                </section>
              </aside>
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 backdrop-blur">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl"
                onClick={() => window.history.back()}
              >
                Batal
              </Button>

              <Button
                type="submit"
                disabled={form.processing}
                className="h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                {form.processing ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                    Memproses dengan Gemini...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Simpan Soal
                  </span>
                )}
              </Button>
            </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

CreateQuestionPage.layout = (page) => <DashboardLayout children={page} />;
