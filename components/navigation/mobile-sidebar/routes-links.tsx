"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Bell, Bookmark, Compass, Dot, Home, Settings } from "lucide-react";
import { updateNotificationState } from "@/actions/notifications-service";
import { toast } from "sonner";

interface MobileSidebarRoutesProps {
  onSidebarClose: () => void;
  hasNotifications: boolean | undefined | null;
}

export function RoutesLinks({
  onSidebarClose,
  hasNotifications,
}: MobileSidebarRoutesProps) {
  const pathname = usePathname();

  const mobileSidebarRoutes = [
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
          onSidebarClose();
          await updateNotificationState();
        } catch (error) {
          toast.error("Something went wrong");
        }
      },
    },
    {
      label: "Settings",
      Icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-y-1 w-full">
      {mobileSidebarRoutes.map(({ href, Icon, label, alert, onClick }) => {
        const isActive =
          (pathname === "/" && href === "/") ||
          pathname === href ||
          pathname?.startsWith(`${href}/`);

        return (
          <Link
            onClick={alert === true ? onClick : onSidebarClose}
            href={href}
            key={href}
            // onClick={onSidebarClose}
            className={cn(
              "group relative flex items-center w-full pl-2 py-3 rounded-lg text-[19px] font-medium text-primary/85 transition duration-75",
              isActive && "bg-muted dark:bg-muted "
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
              className="h-[26px] w-[26px] mr-4 group-hover:scale-110 transition duration-200"
            />
            <p className={cn(isActive && "p-0 font-semibold text-primary/95")}>
              {label}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
