const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error();
  return res.json();
}

export async function fetchPosts(userId: string) {
  const res = await fetch(
    `${BASE_URL}/posts?userId=${userId}`
  );
  if (!res.ok) throw new Error();
  return res.json();
}