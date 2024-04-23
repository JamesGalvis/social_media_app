import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { PostExtended } from "@/types";
import { getPostById } from "@/actions/post-service";
import { BackHeader } from "@/components/navigation/back-header";
import { CommentForm } from "./_components/comment-form";
import { CommentsFeed } from "./_components/comments-feed";
import { CommentPageSkeleton } from "@/components/skeletons/comments/comment-page-skeleton";
import { CommentPostCard } from "./_components/comment-post-card";

interface PostProps {
  params: { postId: string };
}

async function Post({ params }: PostProps) {
  const self = await currentUser();
  const post = await getPostById(params.postId);

  if (!self) {
    redirect("/sign-in");
  }

  if (!post || Object.keys(post).length === 0) {
    return notFound();
  }

  return (
    <div>
      <Suspense fallback={<CommentPageSkeleton />}>
        <BackHeader label="Post" />
        <CommentPostCard post={post as PostExtended} selfId={self.id} />
        <CommentForm postId={params.postId} />
        <CommentsFeed postId={params.postId} />
      </Suspense>
    </div>
  );
}

export default Post;
