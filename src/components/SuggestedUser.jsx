import { Link } from "react-router-dom";
import useFollowUser from "../hooks/useFollowUser";
import useAuthStore from "../store/authStore";
import { useState } from "react";
import defaultProfilePic from "../img/default-profile-picture.png";

// eslint-disable-next-line
const SuggestedUser = ({ user }) => {
  // eslint-disable-next-line
  const { isFollowing, isUpdating, handleFollow } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);
  // eslint-disable-next-line
  const [updatedUser, setUpdatedUser] = useState(user);

  const onFollow = async () => {
    await handleFollow();
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      followers: isFollowing
        ? prevUser.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...prevUser.followers, authUser],
    }));
  };

  return (
    <div className="flex justify-between items-center w-64">
      <div className="flex items-center gap-2">
      {/* eslint-disable-next-line */}
        <Link to={`/${user.username}`}>
          <img
          // eslint-disable-next-line
            src={user.profilePicUrl || defaultProfilePic}
            alt="Profile"
            className="rounded-full w-12 h-12"
          />
        </Link>
        <div className="flex flex-col">
        {/* eslint-disable-next-line */}
          <Link to={`/${user.username}`}>
          {/* eslint-disable-next-line */}
            <p className="font-bold text-sm">{user.username}</p>
          </Link>
          {/* eslint-disable-next-line */}
          <p className="text-xs text-gray-500">{user.followers.length} followers</p>
        </div>
      </div>
      {/* eslint-disable-next-line */}
      {authUser.uid !== user.uid && (
        <button
          className="text-blue-400 text-sm font-medium hover:text-white bg-transparent p-0 cursor-pointer"
          onClick={onFollow}
          disabled={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default SuggestedUser;
