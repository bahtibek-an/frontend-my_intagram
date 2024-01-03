"use client";
import { fetchPost } from "@/firebase/fetchUserData";
import { Post, UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import PostUI from "./Post";
const Posts = ({
  profileData,
  isPersonal,
}: {
  profileData: UserData;
  isPersonal: boolean;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isFetching } = useQuery({
    queryKey: ["fetch-posts", profileData.userId],
    queryFn: async () => {
      const fetchedPosts = await Promise.all(
        profileData.posts
          ? profileData.posts.map(async (post) => {
              const fetchedPost = await fetchPost({ postId: post });
              return fetchedPost;
            })
          : [],
      );
      return fetchedPosts;
    },
    onSuccess: (data) => {
      setPosts(data);
    },
    refetchOnWindowFocus: false,
    enabled: (profileData.posts?.length || 0) > 0 ? true : false,
  });
  return (
    !isFetching && (
      <div className="mt-5 sm:mt-11 pt-8 border-t-2 gap-2 grid grid-cols-3 ">
        {!isFetching &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostUI
              key={post.postId}
              postId={post.postId}
              images={post.images}
              videos={post.videos || []}
              caption={post.caption}
              likes={post.likes || []}
              comments={post.comments || []}
            />
          ))}
      </div>
    )
  );
};

export default Posts;
