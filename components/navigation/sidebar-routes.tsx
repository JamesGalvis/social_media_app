"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Bookmark, Compass, Dot, Home, UserRound } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { updateNotificationState } from "@/actions/notifications-service";

interface SidebarRoutesProps {
  username: string | null;
  hasNotifications: boolean | undefined | null;
}

export function SidebarRoutes({
  username,
  hasNotifications,
}: SidebarRoutesProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Home",
      Icon: Home,
      href: "/",
    },
    {
      label: "Explore",
      Icon: Compass,
      href: "/explore",
    },
    {
      label: "Saved",
      Icon: Bookmark,
      href: "/saved",
    },
    {
      label: "Notifications",
      Icon: Bell,
      href: "/notifications",
      alert: hasNotifications,
      onClick: async () => {
        try {
          await updateNotificationState();
        } catch (error) {
          toast.error("Something went wrong");
        }
      },
    },
    {
      label: "Profile",
      Icon: UserRound,
      href: `/profile/${username}`,
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-y-2 w-full mt-4">
      {routes.map(({ Icon, href, label, alert, onClick }) => {
        const isActive =
          (pathname === "/" && href === "/") ||
          pathname === href ||
          pathname?.startsWith(`${href}/`);

        return (
          <Link
            onClick={alert === true ? onClick : () => {}}
            href={href}
            key={href}
            className={cn(
              "group relative flex items-center max-xl:justify-center w-full xl:pl-2 xl:py-3 p-3 rounded-lg text-[19px] font-medium text-primary/85 transition duration-100 dark:hover:bg-muted/50 hover:bg-muted/80",
              isActive &&
                "bg-muted dark:bg-muted dark:hover:bg-muted hover:bg-muted"
            )}
          >
            {alert && (
              <Dot
                className={cn(
                  "h-14 w-14 text-sky-500 absolute -top-2 left-0 z-30",
                  isActive && "hidden"
                )}
              />
            )}
            <Icon
              strokeWidth={isActive ? "2.25px" : "1.75px"}
              className="h-[26px] w-[26px] xl:mr-4 max-ms:mr-4 group-hover:scale-110 transition duration-200"
            />
            <p
              className={cn(
                "max-xl:hidden",
                isActive && "p-0 font-semibold text-primary/95"
              )}
            >
              {label}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
