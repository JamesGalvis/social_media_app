import Link from "next/link";

import { cn } from "@/lib/utils";
import { PostExtended } from "@/types";
import { multiFormatDateString } from "@/lib/format-date";
import { UserAvatar } from "@/components/user/user-avatar";
import { Actions } from "@/components/actions";

interface PostCardHeaderProps {
  type: "PostPage" | "PostCard";
  post: PostExtended;
  setHidden: (value: boolean) => void;
}

export function PostCardHeader({ post, setHidden, type }: PostCardHeaderProps) {
  const timeSincePublication = multiFormatDateString(post.createdAt);

  return (
    <header className="flex flex-col xs:pb-2 pb-1.5 gap-1.5">
      <div className="flex items-center gap-2 max-xs:pb-2">
        <Link
          href={`/profile/${post.author.username}`}
          className={cn("xs:hidden", type === "PostPage" && "xs:block")}
        >
          <UserAvatar size="default" src={post.author.imageUrl} />
        </Link>
        <div className="flex-1 flex items-center overflow-hidden">
          <div className="flex flex-col w-full">
            <div
              className={cn(
                "flex items-center ms:gap-1.5 gap-1 lg:w-[52%] w-full",
                type === "PostPage" &&
                  "flex-col items-start -space-y-2 lg:w-full"
              )}
            >
              <Link
                href={`/profile/${post.author.username}`}
                className="hover:underline ms:text-lg text-[15px] font-bold truncate"
              >
                {post.author.name}
              </Link>
              <p className="w-fit hover:underline text-neutral-400 md:text-base text-sm font-normal">
                @{post.author.username}
              </p>
            </div>
            <p
              className={cn(
                "text-[13px] font-normal text-primary/60",
                type === "PostPage" && "hidden"
              )}
            >
              {timeSincePublication}
            </p>
          </div>
        </div>
        <Actions
          type="Post"
          setHidden={setHidden}
          itemId={post.id}
          authorId={post.authorId}
        />
      </div>
      {post.caption && (
        <div className="w-full">
          <p className="text-base">{post.caption}</p>
        </div>
      )}
    </header>
  );
}
