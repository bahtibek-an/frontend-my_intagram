/** @format */

import React, { useState } from "react";
import "./User.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../Api/firebase";
import ModalItem from "../Post/ModalItem/ModalItem";
const User = ({ user }) => {
  const [userSetting, setUserSetting] = useState(false);
  const [userPosts, setUserPosts] = useState([])
  const handleLogOut = () => {
    auth.signOut();
    alert("SUccsess");
  };
  return (
    <>
      <header class='grid main-header'>
        <div class='flex-container header-container'>
          <span class='logo logo-nav header-item'>Instagram</span>

          <div class='header-item searchbar '>
            <label for='searchbar '>
              <div class='flex-container'>
                <div class='search-icon-container'>
                  <svg
                    class='search-nav-icon'
                    viewBox='0 0 512 512'
                    width='100'
                    title='search'>
                    <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
                  </svg>
                </div>

                <input
                  id='searchbar'
                  type='text'
                  class='searchbar-input'
                  placeholder='Search...'
                />
              </div>
            </label>
          </div>
          <nav class='header-item main-nav'>
            <ul class='navbar flex-container'>
              <li class='navbar-item'>
                <a href='/home'>
                  <HomeIcon sx={{ fontSize: 30 }} />
                </a>
              </li>
              <li class='navbar-item'>
                <a href='/home'>
                  <AddBoxIcon sx={{ fontSize: 30 }} />
                </a>
              </li>

              <li class='navbar-item no-hover'>
                <img style={{ marginBottom: "8px"}} src={user?.photoURL} alt='' />
              </li>
              <li class='navbar-item'>
                <LogoutIcon sx={{ fontSize: 30 }} onClick={handleLogOut} />
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className='userprofile'>
        <header>
          <div class='container'>
            <div class='profile'>
              <div class='profile-image'>
                <img src={user?.photoURL} alt='' />
              </div>

              <div class='profile-user-settings'>
                <h1 class='profile-user-name'>{user?.displayName}</h1>

                <button
                  class=' profile-edit-btn'
                  onClick={() => setUserSetting(!userSetting)}>
                  Edit Profile
                </button>

                <button
                  class=' profile-settings-btn'
                  aria-label='profile settings'>
                  <SettingsIcon />
                </button>
              </div>

              <div class='profile-stats'>
                <ul>
                  <li>
                    <span class='profile-stat-count'>1</span> posts
                  </li>
                  <li>
                    <span class='profile-stat-count'>0</span> followers
                  </li>
                  <li>
                    <span class='profile-stat-count'>0</span> following
                  </li>
                </ul>
              </div>

              <div class='profile-bio'>
                <p>
                  <span class='profile-real-name'>{user?.displayName}</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div class='container'>
            <div class='gallery'>
              {userPosts.map((el) => {
                <div class='gallery-item' tabindex='0'>
                  <img
                    src='https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop'
                    class='gallery-image'
                    alt=''
                  />

                  <div class='gallery-item-info'>
                    <ul>
                      <li class='gallery-item-likes'>
                        <span class='visually-hidden'>Likes:</span>
                        <i class='fas fa-heart' aria-hidden='true'></i> 34
                      </li>
                      <li class='gallery-item-comments'>
                        <span class='visually-hidden'>Comments:</span>
                        <i class='fas fa-comment' aria-hidden='true'></i> 1
                      </li>
                    </ul>
                  </div>
                </div>;
              })}
            </div>
          </div>
        </main>
      </div>
      {userSetting ? <ModalItem setUserSetting={setUserSetting} /> : null}
    </>
  );
};

export default User;
