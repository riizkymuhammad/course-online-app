<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $question['title'] }} - Detail Pengerjaan Soal</title>
    <style>
        :root {
            --bg: #f8fafc;
            --surface: #ffffff;
            --surface-soft: #f8fafc;
            --border: #e2e8f0;
            --text: #0f172a;
            --muted: #64748b;
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --primary-soft: rgba(255,255,255,.14);
            --success: #059669;
            --success-soft: #ecfdf5;
            --shadow: 0 10px 30px rgba(15, 23, 42, .08);
            --radius-xl: 28px;
            --radius-lg: 22px;
            --radius-md: 18px;
            --radius-sm: 14px;
            --container: 1180px;
        }

        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: "Segoe UI", Inter, sans-serif;
            color: var(--text);
            background:
                radial-gradient(circle at top left, rgba(37, 99, 235, .08), transparent 28%),
                linear-gradient(to bottom, #f8fafc, #ffffff);
        }
        a { color: inherit; text-decoration: none; }
        .container { width: min(var(--container), calc(100% - 32px)); margin: 0 auto; }
        .topbar {
            background: rgba(255,255,255,.92);
            backdrop-filter: blur(14px);
            border-bottom: 1px solid var(--border);
        }
        .topbar-inner {
            min-height: 68px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }
        .brand {
            font-weight: 800;
            font-size: 20px;
            color: var(--primary);
            letter-spacing: -.02em;
        }
        .breadcrumb {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            color: var(--muted);
            flex-wrap: wrap;
        }
        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 12px 18px;
            font-weight: 600;
            font-size: 14px;
            background: #fff;
            cursor: pointer;
        }
        .button-primary {
            background: var(--primary);
            border-color: var(--primary);
            color: #fff;
        }
        .button-primary:hover { background: var(--primary-dark); }
        .page {
            padding: 28px 0 64px;
        }
        .hero {
            border-radius: 32px;
            padding: 36px;
            color: #fff;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 55%, #0891b2 100%);
            box-shadow: 0 16px 50px rgba(37, 99, 235, .22);
        }
        .hero-grid {
            display: grid;
            grid-template-columns: 1.35fr .95fr;
            gap: 28px;
            align-items: start;
        }
        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: var(--primary-soft);
            border-radius: var(--radius-sm);
            padding: 10px 14px;
            font-size: 14px;
            font-weight: 700;
        }
        .hero h1 {
            margin: 18px 0 0;
            font-size: clamp(32px, 5vw, 54px);
            line-height: 1.05;
            letter-spacing: -.03em;
        }
        .hero p {
            margin: 18px 0 0;
            max-width: 720px;
            font-size: 16px;
            line-height: 1.8;
            color: rgba(255,255,255,.88);
        }
        .badge-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
        }
        .badge {
            background: var(--primary-soft);
            border-radius: 999px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 700;
        }
        .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
        }
        .hero-stat {
            background: rgba(255,255,255,.12);
            border-radius: var(--radius-md);
            padding: 18px;
            backdrop-filter: blur(10px);
        }
        .hero-stat-label {
            font-size: 13px;
            color: rgba(255,255,255,.78);
        }
        .hero-stat-value {
            margin-top: 8px;
            font-size: 28px;
            font-weight: 800;
        }
        .content {
            display: grid;
            grid-template-columns: 1.75fr .95fr;
            gap: 32px;
            margin-top: 28px;
        }
        .stack { display: grid; gap: 24px; }
        .card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            padding: 28px;
            box-shadow: var(--shadow);
        }
        .card h2, .card h3 {
            margin: 0;
            letter-spacing: -.02em;
        }
        .card h2 {
            font-size: 28px;
            margin-bottom: 8px;
        }
        .card-description {
            font-size: 14px;
            color: var(--muted);
            line-height: 1.75;
            margin-bottom: 22px;
        }
        .paragraph {
            color: #334155;
            line-height: 1.9;
            font-size: 15px;
            margin: 0 0 14px;
        }
        .topic-list, .rule-list, .file-list, .question-list { display: grid; gap: 14px; }
        .topic-item {
            display: grid;
            grid-template-columns: 42px 1fr;
            gap: 14px;
            padding: 16px;
            border-radius: var(--radius-md);
            background: var(--surface-soft);
        }
        .topic-number {
            width: 42px;
            height: 42px;
            border-radius: 999px;
            display: grid;
            place-items: center;
            background: rgba(37,99,235,.12);
            color: var(--primary);
            font-weight: 800;
        }
        .topic-title {
            margin: 0;
            font-weight: 700;
        }
        .topic-text {
            margin: 4px 0 0;
            font-size: 14px;
            color: var(--muted);
            line-height: 1.7;
        }
        .rule-item {
            display: grid;
            grid-template-columns: 22px 1fr;
            gap: 12px;
            align-items: start;
            color: #334155;
            font-size: 14px;
            line-height: 1.75;
        }
        .rule-item span:first-child {
            color: var(--success);
            font-weight: 900;
            margin-top: 1px;
        }
        .sidebar { position: sticky; top: 28px; align-self: start; }
        .sidebar-block + .sidebar-block { margin-top: 24px; }
        .chip {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 14px;
            border-radius: var(--radius-sm);
            background: rgba(37,99,235,.08);
            color: var(--primary);
            font-size: 14px;
            font-weight: 700;
        }
        .meta-list {
            display: grid;
            gap: 18px;
            padding-bottom: 22px;
            margin-bottom: 22px;
            border-bottom: 1px solid #eef2f7;
        }
        .meta-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .16em;
            color: #94a3b8;
            font-weight: 700;
        }
        .meta-value {
            margin-top: 6px;
            font-size: 19px;
            font-weight: 700;
            line-height: 1.5;
        }
        .file-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            padding: 14px 16px;
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            font-size: 14px;
        }
        .file-link:hover { background: var(--surface-soft); }
        .file-name {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #334155;
        }
        .question-panel {
            margin-top: 28px;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow);
            overflow: hidden;
        }
        .question-panel-head {
            padding: 22px 24px;
            border-bottom: 1px solid #eef2f7;
            background: #fcfdff;
        }
        .question-panel-title {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
        }
        .question-card {
            padding: 24px;
            border-top: 1px solid #eef2f7;
        }
        .question-card:first-child { border-top: 0; }
        .question-head {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 18px;
        }
        .question-index {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 999px;
            background: var(--primary);
            color: #fff;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: .14em;
        }
        .question-title {
            margin: 12px 0 0;
            font-size: 18px;
            line-height: 1.7;
        }
        .answer-key {
            white-space: nowrap;
            padding: 10px 14px;
            border-radius: var(--radius-sm);
            background: var(--success-soft);
            color: var(--success);
            border: 1px solid rgba(5,150,105,.16);
            font-size: 13px;
            font-weight: 800;
        }
        .answers {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
        }
        .answer {
            display: grid;
            grid-template-columns: 34px 1fr;
            gap: 12px;
            padding: 16px;
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
            background: var(--surface-soft);
        }
        .answer.correct {
            border-color: rgba(5,150,105,.18);
            background: var(--success-soft);
        }
        .answer-label {
            width: 34px;
            height: 34px;
            display: grid;
            place-items: center;
            border-radius: 999px;
            background: #fff;
            border: 1px solid var(--border);
            font-size: 12px;
            font-weight: 800;
            color: #334155;
        }
        .answer.correct .answer-label {
            background: var(--success);
            color: #fff;
            border-color: var(--success);
        }
        .answer-text {
            font-size: 14px;
            line-height: 1.75;
            color: #334155;
        }
        .explanation {
            margin-top: 16px;
            padding: 16px;
            border-radius: var(--radius-md);
            background: var(--surface-soft);
            border: 1px solid var(--border);
        }
        .explanation-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .16em;
            color: #94a3b8;
            font-weight: 700;
        }
        .explanation-text {
            margin-top: 10px;
            font-size: 14px;
            line-height: 1.8;
            color: #475569;
        }
        .footer-note {
            padding: 26px 0 10px;
            text-align: center;
            font-size: 13px;
            color: #94a3b8;
        }

        @media (max-width: 1100px) {
            .hero-grid,
            .content {
                grid-template-columns: 1fr;
            }
            .sidebar { position: static; }
        }
        @media (max-width: 780px) {
            .hero,
            .card,
            .question-card {
                padding: 20px;
            }
            .hero-stats,
            .answers {
                grid-template-columns: 1fr;
            }
            .question-head,
            .topbar-inner {
                flex-direction: column;
                align-items: flex-start;
            }
            .topbar-inner { padding: 12px 0; }
            .question-title { font-size: 16px; }
        }
    </style>
</head>
<body>
    <header class="topbar">
        <div class="container topbar-inner">
            <a href="/" class="brand">EduKursus</a>
            <div class="breadcrumb">
                <a href="/">Beranda</a>
                <span>›</span>
                <a href="/dashboard/management-questions">Manajemen Tryout</a>
                <span>›</span>
                <span style="color: var(--text); font-weight: 700;">Detail Pengerjaan Soal</span>
            </div>
        </div>
    </header>

    <main class="page">
        <div class="container">
            <section class="hero">
                <div class="hero-grid">
                    <div>
                        <div class="eyebrow">✨ Ujian Pilihan Ganda</div>
                        <h1>{{ $question['title'] }}</h1>
                        <p>
                            Halaman ini dibuat khusus di luar dashboard untuk detail pengerjaan soal.
                            Tampilannya disesuaikan dengan referensi React/Next.js yang Anda kirim,
                            tetapi dirender langsung oleh Laravel agar bisa tampil tanpa bergantung ke Vite dev server.
                        </p>
                        <div class="badge-row">
                            <span class="badge">{{ $question['status'] === 'published' ? 'Terbit' : 'Draft' }}</span>
                            <span class="badge">{{ $question['is_generate_ai'] ? 'AI dari materi' : 'Ekstraksi dari file' }}</span>
                            <span class="badge">{{ $question['category'] }}</span>
                        </div>
                    </div>

                    <div class="hero-stats">
                        <div class="hero-stat">
                            <div class="hero-stat-label">Total Soal</div>
                            <div class="hero-stat-value">{{ count($question['items']) }}</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-label">Estimasi Waktu</div>
                            <div class="hero-stat-value">{{ max(10, count($question['items']) * 2) }} min</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-label">Format</div>
                            <div class="hero-stat-value">ABCD</div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="content">
                <div class="stack">
                    <section class="card">
                        <h2>Tentang Ujian</h2>
                        <div class="card-description">
                            Blok pengantar ini mengikuti pola halaman detail ujian modern sebelum peserta mulai mengerjakan.
                        </div>
                        <p class="paragraph">
                            Paket ini berisi soal pilihan ganda yang tersimpan satu soal per row dan satu opsi jawaban per row.
                            Struktur ini lebih siap untuk fitur pengerjaan, randomisasi soal, dan penilaian otomatis.
                        </p>
                        <p class="paragraph">
                            {{ $question['processing_notes'] ?: 'Belum ada catatan tambahan dari proses pembuatan soal. Anda tetap bisa memakai halaman ini sebagai landing page detail ujian.' }}
                        </p>
                    </section>

                    <section class="card">
                        <h2>Materi yang Diujikan</h2>
                        <div class="card-description">
                            Ringkasan topik berikut diambil dari beberapa butir awal soal agar pengguna mendapat gambaran cepat.
                        </div>
                        <div class="topic-list">
                            @forelse(collect($question['items'])->slice(0, 4) as $index => $item)
                                <div class="topic-item">
                                    <div class="topic-number">{{ $index + 1 }}</div>
                                    <div>
                                        <p class="topic-title">Topik {{ $index + 1 }}</p>
                                        <p class="topic-text">
                                            {{ \Illuminate\Support\Str::limit($item['prompt'], 120) }}
                                        </p>
                                    </div>
                                </div>
                            @empty
                                <div class="topic-item">
                                    <div>
                                        <p class="topic-text">Belum ada topik yang bisa ditampilkan.</p>
                                    </div>
                                </div>
                            @endforelse
                        </div>
                    </section>

                    <section class="card">
                        <h2>Syarat dan Ketentuan</h2>
                        <div class="card-description">
                            Bagian ini dibuat agar halaman publik tetap terasa seperti detail ujian, bukan hanya detail data.
                        </div>
                        <div class="rule-list">
                            <div class="rule-item">
                                <span>✓</span>
                                <span>Semua soal disusun dalam format pilihan ganda dengan opsi A sampai D.</span>
                            </div>
                            <div class="rule-item">
                                <span>✓</span>
                                <span>Kunci jawaban sudah tersedia per soal dan siap dipakai untuk penilaian otomatis.</span>
                            </div>
                            <div class="rule-item">
                                <span>✓</span>
                                <span>Halaman ini adalah detail ujian sebelum mode pengerjaan interaktif diaktifkan.</span>
                            </div>
                            <div class="rule-item">
                                <span>✓</span>
                                <span>Daftar butir soal lengkap tersedia di bagian bawah halaman ini.</span>
                            </div>
                        </div>
                    </section>
                </div>

                <aside class="sidebar">
                    <div class="sidebar-block card">
                        <div class="meta-label">Kategori</div>
                        <div style="margin-top: 14px;">
                            <span class="chip">📘 {{ $question['category'] }}</span>
                        </div>

                        <div class="meta-list" style="margin-top: 24px;">
                            <div>
                                <div class="meta-label">Jumlah Soal</div>
                                <div class="meta-value">{{ count($question['items']) }}</div>
                            </div>
                            <div>
                                <div class="meta-label">Waktu Estimasi</div>
                                <div class="meta-value">{{ max(10, count($question['items']) * 2) }} menit</div>
                            </div>
                            <div>
                                <div class="meta-label">Tipe Soal</div>
                                <div class="meta-value">Pilihan Ganda</div>
                            </div>
                            <div>
                                <div class="meta-label">Pemateri</div>
                                <div class="meta-value">
                                    {{ collect($question['instructors'])->pluck('name')->implode(', ') ?: '-' }}
                                </div>
                            </div>
                        </div>

                        <div style="display:grid; gap:12px;">
                            <button class="button button-primary" type="button" onclick="alert('Mode pengerjaan interaktif belum dibuat.')">
                                Mulai Ujian
                            </button>
                            <a href="/dashboard/management-questions/{{ $question['id'] }}" class="button">
                                Lihat Detail Dashboard
                            </a>
                        </div>
                    </div>

                    <div class="sidebar-block card">
                        <h3>Informasi Paket</h3>
                        <div class="meta-list" style="border-bottom:0; padding-bottom:0; margin-bottom:0; margin-top: 22px;">
                            <div>
                                <div class="meta-label">Status</div>
                                <div class="meta-value">{{ $question['status'] === 'published' ? 'Terbit' : 'Draft' }}</div>
                            </div>
                            <div>
                                <div class="meta-label">Dibuat</div>
                                <div class="meta-value">{{ \Carbon\Carbon::parse($question['created_at'])->translatedFormat('d M Y, H:i') }}</div>
                            </div>
                            <div>
                                <div class="meta-label">Sumber</div>
                                <div class="meta-value">{{ $question['is_generate_ai'] ? 'AI dari materi' : 'Ekstraksi dari file' }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-block card">
                        <h3>Berkas Terkait</h3>
                        <div class="file-list" style="margin-top: 18px;">
                            @php
                                $files = collect([
                                    ['label' => 'File Materi', 'value' => $question['files']['material'] ?? null],
                                    ['label' => 'File Soal', 'value' => $question['files']['question'] ?? null],
                                    ['label' => 'File Kunci', 'value' => $question['files']['answer_key'] ?? null],
                                ])->filter(fn ($file) => !empty($file['value']));
                            @endphp

                            @forelse($files as $file)
                                <a href="{{ $file['value']['url'] }}" target="_blank" class="file-link">
                                    <span class="file-name">📎 {{ $file['label'] }}</span>
                                    <strong>Buka</strong>
                                </a>
                            @empty
                                <div class="file-link">Tidak ada berkas terhubung.</div>
                            @endforelse
                        </div>
                    </div>
                </aside>
            </div>

            <section class="question-panel">
                <div class="question-panel-head">
                    <p class="meta-label">List Soal</p>
                    <h3 class="question-panel-title">Butir Soal dan Jawaban</h3>
                    <div class="card-description" style="margin: 8px 0 0;">
                        Daftar ini menyesuaikan gaya kartu dari referensi agar setiap soal, opsi, dan kunci lebih mudah dipindai.
                    </div>
                </div>

                <div class="question-list">
                    @forelse($question['items'] as $item)
                        <article class="question-card">
                            <div class="question-head">
                                <div>
                                    <div class="question-index">Soal {{ $item['order'] }}</div>
                                    <h4 class="question-title">{{ $item['prompt'] }}</h4>
                                </div>
                                <div class="answer-key">Kunci: {{ $item['correct_option'] }}</div>
                            </div>

                            <div class="answers">
                                @foreach($item['answers'] as $answer)
                                    <div class="answer {{ $answer['is_correct'] ? 'correct' : '' }}">
                                        <div class="answer-label">{{ $answer['option_label'] }}</div>
                                        <div class="answer-text">{{ $answer['answer_text'] }}</div>
                                    </div>
                                @endforeach
                            </div>

                            @if(!empty($item['explanation']))
                                <div class="explanation">
                                    <div class="explanation-label">Pembahasan</div>
                                    <div class="explanation-text">{{ $item['explanation'] }}</div>
                                </div>
                            @endif
                        </article>
                    @empty
                        <article class="question-card">
                            <div class="paragraph" style="margin: 0;">Belum ada butir soal yang bisa ditampilkan.</div>
                        </article>
                    @endforelse
                </div>
            </section>

            <div class="footer-note">
                Halaman detail pengerjaan soal dirender langsung oleh Laravel untuk memastikan tetap tampil stabil di environment Anda.
            </div>
        </div>
    </main>
</body>
</html>
