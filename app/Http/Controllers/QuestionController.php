<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Question;
use App\Models\QuestionAnswer;
use App\Models\QuestionItem;
use App\Models\Tryout;
use App\Models\User;
use App\Services\QuestionAiService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function __construct(private readonly QuestionAiService $questionAiService)
    {
    }

    public function index(Request $request)
    {
        return $this->renderManagementIndex($request, 'tryout');
    }

    public function quizIndex(Request $request)
    {
        return $this->renderManagementIndex($request, 'quiz');
    }

    public function create(Request $request)
    {
        $context = $this->resolveManagementContext($request->query('context'));

        return Inertia::render('Dashboard/ManagementQuestion/Create', [
            'context' => $context,
            'instructors' => $this->getInstructors(),
            'statuses' => $this->getStatuses(),
        ]);
    }

    public function quizCreate()
    {
        return Inertia::render('Dashboard/ManagementQuiz/Create', [
            'categories' => $this->getCategoryOptions(),
            'instructors' => $this->getFormattedInstructors(),
            'statuses' => $this->getStatuses(),
        ]);
    }

    public function edit(Request $request, Question $question)
    {
        $context = $this->resolveManagementContext($request->query('context') ?: $question->assessment_type);
        $question->load(['category', 'instructors', 'items']);

        return Inertia::render('Dashboard/ManagementQuestion/Create', [
            'context' => $context,
            'mode' => 'edit',
            'question' => $this->formatQuestionForEdit($question),
            'instructors' => $this->getInstructors(),
            'statuses' => $this->getStatuses(),
        ]);
    }

    public function quizEdit(Question $question)
    {
        $question->load(['category', 'instructors', 'items']);

        return Inertia::render('Dashboard/ManagementQuiz/Create', [
            'mode' => 'edit',
            'question' => $this->formatQuestionForEdit($question),
            'categories' => $this->getCategoryOptions(),
            'instructors' => $this->getFormattedInstructors(),
            'statuses' => $this->getStatuses(),
        ]);
    }

    public function update(Request $request, Question $question)
    {
        Log::info('Question update request received', [
            'question_id' => $question->id,
            'assessment_type' => $question->assessment_type,
            'title' => $request->input('title'),
            'status' => $request->input('status'),
            'category_names_count' => count((array) $request->input('category_names', [])),
            'instructor_count' => count((array) $request->input('instructor_ids', [])),
        ]);

        $data = $this->validateQuestionUpdate($request, $question);

        Log::info('Question update validation passed', [
            'question_id' => $question->id,
            'assessment_type' => $question->assessment_type,
            'title' => $data['title'],
            'status' => $data['status'],
        ]);

        if ($question->assessment_type === 'quiz') {
            $categoryNames = array_values($data['category_names'] ?? []);
            $data['category_name'] = $categoryNames[0] ?? null;
        }

        $category = null;
        if (! empty($data['category_name'])) {
            $category = Category::firstOrCreate(
                ['name' => $data['category_name']],
                ['slug' => Str::slug($data['category_name'])]
            );
        }

        $question->update([
            'title' => $data['title'],
            'category_id' => $category?->id,
            'status' => $data['status'],
        ]);

        $question->instructors()->sync(array_map('intval', $data['instructor_ids'] ?? []));

        Log::info('Question update completed', [
            'question_id' => $question->id,
            'assessment_type' => $question->assessment_type,
            'status' => $question->fresh()->status,
        ]);

        return redirect()
            ->route(
                $question->assessment_type === 'quiz'
                    ? 'dashboard.management-quiz.edit'
                    : 'dashboard.management-questions.edit',
                $question->assessment_type === 'quiz'
                    ? ['question' => $question->id]
                    : ['question' => $question->id, 'context' => 'tryout']
            )
            ->with('success', $question->assessment_type === 'quiz'
                ? 'Quiz berhasil diperbarui.'
                : 'Tryout berhasil diperbarui.');
    }

    private function getInstructors()
    {
        $instructors = User::query()
            ->whereIn('role', ['fasilitator', 'superadmin'])
            ->orderBy('name')
            ->get(['id', 'name', 'email']);

        if ($instructors->isEmpty()) {
            $instructors = User::query()
                ->orderBy('name')
                ->get(['id', 'name', 'email']);
        }

        return $instructors;
    }

    private function getFormattedInstructors()
    {
        return $this->getInstructors()->map(fn (User $user) => [
            'label' => $user->name,
            'value' => (string) $user->id,
            'description' => $user->email,
        ])->values();
    }

    private function getCategoryOptions()
    {
        return Category::query()
            ->orderBy('name')
            ->get(['name'])
            ->map(fn (Category $category) => [
                'label' => $category->name,
                'value' => $category->name,
            ])
            ->values();
    }

    private function getStatuses(): array
    {
        return [
            ['label' => 'Draft', 'value' => 'draft'],
            ['label' => 'Terbit', 'value' => 'published'],
        ];
    }

    public function show(Request $request, Question $question)
    {
        $context = $this->resolveManagementContext($request->query('context') ?: $question->assessment_type);
        $question->load(['category', 'instructors', 'items.answers']);

        $questionItems = $question->items->map(function (QuestionItem $item) {
            return [
                'id' => $item->id,
                'order' => $item->question_order,
                'prompt' => $item->prompt,
                'explanation' => $item->explanation,
                'correct_option' => $item->correct_option,
                'answers' => $item->answers->map(function (QuestionAnswer $answer) {
                    return [
                        'id' => $answer->id,
                        'option_label' => $answer->option_label,
                        'answer_text' => $answer->answer_text,
                        'is_correct' => (bool) $answer->is_correct,
                    ];
                })->values(),
            ];
        })->values();

        return Inertia::render('Dashboard/ManagementQuestion/Detail', [
            'context' => $context,
            'question' => [
                'id' => $question->id,
                'title' => $question->title,
                'assessment_type' => $question->assessment_type,
                'category' => $question->category?->name ?? '-',
                'status' => $question->status,
                'is_generate_ai' => (bool) $question->is_generate_ai,
                'ai_question_count' => $question->ai_question_count,
                'has_answer_key' => (bool) $question->has_answer_key,
                'generate_answer_key' => (bool) $question->generate_answer_key,
                'processing_notes' => $question->processing_notes,
                'created_at' => optional($question->created_at)?->toISOString(),
                'updated_at' => optional($question->updated_at)?->toISOString(),
                'instructors' => $question->instructors->map(fn (User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ])->values(),
                'files' => [
                    'material' => $question->material_file_path ? [
                        'name' => basename($question->material_file_path),
                        'url' => Storage::disk('public')->url($question->material_file_path),
                    ] : null,
                    'question' => $question->question_file_path ? [
                        'name' => basename($question->question_file_path),
                        'url' => Storage::disk('public')->url($question->question_file_path),
                    ] : null,
                    'answer_key' => $question->answer_key_file_path ? [
                        'name' => basename($question->answer_key_file_path),
                        'url' => Storage::disk('public')->url($question->answer_key_file_path),
                    ] : null,
                ],
                'items' => $questionItems,
            ],
        ]);
    }

    public function quizShow(Question $question)
    {
        return $this->show(request()->merge(['context' => 'quiz']), $question);
    }

    public function examShow(Question $question)
    {
        $question->load(['category', 'instructors', 'items.answers']);

        return Inertia::render('Exam/Quiz', [
            'question' => $this->formatExamQuestion($question),
        ]);
    }

    public function startTryout(Request $request, Question $question): RedirectResponse
    {
        $question->loadMissing('items');

        $durationMinutes = max(10, $question->items->count() * 2);

        $tryout = Tryout::create([
            'question_id' => $question->id,
            'user_id' => $request->user()?->id,
            'status' => 'in_progress',
            'duration_minutes' => $durationMinutes,
            'started_at' => now(),
            'answer_sheet' => [],
        ]);

        return redirect()->route('exam.tryout.show', [
            'question' => $question->id,
            'tryout' => $tryout->id,
        ]);
    }

    public function tryoutShow(Request $request, Question $question, Tryout $tryout)
    {
        $this->authorizeTryoutAccess($request, $question, $tryout);

        $question->load(['category', 'instructors', 'items.answers']);

        return Inertia::render('Exam/Tryout', [
            'question' => $this->formatExamQuestion($question),
            'tryout' => [
                'id' => $tryout->id,
                'status' => $tryout->status,
                'duration_minutes' => $tryout->duration_minutes,
                'started_at' => optional($tryout->started_at)?->toISOString(),
                'finished_at' => optional($tryout->finished_at)?->toISOString(),
                'answer_sheet' => $tryout->answer_sheet ?? [],
                'score' => $tryout->score,
            ],
        ]);
    }

    public function finishTryout(Request $request, Question $question, Tryout $tryout): RedirectResponse
    {
        $this->authorizeTryoutAccess($request, $question, $tryout);

        $validated = $request->validate([
            'answers' => ['required', 'array'],
            'answers.*' => ['nullable', 'string', 'size:1'],
        ]);

        $question->loadMissing(['items.answers']);

        $answers = collect($validated['answers'] ?? [])
            ->mapWithKeys(fn ($value, $key) => [(string) $key => $value ? Str::upper((string) $value) : null])
            ->filter(fn ($value) => filled($value))
            ->all();

        $result = $this->buildTryoutResultData($question, $answers);

        $tryout->forceFill([
            'answer_sheet' => $answers,
            'score' => $result['summary']['score'],
            'status' => 'finished',
            'finished_at' => now(),
        ])->save();

        return redirect()->route('exam.tryout.result', [
            'question' => $question->id,
            'tryout' => $tryout->id,
        ]);
    }

    public function tryoutResult(Request $request, Question $question, Tryout $tryout)
    {
        $this->authorizeTryoutAccess($request, $question, $tryout);

        $question->load(['category', 'instructors', 'items.answers']);

        $answers = collect($tryout->answer_sheet ?? [])
            ->mapWithKeys(fn ($value, $key) => [(string) $key => $value ? Str::upper((string) $value) : null])
            ->filter(fn ($value) => filled($value))
            ->all();

        $result = $this->buildTryoutResultData($question, $answers);

        if ($tryout->score !== $result['summary']['score']) {
            $tryout->forceFill(['score' => $result['summary']['score']])->save();
        }

        return Inertia::render('Exam/Result', [
            'question' => $this->formatExamQuestion($question),
            'tryout' => [
                'id' => $tryout->id,
                'status' => $tryout->status,
                'duration_minutes' => $tryout->duration_minutes,
                'started_at' => optional($tryout->started_at)?->toISOString(),
                'finished_at' => optional($tryout->finished_at)?->toISOString(),
                'answer_sheet' => $answers,
                'score' => $result['summary']['score'],
            ],
            'result' => $result,
        ]);
    }

    public function dashboardTryouts(Request $request)
    {
        $user = $request->user();
        $isAdmin = $this->isAdminUser($user);
        $search = trim((string) $request->query('search', ''));

        $questions = Question::query()
            ->where('assessment_type', 'tryout')
            ->with('category')
            ->withCount('items')
            ->withCount([
                'tryouts as total_tryouts_count' => function ($query) use ($isAdmin, $user) {
                    $query->where('status', 'finished');

                    if (! $isAdmin) {
                        $query->where('user_id', $user?->id);
                    }
                },
            ])
            ->withAvg([
                'tryouts as average_score' => function ($query) use ($isAdmin, $user) {
                    $query->where('status', 'finished');

                    if (! $isAdmin) {
                        $query->where('user_id', $user?->id);
                    }
                },
            ], 'score')
            ->when(! $isAdmin, fn ($query) => $query->where('status', 'published'))
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%")
                        ->orWhereHas('category', fn ($categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"));
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(function (Question $question) {
                return [
                    'id' => $question->id,
                    'title' => $question->title,
                    'category' => $question->category?->name ?? '-',
                    'status' => $question->status,
                    'questions_count' => $question->items_count,
                    'duration_minutes' => max(10, $question->items_count * 2),
                    'total_tryouts' => (int) ($question->total_tryouts_count ?? 0),
                    'average_score' => (int) round((float) ($question->average_score ?? 0)),
                    'quiz_url' => route('exam.quiz.show', ['question' => $question->id]),
                ];
            });

        return Inertia::render('Dashboard/Tryout', [
            'questions' => $questions->items(),
            'pagination' => [
                'current_page' => $questions->currentPage(),
                'last_page' => $questions->lastPage(),
                'per_page' => $questions->perPage(),
                'total' => $questions->total(),
                'from' => $questions->firstItem() ?? 0,
                'to' => $questions->lastItem() ?? 0,
            ],
            'filters' => [
                'search' => $search,
            ],
            'isAdmin' => $isAdmin,
        ]);
    }

    public function dashboardTryoutResults(Request $request)
    {
        $user = $request->user();
        $isAdmin = $this->isAdminUser($user);
        $search = trim((string) $request->query('search', ''));

        $tryouts = Tryout::query()
            ->with(['question.category', 'user'])
            ->whereHas('question', fn ($query) => $query->where('assessment_type', 'tryout'))
            ->when(! $isAdmin, fn ($query) => $query->where('user_id', $user->id))
            ->where('status', 'finished')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('status', 'like', "%{$search}%")
                        ->orWhereHas('question', fn ($questionQuery) => $questionQuery->where('title', 'like', "%{$search}%"))
                        ->orWhereHas('question.category', fn ($categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('user', function ($userQuery) use ($search) {
                            $userQuery
                                ->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('finished_at')
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(function (Tryout $tryout) {
                return [
                    'id' => $tryout->id,
                    'status' => $tryout->status,
                    'score' => $tryout->score,
                    'duration_minutes' => $tryout->duration_minutes,
                    'started_at' => optional($tryout->started_at)?->toISOString(),
                    'finished_at' => optional($tryout->finished_at)?->toISOString(),
                    'question' => [
                        'id' => $tryout->question?->id,
                        'title' => $tryout->question?->title ?? 'Tryout',
                        'category' => $tryout->question?->category?->name ?? '-',
                    ],
                    'user' => [
                        'id' => $tryout->user?->id,
                        'name' => $tryout->user?->name ?? 'User',
                        'email' => $tryout->user?->email ?? '-',
                    ],
                    'result_url' => $tryout->question
                        ? route('dashboard.result-tryout', [
                            'question' => $tryout->question->id,
                            'tryout' => $tryout->id,
                        ])
                        : null,
                ];
            });

        return Inertia::render('Dashboard/TryoutResultIndex', [
            'tryouts' => $tryouts->items(),
            'pagination' => [
                'current_page' => $tryouts->currentPage(),
                'last_page' => $tryouts->lastPage(),
                'per_page' => $tryouts->perPage(),
                'total' => $tryouts->total(),
                'from' => $tryouts->firstItem() ?? 0,
                'to' => $tryouts->lastItem() ?? 0,
            ],
            'filters' => [
                'search' => $search,
            ],
            'isAdmin' => $isAdmin,
        ]);
    }

    public function dashboardTryoutResult(Request $request, Question $question, Tryout $tryout)
    {
        $this->authorizeTryoutAccess($request, $question, $tryout);

        $question->load(['category', 'instructors', 'items.answers']);

        $answers = collect($tryout->answer_sheet ?? [])
            ->mapWithKeys(fn ($value, $key) => [(string) $key => $value ? Str::upper((string) $value) : null])
            ->filter(fn ($value) => filled($value))
            ->all();

        $result = $this->buildTryoutResultData($question, $answers);

        if ($tryout->score !== $result['summary']['score']) {
            $tryout->forceFill(['score' => $result['summary']['score']])->save();
        }

        return Inertia::render('Dashboard/ResultTryout', [
            'question' => $this->formatExamQuestion($question),
            'tryout' => [
                'id' => $tryout->id,
                'status' => $tryout->status,
                'duration_minutes' => $tryout->duration_minutes,
                'started_at' => optional($tryout->started_at)?->toISOString(),
                'finished_at' => optional($tryout->finished_at)?->toISOString(),
                'answer_sheet' => $answers,
                'score' => $result['summary']['score'],
            ],
            'result' => $result,
        ]);
    }

    public function store(Request $request)
    {
        @set_time_limit(300);
        @ini_set('max_execution_time', '300');

        Log::info('Question store request received', [
            'title' => $request->input('title'),
            'assessment_type' => $request->input('assessment_type'),
            'has_material_file' => $request->hasFile('material_file'),
            'has_question_file' => $request->hasFile('question_file'),
            'has_answer_key_file' => $request->hasFile('answer_key_file'),
            'category_count' => count((array) $request->input('category_names', [])),
            'instructor_count' => count((array) $request->input('instructor_ids', [])),
        ]);

        $data = $this->validateQuestion($request);
        $data = $this->normalizeStoreData($data);

        Log::info('Question store validation passed', [
            'title' => $data['title'],
            'assessment_type' => $data['assessment_type'],
            'is_generate_ai' => (bool) $data['is_generate_ai'],
            'category_count' => count($data['category_names'] ?? []),
            'instructor_count' => count($data['instructor_ids'] ?? []),
        ]);

        if ($data['assessment_type'] === 'quiz' && count($data['category_names'] ?? []) > 0) {
            Log::info('Quiz category metadata received', [
                'title' => $data['title'],
                'selected_categories' => array_values($data['category_names'] ?? []),
            ]);
        }

        if ((bool) $data['is_generate_ai'] && empty($data['material_file'])) {
            throw ValidationException::withMessages([
                'material_file' => $data['assessment_type'] === 'quiz'
                    ? 'File materi wajib diunggah untuk generate quiz.'
                    : 'File materi wajib diunggah jika generate AI diaktifkan.',
            ]);
        }

        if (! (bool) $data['is_generate_ai'] && empty($data['question_file'])) {
            throw ValidationException::withMessages([
                'question_file' => 'File soal wajib diunggah jika generate AI dimatikan.',
            ]);
        }

        if (! $data['is_generate_ai'] && ! $data['has_answer_key'] && ! $data['generate_answer_key']) {
            throw ValidationException::withMessages([
                'generate_answer_key' => 'Aktifkan generate jawaban jika file kunci jawaban tidak diunggah.',
            ]);
        }

        $category = null;
        if ($data['assessment_type'] === 'quiz' && count($data['category_names'] ?? []) > 0) {
            $data['category_name'] = $data['category_names'][0];
        }

        if (! empty($data['category_name'])) {
            $category = Category::firstOrCreate(
                ['name' => $data['category_name']],
                ['slug' => Str::slug($data['category_name'])]
            );
        }

        $materialPath = ! empty($data['material_file'])
            ? $data['material_file']->store('questions/materials', 'public')
            : null;

        $questionPath = ! empty($data['question_file'])
            ? $data['question_file']->store('questions/files', 'public')
            : null;

        $answerKeyPath = ! empty($data['answer_key_file'])
            ? $data['answer_key_file']->store('questions/answer-keys', 'public')
            : null;

        try {
            Log::info('Question store started', [
                'title' => $data['title'],
                'assessment_type' => $data['assessment_type'],
                'is_generate_ai' => (bool) $data['is_generate_ai'],
                'ai_question_count' => $data['ai_question_count'] ?? null,
                'has_material_file' => ! empty($materialPath),
                'has_question_file' => ! empty($questionPath),
                'has_answer_key_file' => ! empty($answerKeyPath),
            ]);

            Log::info('Question AI generation starting', [
                'title' => $data['title'],
                'assessment_type' => $data['assessment_type'],
                'source' => ! empty($materialPath)
                    ? 'uploaded_material'
                    : 'question_file',
            ]);

            $processedPayload = $this->questionAiService->process(new Question(), $data);

            Log::info('Question AI processing finished', [
                'title' => $data['title'],
                'assessment_type' => $data['assessment_type'],
                'generated_questions' => count($processedPayload['question_payload'] ?? []),
                'generated_answer_keys' => count($processedPayload['answer_key_payload'] ?? []),
            ]);

            Log::info(
                $data['assessment_type'] === 'quiz'
                    ? 'Quiz question generation completed successfully'
                    : 'Tryout question generation completed successfully',
                [
                    'title' => $data['title'],
                    'assessment_type' => $data['assessment_type'],
                    'generated_questions' => count($processedPayload['question_payload'] ?? []),
                    'generated_answer_keys' => count($processedPayload['answer_key_payload'] ?? []),
                ]
            );

            DB::transaction(function () use ($data, $category, $materialPath, $questionPath, $answerKeyPath, $processedPayload) {
                $question = Question::create([
                    'title' => $data['title'],
                    'assessment_type' => $data['assessment_type'],
                    'category_id' => $category?->id,
                    'status' => $data['status'],
                    'is_generate_ai' => (bool) $data['is_generate_ai'],
                    'ai_question_count' => (bool) $data['is_generate_ai'] ? (int) $data['ai_question_count'] : null,
                    'has_answer_key' => (bool) $processedPayload['has_answer_key'],
                    'generate_answer_key' => (bool) ($processedPayload['generate_answer_key'] ?? false),
                    'material_file_path' => $materialPath,
                    'question_file_path' => $questionPath,
                    'answer_key_file_path' => $answerKeyPath,
                    'question_payload' => null,
                    'answer_key_payload' => null,
                    'processing_notes' => $processedPayload['processing_notes'] ?? null,
                ]);

                $question->instructors()->sync($data['instructor_ids']);
                $this->storeQuestionRows($question, $processedPayload['question_payload'] ?? []);
            });

            Log::info('Question stored successfully', [
                'title' => $data['title'],
                'assessment_type' => $data['assessment_type'],
            ]);
        } catch (\Throwable $exception) {
            $this->deleteStoredFile($materialPath);
            $this->deleteStoredFile($questionPath);
            $this->deleteStoredFile($answerKeyPath);

            Log::error('Question store failed', [
                'title' => $data['title'] ?? null,
                'assessment_type' => $data['assessment_type'] ?? null,
                'exception' => $exception::class,
                'message' => $exception->getMessage(),
            ]);

            throw ValidationException::withMessages([
                'ai' => $exception->getMessage(),
            ]);
        }

        return redirect()
            ->route(
                $data['assessment_type'] === 'quiz'
                    ? 'dashboard.management-quiz'
                    : 'dashboard.management-questions'
            )
            ->with('success', $data['assessment_type'] === 'quiz' ? 'Quiz berhasil disimpan.' : 'Tryout berhasil disimpan.');
    }

    private function normalizeStoreData(array $data): array
    {
        if (($data['assessment_type'] ?? 'tryout') === 'quiz') {
            $data['is_generate_ai'] = true;
            $data['question_file'] = null;
            $data['answer_key_file'] = null;
            $data['has_answer_key'] = true;
            $data['generate_answer_key'] = true;
            $data['category_name'] = null;
            $data['instructor_ids'] = array_map('intval', $data['instructor_ids'] ?? []);
        }

        if ((bool) $data['is_generate_ai']) {
            $data['question_file'] = null;
            $data['answer_key_file'] = null;
            $data['has_answer_key'] = true;
            $data['generate_answer_key'] = true;
        }

        if (! (bool) $data['is_generate_ai'] && (bool) $data['has_answer_key']) {
            $data['generate_answer_key'] = false;
        }

        return $data;
    }

    private function validateQuestion(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'assessment_type' => ['required', 'in:quiz,tryout'],
            'category_name' => ['nullable', 'string', 'max:100'],
            'category_names' => ['nullable', 'array'],
            'category_names.*' => ['required', 'string', 'max:100'],
            'status' => ['required', 'in:draft,published'],
            'instructor_ids' => ['required', 'array', 'min:1'],
            'instructor_ids.*' => ['required', 'integer', 'exists:users,id'],
            'is_generate_ai' => ['required', 'boolean'],
            'ai_question_count' => ['nullable', 'integer', 'min:1', 'max:100', 'required_if:is_generate_ai,1'],
            'material_file' => ['nullable', 'file', 'mimes:pdf,doc,docx,txt', 'max:10240'],
            'question_file' => ['nullable', 'file', 'mimes:pdf,doc,docx,txt', 'max:10240'],
            'has_answer_key' => ['required', 'boolean'],
            'answer_key_file' => ['nullable', 'file', 'mimes:pdf,doc,docx,txt', 'max:10240'],
            'generate_answer_key' => ['nullable', 'boolean'],
        ]);
    }

    private function validateQuestionUpdate(Request $request, Question $question): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:draft,published'],
            'category_name' => ['nullable', 'string', 'max:100'],
            'category_names' => ['nullable', 'array'],
            'category_names.*' => ['required', 'string', 'max:100'],
            'instructor_ids' => ['required', 'array', 'min:1'],
            'instructor_ids.*' => ['required', 'integer', 'exists:users,id'],
        ]);
    }

    private function formatQuestionForEdit(Question $question): array
    {
        return [
            'id' => $question->id,
            'title' => $question->title,
            'assessment_type' => $question->assessment_type,
            'category_name' => $question->category?->name,
            'category_names' => $question->category ? [$question->category->name] : [],
            'status' => $question->status,
            'is_generate_ai' => (bool) $question->is_generate_ai,
            'ai_question_count' => $question->ai_question_count ?: $question->items->count(),
            'has_answer_key' => (bool) $question->has_answer_key,
            'generate_answer_key' => (bool) $question->generate_answer_key,
            'instructor_ids' => $question->instructors->pluck('id')->map(fn ($id) => (int) $id)->values()->all(),
            'items_count' => $question->items->count(),
            'files' => [
                'material' => $question->material_file_path ? [
                    'name' => basename($question->material_file_path),
                    'url' => Storage::disk('public')->url($question->material_file_path),
                ] : null,
                'question' => $question->question_file_path ? [
                    'name' => basename($question->question_file_path),
                    'url' => Storage::disk('public')->url($question->question_file_path),
                ] : null,
                'answer_key' => $question->answer_key_file_path ? [
                    'name' => basename($question->answer_key_file_path),
                    'url' => Storage::disk('public')->url($question->answer_key_file_path),
                ] : null,
            ],
        ];
    }

    private function deleteStoredFile(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    private function storeQuestionRows(Question $question, array $items): void
    {
        foreach ($items as $index => $item) {
            $questionItem = QuestionItem::create([
                'question_id' => $question->id,
                'question_order' => $index + 1,
                'prompt' => $item['question'],
                'explanation' => $item['explanation'] ?? null,
                'correct_option' => $item['correct_option'],
            ]);

            foreach (array_values($item['options'] ?? []) as $optionIndex => $optionText) {
                $label = chr(65 + $optionIndex);

                QuestionAnswer::create([
                    'question_item_id' => $questionItem->id,
                    'option_label' => $label,
                    'answer_text' => $optionText,
                    'is_correct' => $label === $item['correct_option'],
                ]);
            }
        }
    }

    private function formatExamQuestion(Question $question): array
    {
        return [
            'id' => $question->id,
            'title' => $question->title,
            'assessment_type' => $question->assessment_type,
            'category' => $question->category?->name ?? '-',
            'status' => $question->status,
            'is_generate_ai' => (bool) $question->is_generate_ai,
            'ai_question_count' => $question->ai_question_count,
            'has_answer_key' => (bool) $question->has_answer_key,
            'generate_answer_key' => (bool) $question->generate_answer_key,
            'processing_notes' => $question->processing_notes,
            'created_at' => optional($question->created_at)?->toISOString(),
            'updated_at' => optional($question->updated_at)?->toISOString(),
            'instructors' => $question->instructors->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ])->values(),
            'files' => [
                'material' => $question->material_file_path ? [
                    'name' => basename($question->material_file_path),
                    'url' => Storage::disk('public')->url($question->material_file_path),
                ] : null,
                'question' => $question->question_file_path ? [
                    'name' => basename($question->question_file_path),
                    'url' => Storage::disk('public')->url($question->question_file_path),
                ] : null,
                'answer_key' => $question->answer_key_file_path ? [
                    'name' => basename($question->answer_key_file_path),
                    'url' => Storage::disk('public')->url($question->answer_key_file_path),
                ] : null,
            ],
            'items' => $question->items->map(function (QuestionItem $item) {
                return [
                    'id' => $item->id,
                    'order' => $item->question_order,
                    'prompt' => $item->prompt,
                    'explanation' => $item->explanation,
                    'correct_option' => $item->correct_option,
                    'answers' => $item->answers->map(function (QuestionAnswer $answer) {
                        return [
                            'id' => $answer->id,
                            'option_label' => $answer->option_label,
                            'answer_text' => $answer->answer_text,
                            'is_correct' => (bool) $answer->is_correct,
                        ];
                    })->values(),
                ];
            })->values(),
        ];
    }

    private function authorizeTryoutAccess(Request $request, Question $question, Tryout $tryout): void
    {
        if ((int) $tryout->question_id !== (int) $question->id) {
            abort(Response::HTTP_NOT_FOUND);
        }

        if (
            $request->user()
            && ! $this->isAdminUser($request->user())
            && $tryout->user_id
            && (int) $tryout->user_id !== (int) $request->user()->id
        ) {
            abort(Response::HTTP_FORBIDDEN);
        }
    }

    private function isAdminUser(?User $user): bool
    {
        return in_array($user?->role, ['superadmin', 'fasilitator'], true);
    }

    private function buildTryoutResultData(Question $question, array $answers): array
    {
        $items = $question->items->map(function (QuestionItem $item) use ($answers) {
            $selectedOption = $answers[(string) $item->id] ?? null;
            $isCorrect = filled($selectedOption) && Str::upper($selectedOption) === Str::upper($item->correct_option);

            return [
                'id' => $item->id,
                'order' => $item->question_order,
                'prompt' => $item->prompt,
                'selected_option' => $selectedOption,
                'correct_option' => $item->correct_option,
                'is_correct' => $isCorrect,
                'is_answered' => filled($selectedOption),
                'explanation' => $item->explanation,
                'answers' => $item->answers->map(function (QuestionAnswer $answer) use ($selectedOption, $item) {
                    return [
                        'id' => $answer->id,
                        'option_label' => $answer->option_label,
                        'answer_text' => $answer->answer_text,
                        'is_correct' => (bool) $answer->is_correct,
                        'is_selected' => filled($selectedOption) && Str::upper($selectedOption) === Str::upper($answer->option_label),
                        'is_selected_wrong' => filled($selectedOption)
                            && Str::upper($selectedOption) === Str::upper($answer->option_label)
                            && Str::upper($selectedOption) !== Str::upper($item->correct_option),
                    ];
                })->values(),
            ];
        })->values();

        $totalQuestions = $items->count();
        $correctAnswers = $items->where('is_correct', true)->count();
        $answeredQuestions = $items->where('is_answered', true)->count();
        $wrongAnswers = $answeredQuestions - $correctAnswers;
        $unansweredQuestions = $totalQuestions - $answeredQuestions;
        $score = $totalQuestions > 0
            ? (int) round(($correctAnswers / $totalQuestions) * 100)
            : 0;

        return [
            'summary' => [
                'total_questions' => $totalQuestions,
                'answered_questions' => $answeredQuestions,
                'correct_answers' => $correctAnswers,
                'wrong_answers' => $wrongAnswers,
                'unanswered_questions' => $unansweredQuestions,
                'score' => $score,
            ],
            'items' => $items,
        ];
    }

    private function renderManagementIndex(Request $request, string $context)
    {
        $search = trim((string) $request->query('search', ''));
        $context = $this->resolveManagementContext($context);

        $questions = Question::query()
            ->with(['category', 'instructors:id,name'])
            ->withCount('items')
            ->where('assessment_type', $context)
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%")
                        ->orWhereHas('category', fn ($categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('instructors', fn ($instructorQuery) => $instructorQuery->where('name', 'like', "%{$search}%"));
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(function (Question $question) {
                return [
                    'id' => $question->id,
                    'title' => $question->title,
                    'category' => $question->category?->name ?? '-',
                    'instructor' => $question->instructors->pluck('name')->implode(', ') ?: '-',
                    'status' => $question->status,
                    'questions_count' => $question->items_count,
                ];
            });

        return Inertia::render('Dashboard/ManagementQuestion', [
            'context' => $context,
            'questions' => $questions->items(),
            'pagination' => [
                'current_page' => $questions->currentPage(),
                'last_page' => $questions->lastPage(),
                'per_page' => $questions->perPage(),
                'total' => $questions->total(),
                'from' => $questions->firstItem() ?? 0,
                'to' => $questions->lastItem() ?? 0,
            ],
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    private function resolveManagementContext(?string $context): string
    {
        return $context === 'quiz' ? 'quiz' : 'tryout';
    }
}
