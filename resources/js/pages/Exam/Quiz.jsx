import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Navbar } from "@/organisms/Navbar";
import { Footer } from "@/organisms/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileQuestion,
  FolderOpen,
  Play,
  ScrollText,
  UserRound,
} from "lucide-react";

const footerSections = [
  {
    title: "Kategori",
    links: [
      { label: "Bahasa Inggris", href: "/kategori/bahasa-inggris" },
      { label: "CPNS", href: "/kategori/cpns" },
      { label: "SD", href: "/kategori/sd" },
      { label: "SMP", href: "/kategori/smp" },
      { label: "SMA", href: "/kategori/sma" },
      { label: "UTBK", href: "/kategori/utbk" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Karir", href: "/karir" },
      { label: "Blog", href: "/blog" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
  {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
      { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    ],
  },
];

function estimateMinutes(questionCount) {
  return Math.max(10, questionCount * 2);
}

function statusLabel(status) {
  return status === "published" ? "Terbit" : "Draft";
}

function shorten(text, max = 180) {
  if (!text) return "-";
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[28px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/72">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/14">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function QuizPage({ question }) {
  const questionCount = question.items.length;
  const durationMinutes = estimateMinutes(questionCount);
  const instructors = question.instructors.map((item) => item.name).join(", ") || "-";
  const files = [
    { label: "File Materi", value: question.files.material },
    { label: "File Soal", value: question.files.question },
    { label: "File Kunci", value: question.files.answer_key },
  ].filter((item) => item.value);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.10),_transparent_30%),linear-gradient(to_bottom,_#f8fbff,_#eef4ff)] text-slate-900">
      <Head title={`${question.title} | Preview Ujian`} />
      <Navbar />

      <main className="pb-16">
        <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-900">
                Beranda
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-slate-900">Preview Quiz</span>
            </div>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Kembali
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <section className="overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,_#0f4c81_0%,_#1d4ed8_55%,_#06b6d4_100%)] p-6 text-white shadow-[0_30px_80px_rgba(15,76,129,0.25)] md:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-semibold">
                  <ScrollText className="h-4 w-4" />
                  Preview Paket Soal
                </div>
                <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
                  {question.title}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/82 md:text-base">
                  Halaman ini menampilkan daftar soal dari quiz yang dipilih. Saat tombol
                  `Mulai Ujian` diklik, sistem akan membuat data tryout user lalu mengarahkan ke
                  halaman pengerjaan.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
                    {statusLabel(question.status)}
                  </span>
                  <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
                    {question.category}
                  </span>
                  <span className="rounded-full bg-white/14 px-3 py-1 text-xs font-semibold">
                    Pilihan Ganda
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
                <SummaryCard icon={FileQuestion} label="Total Soal" value={questionCount} />
                <SummaryCard icon={Clock3} label="Estimasi" value={`${durationMinutes} menit`} />
                <SummaryCard icon={UserRound} label="Pengajar" value={question.instructors.length} />
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-end">
            <aside className="w-full space-y-6 lg:max-w-md lg:sticky lg:top-6 lg:self-start">
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Mulai Tryout</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Tombol di bawah akan membuat data tryout baru untuk user aktif dan membuka halaman
                  pengerjaan di URL `/exam/{question.id}/tryout/[id tryout]`.
                </p>

                <div className="mt-5 space-y-4 border-y border-slate-100 py-5">
                  <InfoRow label="Jumlah Soal" value={`${questionCount} soal`} />
                  <InfoRow label="Durasi" value={`${durationMinutes} menit`} />
                  <InfoRow label="Pemateri" value={instructors} />
                </div>

                <div className="mt-5 space-y-3">
                  <Link
                    href={route("exam.quiz.start", question.id)}
                    method="post"
                    as="button"
                    className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Mulai Ujian
                  </Link>

                  <Link
                    href={`/dashboard/management-questions/${question.id}`}
                    className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Detail Dashboard
                  </Link>
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Berkas Terkait</h2>
                <div className="mt-4 space-y-3">
                  {files.length > 0 ? (
                    files.map((file) => (
                      <a
                        key={file.label}
                        href={file.value.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <span className="flex items-center gap-3">
                          <FolderOpen className="h-4 w-4 text-slate-400" />
                          {file.label}
                        </span>
                        <span className="font-semibold text-slate-900">Buka</span>
                      </a>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-500">
                      Tidak ada berkas terkait.
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Aturan Singkat</h2>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <RuleItem text="Setiap klik mulai ujian membuat satu record tryout baru." />
                  <RuleItem text="Halaman tryout menampilkan peta soal dan navigasi nomor." />
                  <RuleItem text="Kunci jawaban tetap tersimpan di backend untuk proses penilaian berikutnya." />
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>

      <Footer footerSections={footerSections} socialLinks={[]} />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="max-w-[15rem] text-right text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

function RuleItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" />
      <p>{text}</p>
    </div>
  );
}
