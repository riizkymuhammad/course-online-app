import React, { useEffect, useMemo, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flag,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react";

function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours < 1) return `${minutes} menit`;
  return `${hours} jam ${minutes} menit`;
}

export default function TryoutPage({ question, tryout }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => normalizeAnswers(tryout.answer_sheet));
  const [isFinishing, setIsFinishing] = useState(false);

  const totalQuestions = question.items.length;
  const activeQuestion = question.items[currentIndex];
  const answeredCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers],
  );
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  useEffect(() => {
    setAnswers(normalizeAnswers(tryout.answer_sheet));
  }, [tryout.answer_sheet]);

  function handleFinishTryout() {
    const confirmed = window.confirm(
      "Semua soal sudah terisi. Apakah Anda yakin ingin menyelesaikan tryout ini?",
    );

    if (!confirmed) return;

    setIsFinishing(true);

    router.post(
      route("exam.tryout.finish", {
        question: question.id,
        tryout: tryout.id,
      }),
      { answers },
      {
        preserveScroll: true,
        onFinish: () => setIsFinishing(false),
      },
    );
  }

  if (!activeQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Head title="Tryout" />
        <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Soal tidak tersedia</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Quiz ini belum memiliki butir soal yang bisa dikerjakan.
          </p>
          <Link
            href={route("exam.quiz.show", question.id)}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 px-5 text-sm font-medium text-slate-700"
          >
            Kembali ke Preview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#f5f7fb,_#edf4ff)] text-slate-900">
      <Head title={`${question.title} | Tryout #${tryout.id}`} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <section className="rounded-[34px] bg-[linear-gradient(135deg,_#122c4f_0%,_#1d4ed8_58%,_#0ea5e9_100%)] px-6 py-6 text-white shadow-[0_28px_70px_rgba(18,44,79,0.20)] md:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Tryout Aktif #{tryout.id}
              </div>
              <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight md:text-4xl">
                {question.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
                Halaman tryout menampilkan seluruh soal quiz dengan navigasi nomor dan peta soal.
                Record tryout ini sudah dibuat saat tombol mulai ujian ditekan.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <StatBox label="Durasi" value={formatDuration(tryout.duration_minutes)} icon={Clock3} />
              <StatBox label="Terjawab" value={`${answeredCount}/${totalQuestions}`} icon={CheckCircle2} />
              <StatBox label="Status" value={tryout.status} icon={LayoutGrid} />
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.45fr_0.85fr]">
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Soal {activeQuestion.order} dari {totalQuestions}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Nomor {activeQuestion.order}
                </h2>
              </div>
              <Link
                href={route("exam.quiz.show", question.id)}
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Kembali ke Preview
              </Link>
            </div>

            <div className="pt-6">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-base leading-8 text-slate-900">{activeQuestion.prompt}</p>
              </div>

              <div className="mt-6 grid gap-3">
                {activeQuestion.answers.map((answer) => {
                  const isSelected = answers[activeQuestion.id] === answer.option_label;

                  return (
                    <button
                      key={answer.id}
                      type="button"
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [activeQuestion.id]: answer.option_label,
                        }))
                      }
                      className={`flex items-start gap-4 rounded-[24px] border px-4 py-4 text-left transition ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white text-slate-700"
                        }`}
                      >
                        {answer.option_label}
                      </span>
                      <span className="text-sm leading-7 text-slate-700">{answer.answer_text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentIndex((current) => Math.max(0, current - 1))}
                  disabled={currentIndex === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Sebelumnya
                </Button>

                {isLastQuestion && isAllAnswered ? (
                  <Button
                    type="button"
                    onClick={handleFinishTryout}
                    disabled={isFinishing}
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    {isFinishing ? "Menyelesaikan..." : "Selesai"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((current) => Math.min(totalQuestions - 1, current + 1))
                    }
                    disabled={isLastQuestion}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Berikutnya
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Peta Soal</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Klik nomor untuk pindah ke soal tertentu. Warna biru menandai soal aktif, hijau
                menandai soal yang sudah dipilih jawabannya.
              </p>

              <div className="mt-5 grid grid-cols-5 gap-3 sm:grid-cols-6">
                {question.items.map((item, index) => {
                  const isActive = index === currentIndex;
                  const isAnswered = Boolean(answers[item.id]);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      className={`h-12 rounded-2xl border text-sm font-semibold transition ${
                        isActive
                          ? "border-blue-600 bg-blue-600 text-white"
                          : isAnswered
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.order}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Ringkasan Tryout</h2>
              <div className="mt-5 space-y-4">
                <SummaryRow label="ID Quiz" value={question.id} />
                <SummaryRow label="ID Tryout" value={tryout.id} />
                <SummaryRow label="Kategori" value={question.category} />
                <SummaryRow label="Soal Dijawab" value={`${answeredCount} dari ${totalQuestions}`} />
                <SummaryRow label="Durasi" value={formatDuration(tryout.duration_minutes)} />
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Catatan</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <p>Kerjakan semua soal lalu buka nomor terakhir untuk menyelesaikan tryout.</p>
                <p>Tombol `Selesai` akan muncul saat semua jawaban terisi dan Anda berada di soal terakhir.</p>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}

function normalizeAnswers(answerSheet) {
  if (!answerSheet || Array.isArray(answerSheet)) return {};
  return answerSheet;
}

function StatBox({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[28px] border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/72">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/14">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-right text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
