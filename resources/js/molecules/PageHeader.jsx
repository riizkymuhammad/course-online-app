import React from "react";
import { IconBadge } from "@/atoms/IconBadge";

export function PageHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <IconBadge icon={Icon} />
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">{title}</h1>
      </div>
      <p className="text-slate-500 ml-12">{subtitle}</p>
    </div>
  );
}
