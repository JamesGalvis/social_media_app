import { BackHeader } from "@/components/navigation/back-header";
import { Skeleton } from "@/components/ui/skeleton";

export function DetailsSkeleton() {
  return (
    <>
      <BackHeader />
      <section className="flex items-center ms:gap-x-8 gap-x-4 md:px-16 px-4 pt-5 w-full">
        <Skeleton className="ms:w-40 ms:h-40 w-20 h-20 rounded-full" />
        <div className="flex flex-col justify-center flex-1 space-y-2">
          <div className="flex items-center gap-4 h-14 w-full">
            <Skeleton className="h-full flex-1" />
            <Skeleton className="w-20 h-full rounded-md" />
          </div>
          <div className="w-full h-10 max-ms:hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-2/4 h-8 max-ms:hidden">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </section>
      <section className="flex flex-col md:px-16 px-4 pt-1.5 ms:hidden">
        <div className="w-full h-14 mt-3">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex items-center gap-x-4 w-full h-12 mt-3">
          <div className="flex-1 h-full rounded-md">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
          <div className="flex-1 h-full rounded-md">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
          <div className="flex-1 h-full rounded-md">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        </div>
      </section>
    </>
  );
}
