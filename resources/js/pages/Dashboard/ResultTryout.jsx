import React from "react";
import { Head, Link } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock3,
  FileText,
  Trophy,
  XCircle,
} from "lucide-react";

function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours < 1) return `${minutes} menit`;
  if (minutes === 0) return `${hours} jam`;

  return `${hours} jam ${minutes} menit`;
}

function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function DashboardResultTryoutPage({ question, tryout, result }) {
  const summary = result.summary;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <Head title={`Hasil Tryout #${tryout.id}`} />

      <section className="rounded-[34px] bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_58%,_#38bdf8_100%)] px-6 py-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.20)] md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
              <Award className="h-4 w-4" />
              Hasil Tryout #{tryout.id}
            </div>
            <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight md:text-4xl">
              {question.title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              Ringkasan jawaban, skor, dan pembahasan ditampilkan dalam versi dashboard agar
              riwayat tryout tetap mudah ditinjau kembali.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 text-center backdrop-blur-sm">
            <p className="text-sm text-white/72">Score</p>
            <p className="mt-2 text-5xl font-semibold text-white">{summary.score}</p>
            <p className="mt-2 text-sm text-white/72">dari 100 poin</p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SummaryCard
          icon={CheckCircle2}
          label="Jawaban Benar"
          value={`${summary.correct_answers} soal`}
          tone="emerald"
        />
        <SummaryCard
          icon={XCircle}
          label="Jawaban Salah"
          value={`${summary.wrong_answers} soal`}
          tone="rose"
        />
        <SummaryCard
          icon={Clock3}
          label="Belum Dijawab"
          value={`${summary.unanswered_questions} soal`}
          tone="amber"
        />
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="space-y-5">
          {result.items.map((item) => (
            <article
              key={item.id}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Soal {item.order}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">
                    {item.is_correct
                      ? "Jawaban Benar"
                      : item.is_answered
                        ? "Jawaban Salah"
                        : "Belum Dijawab"}
                  </h2>
                </div>
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                    item.is_correct
                      ? "bg-emerald-50 text-emerald-700"
                      : item.is_answered
                        ? "bg-rose-50 text-rose-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.is_correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {item.is_correct ? "Benar" : item.is_answered ? "Salah" : "Kosong"}
                </div>
              </div>

              <div className="mt-5 rounded-[28px] bg-slate-50 p-5">
                <p className="text-base leading-8 text-slate-900">{item.prompt}</p>
              </div>

              <div className="mt-5 grid gap-3">
                {item.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`rounded-[24px] border px-4 py-4 ${
                      answer.is_correct
                        ? "border-emerald-200 bg-emerald-50"
                        : answer.is_selected_wrong
                          ? "border-rose-200 bg-rose-50"
                          : answer.is_selected
                            ? "border-blue-200 bg-blue-50"
                            : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                          answer.is_correct
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : answer.is_selected_wrong
                              ? "border-rose-600 bg-rose-600 text-white"
                              : answer.is_selected
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-300 bg-white text-slate-700"
                        }`}
                      >
                        {answer.option_label}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm leading-7 text-slate-700">{answer.answer_text}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                          {answer.is_correct ? (
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                              Kunci jawaban
                            </span>
                          ) : null}
                          {answer.is_selected ? (
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                              Jawaban Anda
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 rounded-[24px] border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
                <ResultMeta label="Jawaban Anda" value={item.selected_option || "-"} />
                <ResultMeta label="Jawaban Benar" value={item.correct_option} />
              </div>

              {item.explanation ? (
                <div className="mt-5 rounded-[24px] border border-slate-200 bg-white px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Pembahasan
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.explanation}</p>
                </div>
              ) : null}
            </article>
          ))}
        </section>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Ringkasan Hasil</h2>
            <div className="mt-5 space-y-4 border-t border-slate-100 pt-5">
              <ResultMeta label="ID Quiz" value={question.id} />
              <ResultMeta label="ID Tryout" value={tryout.id} />
              <ResultMeta label="Kategori" value={question.category} />
              <ResultMeta label="Total Soal" value={`${summary.total_questions} soal`} />
              <ResultMeta label="Durasi" value={formatDuration(tryout.duration_minutes)} />
              <ResultMeta label="Selesai" value={formatDate(tryout.finished_at)} />
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Aksi</h2>
            <div className="mt-5 space-y-3">
              <Link
                href={route("dashboard.tryout.result")}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Riwayat Tryout
              </Link>

              <Link
                href={route("exam.tryout.show", {
                  question: question.id,
                  tryout: tryout.id,
                })}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <FileText className="mr-2 h-4 w-4" />
                Lihat Jawaban Tryout
              </Link>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Highlight</h2>
            <div className="mt-5 grid gap-4">
              <MiniStat icon={Trophy} label="Skor" value={`${summary.score}`} />
              <MiniStat
                icon={CheckCircle2}
                label="Akurasi"
                value={`${Math.round((summary.correct_answers / Math.max(summary.total_questions, 1)) * 100)}%`}
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, tone }) {
  const tones = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <div className={`rounded-[28px] border p-5 shadow-sm ${tones[tone]}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-blue-600 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-lg font-semibold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ResultMeta({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-right text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

DashboardResultTryoutPage.layout = (page) => <DashboardLayout children={page} />;
