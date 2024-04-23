import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getUserByUsername } from "@/actions/user-service";
import { ProfileSkeleton } from "@/components/skeletons/profile";
import { Separator } from "@/components/ui/separator";
import { ProfileDetails } from "./_components/profile-details";
import { ProfilePosts } from "./_components/profile-posts";

interface ProfilePageProps {
  params: { username: string };
}

async function ProfilePage({ params }: ProfilePageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileDetails user={user} />
        <Separator className="mt-5" />
        <ProfilePosts user={user} />
      </Suspense>
    </div>
  );
}

export default ProfilePage;
