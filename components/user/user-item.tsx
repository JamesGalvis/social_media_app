import Link from "next/link";
import { UserAvatar } from "@/components/user/user-avatar";
import { User } from "@prisma/client";

import { cn } from "@/lib/utils";
import { FollowButton } from "./follow-button";

interface UserItemProps {
  user: User;
  avatarSize?: "md" | "lg" | "xl" | "default";
  showFollowButton: boolean;
  showDescription?: boolean;
  className?: string;
  isFollowing?: boolean;
  followButtonSize?: "default" | "sm";
}

export function UserItem({
  showFollowButton,
  user,
  className,
  showDescription = true,
  avatarSize,
  isFollowing = true,
  followButtonSize,
}: UserItemProps) {
  return (
    <div
      className={cn(
        "flex ms:items-center gap-x-4 w-full hover:bg-accent transition py-3 ms:px-8 px-3",
        className
      )}
    >
      <Link href={`/profile/${user.username}`}>
        <UserAvatar src={user.imageUrl} size={avatarSize || "md"} />
      </Link>
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex items-center w-full flex-wrap">
          <div className="flex flex-col -space-y-1.5 lg:w-[52%] w-[60%]">
            <Link
              href={`/profile/${user.username}`}
              className="hover:underline ms:text-lg text-base font-bold truncate"
            >
              {user.name}
            </Link>
            <Link
              href={`/profile/${user.username}`}
              className="w-fit hover:underline text-neutral-400 md:text-base text-sm font-normal"
            >
              @{user.username}
            </Link>
          </div>
          {showFollowButton && (
            <div className="ml-auto">
              <FollowButton
                isFollowing={isFollowing}
                userId={user.externalUserId || ""}
                size={followButtonSize || "default"}
              />
            </div>
          )}
        </div>
        {user.bio && showDescription && (
          <div className="ms:w-11/12 w-full text-[15px] py-1 mt-1.5">
            <p>{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
