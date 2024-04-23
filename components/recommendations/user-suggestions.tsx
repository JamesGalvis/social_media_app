import { getRecommendedUsers } from "@/actions/recommended-service";
import { UserItem } from "@/components/user/user-item";
import { User } from "@prisma/client";

export async function UserSuggestions() {
  const users = await getRecommendedUsers();

  return (
    <div className="w-full border-md bg-accent rounded-lg xl:px-4 px-3 py-4">
      <h2 className="text-lg font-bold">Suggestions for you</h2>
      <div className="flex flex-col mt-2">
        {!users.length && (
          <p className="text-base text-primary/50 italic font-normal">
            No recommendations yet
          </p>
        )}
        {users?.map((user: User) => (
          <UserItem
            key={user.id}
            user={user}
            showDescription={false}
            showFollowButton
            followButtonSize="sm"
            isFollowing={false}
            avatarSize="default"
            className="gap-x-2 py-2 ms:px-0"
          />
        ))}
      </div>
    </div>
  );
}
