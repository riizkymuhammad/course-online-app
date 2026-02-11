<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CategoryCourse extends Pivot
{
    protected $table = 'category_courses';

    protected $fillable = [
        'course_id',
        'category_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
