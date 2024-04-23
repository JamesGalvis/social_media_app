"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const onSaved = async (postId: string) => {
  try {
    const self = await currentUser();

    if (!self) {
      throw new Error("User is required");
    }

    const existingSaved = await db.saved.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: self.id,
        },
      },
    });

    if (existingSaved) {
      throw new Error("The post had already been saved");
    }

    const savedPost = await db.saved.create({
      data: {
        postId,
        userId: self.id,
      },
    });

    revalidatePath("/");
    return savedPost;
  } catch (error) {
    revalidatePath("/");
    throw new Error("Something went wrong");
  }
};

export const onUnsaved = async (postId: string) => {
  try {
    const self = await currentUser();

    if (!self) {
      throw new Error("User is required");
    }

    const existingSaved = await db.saved.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: self.id,
        },
      },
    });

    if (!existingSaved) {
      throw new Error("Saved post does not exist");
    }

    const unsavedPost = await db.saved.delete({
      where: {
        postId_userId: {
          postId,
          userId: self.id,
        },
      },
    });

    revalidatePath("/");
    return unsavedPost;
  } catch (error) {
    revalidatePath("/");
    throw new Error("Something went wrong");
  }
};

export const getSavedPosts = async () => {
  try {
    const self = await currentUser();

    if (!self) {
      return [];
    }

    const savedPosts = await db.saved.findMany({
      where: {
        userId: self.id,
      },
      include: {
        post: {
          include: {
            author: true,
            likes: true,
            comments: true,
            savedPosts: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return savedPosts;
  } catch (error) {
    return [];
  }
};
