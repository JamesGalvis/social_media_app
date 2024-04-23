import { Skeleton } from "@/components/ui/skeleton";

export function CommentItemSkeleton() {
  return (
    <div className="border-b py-3 px-4">
      <div className="flex gap-1.5">
        <Skeleton className="shrink-0 h-10 w-10 rounded-full" />
        <div className="flex flex-col flex-1 gap-1 pb-3">
          <Skeleton className="w-[80%] h-6" />
          <Skeleton className="w-[60%] h-5" />
        </div>
      </div>

      <Skeleton className="w-[80%] h-5 py-3" />
    </div>
  );
}
