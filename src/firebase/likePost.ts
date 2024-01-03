import {
  doc,
  updateDoc,
  getDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./config";

export const togglePostLike = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}): Promise<void> => {
  const postRef = doc(db, "posts", postId);
  const postSnapshot = await getDoc(postRef);
  const post = postSnapshot.data();
  if (post?.likes) {
    if (post?.likes.includes(userId)) {
      await updateDoc(postRef, { likes: arrayRemove(userId) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(userId) });
    }
  } else {
    await updateDoc(postRef, { likes: arrayUnion(userId) });
  }
};
