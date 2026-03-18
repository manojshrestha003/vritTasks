import { Post } from "@/types";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:border-slate-300 ">
      <div className="flex flex-col h-full gap-3">
        <h3 className="font-bold text-slate-900 text-lg capitalize leading-snug group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <div className="h-1 w-12 bg-slate-100 rounded-full group-hover:w-20 group-hover:bg-blue-200 transition-all duration-500" />
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 italic">
          "{post.body}"
        </p>
      </div>
    </article>
  );
}