import { fetchPost, fetchUserData } from "@/firebase/fetchUserData";
import React from "react";
import PostModal from "@/components/modals/PostModal";

const page = async ({ params }: { params: { id: string } }) => {
  const postData = await fetchPost({ postId: params.id });
  const postUser = await fetchUserData(postData.userId);
  return (
    <PostModal
      userId={postUser.userId}
      userName={postUser.userName}
      profileImage={postUser.profileImage}
      caption={postData.caption}
      postId={postData.postId}
      images={postData.images}
      videos={postData.videos || []}
      likes={postData.likes || []}
      comments={postData.comments || []}
    />
  );
};
export default page;
