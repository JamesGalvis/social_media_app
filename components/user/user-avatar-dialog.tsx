"use client";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user/user-avatar";

interface UserAvatarDialogProps {
  imageSrc?: string | null;
  className?: string;
}

export function UserAvatarDialog({
  className,
  imageSrc,
}: UserAvatarDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <UserAvatar src={imageSrc} className={className} size="lg" />
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center w-fit rounded-lg">
        <UserAvatar src={imageSrc} size="xl" />
      </DialogContent>
    </Dialog>
  );
}
