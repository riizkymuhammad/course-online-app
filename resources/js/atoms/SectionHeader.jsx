import React from "react"

export function SectionHeader({ title, description, align = "center" }) {
  const alignClass = align === "left" ? "text-left" : "text-center"
  return (
    <div className={`${alignClass} mb-10`}>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h2>
      {description ? <p className="text-muted-foreground max-w-lg mx-auto">{description}</p> : null}
    </div>
  )
}
