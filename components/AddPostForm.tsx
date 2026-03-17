"use client";

import { useState } from "react";
import { postSchema } from "@/lib/validations";
import { useAppDispatch } from "@/redux/hooks";
import { addPost } from "@/redux/slices/postSlice";

export default function AddPostForm({ userId }: any) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submit = () => {
    const result = postSchema.safeParse({ title, body });

    if (!result.success) {
      alert("Validation failed");
      return;
    }

    const newPost = {
      id: Date.now(),
      userId,
      title,
      body,
    };

    dispatch(addPost(newPost));

    localStorage.setItem(
      "posts",
      JSON.stringify(newPost)
    );
  };

  return (
    <div>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={submit}>Add Post</button>
    </div>
  );
}