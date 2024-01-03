import React from "react";
import Comments from "@/assets/icons/Comment.svg";
import HeartFill from "@/assets/icons/ActivityFeed-Fiil.svg";
import Heart from "@/assets/icons/ActivityFeed.svg";
import Share from "@/assets/icons/SharePosts.svg";
import Save from "@/assets/icons/Save.svg";

const Actions = ({
  postId,
  isLiked,
  mutate,
  isLoading,
  likesNum,
  commentRef,
}: {
  postId: string;
  userId: string;
  isLiked: boolean;
  mutate: () => void;
  isLoading: boolean;
  likesNum: number;
  commentRef: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center px-2 sm:px-0">
        <div className="flex items-center gap-2">
          <button onClick={() => mutate()} disabled={isLoading}>
            {isLiked ? (
              <HeartFill className="fill-red-500 cursor-pointer" />
            ) : (
              <Heart className="cursor-pointer" />
            )}
          </button>
          <Comments
            className="hover:opacity-60 cursor-pointer"
            onClick={() => {
              commentRef.current && commentRef.current.focus();
            }}
          />
          <Share className="hover:opacity-60 cursor-pointer" />
        </div>
        <Save className="hover:opacity-60 cursor-pointer" />
      </div>
      <span>{likesNum} likes</span>
    </div>
  );
};

export default Actions;
