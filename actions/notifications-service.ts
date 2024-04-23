"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getNotifications = async () => {
  try {
    const self = await currentUser();

    if (!self) {
      redirect("/sign-in");
    }

    const notifications = await db.notification.findMany({
      where: {
        userId: self.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  } catch (error) {
    return [];
  }
};

export const updateNotificationState = async () => {
  try {
    const self = await currentUser();

    if (!self) {
      redirect("/sign-in");
    }

    await db.user.update({
      where: {
        externalUserId: self.id,
      },
      data: {
        hasNotifications: false,
      },
    });

    revalidatePath("/");
    revalidatePath("/notifications");
    return { success: "Updated notification state" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
