import React from "react";

export function IconBadge({ icon: Icon, className = "" }) {
  return (
    <div
      className={[
        "p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25",
        className,
      ].join(" ")}
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
}
