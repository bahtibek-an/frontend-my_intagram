/** @format */

import React, { useEffect, useState } from "react";
import "./User.scss";
import { confirmAlert } from "react-confirm-alert";
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../Api/firebase";
import ModalItem from "../Post/ModalItem/ModalItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deletePost, fetchUsers, getUserPost } from "../../redux/extraReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
const User = ({ user }) => {
  const { isL, userPost, users, deletePo } = useSelector(
    (state) => state.posts
  );
  const navigate = useNavigate();
  const [userSetting, setUserSetting] = useState(false);

  const handleLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPost(user?.uid));
    dispatch(fetchUsers());
  }, [user, deletePo]);
  const theUser = users?.find((el) => el.userEmail == user?.email);
  console.log(user);
  const handleClickConfirm = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deletePost({ id: id })),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  return (
    <>
      {isL ? (
        <h2>Loading...</h2>
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
                    <a href='/home'>
                      <HomeIcon sx={{ fontSize: 30 }} />
                    </a>
                  </li>
                  <li class='theitemnavbar'>
                    <a href='/home'>
                      <TelegramIcon sx={{ fontSize: 30 }} />
                    </a>
                  </li>
                  <li class='theitemnavbar'>
                    <a href='/home'>
                      <AddBoxIcon sx={{ fontSize: 30 }} />
                    </a>
                  </li>
                  <li class='theitemnavbar'>
                    <a href='/home'>
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
                      Edit Profile
                    </button>

                    <button
                      onClick={() => setUserSetting(!userSetting)}
                      class=' profile-settings-btn'
                      aria-label='profile settings'>
                      <SettingsIcon />
                    </button>
                    {/* this is profile navbar */}
                  </div>

                  <div class='profile-stats'>
                    <ul>
                      <li>
                        <span class='profile-stat-count'>1</span> posts
                      </li>
                      <li>
                        <span class='profile-stat-count'>
                          {theUser?.followers?.length}
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
                      <span class='profile-real-name'>{user?.displayName}</span>{" "}
                      {/* this is profile navbar */}
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit
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
                        <FontAwesomeIcon
                          icon={faTrashArrowUp}
                          onClick={() => handleClickConfirm(el.id)}
                        />
                        <img src={el.imageUrl} class='gallery-image' alt='' />
                      </div>

                      <div class='gallery-item-info'>
                        <ul>
                          <li class='gallery-item-likes'>
                            <span class='visually-hidden'>Likes:</span>
                            {/* this is profile navbar */}
                            <i class='fas fa-heart' aria-hidden='true'></i> 34
                          </li>
                          <li class='gallery-item-comments'>
                            <span class='visually-hidden'>Comments:</span>
                            <i class='fas fa-comment' aria-hidden='true'></i> 1
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
          {userSetting ? (
            <ModalItem
              userPhoto={user?.photoURL}
              user={user}
              userName={user?.displayName}
              setUserSetting={setUserSetting}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default User;
