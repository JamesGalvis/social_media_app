import { redirect } from "next/navigation";

import { SidebarContent } from "@/components/navigation/mobile-sidebar/content";
import { currentUser } from "@clerk/nextjs";
import { getUserById } from "@/actions/user-service";

export async function MobileSidebar() {
  const self = await currentUser();

  if (!self) {
    redirect("/sign-in");
  }

  const user = await getUserById({ id: self?.id, type: "Normal" });

  return (
    <SidebarContent
      userImage={self.imageUrl}
      username={self.username}
      name={`${self.firstName} ${self.lastName}`}
      hasNotification={user?.hasNotifications}
    />
  );
}
