import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Check, AlertCircle } from "lucide-react";

export default function YouTubeModuleInput({ onModuleAdded, isLoading = false }) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const extractVideoId = (url) => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const handleFetchYouTubeData = async () => {
    setError("");
    setSuccess(false);

    const videoId = extractVideoId(youtubeUrl.trim());
    if (!videoId) {
      setError("URL YouTube tidak valid. Gunakan format: youtube.com/watch?v=... atau youtu.be/...");
      return;
    }

    setLoading(true);

    try {
      // noembed.com (gratis, tanpa API key)
      const response = await fetch(
        `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`
      );

      if (!response.ok) throw new Error("Gagal mengambil data YouTube");

      const data = await response.json();

      const moduleData = {
        title: data.title || "Untitled Video",
        description: data.author_name ? `By ${data.author_name}` : "Video pembelajaran dari YouTube",
        duration: "10-20 menit",
        thumbnail:
          data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        videoId,
      };

      // Optional: oembed untuk title/thumbnail yang lebih akurat
      try {
        const oembedResponse = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        if (oembedResponse.ok) {
          const oembedData = await oembedResponse.json();
          moduleData.title = oembedData.title || moduleData.title;
          moduleData.thumbnail = oembedData.thumbnail_url || moduleData.thumbnail;
        }
      } catch {
        // fallback ok
      }

      setSuccess(true);
      onModuleAdded?.(moduleData);
      setYoutubeUrl("");

      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError("Gagal mengambil data dari YouTube. Pastikan URL benar dan video tersedia.");
      console.error("YouTube fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || isLoading || !youtubeUrl.trim();

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100/50">
      <div className="p-6 space-y-4">
        <div>
          <Label htmlFor="youtube-url" className="text-sm font-semibold text-gray-900 block mb-2">
            Tambahkan Module dari YouTube
          </Label>
          <p className="text-xs text-gray-600">
            Paste link YouTube atau video ID. Data akan diambil otomatis.
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            id="youtube-url"
            placeholder="Masukkan URL YouTube atau video ID..."
            value={youtubeUrl}
            onChange={(e) => {
              setYoutubeUrl(e.target.value);
              setError("");
            }}
            disabled={loading || isLoading}
            className="flex-1 border border-gray-200 rounded-lg h-10 focus:border-blue-400 focus:ring-blue-200"
          />

          <Button
            type="button"
            onClick={handleFetchYouTubeData}
            disabled={disabled}
            className={`rounded-lg h-10 gap-2 font-medium transition-all ${
              success
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {(loading || isLoading) && <Loader2 className="w-4 h-4 animate-spin" />}
            {success && !(loading || isLoading) && <Check className="w-4 h-4" />}
            {!loading && !isLoading && !success && "Confirm"}
            {!loading && !isLoading && success && "Added"}
          </Button>
        </div>

        {error && (
          <div className="flex gap-3 text-sm text-red-800 bg-red-100 p-3 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex gap-3 text-sm text-green-800 bg-green-100 p-3 rounded-lg border border-green-200">
            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Module berhasil ditambahkan!</span>
          </div>
        )}
      </div>
    </Card>
  );
}
