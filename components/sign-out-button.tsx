"use client";

import { useClerk } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "ghost" | "default";
}

export function SignOutButton({
  children,
  className,
  variant,
}: SignOutButtonProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Button
      variant={variant}
      onClick={() => {
        signOut(() => router.push("/sign-in"));
      }}
      className={cn("text-sm", className)}
    >
      {!children ? "Sign out" : children}
    </Button>
  );
}
