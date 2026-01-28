import React from "react";

export function UserStatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={[
        "px-3 py-1.5 rounded-full text-xs font-semibold",
        isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500",
      ].join(" ")}
    >
      {isActive ? "Aktif" : "Nonaktif"}
    </span>
  );
}
