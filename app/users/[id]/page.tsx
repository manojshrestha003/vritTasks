import UserPostsClient from "@/components/UserPostsClient";
import { getPosts } from "@/lib/api";

export default async function UserPostsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const posts = await getPosts(id);

  return (
    <main className="min-h-screen">
      <UserPostsClient userId={parseInt(id)} initialPosts={posts} />
    </main>
  );
}
