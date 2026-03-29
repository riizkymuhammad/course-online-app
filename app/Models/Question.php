<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category_id',
        'status',
        'is_generate_ai',
        'ai_question_count',
        'has_answer_key',
        'generate_answer_key',
        'material_file_path',
        'question_file_path',
        'answer_key_file_path',
        'question_payload',
        'answer_key_payload',
        'processing_notes',
    ];

    protected function casts(): array
    {
        return [
            'is_generate_ai' => 'boolean',
            'has_answer_key' => 'boolean',
            'generate_answer_key' => 'boolean',
            'question_payload' => 'array',
            'answer_key_payload' => 'array',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function instructors()
    {
        return $this->belongsToMany(User::class, 'question_user')->withTimestamps();
    }

    public function items()
    {
        return $this->hasMany(QuestionItem::class)->orderBy('question_order');
    }

    public function tryouts()
    {
        return $this->hasMany(Tryout::class);
    }
}
