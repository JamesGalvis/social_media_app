import { redirect } from "next/navigation";
import { FollowedUser, FollowerUser } from "@/types";
import { currentUser } from "@clerk/nextjs";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { UserItem } from "@/components/user/user-item";
import { BackHeader } from "@/components/navigation/back-header";
import { getUserByUsername } from "@/actions/user-service";
import { getFollowedUsers, getFollowersUsers } from "@/actions/follow-service";
import { UserSearchTabs } from "./user-search-tabs";

interface UserSearchListProps {
  listType: "followers" | "following";
  username: string;
}

function isFollowerUser(
  user: FollowedUser | FollowerUser
): user is FollowerUser {
  return "follower" in user;
}

export async function UserSearchList({
  listType,
  username,
}: UserSearchListProps) {
  const user = await getUserByUsername(username);

  if (!user) {
    redirect("/");
  }

  let users;
  let showFollowButton = false;

  if (listType === "followers") {
    users = await getFollowersUsers(user.externalUserId);
  } else {
    users = await getFollowedUsers(user.externalUserId);

    const self = await currentUser();

    showFollowButton = self?.username === user.username;
  }

  return (
    <>
      <BackHeader label={username} href={`/profile/${username}`} />
      <UserSearchTabs username={username} />
      <section className="w-full">
        <Command>
          <CommandInput
            placeholder="Search..."
            className="bg-accent pl-3 my-4"
          />
          {!users.length && (
            <div className="text-center ms:text-xl text-lg font-medium text-primary/50 pointer-events-none mt-3">
              {listType === "followers"
                ? "No followers yet."
                : "There are no users followed yet."}
            </div>
          )}
          {users.length > 0 && (
            <CommandEmpty className="text-center ms:text-xl text-lg font-medium text-primary/50 pointer-events-none mt-3">
              No users found.
            </CommandEmpty>
          )}

          <CommandGroup className="py-3 px-0">
            {users.map((user) => (
              <CommandItem
                key={
                  isFollowerUser(user) ? user.follower.id : user.following.id
                }
                value={
                  isFollowerUser(user)
                    ? (user.follower.name as string)
                    : (user.following.name as string)
                }
                className="p-0 rounded-none aria-selected:bg-transparent"
              >
                <UserItem
                  showFollowButton={showFollowButton}
                  user={isFollowerUser(user) ? user.follower : user.following}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </section>
    </>
  );
}
