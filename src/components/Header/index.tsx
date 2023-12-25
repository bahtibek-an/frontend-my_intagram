import Avatar from 'components/Avatar';
import ClickAwayListener from 'components/ClickAwayListener';
import ModalCreatePost from 'components/ModalCreatePost';
import { authSelector, setUser } from 'features/auth';
import { signOut } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from 'hooks';
import { IMAGES } from 'images';
import { auth } from 'lib/firebase';
import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { RiSettingsLine } from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
   const [showDropdown, setShowDropdown] = useState<boolean>(false);
   const [showModal, setShowModal] = useState<boolean>(false);
   const [imgLoading, setImgLoading] = useState(true);
   const dispatch = useAppDispatch();
   const { user } = useAppSelector(authSelector);

   const handleLogout = async (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
   ) => {
      e.stopPropagation();
      await signOut(auth);
      dispatch(setUser(null));
   };

   return (
      <header className="bg-white h-header-height flex items-center border-b border-border-color fixed w-full z-50 top-0 left-0 right-0">
         <div className="container-app flex items-center justify-between">
            <div className="shrink-0">
               <Link to="/">
                  <img src={IMAGES.logoMain} alt="" />
               </Link>
            </div>

            <div className="flex items-center gap-x-6">
               <NavLink to="/" className="header-link">
                  <svg
                     aria-label="Home"
                     color="#262626"
                     fill="#262626"
                     height="24"
                     role="img"
                     viewBox="0 0 24 24"
                     width="24"
                  >
                     <path
                        d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                     ></path>
                  </svg>
               </NavLink>
               <button
                  onClick={() => {
                     setShowModal(true);
                  }}
               >
                  <svg
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        d="M2 12V15.45C2 18.299 2.698 19.455 3.606 20.394C4.546 21.303 5.704 22.002 8.552 22.002H15.448C18.296 22.002 19.454 21.302 20.394 20.394C21.302 19.455 22 18.3 22 15.45V8.552C22 5.703 21.302 4.546 20.394 3.607C19.454 2.7 18.296 2 15.448 2H8.552C5.704 2 4.546 2.699 3.606 3.607C2.698 4.547 2 5.703 2 8.552V12Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M6.54501 12.001H17.455"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M12.003 6.54501V17.455"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
               <a href="/chat" className="header-link">
                  <svg
                     aria-label="Messenger"
                     color="#262626"
                     fill="#262626"
                     height="24"
                     role="img"
                     viewBox="0 0 24 24"
                     width="24"
                  >
                     <path
                        d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                        strokeWidth="1.739"
                     ></path>
                     <path
                        d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"
                        fillRule="evenodd"
                        className="fill-inner"
                     ></path>
                  </svg>
               </a>
               <div className="relative shrink-0">
                  <div
                     className="cursor-pointer rounded-full"
                     onClick={() => {
                        setShowDropdown(!showDropdown);
                     }}
                  >
                     {imgLoading ? (
                        <Skeleton circle width={24} height={24} />
                     ) : null}
                     <Avatar
                        src={user?.avatar as string}
                        alt={user?.fullName as string}
                        width="w-6"
                        height="h-6"
                        onLoad={(e) => {
                           setImgLoading(false);
                        }}
                        className={`${imgLoading ? 'hidden' : 'block'}`}
                     />
                  </div>
                  {showDropdown && (
                     <ClickAwayListener
                        onClickAway={() => {
                           setShowDropdown(false);
                        }}
                        className="w-full min-w-[230px] rounded-lg bg-white shadow-box-shadow absolute overflow-hidden right-[-1rem] top-[45px] animate-slideInUp"
                     >
                        <div className="flex flex-col gap-y-2 py-2 ">
                           <Link
                              to={`/${user?.userId}`}
                              className="px-4 py-2 flex items-center gap-x-[10px] font-medium text-text-color-black hover:bg-gray-200 transition-all"
                           >
                              <FaRegUserCircle className="w-4 h-4 text-text-color-black" />
                              <span>Profile</span>
                           </Link>
                           <Link
                              to="/setting"
                              className="px-4 py-2 flex items-center gap-x-[10px] font-medium text-text-color-black hover:bg-gray-200 transition-all"
                           >
                              <RiSettingsLine className="w-4 h-4 text-text-color-black" />
                              <span>Settings</span>
                           </Link>
                        </div>
                        <div
                           className="text-text-color-black px-4 py-2 font-medium border-t-2 border-solid border-border-color cursor-pointer hover:bg-gray-200 transition-all"
                           onClick={handleLogout}
                        >
                           Log out
                        </div>
                     </ClickAwayListener>
                  )}
               </div>
            </div>
         </div>
         {showModal && (
            <ModalCreatePost
               onClose={() => {
                  setShowModal(false);
               }}
            />
         )}
      </header>
   );
};

export default Header;
