import React from "react"
import { LearningCardMedia } from "@/molecules/LearningCardMedia"
import { LearningCardFooter } from "@/molecules/LearningCardFooter"

export function LearningCard({ data, onPlay, onAction }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 flex flex-col">
      <LearningCardMedia
        image={data.image}
        course={data.course}
        category={data.category}
        progress={data.progress}
        status={data.status}
        duration={data.duration}
        onPlay={() => onPlay?.(data)}
      />

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {data.course}
        </h3>

        <LearningCardFooter
          progress={data.progress}
          lessons={data.lessons}
          status={data.status}
          onAction={() => onAction?.(data)}
        />
      </div>
    </div>
  )
}
