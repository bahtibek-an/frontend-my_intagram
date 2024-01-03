"use client";
import { Comment as CommentType } from "@/types";
import React, { useEffect, useState, useRef } from "react";
import Dots from "@/assets/icons/More.svg";
import Heart from "@/assets/icons/ActivityFeed-Fiil.svg";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";
import { Avatar } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import AddComment from "../AddComment";
import { fetchComments } from "@/firebase/fetchUserData";
import Comments from "./Comments";
import Actions from "./Actions";
import isPostLiked from "@/utils/isPostLiked";
import { useMutation } from "@tanstack/react-query";
import { togglePostLike } from "@/firebase/likePost";
import Comment from "./Comment";
import FollowButton from "../FollowButton";

const Post = ({
  userName,
  profilePicture,
  userId,
  postId,
  images,
  videos,
  caption,
  likes,
  comments,
}: {
  userName: string;
  profilePicture: string;
  userId: string;
  postId: string;
  images: string[];
  videos: string[];
  caption: string;
  likes: string[];
  comments: CommentType[];
}) => {
  const { userData } = useAuthContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const [liveComments, setComments] = useState(comments);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showHeart, setShowHeart] = useState(false);
  const commentRef: React.Ref<HTMLInputElement> = useRef(null);
  useEffect(() => {
    setIsFollowing(userData?.following?.includes(userId) || false);
  }, [userData, userId]);
  const handleFetchNewData = async () => {
    setComments(await fetchComments({ postId }));
  };
  useEffect(() => {
    setIsLiked(isPostLiked({ likes: likes, userId: userData?.userId || "" }));
  }, [likes, userData?.userId]);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["toggle-like"],
    mutationFn: () =>
      togglePostLike({
        postId: postId,
        userId: userData?.userId || "",
      }),
    onSuccess: () => setIsLiked(!isLiked),
  });
  const handleDoubleClick = () => {
    if (!isLiked) mutate();
    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 800);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 w-full ">
      <div className="md:hidden flex justify-between px-4 py-2">
        <a className="flex gap-2 items-center" href={`/${userName}`}>
          <Avatar src={profilePicture} />
          <span className="font-bold text-xl">{userName}</span>
        </a>
        <div className="flex items-center gap-2">
          {!isFollowing && <FollowButton userId={userId} />}
          <Dots className="cursor-pointer" />
        </div>
      </div>

      <Splide className="col-span-1 md:col-span-3">
        {images.map((imageUrl, index) => (
          <SplideSlide
            key={index}
            className="w-full h-full aspect-square relative bg-gray-100 dark:bg-black"
            onDoubleClick={handleDoubleClick}
          >
            <Image
              src={imageUrl}
              alt={`Image ${index + 1}`}
              fill={true}
              priority={true}
              className="object-contain"
              sizes="100%"
            />
            {showHeart && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  scale-[4] ">
                <Heart className="fill-slate-200 animate-ping" />
              </div>
            )}
          </SplideSlide>
        ))}
      </Splide>

      <div className="flex-col p-2 flex md:col-span-2">
        <div className="hidden md:flex justify-between">
          <a className="flex gap-2 items-center" href={`/${userName}`}>
            <Avatar src={profilePicture} />
            <span className="font-bold text-xl">{userName}</span>
          </a>
          <div className="flex items-center gap-2">
            {!isFollowing && <FollowButton userId={userId} />}
            <Dots className="cursor-pointer" />
          </div>
        </div>
        <div className="md:hidden pt-2">
          <Actions
            postId={postId}
            isLiked={isLiked}
            userId={userData?.userId || ""}
            mutate={mutate}
            isLoading={isLoading}
            commentRef={commentRef}
            likesNum={likes.length}
          />
        </div>
        <div className=" max-h-[480px] py-4 border-t mt-4 overflow-y-auto text-ellipsis ">
          {caption && (
            <div className="flex items-start gap-2">
              <a href={`/${userName}`}>
                <Avatar alt={userName} src={profilePicture} />
              </a>
              <div className="flex flex-col">
                <div className="flex items-end gap-4">
                  <a className="font-medium" href={`/${userName}`}>
                    {userName}
                  </a>
                </div>
                <span className="text-ellipsis overflow-hidden">{caption}</span>
              </div>
            </div>
          )}
          <Comments comments={liveComments} />
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t pt-2 ">
          <div className="hidden md:block">
            <Actions
              postId={postId}
              isLiked={isLiked}
              userId={userData?.userId || ""}
              mutate={mutate}
              isLoading={isLoading}
              commentRef={commentRef}
              likesNum={likes.length}
            />
          </div>
          <AddComment
            postId={postId}
            setPostedComment={handleFetchNewData}
            refetch={handleFetchNewData}
            commentRef={commentRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
