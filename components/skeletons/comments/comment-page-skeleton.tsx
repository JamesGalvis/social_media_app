import React from "react";

import { BackHeader } from "@/components/navigation/back-header";
import { PostCardSkeleton } from "@/components/skeletons/post/post-skeleton";
import { Separator } from "@/components/ui/separator";
import { CommentsFeedSkeleton } from "@/components/skeletons/comments/comments-feed-skeleton";

export function CommentPageSkeleton() {
  return (
    <div>
      <BackHeader label="Post" />
      <PostCardSkeleton type="CommentPost" />
      <Separator />
      <CommentsFeedSkeleton />
    </div>
  );
}
