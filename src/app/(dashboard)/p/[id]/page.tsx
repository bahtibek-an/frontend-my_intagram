import { fetchPost, fetchUserData } from "@/firebase/fetchUserData";
import React from "react";
import { Metadata } from "next";
import Post from "@/components/post/Post";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await fetchPost({ postId: params.id });
  const postUser = await fetchUserData(data.userId);
  return {
    title: data
      ? `${data?.caption || postUser?.fullName} | Instagram`
      : "Instagram",
  };
}

const page = async ({ params }: { params: { id: string } }) => {
  const postData = await fetchPost({ postId: params.id });
  const postUser = await fetchUserData(postData.userId);

  return (
    <main className="max-w-5xl w-full px-3 flex items-start mx-auto overflow-x-hidden">
      <div className="border w-full mt-14">
        <Post
          userId={postUser.userId}
          userName={postUser.userName}
          profilePicture={postUser.profileImage}
          caption={postData.caption}
          postId={postData.postId}
          images={postData.images}
          videos={postData.videos || []}
          likes={postData.likes || []}
          comments={postData.comments || []}
        />
      </div>
    </main>
  );
};
export default page;
