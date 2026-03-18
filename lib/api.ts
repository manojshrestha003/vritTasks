import { User, Post } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

//API function to fetch  users
export async function getUsers(): Promise<{ users: User[]; error: string | null }> {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await res.json();
    return { users, error: null };
  } catch (err: any) {
    console.error("Error fetching users:", err);
    return { users: [], error: err.message || "Unknown error occurred" };
  }
}

//API function to fetch user post
export async function getPosts(userId: string): Promise<Post[]> {
  try {
    const res = await fetch(`${BASE_URL}/posts?userId=${userId}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch Posts");
    }

    return res.json();
  } catch (err: any) {
    console.error(`Error fetching posts for user ${userId}:`, err);
    return [];
  }
}