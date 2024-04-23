import { Separator } from "@/components/ui/separator";
import { DetailsSkeleton } from "@/components/skeletons/profile/details-skeleton";
import { PostListSkeleton } from "@/components/skeletons/post/posts-list-skeleton";

export function ProfileSkeleton() {
  return (
    <div>
      <DetailsSkeleton />
      <Separator className="mt-5" />
      <PostListSkeleton />
    </div>
  );
}
