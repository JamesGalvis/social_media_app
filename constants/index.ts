import { Bell, Bookmark, Compass, Home, Settings } from "lucide-react";

export const mobileSidebarRoutes = [
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
  },
  {
    label: "Settings",
    Icon: Settings,
    href: "/settings",
  },
];
