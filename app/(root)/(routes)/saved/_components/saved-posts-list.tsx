import { cn } from "@/lib/utils";
import { SavedPost } from "@/types";
import { PostCard } from "@/components/post/post-card";

interface SavedPostsListProps {
  savedPosts: SavedPost[];
  selfId: string;
}

export function SavedPostsList({ selfId, savedPosts }: SavedPostsListProps) {
  return (
    <>
      <div
        className={cn(
          "flex justify-center p-5",
          savedPosts.length > 0 && "hidden"
        )}
      >
        <div className="max-ms:space-y-2">
          <h2 className="text-3xl font-extrabold">
            Save your favorite publications
          </h2>
          <p className="text-base text-neutral-400">
            and create your own unique collection.
          </p>
        </div>
      </div>

      <div>
        {savedPosts.map((saved) => {
          return <PostCard key={saved.id} post={saved.post} selfId={selfId} />;
        })}
      </div>
    </>
  );
}
