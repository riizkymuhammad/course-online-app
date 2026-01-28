import React from "react";
import { Mail } from "lucide-react";
import { AvatarInitial } from "@/atoms/AvatarInitial";

export function UserIdentity({ name, email, avatar }) {
  return (
    <div className="flex items-center gap-3">
      <AvatarInitial initials={avatar} />
      <div>
        <p className="font-semibold text-slate-800">{name}</p>
        <div className="flex items-center gap-1 text-slate-400 text-sm">
          <Mail className="w-3 h-3" />
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
}
