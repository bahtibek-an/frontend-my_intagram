import { Link } from "react-router-dom";
import useGetUserProfileById from "../hooks/useGetUserProfileById";
import { timeAgo } from "../utils/timeago";

// eslint-disable-next-line
const Comment = ({ comment }) => {
  // eslint-disable-next-line
  const { isLoading, userProfile } = useGetUserProfileById(comment.createdBy);

  if (isLoading) return <CommentSkeleton />;

  return (
    <div className="flex gap-4">
      <Link to={`/${userProfile.username}`}>
        <img
          src={userProfile.profilePicUrl}
          alt="User Profile"
          className="h-10 w-10 rounded-full"
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <Link to={`/${userProfile.username}`}>
            <p className="font-bold text-sm">{userProfile.username}</p>
          </Link>
          {/* eslint-disable-next-line */}
          <p className="text-sm">{comment.comment}</p>
        </div>
        {/* eslint-disable-next-line */}
        <p className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</p>
      </div>
    </div>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <div className="flex gap-4 w-full items-center">
      <div className="h-10 w-10 rounded-full bg-white-300"></div>
      <div className="flex flex-col gap-1">
        <div className="h-2 bg-white-300 w-32"></div>
        <div className="h-2 bg-white-300 w-20"></div>
      </div>
    </div>
  );
};
