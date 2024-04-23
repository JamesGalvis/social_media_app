import { Follow, Like, Post, Saved, User, Comment } from "@prisma/client";

export type ImageFormat = "vertical" | "horizontal" | "square";

export type UploadFileResponse =
  | { data: UploadData; error: null }
  | { data: null; error: UploadError };

export type UploadData = {
  key: string;
  url: string;
  name: string;
  size: number;
};

export type UploadError = {
  code: string;
  message: string;
  data: any;
};

export type UserExtended = User & {
  following: Follow[];
  followedBy: Follow[];
  posts: PostExtended[];
};

export type FollowedUser = {
  following: {
    id: string;
    externalUserId: string;
    name: string;
    username: string;
    imageUrl: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type FollowerUser = {
  follower: {
    id: string;
    externalUserId: string;
    name: string;
    username: string;
    imageUrl: string | null;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type PostExtended = Post & {
  author: User;
  likes: Like[];
  comments: Comment[];
  savedPosts: Saved[];
};

export type CommentExtended = Comment & {
  user: User;
};

export type SavedPost = Saved & {
  post: PostExtended;
};
