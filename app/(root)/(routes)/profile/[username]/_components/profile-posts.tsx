import { currentUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { UserExtended } from "@/types";
import { PostsList } from "@/components/post/posts-list";

interface ProfilePostsProps {
  user: UserExtended;
}

export async function ProfilePosts({ user }: ProfilePostsProps) {
  const self = await currentUser();
  const isSelf = self?.id === user.externalUserId;

  return (
    <div className="w-full h-full">
      <div
        className={cn(
          "w-full px-4 text-center py-5",
          user.posts.length && "hidden"
        )}
      >
        <h2 className="ms:text-xl text-lg font-medium text-primary/50 pointer-events-none">
          {!user.posts.length && isSelf && "You have not made any post"}
          {!user.posts.length && !isSelf && "This user has no posts"}
        </h2>
      </div>
      <PostsList type="User" userId={user.externalUserId} />
    </div>
  );
}
