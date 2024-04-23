import { Suspense } from "react";

import { UserSearchList } from "@/app/(root)/(routes)/profile/[username]/_components/user-search-list";
import UserSearchListSkeleton from "@/components/skeletons/user-search-list";

async function FollowersPage({ params }: { params: { username: string } }) {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<UserSearchListSkeleton />}>
        <UserSearchList listType="followers" username={params.username} />
      </Suspense>
    </div>
  );
}

export default FollowersPage;
