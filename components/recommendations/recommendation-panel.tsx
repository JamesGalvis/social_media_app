"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface RecommendationPanelProps {
  children: React.ReactNode;
}

export function RecommendationPanel({ children }: RecommendationPanelProps) {
  const pathname = usePathname();

  const isHidden = pathname.startsWith("/settings");

  return (
    <div
      className={cn(
        "sticky top-0 flex flex-col py-5 px-4 max-lg:hidden xl:max-w-[340px] max-w-[320px] w-full h-screen",
        isHidden && "hidden"
      )}
    >
      {children}
    </div>
  );
}
