import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthStore from "../store/authStore";
import defaultProfilePic from "../img/default-profile-picture.png";

const SuggestedHeader = () => {
  // eslint-disable-next-line
  const { handleLogout, isLogginOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  if (!authUser) return null;

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
      <Link to={`${authUser.username}`}>
          <img
            src={authUser.profilePicUrl || defaultProfilePic}
            alt="Profile Picture"
            className="h-10 w-10 rounded-full"
          />
        </Link>
        <Link to={`${authUser.username}`}>
          <p className="text-sm font-semibold">{authUser.fullname}</p>
        </Link>
      </div>
      <button
        className="text-blue-500 text-sm font-medium hover:text-blue-700 focus:outline-none"
        onClick={handleLogout}
        disabled={isLogginOut}
      >
        Switch
      </button>
    </div>
  );
};

export default SuggestedHeader;