import { AvatarInitial } from "@/atoms/AvatarInitial";

export function PurchaseBuyer({ avatar, buyer }) {
  return (
    <div className="flex items-center gap-3">
      <AvatarInitial initials={avatar} />
      <span className="font-medium text-slate-800">{buyer}</span>
    </div>
  );
}
