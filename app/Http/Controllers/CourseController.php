<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::query()
            ->with('categories')
            ->withCount(['sections', 'modules'])
            ->latest()
            ->get();

        return Inertia::render('Dashboard/ManagementCourse', [
            'courses' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $this->validateCourse($request);

        $thumbnail = $this->generateThumbnail(
            $data['title'],
            $data['image'] ?? null
        );

        $slug = $this->uniqueSlug($data['title']);

        $course = Course::create([
            'title' => $data['title'],
            'slug' => $slug,
            'description' => $data['description'] ?? null,
            'price' => $data['price'] ?? null,
            'instructor' => $data['instructor'] ?? null,
            'duration' => $data['duration'] ?? null,
            'image' => $thumbnail,
            'features' => $data['features'] ?? [],
            'status' => $data['status'] ?? 'draft',
        ]);

        $this->syncCategories($course, $data['category'] ?? []);

        return redirect()
            ->route('dashboard.management-course.detail', [
                'course' => $course->uuid,
                'slug' => $course->slug,
            ])
            ->with('success', 'Kursus berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load(['categories', 'sections.modules']);

        return Inertia::render('Dashboard/ManagementCourse/Detail', [
            'course' => $course,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $data = $this->validateCourse($request, $course->id);

        $thumbnail = $this->generateThumbnail(
            $data['title'],
            $data['image'] ?? $course->image
        );

        $slug = $this->uniqueSlug($data['title'], $course->id);

        $course->update([
            'title' => $data['title'],
            'slug' => $slug,
            'description' => $data['description'] ?? null,
            'price' => $data['price'] ?? null,
            'instructor' => $data['instructor'] ?? null,
            'duration' => $data['duration'] ?? null,
            'image' => $thumbnail,
            'features' => $data['features'] ?? [],
            'status' => $data['status'] ?? $course->status,
        ]);

        $this->syncCategories($course, $data['category'] ?? []);

        return redirect()
            ->route('dashboard.management-course.detail', [
                'course' => $course->uuid,
                'slug' => $course->slug,
            ])
            ->with('success', 'Perubahan kursus berhasil disimpan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->noContent();
    }

    private function validateCourse(Request $request, ?int $courseId = null): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['nullable', 'integer', 'min:0'],
            'instructor' => ['nullable', 'string', 'max:255'],
            'duration' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'features' => ['nullable', 'array'],
            'features.*' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', 'max:50'],
            'category' => ['nullable', 'array'],
            'category.*' => ['nullable', 'string', 'max:100'],
        ]);
    }

    private function generateThumbnail(string $title, ?string $image): ?string
    {
        if (!empty($image)) {
            return $image;
        }

        if (!extension_loaded('gd')) {
            return null;
        }

        $width = 640;
        $height = 360;
        $canvas = imagecreatetruecolor($width, $height);
        if (!$canvas) {
            return null;
        }

        $white = imagecolorallocate($canvas, 255, 255, 255);
        $blue = imagecolorallocate($canvas, 37, 99, 235);
        $lightBlue = imagecolorallocate($canvas, 219, 234, 254);
        imagefilledrectangle($canvas, 0, 0, $width, $height, $white);
        imagefilledrectangle($canvas, 0, 0, $width, 90, $lightBlue);
        imagefilledrectangle($canvas, 0, $height - 80, $width, $height, $lightBlue);

        $title = trim($title);
        $words = preg_split('/\s+/', $title);
        $lines = [];
        $current = '';
        foreach ($words as $word) {
            $test = trim($current . ' ' . $word);
            if (strlen($test) <= 24) {
                $current = $test;
            } else {
                $lines[] = $current;
                $current = $word;
            }
        }
        if ($current !== '') {
            $lines[] = $current;
        }
        $lines = array_slice($lines, 0, 3);

        $font = 5;
        $lineHeight = imagefontheight($font) + 6;
        $textY = 120;
        foreach ($lines as $line) {
            $textWidth = imagefontwidth($font) * strlen($line);
            $textX = max(20, (int) (($width - $textWidth) / 2));
            imagestring($canvas, $font, $textX, $textY, $line, $blue);
            $textY += $lineHeight;
        }

        $directory = public_path('course-thumbs');
        if (!is_dir($directory)) {
            @mkdir($directory, 0755, true);
        }

        $filename = (string) Str::uuid() . '.png';
        $fullPath = $directory . DIRECTORY_SEPARATOR . $filename;
        imagepng($canvas, $fullPath, 6);
        imagedestroy($canvas);

        return '/course-thumbs/' . $filename;
    }

    private function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base !== '' ? $base : 'kursus';
        $counter = 2;

        while (Course::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $slug = $base !== '' ? "{$base}-{$counter}" : "kursus-{$counter}";
            $counter++;
        }

        return $slug;
    }

    private function syncCategories(Course $course, array $categoryNames): void
    {
        $names = array_values(array_filter(array_unique($categoryNames)));
        if (count($names) === 0) {
            $course->categories()->sync([]);
            return;
        }

        $categoryIds = [];
        foreach ($names as $name) {
            $category = Category::firstOrCreate(
                ['name' => $name],
                ['slug' => Str::slug($name)]
            );
            $categoryIds[] = $category->id;
        }

        $course->categories()->sync($categoryIds);
    }
}
