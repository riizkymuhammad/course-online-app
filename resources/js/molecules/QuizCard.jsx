import React from "react";
import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock3, FileQuestion, ArrowRight } from "lucide-react";

export function QuizCard({
  id,
  title,
  category,
  description,
  questions_count,
  duration_minutes,
  href,
  type = "quiz",
}) {
  const isQuiz = type === "quiz";
  const maxChars = 100;
  const rawDescription = (description && description.trim()) || "";
  const shortDescription =
    rawDescription.length > maxChars
      ? `${rawDescription.slice(0, maxChars).trim()}...`
      : rawDescription;

  return (
    <Link href={href || `/exam/quiz/${id}`} className="block h-full">
      <Card className="group h-full overflow-hidden border border-slate-200/80 bg-white py-0 transition-all duration-300 hover:border-cyan-200 hover:shadow-2xl">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,_#0f4c81_0%,_#1d4ed8_55%,_#06b6d4_100%)] px-5 py-6 text-white">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />
          <div className="relative">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
              {category}
            </span>
            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-cyan-100">{isQuiz ? "Quiz" : "Tryout"}</div>
                <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug">{title}</h3>
              </div>
              <div className="rounded-2xl bg-white/10 p-3">
                <FileQuestion className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {shortDescription ? (
            <p className="mb-4 line-clamp-2 text-sm text-slate-600">{shortDescription}</p>
          ) : (
            <p className="mb-4 line-clamp-2 text-sm italic text-slate-400">
              {isQuiz ? "Quiz ini siap dikerjakan dari halaman ujian." : "Tryout ini siap dikerjakan dari halaman ujian."}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
              <FileQuestion className="h-4 w-4 text-blue-500" />
              {questions_count} soal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
              <Clock3 className="h-4 w-4 text-cyan-500" />
              {duration_minutes} menit
            </span>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
            {isQuiz ? "Mulai Quiz" : "Mulai Tryout"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
