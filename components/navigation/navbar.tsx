"use client";

import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function Navbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHidden =
    pathname.includes("/profile") ||
    pathname.includes("/post") ||
    pathname.includes("/followers") ||
    pathname.includes("/following");

  return (
    <div
      className={cn(
        "sticky top-0 left-0 right-0 ms:hidden flex items-center justify-between gap-4 z-50 px-2 py-3 border-b bg-background",
        isHidden && "hidden"
      )}
    >
      <Logo />
      {children}
    </div>
  );
}
