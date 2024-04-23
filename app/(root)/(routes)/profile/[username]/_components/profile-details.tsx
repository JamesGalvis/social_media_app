import { currentUser } from "@clerk/nextjs";

import { UserExtended } from "@/types";
import { isFollowingUser } from "@/actions/follow-service";
import { UserAvatarDialog } from "@/components/user/user-avatar-dialog";
import { FollowButton } from "@/components/user/follow-button";
import { BackHeader } from "@/components/navigation/back-header";
import { PostCount } from "./post-count";
import { AccountStateItem } from "./account-state-item";
import { EditProfileButton } from "./edit-profile-button";

interface ProfileDetailsProps {
  user: UserExtended;
}

export async function ProfileDetails({ user }: ProfileDetailsProps) {
  const self = await currentUser();
  const isSelf = self?.username === user.username;

  const isFollowing = await isFollowingUser(user.externalUserId);
  const postsCount = user.posts.length;
  const followersCount = user.followedBy.length;
  const followingCount = user.following.length;

  return (
    <>
      <BackHeader label={user.username} href="/" />
      <section className="flex items-center ms:gap-x-6 gap-x-4 md:px-9 px-4 pt-5 w-full">
        <UserAvatarDialog
          imageSrc={user.imageUrl}
          className="ms:w-40 ms:h-40 w-20 h-20"
        />
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center">
            <div className="w-full">
              <p className="ms:text-xl text-lg font-extrabold line-clamp-1 w-[90%]">
                {user.name}
              </p>
              <p className="ms:text-lg font-normal text-accent-foreground/60">
                @{user.username}
              </p>
            </div>
            {isSelf && (
              <EditProfileButton
                firstName={self.firstName}
                lastName={self.lastName}
                user={user}
              />
            )}
            {!isSelf && (
              <FollowButton
                isFollowing={isFollowing}
                userId={user.externalUserId}
              />
            )}
          </div>
          <p className="mt-3 text-[15px] text-primary/90 max-w-[534px] w-full max-ms:hidden">
            {user.bio}
          </p>
          <div className="flex items-center mt-5 gap-x-4 text-base font-normal text-primary/90 max-ms:hidden">
            <PostCount value={postsCount} />
            <AccountStateItem
              value={followersCount}
              label={followersCount === 1 ? "follower" : "followers"}
              href={`/profile/${user.username}/followers`}
            />
            <AccountStateItem
              value={followingCount}
              label="following"
              href={`/profile/${user.username}/following`}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col md:px-16 px-4 pt-1.5 ms:hidden">
        {user.bio && (
          <p className="mt-4 mb-2 text-sm text-primary/90 w-full">{user.bio}</p>
        )}
        <div className="flex items-center gap-x-4 mt-3">
          <PostCount value={postsCount} />
          <AccountStateItem
            value={followersCount}
            label={followersCount === 1 ? "follower" : "followers"}
            href={`/profile/${user.username}/followers`}
          />
          <AccountStateItem
            value={followingCount}
            label="following"
            href={`/profile/${user.username}/following`}
          />
        </div>
      </section>
    </>
  );
}
