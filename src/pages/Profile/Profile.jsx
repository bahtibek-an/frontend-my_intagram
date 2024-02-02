/** @format */

import React, { useEffect, useState } from "react";
import "./Profile.scss";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "../../comonents/redux/api";
import { deletePost, fetchUsersAsync, getUserPost } from "../../comonents/redux/extraReducer";
import EditModal from "./EditModal";
import Loader from "../../comonents/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faRemove,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { confirmAlert } from "react-confirm-alert";
import { HomeOutlined, PlusCircleOutlined, SendOutlined } from "@ant-design/icons";
const Profile = ({ user }) => {
  const { postLoading, userPost } = useSelector((state) => state.base);
  const navigate = useNavigate();
  const [userSetting, setUserSetting] = useState(false);
  const [users, setUsers] = useState([]);
  let currUser = JSON.parse(localStorage.getItem("currUser"));
  const handleLogOut = () => {
    auth.signOut();
    localStorage.removeItem("currUser");
    navigate("/");
  };
  useEffect(() => {
    const userRef = collection(firestore, "Users");
    const q = query(userRef, orderBy("userPhoto", "asc"));
    onSnapshot(q, (snapshot) => {
      const usersR = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersR);
    });
  }, []);
  var currentUserId = users?.find((el) => el.userEmail === user?.email);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAsync());
    dispatch(getUserPost(currUser?.uid));
  }, [postLoading]);
  const handleClickConfirm = (name, id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deletePost({ id:id}))
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  console.log(userPost);
  return (
    <>
      {postLoading ? (
        <Loader />
      ) : (
        <>
          <header class='grid this-head'>
            <div class='conta-flex header-container'>
              <span class='logo logo-nav headoItem'>Instagram</span>

              <div class='headoItem bartheSearch '>
                <label for='bartheSearch '>
                  <div class='conta-flex'>
                    <div class='conta-searchicon'>
                      <svg
                        class='search-nav-icon'
                        viewBox='0 0 512 512'
                        width='100'
                        // this is profile navbar
                        title='search'>
                        <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
                      </svg>
                    </div>

                    <input
                      id='bartheSearch'
                      type='text'
                      class='bartheSearch-input'
                      placeholder='Search...'
                    />
                  </div>
                </label>
              </div>
              <nav class='headoItem main-nav'>
                <ul class='navbar conta-flex'>
                  <li class='theitemnavbar'>
                    {/* this is profile navbar */}
                    <a href='/homepage'>
                    <HomeOutlined  sx={{ fontSize: 30 }} />
                    </a>
                  </li>
                  <li class='theitemnavbar'>
                    <a href='/homepage'>
                      <SendOutlined sx={{ fontSize: 30 }} />
                    </a>
                  </li>
                  <li class='theitemnavbar'>
                    <a href='/homepage'>
                      <PlusCircleOutlined sx={{ fontSize: 30 }} />
                    </a>
                  </li>
                  <li class='theitemnavbar'>
                    <a href='/homepage'>
                      <FavoriteIcon sx={{ fontSize: 30 }} />
                    </a>
                  </li>

                  {/* this is profile navbar */}
                  <li class='theitemnavbar no-hover'>
                    <img src={user?.photoURL} alt='' />
                  </li>
                  <li class='theitemnavbar'>
                    <LogoutIcon sx={{ fontSize: 30 }} onClick={handleLogOut} />
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <div className='userprofile'>
            <header>
              {/* this is profile navbar */}
              <div class='container'>
                <div class='profile'>
                  <div class='profile-image'>
                    <img src={user?.photoURL} alt='' />
                  </div>
                  {/* this is profile navbar */}

                  <div class='prof-us-prof-settings'>
                    <h1 class='prof-us-prof-name'>{user?.displayName}</h1>

                    <button
                      class=' profile-edit-btn'
                      onClick={() => setUserSetting(!userSetting)}>
                      Edit Profile<SettingsIcon />
                    </button>

               
                    {/* this is profile navbar */}
                  </div>

                  <div class='profile-stats'>
                    <ul>
                      <li>
                        <span class='profile-stat-count'>
                          {userPost?.length}
                        </span>{" "}
                        posts
                      </li>
                      <li>
                        <span class='profile-stat-count'>
                          {currentUserId?.followers.length}
                        </span>{" "}
                        followers
                      </li>
                      <li>
                        <span class='profile-stat-count'>0</span> following
                      </li>
                    </ul>
                  </div>
                  {/* this is profile navbar */}

                  <div class='profile-bio'>
                    <p>
                      <span class='profile-real-name'>
                        {user?.displayName}:
                      </span>{" "}
                      {currentUserId?.userBio}
                      📷✈️🏕️
                    </p>
                  </div>
                </div>
              </div>
            </header>
            {/* this is profile navbar */}

            <main>
              <div class='container'>
                <div class='gallery'>
                  {userPost?.map((el) => (
                    <div class='gallery-item'>
                      <div className='img__container'>
                        <img src={el.imageUrl} class='gallery-image' alt='' />
                      </div>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className='trash__icon'
                        onClick={() => handleClickConfirm(el.name, el.id)}
                      />

                      <div class='galler'></div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
          {userSetting ? (
            <EditModal
              userPhoto={user?.photoURL}
              users={users}
              user={user}
              userSetting={userSetting}
              userName={user?.displayName}
              setUserSetting={setUserSetting}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default Profile;
