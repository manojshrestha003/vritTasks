"use client";

import Link from "next/link";
import { User } from "@/types";

export default function UserCard({ user }: { user: User }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.company.name}</p>

      <Link href={`/users/${user.id}`}>
        <button>View Posts</button>
      </Link>
    </div>
  );
}