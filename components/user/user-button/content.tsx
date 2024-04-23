"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { LogOut, Moon, Settings, Sun, SunMoon } from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/components/sign-out-button";

export function Content() {
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <DropdownMenuContent className="w-[230px]" align="center">
      <DropdownMenuItem
        onClick={() => router.push("/settings")}
        className="cursor-pointer"
      >
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="cursor-pointer">
          <SunMoon className="w-4 h-4 mr-2" />
          Change appearance
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="h-4 w-4 text-primary mr-3" />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="h-4 w-4 text-primary mr-3" />
              <span>Light</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <Separator orientation="horizontal" className="my-1" />
      <SignOutButton variant="ghost" className="h-8 w-full p-0">
        <DropdownMenuItem className="text-accent-foreground/85 w-full h-full cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </SignOutButton>
    </DropdownMenuContent>
  );
}
