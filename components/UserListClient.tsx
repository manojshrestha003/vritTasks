"use client";

import { useState, useEffect, useMemo } from "react";
import { User } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUsers, setLoading, setError } from "@/redux/slices/userSlice";
import UserCard from "./UserCard";
import SearchBar from "./SearchBar";

interface UserListClientProps {
  initialUsers: User[];
  initialError: string | null;
}

export default function UserListClient({ initialUsers, initialError }: UserListClientProps) {
  const dispatch = useAppDispatch();
  const { users, apiIsLoading, error } = useAppSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(setUsers(initialUsers));
    dispatch(setError(initialError));
    dispatch(setLoading(false));
  }, [initialUsers, initialError, dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (apiIsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold tracking-tight animate-pulse">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 space-y-6">
        <div className="p-10 bg-red-50/50 border border-red-100 rounded-3xl flex flex-col items-center gap-4 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-600">
          </div>
          <h2 className="text-xl font-bold text-red-900">Something went wrong</h2>
          <p className="text-red-700/70 text-sm font-medium leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 active:scale-95 transition-all text-sm font-bold shadow-lg shadow-red-200"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="space-y-3">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Users Explorer
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-lg leading-relaxed">
            Manage your directory and explore community contributions across the platform.
          </p>
        </div>

        <div className="w-full lg:w-[400px]">
          <SearchBar
            label="Filter Directory"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center glass border border-dashed border-slate-200 rounded-[2.5rem] space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mx-auto">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-slate-900 text-lg font-bold">No results found</p>
              <p className="text-slate-500 font-medium">We couldn't find any users matching "{searchTerm}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
