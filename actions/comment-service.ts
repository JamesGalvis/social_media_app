"use server";

import * as z from "zod";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CommentSchema, EditCommentSchema } from "@/schemas";
import { getUserById } from "@/actions/user-service";
import { revalidatePath } from "next/cache";

export const createComment = async ({
  postId,
  values,
}: {
  postId: string;
  values: z.infer<typeof CommentSchema>;
}) => {
  try {
    const self = await currentUser();

    if (!self) {
      redirect("/sign-in");
    }

    const validatedFields = CommentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { body, imageUrl } = validatedFields.data;

    if (!body && !imageUrl) {
      return { error: "It must have at least the body or image comment" };
    }

    if (!postId) {
      return { error: "Post ID is required" };
    }

    const userExist = await getUserById({ id: self.id });

    if (!userExist) {
      return { error: "Unauthorized!" };
    }

    await db.comment.create({
      data: {
        postId,
        userId: self.id,
        body,
        imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath(`/post/${postId}`);

    try {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post) {
        await db.notification.create({
          data: {
            body: `${self.username} commented on your post!`,
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
      revalidatePath("/");
      revalidatePath(`/post/${postId}`);
    } catch (error) {
      console.log(error);
    }

    return { success: "Comment created" };
  } catch (error) {
    return { error: "Something went wrong when creating the comment" };
  }
};

export const editComment = async ({
  authorId,
  commentId,
  values,
}: {
  commentId: string;
  authorId: string;
  values: z.infer<typeof EditCommentSchema>;
}) => {
  try {
    if (!commentId) {
      return { error: "Comment ID is required" };
    }

    if (!authorId) {
      return { error: "Author ID is required" };
    }

    const validatedFields = EditCommentSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { body } = validatedFields.data;

    if (!body) {
      return { error: "A body of the comment must be provided" };
    }

    const comment = await db.comment.update({
      where: {
        id: commentId,
        userId: authorId,
      },
      data: {
        body,
      },
    });

    revalidatePath("/");
    return { success: "Edited comment!", data: { comment } };
  } catch (error) {
    return { error: "Something went wrong when editing the comment" };
  }
};

export const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  } catch (error) {
    return [];
  }
};

export const deleteComment = async (postId: string, authorId: string) => {
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

    const comment = await db.comment.delete({
      where: {
        id: postId,
        userId: userExist.externalUserId,
      },
    });

    revalidatePath("/");
    return { success: "Comment deleted", comment };
  } catch (error) {
    revalidatePath("/");
    return { error: "Something went wrong!" };
  }
};
