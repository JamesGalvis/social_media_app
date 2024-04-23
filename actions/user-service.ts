"use server";

import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { UserExtended } from "@/types";

export const getCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Not authorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        externalUserId: userId,
      },
    });

    return user;
  } catch (error) {
    console.log("Something went wrong in obtaining the user");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        following: true,
        followedBy: true,
        posts: {
          include: {
            likes: true,
            savedPosts: true,
            author: true,
            comments: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async ({
  id,
  type = "Extended",
}: {
  id: string;
  type?: "Extended" | "Normal";
}) => {
  try {
    let user;

    if (type === "Extended") {
      user = await db.user.findUnique({
        where: {
          externalUserId: id,
        },
        include: {
          following: true,
          followedBy: true,
          posts: {
            include: {
              likes: true,
              savedPosts: true,
              author: true,
            },
          },
        },
      });
    } else {
      user = await db.user.findUnique({
        where: {
          externalUserId: id,
        },
      });
    }

    return user;
  } catch (error) {
    return null;
  }
};

export const updateProfile = async (formData: FormData) => {
  const { userId } = auth();
  const image = formData.get("image");

  if (!userId) {
    return { error: "You must be logged in to change your profile picture" };
  }

  if (!image) {
    return { error: "You must provide the image" };
  }

  const imageBlob = image instanceof Blob ? image : new Blob([image]);

  try {
    await clerkClient.users.updateUserProfileImage(userId, {
      file: imageBlob,
    });

    revalidatePath("/");
    return { success: "Profile image updated" };
  } catch (error) {
    return { message: error };
  }
};
