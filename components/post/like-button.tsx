"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Like } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { onLiked, onDislike } from "@/actions/like-service";

interface LikeButtonProps {
  likes: Like[];
  isLiked: boolean;
  postId: string;
}

interface LikeActionResult {
  id: string;
  postId: string;
  userId: string;
}

export function LikeButton({ isLiked, postId, likes }: LikeButtonProps) {
  const [optimisticState, setOptimisticState] = useState({
    isLiked,
    likesCount: likes.length,
  });

  const handleAction = async (action: () => Promise<LikeActionResult>) => {
    try {
      await action();
    } catch (error) {
      setOptimisticState({
        isLiked: isLiked,
        likesCount: likes.length,
      });
      toast.error("Something went wrong");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newIsLiked = !optimisticState.isLiked;
    const newLikesCount = optimisticState.likesCount + (newIsLiked ? 1 : -1);

    setOptimisticState({ isLiked: newIsLiked, likesCount: newLikesCount });

    handleAction(() => (newIsLiked ? onLiked(postId) : onDislike(postId)));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="group flex items-center hover:bg-transparent"
    >
      <motion.span whileTap={{ scale: 0.6 }}>
        <span className="flex items-center justify-center p-1.5 rounded-full transition ms:group-hover:bg-rose-500/25">
          <Heart
            className={cn(
              "h-5 w-5 text-neutral-400 ms:dark:group-hover:text-rose-500/80 ms:group-hover:text-rose-500/80",
              isLiked &&
                optimisticState.isLiked &&
                "text-rose-500/80 fill-rose-500/80",
              isLiked &&
                !optimisticState.isLiked &&
                "text-neutral-400 fill-none",
              !isLiked &&
                optimisticState.isLiked &&
                "text-rose-500/80 fill-rose-500/80"
            )}
          />
        </span>
      </motion.span>

      <p
        className={cn(
          "text-neutral-400 ms:dark:group-hover:text-rose-500/80 ms:group-hover:text-rose-500/80",
          !isLiked && optimisticState.isLiked && "text-rose-500/80 font-medium",
          isLiked && optimisticState.isLiked && "text-rose-500/80 font-medium",
          isLiked && !optimisticState.isLiked && "text-neutral-400 font-medium"
        )}
      >
        {optimisticState.likesCount}
      </p>
    </Button>
  );
}
