"use server";

import * as z from "zod";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { getUserById } from "@/actions/user-service";
import { db } from "@/lib/db";
import { PostSchema } from "@/schemas";

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        likes: true,
        comments: true,
        savedPosts: true,
      },
    });

    return post;
  } catch (error) {
    return {};
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
        likes: true,
        comments: true,
        savedPosts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    return [];
  }
};

export const getUserPosts = async (id: string) => {
  try {
    const userPosts = await db.post.findMany({
      where: {
        authorId: id,
      },
      include: {
        author: true,
        likes: true,
        comments: true,
        savedPosts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return userPosts;
  } catch (error) {
    return [];
  }
};

export const deletePost = async (postId: string, authorId: string) => {
  try {
    const self = await currentUser();

    if (!self) {
      return { error: "Unauthorized!" };
    }

    const userExist = await getUserById({ id: self.id });

    if (!userExist) {
      return { error: "Unauthorized!" };
    }

    if (userExist.externalUserId !== authorId) {
      return { error: "Unauthorized!" };
    }

    const post = await db.post.delete({
      where: {
        id: postId,
        authorId: userExist.externalUserId,
      },
    });

    revalidatePath("/");
    return { success: "Post deleted", post };
  } catch (error) {
    revalidatePath("/");
    return { error: "Something went wrong!" };
  }
};

export const createPost = async (values: z.infer<typeof PostSchema>) => {
  try {
    const validatedFields = PostSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { caption, imageUrl } = validatedFields.data;

    if (!caption && !imageUrl) {
      return { error: "It must have at least the caption or image" };
    }

    const self = await currentUser();

    if (!self) {
      return { error: "Unauthorized!" };
    }

    const userExist = await getUserById({ id: self.id });

    if (!userExist) {
      return { error: "Unauthorized!" };
    }

    await db.post.create({
      data: {
        authorId: self.id,
        ...validatedFields.data,
      },
    });

    revalidatePath("/");
    revalidatePath(`/profile/${self.id}`);
    return { success: "Posted" };
  } catch (error) {
    throw new Error("Internal Error");
  }
};
