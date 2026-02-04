import React from "react"
import { BrandLogo } from "@/atoms/BrandLogo"
import { SocialIconLink } from "@/atoms/SocialIconLink"
import { FooterLinkGroup } from "@/molecules/FooterLinkGroup"

export function Footer({ footerSections, socialLinks }) {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2">
            <BrandLogo />

            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Platform pembelajaran online terbaik untuk mencapai tujuan akademik dan karir Anda.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <SocialIconLink key={s.label} href={s.href} label={s.label} Icon={s.icon} />
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <FooterLinkGroup key={section.title} title={section.title} links={section.links} />
          ))}
        </div>

        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center">© 2026 EduKursus. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
