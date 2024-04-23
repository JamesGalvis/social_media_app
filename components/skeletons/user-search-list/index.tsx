import { UserItemSkeleton } from "@/components/skeletons/user/user-item-skeleton";
import { BackHeader } from "@/components/navigation/back-header";

function UserSearchListSkeleton() {
  return (
    <div>
      <BackHeader />
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
    </div>
  );
}

export default UserSearchListSkeleton;
