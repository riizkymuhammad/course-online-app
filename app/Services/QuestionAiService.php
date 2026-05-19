<?php

namespace App\Services;

use App\Models\Question;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class QuestionAiService
{
    private const GEMINI_PROVIDER = 'gemini';
    private const GEMINI_MODEL = 'gemini-3-flash-preview';
    private const GEMINI_TIMEOUT = 240;

    public function process(Question $question, array $data): array
    {
        $this->guardAvailability();

        Log::info('Question AI service entered', [
            'title' => $data['title'] ?? null,
            'assessment_type' => $data['assessment_type'] ?? 'tryout',
            'has_material_file' => ! empty($data['material_file']),
            'selected_materials_count' => count($data['selected_materials'] ?? []),
            'is_generate_ai' => (bool) ($data['is_generate_ai'] ?? false),
        ]);

        if (($data['assessment_type'] ?? 'tryout') === 'quiz') {
            if (empty($data['material_file'])) {
                throw new RuntimeException('File materi wajib diunggah untuk generate quiz.');
            }

            return $this->generateQuizQuestionsFromUploadedMaterial($data);
        }

        return $data['is_generate_ai']
            ? $this->generateQuestionsFromMaterial($data)
            : $this->processQuestionFiles($question, $data);
    }

    private function guardAvailability(): void
    {
        if (! function_exists('Laravel\\Ai\\agent') || ! class_exists(\Laravel\Ai\Files\Document::class)) {
            throw new RuntimeException(
                'Package Laravel AI belum terpasang. Install "laravel/ai" dan konfigurasi provider AI terlebih dulu.'
            );
        }

        if (blank((string) env('GEMINI_API_KEY'))) {
            throw new RuntimeException('GEMINI_API_KEY belum terisi di file .env.');
        }
    }

    private function generateQuestionsFromMaterial(array $data): array
    {
        $attachment = $this->storeAttachment($data['material_file']);
        $requestedCount = (int) $data['ai_question_count'];

        Log::info('Tryout AI generation started from uploaded material', [
            'title' => $data['title'] ?? null,
            'requested_count' => $requestedCount,
        ]);

        $response = \Laravel\Ai\agent(
            instructions: 'Anda adalah penyusun ujian profesional. Buat soal pilihan ganda berbahasa Indonesia yang jelas, relevan, dan hanya berdasarkan materi terlampir. Jawaban wajib berbentuk JSON valid tanpa markdown.'
        )->prompt(
            'Buat tepat ' . $requestedCount . ' soal pilihan ganda dari materi terlampir. '
            . 'Aturan wajib: setiap soal harus memiliki tepat 4 opsi jawaban, hanya 1 jawaban benar, '
            . 'dan opsi ditulis sebagai array 4 item. Kembalikan JSON dengan format: '
            . '{"questions":[{"question":"","options":["","","",""],"correct_option":"A","explanation":""}],"notes":""}. '
            . 'correct_option hanya boleh A, B, C, atau D.',
            attachments: [$attachment],
            provider: self::GEMINI_PROVIDER,
            model: self::GEMINI_MODEL,
            timeout: self::GEMINI_TIMEOUT
        );

        Log::info('Tryout AI generation response received', [
            'title' => $data['title'] ?? null,
            'response_length' => strlen((string) ($response->text ?? '')),
        ]);

        $payload = $this->normalizeQuestionSet(
            $this->decodeJsonResponse($response->text ?? ''),
            $requestedCount
        );

        return [
            'question_payload' => $payload['questions'] ?? [],
            'answer_key_payload' => $payload['answer_key'] ?? [],
            'processing_notes' => $payload['notes'] ?? "Soal dibuat dari materi menggunakan Laravel AI sebanyak {$requestedCount} soal pilihan ganda.",
            'generate_answer_key' => true,
            'has_answer_key' => true,
        ];
    }

    private function generateQuizQuestionsFromUploadedMaterial(array $data): array
    {
        $attachment = $this->storeAttachment($data['material_file']);
        $requestedCount = (int) ($data['ai_question_count'] ?? 10);

        Log::info('Quiz AI generation started from uploaded material', [
            'title' => $data['title'] ?? null,
            'requested_count' => $requestedCount,
        ]);

        $response = \Laravel\Ai\agent(
            instructions: 'Anda adalah penyusun quiz pembelajaran profesional. Buat soal pilihan ganda berbahasa Indonesia yang runtut mengikuti urutan materi pada dokumen terlampir. Jawaban wajib berbentuk JSON valid tanpa markdown.'
        )->prompt(
            'Buat tepat ' . $requestedCount . ' soal pilihan ganda dari materi terlampir. '
            . 'Aturan wajib: susun soal secara bertahap mengikuti urutan pembahasan materi, jangan acak topik, '
            . 'setiap soal harus memiliki tepat 4 opsi jawaban, hanya 1 jawaban benar, dan opsi ditulis sebagai array 4 item. '
            . 'Kembalikan JSON dengan format: '
            . '{"questions":[{"question":"","options":["","","",""],"correct_option":"A","explanation":""}],"notes":""}. '
            . 'correct_option hanya boleh A, B, C, atau D.',
            attachments: [$attachment],
            provider: self::GEMINI_PROVIDER,
            model: self::GEMINI_MODEL,
            timeout: self::GEMINI_TIMEOUT
        );

        Log::info('Quiz AI generation response received from uploaded material', [
            'title' => $data['title'] ?? null,
            'response_length' => strlen((string) ($response->text ?? '')),
        ]);

        $payload = $this->normalizeQuestionSet(
            $this->decodeJsonResponse($response->text ?? ''),
            $requestedCount
        );

        return [
            'question_payload' => $payload['questions'] ?? [],
            'answer_key_payload' => $payload['answer_key'] ?? [],
            'processing_notes' => $payload['notes'] ?? "Quiz dibuat dari file materi terunggah sebanyak {$requestedCount} soal.",
            'generate_answer_key' => true,
            'has_answer_key' => true,
        ];
    }

    private function processQuestionFiles(Question $question, array $data): array
    {
        $attachments = [$this->storeAttachment($data['question_file'])];

        Log::info('Manual question file processing started', [
            'title' => $data['title'] ?? null,
            'has_answer_key_file' => ! empty($data['answer_key_file']),
            'generate_answer_key' => (bool) ($data['generate_answer_key'] ?? false),
        ]);

        $prompt = 'Ekstrak semua soal pilihan ganda dari file terlampir dan kembalikan JSON valid tanpa markdown. '
            . 'Format JSON: {"questions":[{"question":"","options":["","","",""],"correct_option":"A","explanation":""}],"notes":""}. '
            . 'correct_option hanya boleh A, B, C, atau D.';

        if (! empty($data['answer_key_file'])) {
            $attachments[] = $this->storeAttachment($data['answer_key_file']);
            $prompt = 'Ekstrak semua soal pilihan ganda dan kunci jawabannya dari file soal serta file kunci jawaban terlampir. '
                . 'Kembalikan JSON valid tanpa markdown dengan format: {"questions":[{"question":"","options":["","","",""],"correct_option":"A","explanation":""}],"notes":""}. '
                . 'correct_option hanya boleh A, B, C, atau D.';
        } elseif (! empty($data['has_answer_key'])) {
            $prompt = 'Ekstrak semua soal pilihan ganda beserta kunci jawabannya dari file terlampir. '
                . 'File ini mungkin sudah memuat soal sekaligus jawaban. Kembalikan JSON valid tanpa markdown dengan format: '
                . '{"questions":[{"question":"","options":["","","",""],"correct_option":"A","explanation":""}],"notes":""}. '
                . 'correct_option hanya boleh A, B, C, atau D.';
        } elseif (! empty($data['generate_answer_key'])) {
            $prompt = 'Ekstrak semua soal pilihan ganda dari file soal terlampir, lalu buatkan kunci jawabannya. '
                . 'Kembalikan JSON valid tanpa markdown dengan format: {"questions":[{"question":"","options":["","","",""],"correct_option":"A","explanation":""}],"notes":""}. '
                . 'correct_option hanya boleh A, B, C, atau D.';
        }

        $response = \Laravel\Ai\agent(
            instructions: 'Anda adalah evaluator akademik. Baca dokumen soal dengan teliti dan hasilkan struktur JSON yang rapi untuk soal pilihan ganda. Jawaban wajib berbentuk JSON valid tanpa markdown.'
        )->prompt(
            $prompt,
            attachments: $attachments,
            provider: self::GEMINI_PROVIDER,
            model: self::GEMINI_MODEL,
            timeout: self::GEMINI_TIMEOUT
        );

        Log::info('Manual question file processing response received', [
            'title' => $data['title'] ?? null,
            'response_length' => strlen((string) ($response->text ?? '')),
        ]);

        $payload = $this->normalizeQuestionSet($this->decodeJsonResponse($response->text ?? ''));

        return [
            'question_payload' => $payload['questions'] ?? [],
            'answer_key_payload' => $payload['answer_key'] ?? [],
            'processing_notes' => $payload['notes'] ?? 'Soal diproses dari file menggunakan Laravel AI.',
            'generate_answer_key' => (bool) ($data['generate_answer_key'] ?? false),
            'has_answer_key' => ! empty($data['answer_key_file']) || ! empty($payload['answer_key']),
        ];
    }

    private function storeAttachment(UploadedFile $file): mixed
    {
        return \Laravel\Ai\Files\Document::fromUpload($file);
    }

    private function normalizeQuestionSet(array $payload, ?int $expectedCount = null): array
    {
        $items = $payload['questions'] ?? $payload['items'] ?? [];

        if (! is_array($items) || count($items) === 0) {
            throw new RuntimeException('Gemini tidak mengembalikan daftar soal yang valid.');
        }

        if (! is_null($expectedCount) && count($items) !== $expectedCount) {
            throw new RuntimeException(
                "Gemini harus mengembalikan tepat {$expectedCount} soal, namun yang diterima " . count($items) . '.'
            );
        }

        $questions = [];
        $answerKey = [];

        foreach (array_values($items) as $index => $item) {
            $normalized = $this->normalizeQuestionItem($item, $index + 1);
            $questions[] = $normalized;
            $answerKey[] = [
                'number' => $index + 1,
                'answer' => $normalized['correct_option'],
                'explanation' => $normalized['explanation'],
            ];
        }

        return [
            'questions' => $questions,
            'answer_key' => $answerKey,
            'notes' => $payload['notes'] ?? null,
        ];
    }

    private function normalizeQuestionItem(mixed $item, int $number): array
    {
        if (! is_array($item)) {
            throw new RuntimeException("Format soal ke-{$number} tidak valid.");
        }

        $question = trim((string) ($item['question'] ?? $item['prompt'] ?? ''));
        $explanation = trim((string) ($item['explanation'] ?? ''));
        $options = $item['options'] ?? [];

        if ($question === '') {
            throw new RuntimeException("Teks soal ke-{$number} kosong.");
        }

        if (! is_array($options) || count($options) !== 4) {
            throw new RuntimeException("Soal ke-{$number} harus memiliki tepat 4 opsi jawaban.");
        }

        $normalizedOptions = array_map(
            fn ($option) => trim((string) (is_array($option) ? ($option['text'] ?? '') : $option)),
            array_values($options)
        );

        foreach ($normalizedOptions as $index => $option) {
            if ($option === '') {
                $label = chr(65 + $index);
                throw new RuntimeException("Opsi {$label} pada soal ke-{$number} kosong.");
            }
        }

        $correctOption = $this->extractCorrectOption($item, $normalizedOptions, $number);

        return [
            'number' => $number,
            'question' => $question,
            'options' => $normalizedOptions,
            'correct_option' => $correctOption,
            'explanation' => $explanation,
        ];
    }

    private function extractCorrectOption(array $item, array $options, int $number): string
    {
        $correct = strtoupper(trim((string) (
            $item['correct_option']
            ?? $item['answer']
            ?? $item['correctAnswer']
            ?? ''
        )));

        if (in_array($correct, ['A', 'B', 'C', 'D'], true)) {
            return $correct;
        }

        $normalizedAnswer = trim((string) (
            $item['answer_text']
            ?? $item['correct_answer_text']
            ?? $item['correctAnswerText']
            ?? $item['answer']
            ?? ''
        ));

        if ($normalizedAnswer !== '') {
            foreach ($options as $index => $option) {
                if (strcasecmp($normalizedAnswer, $option) === 0) {
                    return chr(65 + $index);
                }
            }
        }

        throw new RuntimeException("Kunci jawaban soal ke-{$number} tidak valid.");
    }

    private function decodeJsonResponse(string $text): array
    {
        $clean = trim($text);
        $clean = preg_replace('/^```json\s*/', '', $clean) ?? $clean;
        $clean = preg_replace('/^```\s*/', '', $clean) ?? $clean;
        $clean = preg_replace('/\s*```$/', '', $clean) ?? $clean;

        $decoded = json_decode($clean, true);

        if (! is_array($decoded)) {
            throw new RuntimeException('Respons AI tidak valid dan tidak bisa diubah menjadi JSON.');
        }

        return $decoded;
    }
}
