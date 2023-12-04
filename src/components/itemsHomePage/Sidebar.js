import React, { useEffect, useState } from "react";
import HeaderHomePage from "./HeaderHomePage";
import AddNewPost from "components/addPost/AddNewPost";
import { useAuth } from "contexts/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import SignOut from "components/signOut/SignOut";
import SearchForm from "./SearchForm";
import { AiFillHome, AiOutlineHeart } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs"

const SiderBar = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      if (userInfo && userInfo.uid) {
        const colRel = doc(db, "users", userInfo.uid);
        const docSnap = await getDoc(colRel);
        setUser(docSnap.data());
      }
    }
    fetchUser();
  }, [userInfo]);
  return (
    <div>
      <HeaderHomePage></HeaderHomePage>
      <div className="sidebar fixed bottom-0 z-50 w-full bg-white border sm:w-auto sm:h-full sm:border-r-black border-t-black">
        <div className="flex items-center justify-center pl-4 pr-5 text-center md:pl-2 sm:block">
          <div className="z-50 flex items-center justify-center mx-2 mt-2 md:my-5 hover:cursor-pointer">
            <i className="hidden text-3xl sm:block lg:hidden bx bxl-instagram sm:py-1 sm:my-3"></i>
            <h1 className="hidden py-5 text-2xl lg:block">Instagram</h1>
          </div>
          <Link
            to="/HomePage"
            className="sidebar-icon flex items-center px-5 mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3"
          >
            <i className="text-3xl bx bxs-home"><AiFillHome/></i>{" "}
            <p className="hidden ml-3 text-base lg:block">Home</p>
          </Link>
          <SearchForm></SearchForm>
          <div className="sidebar-icon flex items-center px-5 mt-2 rounded-lg px ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bx-movie-play"><BiMoviePlay/></i>
            <p className="hidden ml-3 text-base lg:block">Reels</p>
          </div>
          <div className="sidebar-icon items-center hidden px-5 mt-2 rounded-lg ss:px-5 sm:flex sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bxl-messenger"><BsMessenger/></i>
            <p className="hidden ml-3 text-base lg:block ">Message</p>
          </div>
          <div className="sidebar-icon items-center hidden px-5 mt-2 rounded-lg ss:px-5 sm:flex sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200">
            <i className="text-3xl bx bx-heart"><AiOutlineHeart/></i>
            <p className="hidden ml-3 text-base lg:block">Likes</p>
          </div>
          <AddNewPost></AddNewPost>
          <div
            onClick={() => navigate(`/Personal?userName=${user.username}`)}
            className="sidebar-icon flex items-center mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200"
          >
            <img
              src={
                user.avatar ||
                "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
              }
              alt=""
              className="object-cover w-10 h-10 mr-2 border border-gray-500 rounded-full"
            />
            <p className="hidden ml-3 text-base font-bold lg:block">
              {user.username}
            </p>
          </div>
          <SignOut></SignOut>
        </div>
      </div>
    </div>
  );
};

export default SiderBar;
