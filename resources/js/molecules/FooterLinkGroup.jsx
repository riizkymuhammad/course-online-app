import React from "react"
import { Link } from "@inertiajs/react"

export function FooterLinkGroup({ title, links }) {
  return (
    <div>
      <h4 className="font-semibold text-foreground mb-4 text-sm">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
