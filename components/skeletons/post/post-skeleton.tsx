import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PostCardSkeletonProps {
  type?: "Post" | "CommentPost";
}

export function PostCardSkeleton({ type = "Post" }: PostCardSkeletonProps) {
  return (
    <div className="flex w-full gap-3 py-2.5 px-4">
      <Skeleton
        className={cn(
          "shrink-0 h-10 w-10 rounded-full max-ms:hidden",
          type === "CommentPost" && "hidden"
        )}
      />
      <div className="flex flex-col w-full">
        <div className="flex items-center gap-1.5 pb-3">
          <Skeleton
            className={cn(
              "hidden shrink-0 h-10 w-10 rounded-full max-ms:block",
              type === "CommentPost" && "block"
            )}
          />
          <div className="flex flex-col flex-1 gap-2">
            <Skeleton className="w-[80%] ms:h-8 h-6 pb-3" />
            <Skeleton className="w-[60%] ms:h-7 h-4 " />
          </div>
        </div>
        <Skeleton className="aspect-video max-h-[300px] max-w-full mb-3" />
        <Skeleton
          className={cn("h-8 w-full", type === "CommentPost" && "hidden")}
        />
      </div>
    </div>
  );
}
