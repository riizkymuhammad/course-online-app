import React from "react"

export function SocialIconLink({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </a>
  )
}
