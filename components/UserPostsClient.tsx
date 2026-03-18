"use client";

import { useEffect, useState, useMemo } from "react";
import { Post } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPosts } from "@/redux/slices/postSlice";
import AddPostForm from "./AddPostForm";
import PostCard from "./PostCard";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface UserPostsClientProps {
  userId: number;
  initialPosts: Post[];
}

export default function UserPostsClient({ userId, initialPosts }: UserPostsClientProps) {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    // Load posts from local storage and filter for this user
    const storedPostsStr = localStorage.getItem("local_posts");
    const localPosts: Post[] = storedPostsStr ? JSON.parse(storedPostsStr) : [];
    const userLocalPosts = localPosts.filter(p => p.userId === userId);


    dispatch(setPosts([...userLocalPosts, ...initialPosts]));
  }, [initialPosts, userId, dispatch]);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  }, [posts, currentPage, postsPerPage]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-12 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
        <div className="space-y-2">
          <Link
            href="/"
            className="group inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors gap-2 text-sm font-bold uppercase tracking-widest"
          >
            <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            Back to Directory
          </Link>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900">User Archives <span className="text-slate-300">#</span>{userId}</h1>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              Published Posts
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{posts.length}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="col-span-full p-20 text-center glass border border-dashed border-slate-200 rounded-[2.5rem]">
                <p className="text-slate-400 font-medium italic">No posts discovered in this archive yet.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm"
              >
                <ChevronLeft />
              </button>

              <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${currentPage === i + 1
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all shadow-sm"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>

        <aside className="lg:sticky lg:top-12 space-y-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="space-y-1 mb-8">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">New Entry</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Share with community</p>
            </div>
            <AddPostForm userId={userId} />
          </div>
        </aside>
      </div>
    </div>
  );
}
