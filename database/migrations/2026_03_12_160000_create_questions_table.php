<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status')->default('draft');
            $table->boolean('is_generate_ai')->default(false);
            $table->unsignedInteger('ai_question_count')->nullable();
            $table->boolean('has_answer_key')->default(false);
            $table->boolean('generate_answer_key')->default(false);
            $table->string('material_file_path')->nullable();
            $table->string('question_file_path')->nullable();
            $table->string('answer_key_file_path')->nullable();
            $table->json('question_payload')->nullable();
            $table->json('answer_key_payload')->nullable();
            $table->text('processing_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
