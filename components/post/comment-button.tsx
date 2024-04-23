"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface CommentButtonProps {
  postId: string;
  commentsCount: string | number;
}

export function CommentButton({ postId, commentsCount }: CommentButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/post/${postId}`);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="group flex items-center hover:bg-transparent"
    >
      <motion.span whileTap={{ scale: 0.6 }}>
        <span className="flex items-center justify-center p-1.5 ms:group-hover:bg-emerald-500/25 rounded-full  transition">
          <MessageCircle className="h-5 w-5 text-neutral-400 ms:dark:group-hover:text-emerald-500/80 ms:group-hover:text-emerald-500/80" />
        </span>
      </motion.span>

      <p className="text-neutral-400 ms:dark:group-hover:text-emerald-500/80 ms:group-hover:text-emerald-500/80">
        {commentsCount}
      </p>
    </Button>
  );
}
