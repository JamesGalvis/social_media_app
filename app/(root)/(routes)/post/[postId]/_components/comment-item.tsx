"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

import { PostImage } from "@/components/post/post-image";
import { UserAvatar } from "@/components/user/user-avatar";
import { multiFormatDateString } from "@/lib/format-date";
import { CommentExtended } from "@/types";
import { Actions } from "@/components/actions";
import { cn } from "@/lib/utils";
import { CommentItemForm } from "./comment-item-form";

interface CommentItemProps {
  comment: CommentExtended;
}

export function CommentItem({ comment }: CommentItemProps) {
  const { user } = useUser();

  const [hidden, setHidden] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!user) {
    return null;
  }

  return (
    <div className={cn("border-b py-3 px-4", hidden && "hidden")}>
      <div className="flex items-center gap-2">
        <Link href={`/profile/${comment.user.username}`}>
          <UserAvatar src={comment.user.imageUrl} />
        </Link>
        <div className="flex flex-col flex-1 -space-y-1">
          <Link
            href={`/profile/${comment.user.username}`}
            className="w-fit hover:underline ms:text-base text-[15px] font-bold truncate"
          >
            {comment.user.name}
          </Link>
          <p className="w-fit hover:underline text-neutral-400 md:text-base text-sm font-normal">
            @{comment.user.username}
          </p>
        </div>
        <div className="flex items-center">
          <Actions
            type="Comment"
            setHidden={setHidden}
            authorId={comment.userId}
            itemId={comment.id}
            setIsEditing={(value) => {
              setIsEditing(value);
            }}
          />
        </div>
      </div>
      {user.id !== comment.userId && (
        <div>
          <p className="text-base text-accent-foreground/70 py-2">
            {comment.body}
          </p>
          <p className="text-[13px] font-normal text-primary/45">
            Published: {multiFormatDateString(comment.createdAt)}
          </p>
        </div>
      )}
      {comment.body && user.id === comment.userId && (
        <CommentItemForm
          initialData={comment}
          isEditing={isEditing}
          setIsEditing={(value) => {
            setIsEditing(value);
          }}
        />
      )}
      {comment.imageUrl && (
        <div className="py-3">
          <PostImage imageSrc={comment.imageUrl} />
        </div>
      )}
    </div>
  );
}
