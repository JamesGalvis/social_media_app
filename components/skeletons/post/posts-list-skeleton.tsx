import { PostCardSkeleton } from "@/components/skeletons/post/post-skeleton";

export function PostListSkeleton() {
  return (
    <div className="flex flex-col">
      {[...Array(4)].map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
