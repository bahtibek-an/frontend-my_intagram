import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "./config";
import { Comment, Post, UserData } from "@/types";

export const fetchUserData = async (uid: string): Promise<UserData> => {
  const userIdRef = doc(collection(db, "users"), uid);
  const userData = await getDoc(userIdRef);
  return userData.data() as UserData;
};

export const fetchUserDataByUserName = async (
  userName: string,
): Promise<UserData | null> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userName", "==", userName));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const userData = querySnapshot.docs[0].data() as UserData;
    return userData;
  } catch (e) {
    return null;
  }
};

export const count = async ({
  userId,
  collection,
  field,
}: {
  userId: string;
  collection: string;
  field: string;
}): Promise<number> => {
  try {
    const ref = doc(db, collection, userId);
    const data = (await getDoc(ref)).data();
    if (data && data[field] && Array.isArray(data[field])) {
      return data[field].length;
    } else {
      return 0;
    }
  } catch (error) {
    throw Error(`Error fetching count: ${error}`);
  }
};

export const userStats = async ({
  userId,
}: {
  userId: string;
}): Promise<{ posts: number; followers: number; following: number }> => {
  const posts = await count({
    userId: userId,
    collection: "users",
    field: "posts",
  });
  const followers = await count({
    userId: userId,
    collection: "users",
    field: "followers",
  });
  const following = await count({
    userId: userId,
    collection: "users",
    field: "following",
  });

  return { posts: posts, followers: followers, following: following };
};

export const fetchPost = async ({
  postId,
}: {
  postId: string;
}): Promise<Post> => {
  try {
    const ref = doc(db, "posts", postId);
    let data = (await getDoc(ref)).data() as Post;
    data.comments = await fetchComments({ postId });

    return data;
  } catch (error) {
    throw Error(`Error fetching count: ${error}`);
  }
};

export const fetchComments = async ({
  postId,
}: {
  postId: string;
}): Promise<Comment[]> => {
  try {
    let comments: Comment[] = [];
    const ref = collection(db, "posts", postId, "comments");
    (await getDocs(ref)).forEach((comment) =>
      comments.push({
        ...comment.data(),
        createdAt: comment.data().createdAt.toDate(),
      } as Comment),
    );
    return comments;
  } catch (error) {
    throw Error(`Error fetching comments: ${error}`);
  }
};
