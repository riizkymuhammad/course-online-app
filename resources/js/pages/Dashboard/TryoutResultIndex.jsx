import React, { useEffect, useRef, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ArrowRight, CheckCircle2, Clock3, FileText, Search, Trophy, User2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PaginationBar } from "@/components/dashboard/PaginationBar";

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

function formatDuration(totalMinutes) {
  if (!totalMinutes) return "-";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours < 1) return `${minutes} menit`;
  if (minutes === 0) return `${hours} jam`;

  return `${hours} jam ${minutes} menit`;
}

export default function DashboardTryoutResultIndexPage({
  tryouts = [],
  pagination = null,
  filters = {},
  isAdmin = false,
}) {
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
        route("dashboard.tryout.result"),
        { search: keyword || undefined, page: 1 },
        { preserveState: true, replace: true, preserveScroll: true }
      );
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [keyword]);

  const handlePageChange = (page) => {
    router.get(
      route("dashboard.tryout.result"),
      { search: keyword || undefined, page },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white p-6 lg:p-8">
      <Head title="Riwayat Tryout" />

      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-2.5 text-white shadow-lg shadow-blue-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Dashboard
              </p>
              <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">Riwayat Tryout</h1>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-500">
            {isAdmin
              ? "Lihat semua riwayat pengerjaan tryout dari seluruh user, lengkap dengan user, skor, dan tautan ke detail hasil."
              : "Lihat daftar tryout yang sudah Anda kerjakan beserta skor dan tautan cepat ke halaman hasil."}
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={isAdmin ? "Cari tryout atau user..." : "Cari judul tryout atau kategori..."}
            className="h-12 rounded-2xl border-slate-200 bg-white pl-12 shadow-sm"
          />
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <SummaryCard icon={FileText} label="Total Riwayat" value={`${tryouts.length}`} tone="blue" />
        <SummaryCard icon={CheckCircle2} label="Selesai" value={`${tryouts.length}`} tone="emerald" />
        <SummaryCard
          icon={Trophy}
          label="Skor Tertinggi"
          value={tryouts.length > 0 ? `${Math.max(...tryouts.map((item) => item.score ?? 0))}` : "-"}
          tone="amber"
        />
      </div>

      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-900">Daftar Tryout Dikerjakan</h2>
          <p className="mt-1 text-sm text-slate-500">
            Menampilkan {pagination?.total ?? tryouts.length} riwayat tryout yang sudah diselesaikan.
          </p>
        </div>

        {tryouts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-slate-100 text-slate-400">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-900">Belum ada tryout selesai</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              Riwayat tryout yang sudah dikerjakan akan muncul di halaman ini setelah diselesaikan.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tryouts.map((tryout) => (
              <article
                key={tryout.id}
                className="flex flex-col gap-5 px-6 py-5 transition-colors hover:bg-slate-50/80 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      Tryout #{tryout.id}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Selesai
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-slate-900">
                    {tryout.question?.title || "Tryout"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Kategori: {tryout.question?.category || "-"}
                  </p>

                  {isAdmin ? (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
                      <User2 className="h-4 w-4 text-slate-500" />
                      <span>
                        {tryout.user?.name || "-"} ({tryout.user?.email || "-"})
                      </span>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span>Skor {tryout.score ?? 0}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                      <Clock3 className="h-4 w-4 text-blue-500" />
                      <span>{formatDuration(tryout.duration_minutes)}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Selesai {formatDate(tryout.finished_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {tryout.result_url ? (
                    <Link
                      href={tryout.result_url}
                      prefetch
                      className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Lihat Hasil
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <PaginationBar
        pagination={pagination}
        itemLabel="riwayat tryout"
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, tone }) {
  const tones = {
    blue: "from-blue-500 to-cyan-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-r p-3 text-white shadow-lg ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

DashboardTryoutResultIndexPage.layout = (page) => <DashboardLayout children={page} />;
