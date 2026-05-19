import React, { useMemo, useState } from "react";
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
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  FileQuestion,
  Save,
  Search,
  Sparkles,
  X,
} from "lucide-react";

function FieldError({ message }) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-red-500">{message}</p>;
}

function MultiSelectCreatable({
  value = [],
  options = [],
  onChange,
  placeholder = "Pilih data...",
  searchPlaceholder = "Cari...",
  creatable = false,
  emptyLabel = "Data tidak ditemukan.",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();
  const selectedValues = new Set(value.map((item) => item.value));

  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const matchesSearch = option.label.toLowerCase().includes(normalizedSearch);
      const notSelected = !selectedValues.has(option.value);

      return matchesSearch && notSelected;
    });
  }, [options, normalizedSearch, selectedValues]);

  const canCreate =
    creatable &&
    search.trim() !== "" &&
    !options.some((option) => option.label.toLowerCase() === normalizedSearch) &&
    !value.some((item) => item.label.toLowerCase() === normalizedSearch);

  const addOption = (option) => {
    onChange([...value, option]);
    setSearch("");
  };

  const removeOption = (optionValue) => {
    onChange(value.filter((item) => item.value !== optionValue));
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex min-h-12 w-full items-start justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-slate-300"
      >
        <div className="flex flex-1 flex-wrap gap-2 pr-3">
          {value.length > 0 ? (
            value.map((item) => (
              <span
                key={item.value}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
              >
                {item.label}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeOption(item.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      removeOption(item.value);
                    }
                  }}
                  className="rounded-full p-0.5 hover:bg-blue-100"
                >
                  <X className="h-3 w-3" />
                </span>
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`mt-1 h-4 w-4 flex-shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen ? (
        <div className="absolute z-30 mt-2 w-full rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && canCreate) {
                  event.preventDefault();
                  addOption({ label: search.trim(), value: search.trim() });
                }
              }}
              placeholder={searchPlaceholder}
              className="h-10 rounded-xl border-slate-200 pl-10"
            />
          </div>

          <div className="mt-3 max-h-72 space-y-2 overflow-y-auto">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => addOption(option)}
                className="flex w-full items-start justify-between rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div>
                  <p className="font-medium text-slate-900">{option.label}</p>
                  {option.description ? (
                    <p className="mt-1 text-xs text-slate-500">{option.description}</p>
                  ) : null}
                </div>
                <Check className="mt-0.5 h-4 w-4 text-blue-600" />
              </button>
            ))}

            {canCreate ? (
              <button
                type="button"
                onClick={() => addOption({ label: search.trim(), value: search.trim() })}
                className="w-full rounded-xl border border-dashed border-blue-200 px-4 py-3 text-left text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Tambah "{search.trim()}"
              </button>
            ) : null}

            {filteredOptions.length === 0 && !canCreate ? (
              <div className="rounded-xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
                {emptyLabel}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function CreateQuizPage({
  categories = [],
  instructors = [],
  statuses = [],
  mode = "create",
  question = null,
}) {
  const isEdit = mode === "edit";
  const [isSubmittingNotice, setIsSubmittingNotice] = useState(false);
  const form = useForm({
    title: question?.title ?? "",
    assessment_type: "quiz",
    category_names: question?.category_names ?? [],
    instructor_ids: question?.instructor_ids ?? [],
    status: question?.status ?? "draft",
    ai_question_count: question?.ai_question_count ?? 10,
    material_file: null,
    is_generate_ai: true,
    has_answer_key: true,
    generate_answer_key: true,
  });

  const selectedCategories = useMemo(
    () => form.data.category_names.map((item) => ({ label: item, value: item })),
    [form.data.category_names]
  );

  const selectedInstructors = useMemo(
    () =>
      instructors.filter((option) =>
        form.data.instructor_ids.map(String).includes(String(option.value))
      ),
    [form.data.instructor_ids, instructors]
  );

  const submit = (event) => {
    event.preventDefault();
    setIsSubmittingNotice(true);

    form.transform((data) => ({
      ...data,
      category_names: selectedCategories.map((item) => item.value),
      instructor_ids: selectedInstructors.map((item) => Number(item.value)),
    })).post(isEdit ? `/dashboard/management-questions/${question.id}` : "/dashboard/management-questions", {
      forceFormData: !isEdit,
      preserveState: !isEdit,
      replace: isEdit,
      onStart: () => {
        setIsSubmittingNotice(true);
      },
      onSuccess: () => {
        setIsSubmittingNotice(false);
        window.alert(isEdit ? "Quiz berhasil diperbarui." : "Quiz berhasil diproses dan disimpan.");
        if (!isEdit) {
          window.location.href = "/dashboard/management-quiz";
        }
      },
      onError: (errors) => {
        setIsSubmittingNotice(false);
        const firstError = Object.values(errors || {}).find(Boolean);
        window.alert(firstError || `Proses ${isEdit ? "update" : "simpan"} quiz gagal. Periksa input dan coba lagi.`);
      },
      onFinish: () => {
        setIsSubmittingNotice(false);
      },
    });
  };

  return (
    <>
      <Head title={`${isEdit ? "Edit Quiz" : "Buat Quiz Baru"} | Dashboard Manajemen`} />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {isSubmittingNotice || form.processing ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {isEdit ? "Sedang menyimpan perubahan quiz" : "Sedang memproses quiz"}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {isEdit
                      ? "Perubahan metadata quiz sedang disimpan."
                      : "Permintaan simpan quiz sedang dikirim. Jika lolos validasi, AI akan menyusun soal secara runtut berdasarkan alur materi dari file yang Anda unggah."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="space-y-3">
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
                      <Link href="/dashboard/management-quiz" className="text-slate-600 hover:text-slate-900">
                        Manajemen Quiz
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium text-slate-900">{isEdit ? "Edit Quiz" : "Buat Quiz Baru"}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                  <FileQuestion className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-base font-semibold leading-tight text-slate-900 md:text-lg">{isEdit ? "Edit Quiz" : "Buat Quiz Baru"}</h1>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          <form onSubmit={submit} className="mx-auto max-w-6xl space-y-6">
            {form.errors.ai ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {form.errors.ai}
              </div>
            ) : null}

            <div className="grid gap-6 xl:grid-cols-[1.35fr,0.8fr]">
              <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-slate-900">Konfigurasi Quiz</h2>
                  <p className="text-sm text-slate-500">
                    {isEdit
                      ? "Perbarui metadata quiz yang sudah tersimpan. Hasil generate soal yang ada tidak diubah dari halaman ini."
                      : "Quiz mengikuti alur materi dari file yang Anda unggah. Kategori dan pemateri tetap bisa dipilih sebagai metadata."}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Judul Quiz</label>
                    <Input
                      value={form.data.title}
                      onChange={(event) => form.setData("title", event.target.value)}
                      placeholder="Contoh: Quiz CPNS Tahap Dasar"
                      className="h-11 rounded-xl border-slate-200"
                    />
                    <FieldError message={form.errors.title} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Kategori Quiz</label>
                    <MultiSelectCreatable
                      value={selectedCategories}
                      options={categories}
                      onChange={(items) => form.setData("category_names", items.map((item) => item.value))}
                      placeholder="Pilih kategori atau ketik kategori baru"
                      searchPlaceholder="Cari kategori, lalu Enter untuk menambah"
                      creatable
                      emptyLabel="Belum ada kategori. Ketik nama kategori lalu tekan Enter."
                    />
                    <p className="text-xs text-slate-500">
                      Kategori bersifat metadata. Jika database baru di-reset dan kategori belum ada, Anda bisa langsung mengetik misalnya `CPNS` lalu tekan Enter.
                    </p>
                    <FieldError message={form.errors.category_names} />
                  </div>

                  {!isEdit ? (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-700">Upload Materi</label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={(event) => form.setData("material_file", event.target.files?.[0] ?? null)}
                        className="h-11 rounded-xl border-slate-200"
                      />
                      <p className="text-xs text-slate-500">
                        Wajib. Quiz akan digenerate dari dokumen ini dan urutan soal akan mengikuti alur pembahasan materi.
                      </p>
                      <FieldError message={form.errors.material_file} />
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600 md:col-span-2">
                      File materi sumber tidak diubah dari halaman edit. Jika Anda ingin membuat soal baru dari file lain, gunakan halaman pembuatan quiz baru.
                    </div>
                  )}

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Pemateri</label>
                    <MultiSelectCreatable
                      value={selectedInstructors}
                      options={instructors}
                      onChange={(items) => form.setData("instructor_ids", items.map((item) => Number(item.value)))}
                      placeholder="Pilih satu atau lebih pemateri"
                      searchPlaceholder="Cari pemateri..."
                      emptyLabel="Pemateri tidak ditemukan."
                    />
                    <FieldError message={form.errors.instructor_ids} />
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

                  {!isEdit ? (
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
                  ) : (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Jumlah Soal Tersimpan</label>
                      <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700">
                        {question?.items_count ?? form.data.ai_question_count ?? 0} soal
                      </div>
                    </div>
                  )}

                  <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm leading-6 text-blue-900 md:col-span-2">
                    <p className="font-semibold">Cara kerja generate quiz</p>
                    <p className="mt-1">
                      {isEdit
                        ? "Halaman edit ini hanya memperbarui metadata quiz. Susunan soal yang sudah tersimpan tetap dipertahankan."
                        : "Sistem membaca file materi yang Anda unggah, lalu AI menyusun soal secara runtut mengikuti urutan pembahasan pada dokumen. Ini berbeda dengan tryout yang lebih fleksibel untuk randomisasi."}
                    </p>
                  </div>
                </div>
              </section>

              <aside className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/10">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                    <h2 className="text-lg font-semibold">Ringkasan</h2>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-200">
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>Kategori dipilih</span>
                      <span className="font-semibold">{selectedCategories.length}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>Pemateri dipilih</span>
                      <span className="font-semibold">{selectedInstructors.length}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>File materi</span>
                      <span className="font-semibold">
                        {isEdit ? (question?.files?.material ? "Tersimpan" : "Tidak ada") : (form.data.material_file ? "Terunggah" : "Tidak ada")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span>Jumlah soal</span>
                      <span className="font-semibold">
                        {isEdit ? (question?.items_count ?? form.data.ai_question_count ?? 0) : (form.data.ai_question_count || 0)}
                      </span>
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Catatan</h2>
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-slate-600">
                    <li>Kategori pertama yang dipilih akan menjadi kategori utama quiz.</li>
                    <li>{isEdit ? "Edit tidak mengubah file materi sumber yang sudah tersimpan." : "File materi wajib diunggah karena menjadi sumber utama generate quiz."}</li>
                    <li>{isEdit ? "Urutan soal quiz yang sudah tersimpan tetap dipertahankan." : "Urutan soal quiz mengikuti alur pembahasan pada file materi."}</li>
                    <li>Pemateri dapat dipilih lebih dari satu dengan pola multi-select.</li>
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
                <span className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {form.processing ? (isEdit ? "Menyimpan Perubahan..." : "Memproses Quiz...") : (isEdit ? "Simpan Perubahan" : "Simpan Quiz")}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

CreateQuizPage.layout = (page) => <DashboardLayout children={page} />;
