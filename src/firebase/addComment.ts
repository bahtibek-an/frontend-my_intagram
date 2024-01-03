import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const addComment = async ({
  postId,
  userName,
  comment,
}: {
  postId: string;
  userName: string;
  comment: string;
}): Promise<void> => {
  const commentId = await addDoc(collection(db, "posts", postId, "comments"), {
    comment: comment,
    userName: userName,
    createdAt: new Date(),
  });

  const commentRef = doc(db, "posts", postId, "comments", commentId.id);
  await updateDoc(commentRef, {
    postId: commentId.id,
    commentId: commentId.id,
  });
};
