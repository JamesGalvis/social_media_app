import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { PostListSkeleton } from "@/components/skeletons/post/posts-list-skeleton";
import { PostsList } from "@/components/post/posts-list";
import { PostForm } from "@/components/post-form";

async function HomePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col w-full">
      <PostForm imageInputId="homeFile" />
      <Suspense fallback={<PostListSkeleton />}>
        <PostsList type="All" />
      </Suspense>
    </div>
  );
}

export default HomePage;
