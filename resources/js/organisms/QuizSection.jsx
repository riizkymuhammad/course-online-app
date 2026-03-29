import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizCard } from "@/molecules/QuizCard";

export function QuizSection({ quizzes = [] }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">Quiz</h2>
            <p className="text-muted-foreground">
              Latihan soal terbaru dari paket quiz yang sudah dipublikasikan
            </p>
          </div>

          <Link href="/dashboard/tryout">
            <Button
              variant="ghost"
              className="h-auto gap-2 p-0 font-medium text-primary hover:bg-primary/10 hover:text-primary"
            >
              Lihat Semua Quiz
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} {...quiz} />
          ))}
        </div>
      </div>
    </section>
  );
}
