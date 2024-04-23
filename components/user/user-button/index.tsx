import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user/user-avatar";
import { Content } from "@/components/user/user-button/content";
import { currentUser } from "@clerk/nextjs";

export async function UserButton() {
  const user = await currentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Button
          variant="outline"
          className="h-14 w-full justify-start gap-x-2 py-2 px-3 rounded-lg bg-muted-foreground/10 border-accent text-primary/85 overflow-hidden"
        >
          <UserAvatar src={user?.imageUrl} className="border" />
          <div className="text-[15px] max-xl:hidden max-ms:block w-[55%]">
            <p className="truncate">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <MoreHorizontal className="h-4 w-4 ml-auto max-xl:hidden max-ms:block" />
        </Button>
      </DropdownMenuTrigger>

      <Content />
    </DropdownMenu>
  );
}
