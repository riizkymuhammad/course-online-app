<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->string('assessment_type', 20)->default('tryout')->after('title');
        });

        DB::table('questions')
            ->whereNull('assessment_type')
            ->update(['assessment_type' => 'tryout']);
    }

    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('assessment_type');
        });
    }
};
