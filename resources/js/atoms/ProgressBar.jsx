import React from "react"

export function ProgressBar({ progress, status }) {
  const barCls =
    status === "Completed"
      ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
      : "bg-gradient-to-r from-blue-400 to-blue-500"

  return (
    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
      <div
        className={["h-full rounded-full transition-all duration-500", barCls].join(" ")}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
