"use client";

import { useEffect } from "react";
import { fetchPosts } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPosts } from "@/redux/slices/postSlice";
import PostCard from "@/components/PostCard";
import AddPostForm from "@/components/AddPostForm";

export default function PostsPage({ params }: any) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((s) => s.posts.posts);

  useEffect(() => {
    async function load() {
      const data = await fetchPosts(params.id);
      dispatch(setPosts(data));
    }
    load();
  }, [params.id, dispatch]);

  return (
    <div>
      <AddPostForm userId={params.id} />

      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}