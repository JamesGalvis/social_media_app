"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackHeaderProps {
  label?: string;
  href?: string;
}

export function BackHeader({ label, href }: BackHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isHidden =
    pathname.includes("/saved") || pathname.includes("/notifications");

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 border-b",
        isHidden && "max-ms:hidden"
      )}
    >
      <Button variant="ghost" size="icon" onClick={handleClick}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <span className="text-lg font-bold">{label}</span>
    </div>
  );
}
