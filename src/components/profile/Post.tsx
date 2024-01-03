import { Comment } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heart from "@/assets/icons/ActivityFeed-Fiil.svg";
import CommentIcon from "@/assets/icons/comment-fill.svg";
import Carousel from "@/assets/icons/Carousel.svg";
const Post = ({
  postId,
  images,
  videos,
  caption,
  likes,
  comments,
}: {
  postId: string;
  images: string[];
  videos: string[];
  caption: string;
  likes: string[];
  comments: Comment[];
}) => {
  return (
    <Link className="group col-span-1 relative flex" href={`/p/${postId}`}>
      <div className="absolute w-full h-full top-0 left-0 bg-[rgb(0,0,0,.2)] z-10 hidden group-hover:flex justify-center items-center">
        <div className="flex items-center gap-4 text-white text-lg">
          <span className="flex items-center gap-2">
            <Heart className="fill-white" />
            {likes?.length || 0}
          </span>
          <span className="flex items-center gap-2">
            <CommentIcon />
            {comments?.length || 0}
          </span>
        </div>
      </div>
      {images?.length > 0 && (
        <span className="absolute top-2 right-2 z-10">
          <Carousel className="fill-white" />
        </span>
      )}
      <figure className="relative bg-gray-100 dark:bg-black w-full h-full aspect-square">
        <Image
          src={images?.[0]}
          fill={true}
          alt={caption}
          className="object-contain"
        />
      </figure>
    </Link>
  );
};

export default Post;
