import { useAuthContext } from "@/contexts/AuthContext";
import { Avatar } from "@mui/material";
import Link from "next/link";
import signOut from "@/firebase/auth/signOut";
const Profile = () => {
  const { userData } = useAuthContext();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <Link href={`/${userData?.userName}`}>
          <Avatar className="w-[48px] h-[48px]" src={userData?.profileImage} />
        </Link>
        <div className="flex flex-col">
          <Link className="font-semibold" href={`/${userData?.userName}`}>
            {userData?.userName}
          </Link>
          <span className="text-gray-600">{userData?.fullName}</span>
        </div>
      </div>
      <button
        className="text-sm text-red-500 hover:opacity-60 font-semibold"
        onClick={signOut}
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
