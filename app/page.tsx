import UserListClient from "@/components/UserListClient";
import { getUsers } from "@/lib/api";

export default async function Home() {
  const { users, error } = await getUsers();

  return (
    <main className="min-h-screen">
      <UserListClient initialUsers={users} initialError={error} />
    </main>
  );
}
