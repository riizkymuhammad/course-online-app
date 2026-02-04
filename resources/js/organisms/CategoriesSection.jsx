import React from "react"
import { SectionHeader } from "@/atoms/SectionHeader"
import { CategoryTitle } from "@/molecules/CategoryTitle"

export function CategoriesSection({ categories }) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Kategori Pembelajaran"
          description="Pilih kategori sesuai kebutuhan belajar Anda"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (
            <CategoryTitle
              key={c.href}
              title={c.title}
              courseCount={c.courseCount}
              href={c.href}
              iconKey={c.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
