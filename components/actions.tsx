"use client";

import { useState, useTransition } from "react";
import { CircleOff, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { deletePost } from "@/actions/post-service";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { deleteComment } from "@/actions/comment-service";
import { deleteImageFile } from "@/actions/uploadthing-actions";

interface ActionsProps {
  type: "Post" | "Comment";
  authorId: string;
  itemId: string;
  setHidden: (value: boolean) => void;
  setIsEditing?: (value: boolean) => void;
}

export function Actions({
  authorId,
  itemId,
  setHidden,
  type,
  setIsEditing,
}: ActionsProps) {
  const { user } = useUser();

  const [open, setOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return null;
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(false);
    setHidden(true);
    startTransition(async () => {
      if (type === "Post") {
        const { error, post, success } = await deletePost(itemId, authorId);

        if (error) {
          setHidden(false);
          toast.error(error);
        }

        if (success && post.imageUrl) {
          await deleteImageFile(post.imageUrl);
          toast.success(success);
        }
      } else {
        const { comment, error, success } = await deleteComment(
          itemId,
          authorId
        );

        if (error) {
          setHidden(false);
          toast.error(error);
        }

        if (success && comment.imageUrl) {
          await deleteImageFile(comment.imageUrl);
          toast.success(success);
        }
      }
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <MoreHorizontal className="h-6 w-6 p-1" />
      </PopoverTrigger>
      <PopoverContent className="ms:w-52 w-40 p-2 gap-1">
        <Button
          variant="ghost"
          onClick={() => {
            if (type === "Comment" && setIsEditing) {
              setOpen(false);
              setIsEditing(true);
            }
          }}
          className={cn(
            "w-full py-1.5 justify-start px-0 pl-2",
            user?.id !== authorId && "hidden"
          )}
        >
          <Pencil className="h-4 w-4 mr-3" />
          <span>Edit</span>
        </Button>
        <Button
          variant="ghost"
          disabled={isPending}
          onClick={handleDelete}
          className={cn(
            "w-full py-1.5 justify-start px-0 pl-2  text-rose-500 hover:bg-rose-500/30 hover:text-rose-500",
            user?.id !== authorId && "hidden"
          )}
        >
          <Trash className="h-4 w-4 mr-3" />
          <span>{type === "Post" ? "Delete post" : "Delete"}</span>
        </Button>
        <Button
          variant="ghost"
          disabled={isPending}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          className={cn(
            "w-full py-1.5 justify-start px-0 pl-2",
            user?.id === authorId && "hidden"
          )}
        >
          <CircleOff className="h-4 w-4 mr-3" /> Block user
        </Button>
      </PopoverContent>
    </Popover>
  );
}
