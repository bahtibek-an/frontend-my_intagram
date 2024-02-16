// import { useEffect } from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserProfileById from "../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile, getUserProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} creator={userProfile} />
      <div className="my-2 rounded-md overflow-hidden">
        <img src={post.imageUrl} alt="" className="w-full" />
      </div>
      <PostFooter post={post} creator={userProfile} />
    </>
  );
};

export default FeedPost;