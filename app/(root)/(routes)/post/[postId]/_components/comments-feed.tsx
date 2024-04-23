import { getCommentsByPostId } from "@/actions/comment-service";
import { CommentItem } from "./comment-item";

interface CommentsFeedProps {
  postId: string;
}

export async function CommentsFeed({ postId }: CommentsFeedProps) {
  const comments = await getCommentsByPostId(postId);

  return (
    <div className="h-full">
      {!comments.length && (
        <div className="text-center py-3">
          <h2 className='className="ms:text-xl text-lg font-medium text-primary/50 pointer-events-none py-3'>
            No comments
          </h2>
        </div>
      )}
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
