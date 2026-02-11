<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'title',
        'slug',
        'description',
        'price',
        'instructor',
        'duration',
        'image',
        'features',
        'status',
    ];

    protected $casts = [
        'features' => 'array',
        'price' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function (Course $course) {
            if (empty($course->uuid)) {
                $course->uuid = (string) Str::uuid();
            }
        });
    }

    public function getRouteKeyName()
    {
        return 'uuid';
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_courses')->withTimestamps();
    }

    public function categoryCourses()
    {
        return $this->hasMany(CategoryCourse::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    public function modules()
    {
        return $this->hasManyThrough(Module::class, Section::class);
    }
}
