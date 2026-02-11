<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CourseImageController extends Controller
{
    public function show(Request $request)
    {
        $title = trim((string) $request->query('title', 'Kursus'));
        $category = trim((string) $request->query('category', ''));
        $width = (int) $request->query('w', 1200);
        $height = (int) $request->query('h', 700);

        $width = max(320, min($width, 1600));
        $height = max(180, min($height, 900));

        if (!extension_loaded('gd')) {
            $im = imagecreatetruecolor(1, 1);
            $white = imagecolorallocate($im, 255, 255, 255);
            imagesetpixel($im, 0, 0, $white);
            ob_start();
            imagepng($im);
            $binary = ob_get_clean();
            imagedestroy($im);

            return response($binary, 200, [
                'Content-Type' => 'image/png',
                'Cache-Control' => 'public, max-age=3600',
            ]);
        }

        $palettes = [
            [[15, 118, 110], [94, 234, 212]],
            [[30, 64, 175], [147, 197, 253]],
            [[190, 24, 93], [251, 207, 232]],
            [[180, 83, 9], [252, 211, 77]],
            [[22, 101, 52], [134, 239, 172]],
            [[88, 28, 135], [221, 214, 254]],
            [[15, 23, 42], [148, 163, 184]],
        ];

        $hash = crc32(strtolower($title . '|' . $category));
        $palette = $palettes[$hash % count($palettes)];
        [$top, $bottom] = $palette;

        $im = imagecreatetruecolor($width, $height);

        for ($y = 0; $y < $height; $y++) {
            $ratio = $height > 1 ? $y / ($height - 1) : 0;
            $r = (int) ($top[0] + ($bottom[0] - $top[0]) * $ratio);
            $g = (int) ($top[1] + ($bottom[1] - $top[1]) * $ratio);
            $b = (int) ($top[2] + ($bottom[2] - $top[2]) * $ratio);
            $color = imagecolorallocate($im, $r, $g, $b);
            imageline($im, 0, $y, $width, $y, $color);
        }

        $overlay = imagecolorallocatealpha($im, 255, 255, 255, 80);
        imagefilledrectangle($im, 0, $height - 120, $width, $height, $overlay);

        $white = imagecolorallocate($im, 255, 255, 255);
        $dark = imagecolorallocate($im, 15, 23, 42);

        if ($category !== '') {
            $label = strtoupper($category);
            $font = 3;
            $labelWidth = imagefontwidth($font) * strlen($label);
            $labelX = max(20, (int) (($width - $labelWidth) / 2));
            imagestring($im, $font, $labelX, 40, $label, $white);
        }

        $font = 5;
        $maxTextWidth = $width - 80;
        $maxChars = max(8, (int) floor($maxTextWidth / imagefontwidth($font)));
        $words = preg_split('/\s+/', $title);
        $lines = [];
        $current = '';
        foreach ($words as $word) {
            $test = trim($current . ' ' . $word);
            if (strlen($test) <= $maxChars) {
                $current = $test;
            } else {
                if ($current !== '') {
                    $lines[] = $current;
                }
                $current = $word;
            }
        }
        if ($current !== '') {
            $lines[] = $current;
        }
        $lines = array_slice($lines, 0, 4);

        $lineHeight = imagefontheight($font) + 10;
        $totalHeight = count($lines) * $lineHeight;
        $startY = (int) (($height - $totalHeight) / 2);

        foreach ($lines as $line) {
            $lineWidth = imagefontwidth($font) * strlen($line);
            $x = max(20, (int) (($width - $lineWidth) / 2));
            imagestring($im, $font, $x, $startY, $line, $dark);
            $startY += $lineHeight;
        }

        ob_start();
        imagepng($im);
        $binary = ob_get_clean();
        imagedestroy($im);

        return response($binary, 200, [
            'Content-Type' => 'image/png',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }
}
