<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Course;
use App\Models\Section;
use App\Models\Module;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::find(1);
        if (!$user) {
            $user = User::factory()->create([
                'name' => 'Default Instructor',
                'email' => 'instructor@example.com',
            ]);
        }

        $categories = [
            'CPNS',
            'Bahasa Inggris',
            'SMA',
            'SMP',
            'SD',
        ];

        $categoryModels = collect($categories)->mapWithKeys(function ($name) {
            $category = Category::firstOrCreate(
                ['name' => $name],
                ['slug' => Str::slug($name)]
            );

            return [$name => $category];
        });

        $courseCount = 10;
        for ($i = 1; $i <= $courseCount; $i++) {
            $categoryName = $categories[($i - 1) % count($categories)];
            $category = $categoryModels[$categoryName];

            $title = "{$categoryName} Course {$i}";
            $slugBase = Str::slug($title);
            $slug = $slugBase;
            $counter = 2;
            while (Course::where('slug', $slug)->exists()) {
                $slug = "{$slugBase}-{$counter}";
                $counter++;
            }

            $course = Course::create([
                'uuid' => (string) Str::uuid(),
                'title' => $title,
                'slug' => $slug,
                'description' => "Materi lengkap untuk {$categoryName}. Kursus ini dirancang agar mudah dipahami dan terstruktur.",
                'price' => 99000 + ($i * 10000),
                'instructor' => $user->name,
                'instructor_id' => $user->id,
                'duration' => (10 + $i) . ' jam',
                'image' => null,
                'features' => [
                    'Akses seumur hidup',
                    'Sertifikat penyelesaian',
                    'Materi terstruktur',
                    'Latihan soal',
                ],
                'status' => 'published',
            ]);

            $course->categories()->sync([$category->id]);

            for ($s = 1; $s <= 5; $s++) {
                $section = Section::create([
                    'course_id' => $course->id,
                    'title' => "Section {$s}: Dasar {$categoryName}",
                    'description' => "Pembahasan dasar {$categoryName} pada section {$s}.",
                    'position' => $s,
                ]);

                for ($m = 1; $m <= 10; $m++) {
                    Module::create([
                        'section_id' => $section->id,
                        'title' => "Module {$m}: Topik {$categoryName}",
                        'description' => "Materi modul {$m} untuk {$categoryName}.",
                        'url' => null,
                        'duration' => (5 + $m) . ' menit',
                        'type' => 'video',
                        'position' => $m,
                        'thumbnail' => null,
                        'video_id' => null,
                    ]);
                }
            }
        }
    }
}
