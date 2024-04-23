import { Skeleton } from "@/components/ui/skeleton";

export function UserItemSkeleton() {
  return (
    <div className="flex ms:items-center gap-x-4 w-full py-3 ms:px-8 px-3">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col flex-1">
        <Skeleton className="h-11 w-full" />
        <Skeleton className="ms:w-11/12 lg:w-3/4 w-full h-10 mt-1.5" />
      </div>
    </div>
  );
}
