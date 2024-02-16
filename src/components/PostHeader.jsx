import { Link } from "react-router-dom";
// eslint-disable-next-line
import { useState } from "react";
import { timeAgo } from "../utils/timeago";
import useFollowUser from "../hooks/useFollowUser";

// eslint-disable-next-line
const PostHeader = ({ post, creator }) => {
  // eslint-disable-next-line
  const { handleFollow, isFollowing, isUpdating } = useFollowUser(post.createdBy);

  return (
    <div className="flex justify-between items-center w-full my-2">
      <div className="flex items-center gap-2">
        {creator ? (
          // eslint-disable-next-line
          <Link to={`/${creator.username}`}>
          {/* eslint-disable-next-line */}
            <img src={creator.profilePicUrl} alt="profile pic" className="w-8 h-8 rounded-full" />
          </Link>
        ) : (
          <div className="animate-pulse w-8 h-8 rounded-full bg-white-300"></div>
        )}
        <div className="flex items-center gap-2 text-sm font-bold">
          {creator ? (
            // eslint-disable-next-line
            <Link to={`/${creator.username}`} className="text-gray-1000 hover:underline">
            {/* eslint-disable-next-line */}
              {creator.username}
            </Link>
          ) : (
            <div className="w-24 h-5 bg-white-300 animate-pulse"></div>
          )}
          {/* eslint-disable-next-line */}
          <span className="text-gray-500">- {timeAgo(post.createdAt)}</span>
        </div>
      </div>
      <div className="cursor-pointer">
        <button
          className={`px-2 py-1 text-sm font-bold text-blue-500 bg-transparent border border-blue-500 rounded transition duration-200 hover:text-white hover:bg-blue-500 ${isUpdating ? "pointer-events-none" : ""}`}
          onClick={handleFollow}
          disabled={isUpdating}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
