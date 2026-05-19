<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'question_order',
        'prompt',
        'explanation',
        'correct_option',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function answers()
    {
        return $this->hasMany(QuestionAnswer::class)->orderBy('option_label');
    }
}
