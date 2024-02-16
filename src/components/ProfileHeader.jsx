import useUserProfileStore from "../store/userProfileStore";
import useAuthStore from "../store/authStore";
import { useState } from 'react';
import EditProfile from "./EditProfile";
import useFollowUser from "../hooks/useFollowUser";


const ProfileHeader = () => {

  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isFollowing, isUpdating, handleFollow } = useFollowUser(
    userProfile?.uid
  );
  const visitingOwnProfile =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfile =
    authUser && authUser.username !== userProfile.username;
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div className="flex gap-4 py-10 flex-col sm:flex-col">
      <div className="mx-auto">
        <img src={userProfile.profilePicUrl} alt="Profile photo" className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto" />
      </div>
      <div className="mx-auto flex-1">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex gap-4 items-center w-full justify-center sm:justify-start">
            <p className="text-sm sm:text-lg">{userProfile.fullname}</p>
            {visitingOwnProfile && (
              <div className="flex gap-4 items-center justify-center">
                <button
                  className="bg-gray-200 text-gray px-3 py-1 rounded-md hover:bg-gray-100 text-xs sm:text-sm"
                  onClick={onOpen}
                >
                  Edit Profile
                </button>
              </div>
            )}
            {visitingAnotherProfile && (
              <div className="flex gap-4 items-center justify-center">
                <button
                  className={`bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-xs sm:text-sm ${isUpdating && 'cursor-not-allowed opacity-50'}`}
                  onClick={handleFollow}
                  disabled={isUpdating}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <p className="text-xs sm:text-sm font-bold">{userProfile.posts.length} Posts</p>
            <p className="text-xs sm:text-sm font-bold">{userProfile.followers.length} Followers</p>
            <p className="text-xs sm:text-sm font-bold">{userProfile.following.length} Following</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-sm font-bold">{userProfile.username}</p>
          </div>
          <p className="text-sm">{userProfile.bio}</p>
        </div>
      </div>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};

export default ProfileHeader;
