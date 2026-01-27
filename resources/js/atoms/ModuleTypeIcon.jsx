import React from "react"
import { PlayCircle, HelpCircle, FileText } from "lucide-react"

export function ModuleTypeIcon({ type }) {
  if (type === "quiz") return <HelpCircle className="w-4 h-4 text-orange-500" />
  if (type === "practice") return <FileText className="w-4 h-4 text-green-500" />
  return <PlayCircle className="w-4 h-4 text-primary" />
}

export function getModuleTypeLabel(type) {
  if (type === "quiz") return "Quiz"
  if (type === "practice") return "Latihan"
  return "Video"
}
