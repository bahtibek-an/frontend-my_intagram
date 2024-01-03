"use client";
import React from "react";
import FeedPost from "@/components/feed-post/FeedPost";
import PostSkeleton from "@/components/feed-post/PostSkeleton";
import usePosts from "@/hooks/usePosts";
import Profile from "@/components/right-sidebar/Profile";
import Suggestions from "@/components/right-sidebar/Suggestions";

const Feed = () => {
  const [posts] = usePosts([]);
  return (
    <div className="scroll-smooth grid grid-cols-6 pt-8 max-w-5xl w-full mx-auto">
      <div className="lg:col-span-4 col-span-6">
        {/* Stories */}
        {/* Posts */}
        <div className="flex flex-col justify-center items-center">
          {posts.length > 0
            ? posts.map((post) => (
                <FeedPost key={post.postId} postData={post} />
              ))
            : Array.from({ length: 4 }).map((ele, i) => (
                <PostSkeleton key={i} />
              ))}
        </div>
      </div>
      {/* Suggestions and profile */}
      <div className="hidden lg:block lg:col-span-2">
        <Profile />
        <Suggestions />
      </div>
    </div>
  );
};

export default Feed;
