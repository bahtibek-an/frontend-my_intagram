import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";
import ProfilePosts from "../components/ProfilePosts";

import { useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../hooks/useGetUserProfileByUsername";
import { Link as RouterLink } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);

  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  const ProfileHeaderSkeleton = () => {
    return (
      <div className="flex gap-4 sm:gap-10 py-10 flex-col sm:flex-row justify-center items-center">
        <div className="h-24 w-24 rounded-full bg-gray-300"></div>
        <div className="flex flex-col justify-center flex-1 mx-auto">
          <div className="h-3 bg-gray-300 w-48 mb-2"></div>
          <div className="h-3 bg-gray-300 w-32"></div>
        </div>
      </div>
    );
  };
  
  const UserNotFound = () => {
    return (
      <div className="flex flex-col items-center mx-auto text-center">
        <p className="text-2xl">Not found</p>
        <RouterLink to={"/"} className="text-blue-500 w-max-content mx-auto">
          Back Home
        </RouterLink>
      </div>
      
    );
  };

  return (
    <div className="max-w-container.lg py-5 mx-auto">
      <div className="flex py-10 px-4 md:px-10 flex-col">
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </div>
      <div className="px-2 sm:px-4 max-w-full mx-auto border-t border-whiteAlpha-300 flex flex-col">
        <ProfileTabs />
        <ProfilePosts />
      </div>
    </div>
  );
};

export default ProfilePage;