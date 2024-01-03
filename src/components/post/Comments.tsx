import { Comment as CommentType } from "@/types";
import React from "react";
import Comment from "./Comment";
const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <>
      {comments.map((comment, i) => (
        <Comment
          key={comment.commentId}
          comment={comment.comment}
          userName={comment.userName}
          createdAt={comment.createdAt}
        />
      ))}
    </>
  );
};

export default Comments;
