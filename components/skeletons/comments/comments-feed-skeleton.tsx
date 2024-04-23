import { CommentItemSkeleton } from "@/components/skeletons/comments/comment-item-skeleton";

export function CommentsFeedSkeleton() {
  return (
    <div className="flex flex-col">
      {[...Array(4)].map((_, i) => (
        <CommentItemSkeleton key={i} />
      ))}
    </div>
  );
}
