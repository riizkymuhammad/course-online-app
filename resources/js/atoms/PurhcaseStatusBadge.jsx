export function PurchaseStatusBadge({ status }) {
  const isCompleted = status === "Completed";

  return (
    <span
      className={[
        "px-3 py-1.5 rounded-full text-xs font-semibold",
        isCompleted
          ? "bg-emerald-50 text-emerald-600"
          : "bg-amber-50 text-amber-600",
      ].join(" ")}
    >
      {isCompleted ? "Selesai" : "Menunggu"}
    </span>
  );
}
