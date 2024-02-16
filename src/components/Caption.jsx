import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeago";
import useUserProfileStore from "../store/userProfileStore";

// eslint-disable-next-line
const Caption = ({ post }) => {
  const userProfile = useUserProfileStore((state) => state.userProfile);
  return (
    <div className="flex gap-4">
      <Link to={`/${userProfile.username}`}>
        <img
          src={userProfile.profilePicUrl}
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <Link to={`/${userProfile.username}`}>
            <p className="font-bold text-sm">{userProfile.username}</p>
          </Link>
          {/* eslint-disable-next-line */}
          <p className="text-sm">{post.caption}</p>
        </div>
        {/* eslint-disable-next-line */}
        <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
      </div>
    </div>
  );
};

export default Caption;
