import React from "react"
import { CheckCircle } from "lucide-react"

export function CourseFeaturesGrid({ features }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span className="text-muted-foreground text-sm">{feature}</span>
        </div>
      ))}
    </div>
  )
}
