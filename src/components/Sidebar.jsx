import { Link as RouterLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../hooks/useLogout";
import SidebarItems from "./SidebarItems";
import mainLogo from '../img/auth-logo.png'

const Sidebar = () => {
  const { handleLogout, isLogginOut } = useLogout();

  return (
    <div className="h-screen py-8 sticky top-0 left-0 px-2 md:px-4 border border-gray-500">
      <div className="flex flex-col gap-10 w-full h-full">
        <RouterLink to="/" className="pl-2 hidden md:block cursor-pointer">
          <img 
          src={mainLogo} 
          alt="Logo" 
          style={{ width: '140px', height: 'auto' }} />
        </RouterLink>
        <div className="flex flex-col gap-5 text-bold cursor-pointer">
          <SidebarItems />
        </div>
        <div className="flex bg-blue-500 items-center gap-4 text-white hover:bg-blue-400 rounded-md p-2 w-full md:w-auto mt-auto justify-center md:justify-start">
          <BiLogOutCircle size={25} onClick={handleLogout} />
          <button
            className="hidden md:block bg-transparent hover:bg-transparent"
            onClick={handleLogout}
            disabled={isLogginOut}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
