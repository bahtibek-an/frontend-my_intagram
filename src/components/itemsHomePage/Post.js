import PostItem from "components/addPost/PostItem";
import LoadingPost from "components/loading/LoadingPost";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      results.sort((a, b) => b.createAt - a.createAt);
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <>
      {posts.length > 0  ? (
        <div className="p-i flex flex-wrap justify-center w-full h-auto mb-20 item-center sm:w-4/5 xl:w-3/5">
          {posts.map((post) => (
            <PostItem key={post.id} data={post}></PostItem>
          ))}
        </div>
      ) : (
        <LoadingPost/>
      )}
    </>
  );
};

export default Post;
