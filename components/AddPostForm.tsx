"use client";

import { useState } from "react";
import { postSchema } from "@/lib/validations";
import { useAppDispatch } from "@/redux/hooks";
import { addPost } from "@/redux/slices/postSlice";

export default function AddPostForm({ userId }: { userId: number }) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = postSchema.safeParse({ title, body });

    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    const newPost = {
      id: Date.now(),
      userId,
      title,
      body,
    };

    dispatch(addPost(newPost));

    // Persist to local storage
    const storedPosts = JSON.parse(localStorage.getItem("local_posts") || "[]");
    localStorage.setItem("local_posts", JSON.stringify([newPost, ...storedPosts]));

    // Reset form
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Title</label>
        <input
          value={title}
          placeholder="Give your insight a title..."
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 focus:bg-white transition-all text-sm font-medium ${errors.title ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"
            }`}
        />
        {errors.title && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Inspiration</label>
        <textarea
          value={body}
          rows={4}
          placeholder="Contextualize your thoughts..."
          onChange={(e) => setBody(e.target.value)}
          className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 focus:bg-white transition-all text-sm font-medium resize-none ${errors.body ? "border-red-300 ring-4 ring-red-50" : "border-slate-100"
            }`}
        />
        {errors.body && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.body}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all text-sm uppercase tracking-widest shadow-lg shadow-slate-200"
      >
        Post
      </button>
    </form>
  );
}