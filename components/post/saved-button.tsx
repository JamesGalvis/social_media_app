"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { onSaved, onUnsaved } from "@/actions/saved-service";

interface SavedButtonProps {
  isSaved: boolean;
  postId: string;
  hiddenPost?: (value: boolean) => void;
}

export function SavedButton({ isSaved, postId, hiddenPost }: SavedButtonProps) {
  const [isSavedOptimistic, setIsSavedOptimistic] = useState(isSaved);
  const pathname = usePathname();

  const handleAction = async (
    action: () => Promise<{
      id: string;
      postId: string;
      userId: string;
      createdAt: Date;
      updatedAt: Date;
    }>
  ) => {
    try {
      await action();
    } catch (error) {
      setIsSavedOptimistic(isSaved);
      if (pathname === "/saved" && hiddenPost) {
        hiddenPost(false);
      }
      toast.error("Something went wrong");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newIsSaved = !isSavedOptimistic;
    setIsSavedOptimistic(newIsSaved);

    if (!newIsSaved && pathname === "/saved" && hiddenPost) {
      hiddenPost(true);
    }

    handleAction(() => (newIsSaved ? onSaved(postId) : onUnsaved(postId)));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="group flex items-center justify-center hover:bg-transparent ml-auto p-1.5 rounded-full transition-colors ms:hover:dark:bg-indigo-700/40 ms:hover:bg-indigo-500/25"
    >
      <motion.span whileTap={{ scale: 0.6 }}>
        <Bookmark
          className={cn(
            "h-5 w-5 text-neutral-400 ms:dark:group-hover:text-indigo-500/80 overflow-hidden ms:group-hover:text-indigo-400/80 transition-colors",
            isSaved &&
              isSavedOptimistic &&
              "text-indigo-400/80 fill-indigo-400/80",
            isSaved && !isSavedOptimistic && "text-neutral-400 fill-none",
            !isSaved &&
              isSavedOptimistic &&
              "text-indigo-400/80 fill-indigo-400/80"
          )}
        />
      </motion.span>
    </Button>
  );
}
