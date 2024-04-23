"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface UserSearchTabsProps {
  username: string | null;
}

export function UserSearchTabs({ username }: UserSearchTabsProps) {
  const pathname = usePathname();

  const isFollowersTab = pathname.endsWith("/followers");
  const isFollowingTab = pathname.endsWith("/following");

  return (
    <div className="flex border-b">
      <Link
        href={`/profile/${username}/followers`}
        className={cn(
          "flex-1 ms:text-lg text-base py-2 p-3 text-center hover:bg-accent transition",
          isFollowersTab && "border-b-2 border-b-sky-400 font-bold"
        )}
      >
        Followers
      </Link>
      <Separator orientation="vertical" />
      <Link
        href={`/profile/${username}/following`}
        className={cn(
          "flex-1 ms:text-lg text-base py-2 p-3 text-center hover:bg-accent transition",
          isFollowingTab && "border-b-2 border-b-sky-400 font-bold"
        )}
      >
        Following
      </Link>
    </div>
  );
}
