"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import Post from "@/components/post/Post";
import { Comment } from "@/types";

const PostModal = ({
  userId,
  userName,
  profileImage,
  caption,
  postId,
  images,
  videos,
  likes,
  comments,
}: {
  userId: string;
  userName: string;
  profileImage: string;
  caption: string;
  postId: string;
  images: string[];
  videos: string[];
  likes: string[];
  comments: Comment[];
}) => {
  const router = useRouter();
  return (
    <Modal
      open={true}
      setOpen={() => {
        router.back();
        return false;
      }}
      className="max-w-6xl flex w-full mx-2 max-md:max-h-[70vh] overflow-y-auto"
    >
      <Post
        userId={userId}
        userName={userName}
        profilePicture={profileImage}
        caption={caption}
        postId={postId}
        images={images}
        videos={videos}
        likes={likes}
        comments={comments}
      />
    </Modal>
  );
};

export default PostModal;
