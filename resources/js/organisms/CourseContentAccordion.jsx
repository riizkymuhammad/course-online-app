import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ModuleTypeIcon, getModuleTypeLabel } from "@/atoms/ModuleTypeIcon"

export function CourseContentAccordion({ sections }) {
  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      <Accordion type="multiple" className="w-full" defaultValue={[sections?.[0]?.id].filter(Boolean)}>
        {sections.map((section, index) => (
          <AccordionItem key={section.id} value={section.id} className="border-border/50">
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3 text-left">
                <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-foreground">{section.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{section.modules.length} modul</p>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-5 pb-4">
              <div className="space-y-2 pl-10">
                {section.modules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ModuleTypeIcon type={module.type} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{getModuleTypeLabel(module.type)}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                      {module.duration}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
