import React from "react";
import { X } from "lucide-react";

export function Toast({ title, description, onClose, icon: Icon }) {
  return (
    <div className="fixed right-6 top-6 z-50 w-full max-w-sm">
      <div className="rounded-xl border border-slate-200 bg-white shadow-lg">
        <div className="flex items-start gap-3 p-4">
          {Icon && (
            <div className="mt-0.5 text-emerald-600">
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            {title && <p className="text-sm font-semibold text-slate-900">{title}</p>}
            {description && (
              <p className="mt-1 text-sm text-slate-600">{description}</p>
            )}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
