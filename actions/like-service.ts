"use server";

import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

export const onLiked = async (postId: string) => {
  try {
    const self = await currentUser();

    if (!self) {
      throw new Error("User is required");
    }

    const existingLike = await db.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: self.id,
        },
      },
    });

    if (existingLike) {
      throw new Error("The post had already been liked");
    }

    const likedPost = await db.like.create({
      data: {
        postId,
        userId: self.id,
      },
    });

    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post) {
        await db.notification.create({
          data: {
            body: `${self.username} liked your post!`,
            userId: post.authorId,
          },
        });

        await db.user.update({
          where: {
            externalUserId: post.authorId,
          },
          data: {
            hasNotifications: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    revalidatePath("/");
    revalidatePath("/saved");
    return likedPost;
  } catch (error) {
    revalidatePath("/");
    throw new Error("Something went wrong");
  }
};

export const onDislike = async (postId: string) => {
  try {
    const self = await currentUser();

    if (!self) {
      throw new Error("User is required");
    }

    const existingLike = await db.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: self.id,
        },
      },
    });

    if (!existingLike) {
      throw new Error("Liked post does not exist");
    }

    const unlikedPost = await db.like.delete({
      where: {
        postId_userId: {
          postId,
          userId: self.id,
        },
      },
    });

    revalidatePath("/");
    revalidatePath("/saved");
    return unlikedPost;
  } catch (error) {
    revalidatePath("/");
    throw new Error("Something went wrong");
  }
};
