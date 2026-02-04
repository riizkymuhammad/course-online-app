import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const categoryColors = {
  "Bahasa Inggris": { dark: "#1e40af", light: "#93c5fd" },
  CPNS: { dark: "#b45309", light: "#fcd34d" },
  SD: { dark: "#047857", light: "#6ee7b7" },
  SMP: { dark: "#7c3aed", light: "#ddd6fe" },
  SMA: { dark: "#be185d", light: "#fbcfe8" },
  UTBK: { dark: "#0891b2", light: "#67e8f9" },
  Matematika: { dark: "#dc2626", light: "#fca5a5" },
  Sains: { dark: "#0d9488", light: "#99f6e4" },
  Umum: { dark: "#475569", light: "#cbd5e1" },
};

export default function CourseCoverGenerator({ title = "", categories = [], onImageGenerated }) {
  const canvasRef = useRef(null);

  const getPrimaryCategory = () => (categories?.length ? categories[0] : "Umum");
  const getColors = () => categoryColors[getPrimaryCategory()] || categoryColors["Umum"];

  const generateCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 1200;
    const height = 700;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { dark: darkColor, light: lightColor } = getColors();

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, darkColor);
    gradient.addColorStop(1, lightColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // decorative circles
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath(); ctx.arc(width * 0.85, height * 0.15, 300, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(width * 0.15, height * 0.85, 250, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(width * 0.2, height * 0.25, 150, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // category
    const category = getPrimaryCategory();
    ctx.globalAlpha = 0.9;
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(category, width / 2, 100);

    // title wrap
    ctx.globalAlpha = 1;
    ctx.font = 'bold 56px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    const maxWidth = width - 200;
    const lineHeight = 70;
    const words = (title || "").split(" ");
    let line = "";
    const lines = [];

    for (const word of words) {
      const testLine = line + (line ? " " : "") + word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);

    const totalHeight = lines.length * lineHeight;
    let startY = (height - totalHeight) / 2 + 50;

    lines.forEach((t) => {
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillText(t, width / 2, startY);
      startY += lineHeight;
    });

    // bottom bar
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, height - 100, width, 100);
    ctx.globalAlpha = 1;

    const imageUrl = canvas.toDataURL("image/png");
    onImageGenerated?.(imageUrl);
  };

  useEffect(() => {
    generateCover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, JSON.stringify(categories)]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${(title || "course").replace(/\s+/g, "-").toLowerCase()}-cover.png`;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <canvas ref={canvasRef} className="w-full h-auto block" />
      </div>

      <div className="flex gap-2">
        <Button type="button" onClick={generateCover} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 font-medium">
          Regenerate
        </Button>
        <Button type="button" onClick={handleDownload} className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg h-10 gap-2 font-medium">
          <Download className="w-4 h-4" /> Download
        </Button>
      </div>
    </div>
  );
}
