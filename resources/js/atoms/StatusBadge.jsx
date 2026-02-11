import React from "react";

export function StatusBadge({ status, progress }) {
  // mode progress
  if (typeof progress === "number") {
    const cls =
      progress === 100
        ? "bg-emerald-500 text-white"
        : "bg-blue-500 text-white";

    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold">
        <span className={cls}>{progress}%</span>
      </span>
    );
  }

  // mode status (Published / Draft / etc)
  const normalized = String(status || "").toLowerCase();
  const isPublished = normalized === "published" || normalized === "publish";

  return (
    <span
      className={[
        "px-3 py-1.5 rounded-full text-xs font-semibold",
        isPublished
          ? "bg-emerald-50 text-emerald-600"
          : "bg-amber-50 text-amber-600",
      ].join(" ")}
    >
      {isPublished ? "Terbit" : "Draft"}
    </span>
  );
}
