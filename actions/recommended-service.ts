"use server";

import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getRecommendedUsers = async () => {
  try {
    const self = await currentUser();

    if (!self) {
      return [];
    }

    const users = await db.user.findMany({
      where: {
        externalUserId: { not: self.id },
        followedBy: { none: { followerId: self.id } },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};
