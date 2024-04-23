"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { onFollow, onUnfollow } from "@/actions/follow-service";
import { VariantProps, cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const followButtonVariants = cva("", {
  variants: {
    size: {
      default: "max-ms:px-2 max-ms:h-9",
      sm: "px-3 rounded-xl",
    },
  },
});

interface FollowButtonProps extends VariantProps<typeof followButtonVariants> {
  isFollowing: boolean;
  userId: string;
}

export function FollowButton({ isFollowing, userId, size }: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      className={cn(
        "bg-accent-foreground/15 hover:bg-accent-foreground/20 dark:bg-accent-foreground/30 dark:hover:bg-accent-foreground/45 text-primary",
        followButtonVariants({ size })
      )}
      disabled={isPending}
      onClick={onClick}
    >
      {isPending && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
}
