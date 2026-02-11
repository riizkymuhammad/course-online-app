<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'title',
        'description',
        'url',
        'duration',
        'type',
        'position',
        'thumbnail',
        'video_id',
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }
}
