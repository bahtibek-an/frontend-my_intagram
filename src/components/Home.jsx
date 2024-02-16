import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const Home = () => {
  return (
    <div className="relative">
      <Link
        to="/"
        className="flex items-center gap-4 p-2 rounded-lg justify-center transition-colors hover:bg-white bg-opacity-40"
      >
        <AiFillHome size={30} />
        {/* <span className="hidden md:block">Home</span> */}
      </Link>
      {/* <div className="absolute top-full left-0 mt-2 bg-blue text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Home
      </div> */}
    </div>
  );
};

export default Home;
