import { Skeleton } from "@/components/ui/skeleton";

export function BackHeaderSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center md:px-6 md:py-5 px-4 py-3">
        <Skeleton className="h-10 w-10 rounded-md mr-4" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="flex px-3">
        <Skeleton className="flex-1 h-[45px]" />
      </div>
    </div>
  );
}
