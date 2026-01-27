import React from "react"

export function StatusBadge({ progress, status }) {
  const cls =
    status === "Completed"
      ? "bg-emerald-500 text-white"
      : "bg-blue-500 text-white"

  return (
    <span className={["px-3 py-1 rounded-full text-xs font-bold", cls].join(" ")}>
      {progress}%
    </span>
  )
}
