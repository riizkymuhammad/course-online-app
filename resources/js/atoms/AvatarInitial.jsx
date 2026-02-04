import React from "react";

export function AvatarInitial({ initials }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
      {initials}
    </div>
  );
}
