import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { PostExtended } from "@/types";
import { getAllPosts, getUserPosts } from "@/actions/post-service";
import { PostCard } from "@/components/post/post-card";

interface PostsListProps {
  type: "All" | "User";
  userId?: string;
}

export async function PostsList({ type, userId }: PostsListProps) {
  const self = await currentUser();

  if (!self) {
    redirect("/sign-in");
  }

  let posts: PostExtended[] = [];

  if (type === "User" && userId) {
    posts = await getUserPosts(userId);
  } else {
    posts = await getAllPosts();
  }

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => (
          <PostCard selfId={self.id} key={post.id} post={post} />
        ))}
    </div>
  );
}
