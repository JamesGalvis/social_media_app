"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { LogOut, Moon } from "lucide-react";

import { useMobileSidebarStore } from "@/hooks/store";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserAvatar } from "@/components/user/user-avatar";
import { RoutesLinks } from "@/components/navigation/mobile-sidebar/routes-links";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/components/sign-out-button";
import { Switch } from "@/components/ui/switch";

interface SidebarContentProps {
  userImage: string | null;
  name: string | null;
  username: string | null;
  hasNotification: boolean | undefined | null;
}

export function SidebarContent({
  userImage,
  name,
  username,
  hasNotification,
}: SidebarContentProps) {
  const { setTheme, theme } = useTheme();
  const { open, onSidebarClose, onSidebarOpen } = useMobileSidebarStore();

  const onSidebarChange = (isOpen: boolean) => {
    if (!isOpen) {
      onSidebarClose();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onSidebarChange}>
      <SheetTrigger onClick={onSidebarOpen}>
        <UserAvatar src={userImage} />
      </SheetTrigger>

      <SheetContent side="left" className="w-[260px] p-0 z-[100]">
        <div className="flex flex-col items-center gap-2 w-full h-full pt-5 pb-3 px-2">
          <Link
            href={`/profile/${username}`}
            onClick={onSidebarClose}
            className="flex items-center justify-start gap-x-2 w-full py-3 px-2 my-4 rounded-lg border hover:bg-accent transition"
          >
            <UserAvatar src={userImage} size="md" />
            <div className="flex flex-col">
              <p className="font-semibold text-primary w-[80%] truncate">
                {name}
              </p>
              <p className="text-sm text-primary/50">{username}</p>
            </div>
          </Link>
          <RoutesLinks
            onSidebarClose={onSidebarClose}
            hasNotifications={hasNotification}
          />
          <Separator />
          <div className="flex flex-col w-full">
            <div className="flex gap-x-2 w-full px-4 py-2">
              <div className="flex items-center">
                <Moon className="h-5 w-5 mr-2" />
                <p className="text-sm">Dark Mode</p>
              </div>
              <Switch
                className="ml-auto h-7"
                checked={theme === "dark"}
                onCheckedChange={(isEnabled) => {
                  if (isEnabled) {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}
              />
            </div>
            <SignOutButton
              variant="ghost"
              className="w-full justify-start text-accent-foreground/80"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </SignOutButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
