<?php

use App\Http\Controllers\CourseImageController;
use App\Http\Controllers\ProfileController;
use App\Models\Course;
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

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'courses' => $courses,
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


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/learning', function () {
    return Inertia::render('Dashboard/Learning');
})->middleware(['auth', 'verified'])->name('dashboard.learning');

Route::get('/dashboard/course', function () {
 return Inertia::render('Dashboard/Course');
})->middleware(['auth', 'verified'])->name('dashboard.course');


Route::get('/dashboard/management-course', [\App\Http\Controllers\CourseController::class, 'index'])
    ->name('dashboard.management-course');

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
