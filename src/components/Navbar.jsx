import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container mx-auto my-4">
      <div className="flex justify-between items-center">
        <img
          src="/logo.png"
          alt="Instagram"
          className="h-20 hidden sm:block cursor-pointer"
        />
        <div className="flex gap-4">
          <Link to="/auth">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm">
              Login
            </button>
          </Link>
          <Link to="/auth">
            <button className="border border-gray-700 text-gray-500 py-2 px-4 rounded-md text-sm">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
