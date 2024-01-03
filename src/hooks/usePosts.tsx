import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Comment, Post } from "@/types";
const usePosts = (
  initState: Post[],
): [Post[], React.Dispatch<React.SetStateAction<Post[]>>] => {
  const [posts, setPosts] = useState<Post[]>(initState);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        let post = change.doc.data() as Post;
        const postIndex = posts.findIndex((p) => p.postId == post.postId);
        if (change.type == "added") {
          // Handle added post and initial state
          if (postIndex === -1) {
            let comments: Comment[] = [];
            const commentsRef = collection(
              db,
              "posts",
              post.postId,
              "comments",
            );
            const fetchQuery = query(
              commentsRef,
              orderBy("createdAt"),
              limit(2),
            );
            const fetch = await getDocs(fetchQuery);
            fetch.forEach((comment) =>
              comments.push({
                ...comment.data(),
                createdAt: comment.data().createdAt.toDate(),
              } as Comment),
            );

            post = {
              ...post,
              comments: comments,
            };
            setPosts((prevData) => [...prevData, post]);
          }
        } else if (change.type == "modified") {
          // Handle modified post
          if (postIndex !== -1) {
            setPosts((prevData) => {
              const updatedPosts = [...prevData];
              updatedPosts[postIndex] = post;
              return updatedPosts;
            });
          }
        } else if (change.type == "removed") {
          // Handle removed post
          if (postIndex !== -1) {
            setPosts((prevData) =>
              prevData.filter((p) => p.postId !== post.postId),
            );
          }
        }
      });
    });
    return () => {
      unsub();
    };
  }, [posts]);
  return [posts, setPosts];
};

export default usePosts;
