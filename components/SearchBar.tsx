"use client";

import { useState } from "react";
import { User } from "@/types";

export default function SearchBar({ users }: { users: User[] }) {
  const [query, setQuery] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        placeholder="Search users..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {filtered.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </>
  );
}