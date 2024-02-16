import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { AiOutlineUser } from 'react-icons/ai';

const ProfileLink = () => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <div className="relative block">
      <RouterLink
        to={`/${authUser?.username}`}
        className="flex items-center justify-center gap-4 p-2 rounded-lg items items-center transition-colors hover:bg-white bg-opacity-40"
        style={{ borderRadius: "0.375rem" }}
      >
      <AiOutlineUser size={30} />
        {/* <div className="absolute left-0 mt-1 ml-1 p-2 bg-gray-800 text-white text-xs rounded-md">
        Profile
      </div> */}
      </RouterLink>
    </div>
  );
};

export default ProfileLink;