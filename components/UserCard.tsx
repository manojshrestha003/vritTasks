"use client";

import Link from "next/link";
import { User } from "@/types";
import { ArrowRight } from "lucide-react";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="group bg-white border border-slate-200
     p-6 rounded-2xl shadow-sm ">
      <div className="flex-grow space-y-5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shrink-0 ">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h2 className="font-bold text-slate-900 text-lg truncate group-hover:text-blue-600 transition-colors">
              {user.name}
            </h2>
            <p className="text-slate-500 text-sm truncate font-medium">{user.email}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company</span>
            <span className="text-slate-700 text-sm font-semibold truncate bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              {user.company.name}
            </span>
          </div>
        </div>
      </div>

      <Link
        href={`/users/${user.id}`}
        className="mt-6 flex items-center justify-center
         gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl"
      >
        View Posts
        <ArrowRight />
      </Link>
    </div>
  );
}