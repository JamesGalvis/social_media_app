"use server";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getUserById } from "@/actions/user-service";
import { db } from "@/lib/db";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await currentUser();

    if (!self) {
      redirect("/sign-in");
    }

    const otherUser = await getUserById({ id });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (self.id === otherUser.externalUserId) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.externalUserId,
      },
    });

    return !!existingFollow;
  } catch (error) {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await currentUser();

  const otherUser = await db.user.findUnique({
    where: { externalUserId: id },
  });

  if (!self) {
    redirect("/sign-in");
  }

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.id === otherUser.externalUserId) {
    throw new Error("Cannot follow yourself");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.externalUserId,
    },
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.externalUserId,
    },
    include: {
      following: true,
      follower: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await currentUser();

  const otherUser = await db.user.findUnique({
    where: { externalUserId: id },
  });

  if (!self) {
    redirect("/sign-in");
  }

  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.externalUserId,
    },
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/profile/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/profile/${unfollowedUser.following.username}`);
      revalidatePath(`/profile/${unfollowedUser.following.username}/following`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const getFollowedUsers = async (id: string) => {
  try {
    const followedUsers = await db.follow.findMany({
      where: {
        followerId: id,
      },
      include: {
        following: true,
      },
    });

    return followedUsers;
  } catch (error) {
    return [];
  }
};

export const getFollowersUsers = async (id: string) => {
  try {
    const userFollowers = await db.follow.findMany({
      where: {
        followingId: id,
      },
      include: {
        follower: true,
      },
    });

    return userFollowers;
  } catch (error) {
    return [];
  }
};
