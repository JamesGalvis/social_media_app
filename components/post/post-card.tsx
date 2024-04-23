"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { PostExtended } from "@/types";
import { UserAvatar } from "@/components/user/user-avatar";
import { PostCardHeader } from "@/components/post/post-card-header";
import { LikeButton } from "@/components/post/like-button";
import { CommentButton } from "@/components/post/comment-button";
import { SavedButton } from "@/components/post/saved-button";
import { PostImage } from "@/components/post/post-image";
import { PostListSkeleton } from "@/components/skeletons/post/posts-list-skeleton";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: PostExtended;
  selfId: string;
}

export function PostCard({ post, selfId }: PostCardProps) {
  const router = useRouter();

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
    <article
      onClick={() => {
        router.push(`/post/${post.id}`);
      }}
      className={cn(
        "flex w-full gap-3 py-2.5 px-4 border-b hover:bg-accent/30 cursor-pointer transition-colors",
        hidden && "hidden"
      )}
    >
      <div className={cn("max-xs:hidden")}>
        <Link href={`/profile/${post.author.username}`}>
          <UserAvatar size="default" src={post.author.imageUrl} />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <PostCardHeader setHidden={setHidden} post={post} type="PostCard" />
        {post.imageUrl && (
          <section className={cn("pb-3", post.caption && "pt-1.5")}>
            <PostImage imageSrc={post.imageUrl} />
          </section>
        )}
        <footer className="flex items-center gap-6 w-full">
          <LikeButton
            likes={post.likes}
            isLiked={isLiked.length > 0}
            postId={post.id}
          />
          <CommentButton
            commentsCount={post.comments.length}
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
    </article>
  );
}
