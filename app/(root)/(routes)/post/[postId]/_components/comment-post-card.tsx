"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { PostExtended } from "@/types";
import { formatDatetime } from "@/lib/format-date";
import { PostCardHeader } from "@/components/post/post-card-header";
import { LikeButton } from "@/components/post/like-button";
import { SavedButton } from "@/components/post/saved-button";
import { PostImage } from "@/components/post/post-image";
import { PostListSkeleton } from "@/components/skeletons/post/posts-list-skeleton";

interface CommentPostCardProps {
  post: PostExtended;
  selfId: string;
}

export function CommentPostCard({ post, selfId }: CommentPostCardProps) {
  const [hidden, setHidden] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSaved = post.savedPosts.filter((saved) => saved.userId === selfId);
  const isLiked = post.likes.filter((like) => like.userId === selfId);

  if (!mounted) {
    <PostListSkeleton />;
  }

  return (
    <div
      className={cn(
        "flex w-full gap-3 py-2.5 px-4 border-b",
        hidden && "hidden"
      )}
    >
      <div className="flex flex-col w-full">
        <PostCardHeader setHidden={setHidden} post={post} type="PostPage" />
        {post.imageUrl && (
          <section className={cn("pb-3", post.caption && "pt-1.5")}>
            <PostImage imageSrc={post.imageUrl} />
          </section>
        )}
        <p className="text-sm text-accent-foreground/60">
          {formatDatetime(post.createdAt)}
        </p>
        <footer className="flex items-center gap-6 w-full">
          <LikeButton
            likes={post.likes}
            isLiked={isLiked.length > 0}
            postId={post.id}
          />
          <SavedButton
            hiddenPost={(value) => {
              setHidden(value);
            }}
            postId={post.id}
            isSaved={isSaved.length > 0}
          />
        </footer>
      </div>
    </div>
  );
}
