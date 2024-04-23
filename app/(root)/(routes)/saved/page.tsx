import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getSavedPosts } from "@/actions/saved-service";
import { SavedPostsList } from "./_components/saved-posts-list";
import { BackHeader } from "@/components/navigation/back-header";

async function SavedPage() {
  const self = await currentUser();
  const savedPosts = await getSavedPosts();

  if (!self) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-full w-full">
      <BackHeader label="Saved" />
      <SavedPostsList selfId={self.id} savedPosts={savedPosts} />
    </div>
  );
}

export default SavedPage;
