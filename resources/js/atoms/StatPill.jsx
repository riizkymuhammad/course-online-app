import React from "react";

export function StatPill({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <Icon className="w-4 h-4 text-slate-400" />
      <span className="font-medium">{value}</span>
    </div>
  );
}
