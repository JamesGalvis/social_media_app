import { Suspense } from "react";

import { UserSearchList } from "@/app/(root)/(routes)/profile/[username]/_components/user-search-list";
import UserSearchListSkeleton from "@/components/skeletons/user-search-list";

async function FollowingPage({ params }: { params: { username: string } }) {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<UserSearchListSkeleton />}>
        <UserSearchList listType="following" username={params.username} />
      </Suspense>
    </div>
  );
}

export default FollowingPage;
