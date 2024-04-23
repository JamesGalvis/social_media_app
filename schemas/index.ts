import * as z from "zod";

export const PostSchema = z.object({
  caption: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
});

export const CommentSchema = z.object({
  body: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
});

export const EditCommentSchema = z.object({
  body: z.string().min(2, {
    message: "Empty field is not allowed",
  }),
});

export const EditProfileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
  bio: z.optional(z.string()),
});
