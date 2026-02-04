import React from "react";
import { Calendar, BookOpen } from "lucide-react";
import { UserIdentity } from "@/molecules/UserIdentity";
import { UserStatusBadge } from "@/atoms/UserStatusBadge";
import { StatPill } from "@/atoms/StatPill";
import { RowActions } from "@/atoms/RowActions";

export function UsersTable({ users = [], onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Pengguna</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Tanggal Bergabung</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Status</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Kursus</th>
              <th className="text-left text-sm font-semibold text-slate-600 px-6 py-4">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={[
                  "border-b border-slate-50 hover:bg-blue-50/30 transition-colors",
                  index === users.length - 1 ? "border-b-0" : "",
                ].join(" ")}
              >
                <td className="px-6 py-4">
                  <UserIdentity name={user.name} email={user.email} avatar={user.avatar} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{user.joinDate}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <UserStatusBadge status={user.status} />
                </td>

                <td className="px-6 py-4">
                  <StatPill icon={BookOpen} value={`${user.courses} Kursus`} />
                </td>

                <td className="px-6 py-4">
                  <RowActions
                    onView={() => onView?.(user)}
                    onEdit={() => onEdit?.(user)}
                    onDelete={() => onDelete?.(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
