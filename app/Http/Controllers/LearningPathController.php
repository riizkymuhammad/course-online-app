<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningPathController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));

        $categories = Category::query()
            ->withCount(['courses', 'questions'])
            ->with([
                'courses' => function ($query) {
                    $query
                        ->select(['courses.id', 'courses.uuid', 'courses.slug', 'courses.title', 'courses.instructor', 'courses.status'])
                        ->withCount(['sections', 'modules'])
                        ->orderBy('courses.title');
                },
                'questions' => function ($query) {
                    $query
                        ->select(['id', 'category_id', 'title', 'status'])
                        ->with(['instructors:id,name'])
                        ->withCount([
                            'items',
                            'tryouts as finished_tryouts_count' => fn ($tryoutQuery) => $tryoutQuery->where('status', 'finished'),
                        ])
                        ->withAvg([
                            'tryouts as finished_tryouts_average_score' => fn ($tryoutQuery) => $tryoutQuery->where('status', 'finished'),
                        ], 'score')
                        ->orderBy('title');
                },
            ])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhereHas('courses', fn ($courseQuery) => $courseQuery->where('title', 'like', "%{$search}%"))
                        ->orWhereHas('questions', fn ($questionQuery) => $questionQuery->where('title', 'like', "%{$search}%"));
                });
            })
            ->where(function ($query) {
                $query
                    ->has('courses')
                    ->orHas('questions');
            })
            ->orderBy('name')
            ->paginate(8)
            ->withQueryString()
            ->through(function (Category $category) {
                $totalSections = $category->courses->sum('sections_count');
                $totalModules = $category->courses->sum('modules_count');
                $totalFinishedTryouts = $category->questions->sum('finished_tryouts_count');
                $averageScore = $category->questions
                    ->filter(fn ($question) => $question->finished_tryouts_count > 0)
                    ->avg('finished_tryouts_average_score');

                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'courses_count' => $category->courses_count,
                    'questions_count' => $category->questions_count,
                    'total_sections' => $totalSections,
                    'total_modules' => $totalModules,
                    'total_finished_tryouts' => $totalFinishedTryouts,
                    'average_score' => $averageScore !== null ? (int) round($averageScore) : null,
                    'courses' => $category->courses->map(fn ($course) => [
                        'id' => $course->id,
                        'uuid' => $course->uuid,
                        'slug' => $course->slug,
                        'title' => $course->title,
                        'instructor' => $course->instructor,
                        'status' => $course->status,
                        'sections_count' => $course->sections_count,
                        'modules_count' => $course->modules_count,
                        'detail_url' => route('dashboard.management-course.detail', [
                            'course' => $course->uuid,
                            'slug' => $course->slug,
                        ]),
                    ])->values(),
                    'questions' => $category->questions->map(fn ($question) => [
                        'id' => $question->id,
                        'title' => $question->title,
                        'status' => $question->status,
                        'questions_count' => $question->items_count,
                        'finished_tryouts_count' => $question->finished_tryouts_count,
                        'average_score' => $question->finished_tryouts_count > 0
                            ? (int) round((float) $question->finished_tryouts_average_score)
                            : null,
                        'instructors' => $question->instructors->pluck('name')->values(),
                        'detail_url' => route('dashboard.management-questions.detail', ['question' => $question->id]),
                        'quiz_url' => route('exam.quiz.show', ['question' => $question->id]),
                    ])->values(),
                ];
            });

        return Inertia::render('Dashboard/ManagementLearningPath', [
            'paths' => $categories->items(),
            'pagination' => [
                'current_page' => $categories->currentPage(),
                'last_page' => $categories->lastPage(),
                'per_page' => $categories->perPage(),
                'total' => $categories->total(),
                'from' => $categories->firstItem() ?? 0,
                'to' => $categories->lastItem() ?? 0,
            ],
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}
