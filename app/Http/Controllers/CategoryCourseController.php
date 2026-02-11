<?php

namespace App\Http\Controllers;

use App\Models\CategoryCourse;
use App\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $data = $request->validate([
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
        ]);

        $course = Course::findOrFail($data['course_id']);
        $course->categories()->syncWithoutDetaching([$data['category_id']]);

        return response()->json(['data' => $course->load('categories')], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CategoryCourse $categoryCourse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoryCourse $categoryCourse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CategoryCourse $categoryCourse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryCourse $categoryCourse)
    {
        $categoryCourse->delete();

        return response()->noContent();
    }
}
