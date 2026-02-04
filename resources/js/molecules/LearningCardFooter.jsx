import React from "react"
import { ProgressBar } from "@/atoms/ProgressBar"

export function LearningCardFooter({ progress, lessons, status, onAction }) {
  const statusText = status === "Completed" ? "Selesai" : "Berlangsung"
  const statusCls = status === "Completed" ? "text-emerald-600" : "text-blue-600"
  const actionText = status === "Completed" ? "Lihat Sertifikat" : "Lanjutkan"

  return (
    <div className="mt-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">Progress</span>
        <span className="text-xs font-bold text-blue-600">{lessons} Pelajaran</span>
      </div>

      <ProgressBar progress={progress} status={status} />

      <div className="flex items-center justify-between mt-3">
        <span className={["text-xs font-semibold", statusCls].join(" ")}>
          {statusText}
        </span>
        <button
          type="button"
          onClick={onAction}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {actionText}
        </button>
      </div>
    </div>
  )
}
