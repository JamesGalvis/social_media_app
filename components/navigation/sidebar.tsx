import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { getUserById } from "@/actions/user-service";
import { Logo } from "@/components/logo";
import { SidebarRoutes } from "@/components/navigation/sidebar-routes";
import { CreatePostButton } from "@/components/post/create-post-button";
import { UserButton } from "@/components/user/user-button";

export async function Sidebar() {
  const self = await currentUser();

  if (!self) {
    redirect("/sign-in");
  }

  const user = await getUserById({ id: self?.id, type: "Normal" });

  return (
    <div className="flex flex-col items-center gap-2 w-full h-full pt-5 pb-3 px-2">
      <Logo />
      <SidebarRoutes
        username={self.username}
        hasNotifications={user?.hasNotifications}
      />
      <CreatePostButton />
      <UserButton />
    </div>
  );
}
