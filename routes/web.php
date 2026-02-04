<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/discovery', function () {
    return Inertia::render('Discovery');
});

Route::get('/course/{id}', function ($id) {
    return Inertia::render('Course', [
        'id' => (string) $id,
    ]);
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


Route::get('/dashboard/management-course', function () {
 return Inertia::render('Dashboard/ManagementCourse');
})->name('dashboard.management-course');

Route::get('/dashboard/management-course/create', function () {
 return Inertia::render('Dashboard/ManagementCourse/Create');
})->name('dashboard.management-course.create');

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
