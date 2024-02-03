import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, PencilAltIcon, SearchIcon, UserIcon } from "@heroicons/react/solid";

const Sidebar = () => {
  return (
    <div className="flex-shrink-0 w-64 text-white bg-zinc-900">
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-red-500">
          I̶̢̩͉̘̫̱̰̝̟̟̱̰̯̣̹̗̘ͅņ̶̨̡͖̪͙̬̤̥̙̬͎̜̮͍̠͎͉̭̻͖s̸̜̥͍̘ţ̶͎͙̪͇̩̘̹̼͚̻̲̗̗͜͜a̴̢̨̯̘̮̦̼͔g̴̨̢̧̲̫̭͖͚͍̬̘̣͚̗̩̻̯͚̺͙̞ͅṟ̷̬̬̪̫͕̙̙ͅa̷̡̧̢̪̪̥̲̜͓̙̥͉̼͕͙ͅm̵͚͇̩



        </h1>
      </div>
      <nav className="space-y-4 mt-36">
        <Link to="/" className="flex items-center p-3 hover:bg-zinc-700">
          <HomeIcon className="w-6 h-6 mr-2" /> Main
        </Link>
        <Link to="/addpost" className="flex items-center p-3 hover:bg-zinc-700">
          <PencilAltIcon className="w-6 h-6 mr-2" /> Create Post
        </Link>
        <Link to="/search-users" className="flex items-center p-3 hover:bg-zinc-700">
          <SearchIcon className="w-6 h-6 mr-2" /> Search Users
        </Link>
        <Link to="/profile" className="flex items-center p-3 hover:bg-zinc-700">
          <UserIcon className="w-6 h-6 mr-2" /> Your Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
