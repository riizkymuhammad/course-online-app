<?php

use App\Http\Controllers\CourseImageController;
use App\Http\Controllers\LearningPathController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Models\Course;
use App\Models\Question;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

Route::get('/', function () {
    $courses = Course::query()
        ->with('categories')
        ->latest()
        ->take(4)
        ->get()
        ->map(function ($course) {
            $category = $course->categories->pluck('name')->first() ?? '-';
            return [
                'id' => $course->id,
                'uuid' => $course->uuid,
                'slug' => $course->slug,
                'title' => $course->title,
                'description' => $course->description,
                'image' => $course->image ?: route('course.image', [
                    'title' => $course->title,
                    'category' => $category,
                ]),
                'category' => $category,
                'price' => $course->price ?? 0,
            ];
        });

    $quizzes = Question::query()
        ->with(['category', 'items'])
        ->where('assessment_type', 'quiz')
        ->where('status', 'published')
        ->latest()
        ->take(4)
        ->get()
        ->map(function (Question $question) {
            return [
                'id' => $question->id,
                'title' => $question->title,
                'category' => $question->category?->name ?? '-',
                'description' => $question->processing_notes,
                'questions_count' => $question->items->count(),
                'duration_minutes' => max(10, $question->items->count() * 2),
                'href' => route('exam.quiz.show', ['question' => $question->id]),
            ];
        });

    $tryouts = Question::query()
        ->with(['category', 'items'])
        ->where('assessment_type', 'tryout')
        ->where('status', 'published')
        ->latest()
        ->take(4)
        ->get()
        ->map(function (Question $question) {
            return [
                'id' => $question->id,
                'title' => $question->title,
                'category' => $question->category?->name ?? '-',
                'description' => $question->processing_notes,
                'questions_count' => $question->items->count(),
                'duration_minutes' => max(10, $question->items->count() * 2),
                'href' => route('exam.quiz.show', ['question' => $question->id]),
                'type' => 'tryout',
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'courses' => $courses,
        'quizzes' => $quizzes,
        'tryouts' => $tryouts,
    ]);
});

Route::get('/discovery', function () {
    return Inertia::render('Discovery');
});

Route::get('/course-image', [CourseImageController::class, 'show'])
    ->name('course.image');

Route::get('/course/{course}/{slug}', function (Course $course, string $slug) {
    $course->load(['categories', 'sections.modules', 'instructorUser']);
    $category = $course->categories->pluck('name')->first() ?? '-';

    $totalSections = $course->sections->count();
    $totalModules = $course->sections->sum(function ($section) {
        return $section->modules->count();
    });

    return Inertia::render('Course', [
        'course' => [
            'id' => $course->id,
            'uuid' => $course->uuid,
            'slug' => $course->slug,
            'title' => $course->title,
            'description' => $course->description,
            'image' => $course->image ?: route('course.image', [
                'title' => $course->title,
                'category' => $category,
            ]),
            'category' => $category,
            'price' => $course->price ?? 0,
            'instructor' => $course->instructorUser?->name ?? $course->instructor,
            'duration' => $course->duration,
            'features' => $course->features ?? [],
            'sections' => $course->sections,
            'totalSections' => $totalSections,
            'totalModules' => $totalModules,
        ],
    ]);
});

Route::get('/course/{id}', function ($id) {
    $course = Course::where('id', $id)->first();
    if (!$course) {
        abort(404);
    }

    return redirect("/course/{$course->uuid}/{$course->slug}");
});

Route::get('/exam/quiz/{question}', [QuestionController::class, 'examShow'])
    ->name('exam.quiz.show');

Route::post('/exam/quiz/{question}/start', [QuestionController::class, 'startTryout'])
    ->middleware('auth')
    ->name('exam.quiz.start');

Route::get('/exam/{question}/tryout/{tryout}', [QuestionController::class, 'tryoutShow'])
    ->middleware('auth')
    ->name('exam.tryout.show');

Route::post('/exam/{question}/tryout/{tryout}/finish', [QuestionController::class, 'finishTryout'])
    ->middleware('auth')
    ->name('exam.tryout.finish');

Route::get('/exam/{question}/tryout/{tryout}/result', [QuestionController::class, 'tryoutResult'])
    ->middleware('auth')
    ->name('exam.tryout.result');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/learning', function () {
    return Inertia::render('Dashboard/Learning');
})->middleware(['auth', 'verified'])->name('dashboard.learning');

Route::get('/dashboard/course', function () {
 return Inertia::render('Dashboard/Course');
})->middleware(['auth', 'verified'])->name('dashboard.course');

Route::get('/dashboard/tryout', [QuestionController::class, 'dashboardTryouts'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.tryout');

Route::get('/dashboard/tryout/result', [QuestionController::class, 'dashboardTryoutResults'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.tryout.result');

Route::get('/dashboard/tryout/result/{question}/{tryout}', [QuestionController::class, 'dashboardTryoutResult'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.result-tryout');


Route::get('/dashboard/management-course', [\App\Http\Controllers\CourseController::class, 'index'])
    ->name('dashboard.management-course');

Route::get('/dashboard/management-questions', [QuestionController::class, 'index'])
    ->name('dashboard.management-questions');

Route::get('/dashboard/management-quiz', [QuestionController::class, 'quizIndex'])
    ->name('dashboard.management-quiz');

Route::get('/dashboard/management-quiz/create', [QuestionController::class, 'quizCreate'])
    ->name('dashboard.management-quiz.create');

Route::get('/dashboard/management-quiz/{question}/edit', [QuestionController::class, 'quizEdit'])
    ->name('dashboard.management-quiz.edit');

Route::get('/dashboard/management-quiz/{question}', [QuestionController::class, 'quizShow'])
    ->name('dashboard.management-quiz.detail');

Route::get('/dashboard/management-learning-path', [LearningPathController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.management-learning-path');

Route::get('/dashboard/management-questions/create', [QuestionController::class, 'create'])
    ->name('dashboard.management-questions.create');

Route::get('/dashboard/management-questions/{question}/edit', [QuestionController::class, 'edit'])
    ->name('dashboard.management-questions.edit');

Route::get('/dashboard/management-questions/{question}', [QuestionController::class, 'show'])
    ->name('dashboard.management-questions.detail');

Route::post('/dashboard/management-questions', [QuestionController::class, 'store'])
    ->name('dashboard.management-questions.store');

Route::post('/dashboard/management-questions/{question}', [QuestionController::class, 'update'])
    ->name('dashboard.management-questions.update');

Route::get('/dashboard/management-course/create', function () {
 return Inertia::render('Dashboard/ManagementCourse/Create');
})->name('dashboard.management-course.create');

Route::post('/dashboard/management-course', [\App\Http\Controllers\CourseController::class, 'store'])
    ->name('dashboard.management-course.store');

Route::post('/dashboard/management-course/{course}', [\App\Http\Controllers\CourseController::class, 'update'])
    ->name('dashboard.management-course.update');

Route::get('/dashboard/management-course/{course}/{slug}', [\App\Http\Controllers\CourseController::class, 'show'])
    ->name('dashboard.management-course.detail');

Route::delete('/dashboard/management-course/{course}', [\App\Http\Controllers\CourseController::class, 'destroy'])
    ->name('dashboard.management-course.destroy');

Route::get('/dashboard/management-users', function () {
 return Inertia::render('Dashboard/ManagementUsers');
})->name('dashboard.management-users');

Route::get('/dashboard/purchases', function () {
 return Inertia::render('Dashboard/Purchases');
})->name('dashboard.purchases');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
