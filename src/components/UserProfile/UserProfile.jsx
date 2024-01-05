/** @format */

import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth, firestore } from "../../Api/firebase";
import ModalItem from "../Post/ModalItem/ModalItem";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/extraReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faLeftLong } from "@fortawesome/free-solid-svg-icons";

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
const UserProfile = ({ user }) => {
  const { isL, userPost } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const [userSetting, setUserSetting] = useState(false);
  const [users, setUsers] = useState();
  const handleLogOut = () => {
    auth.signOut();
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
  const usss = useParams();
  const theUser = users?.find((el) => el.id == usss?.id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPost(user?.uid));
  }, []);
  const followsRef = doc(firestore, "Users", usss?.id);
  console.log(theUser);
  const handleLike = () => {
    if (theUser?.followers?.includes(user.uid)) {
      updateDoc(followsRef, {
        followers: arrayRemove(user.uid),
      })
        .then(() => {
          // console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(followsRef, {
        followers: arrayUnion(user.uid),
      })
        .then(() => {})
        .catch((e) => {});
    }
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
            <span>
            <div className="back"><FontAwesomeIcon icon={faArrowLeftLong} onClick={()=>navigate(-1)}/></div>
            </span>
              <div class='container'>
                <div class='profile'>
                  <div class='profile-image'>
                    <img src={theUser?.userPhoto} alt='' />
                  </div>
                  {/* this is profile navbar */}

                  <div class='profile-stats'>
                    <ul>
                      <li>
                        <span class='profile-stat-count'>2</span> posts
                      </li>
                      <li>
                        <span class='profile-stat-count'>{theUser?.followers?.length}</span> followers
                      </li>
                      <li>
                        <span class='profile-stat-count'>0</span> following
                      </li>
                    </ul>
                    <button
                      style={{
                        width: "300px",
                        cursor: "pointer",
                        color: "white",
                        background: "rgb(33 108 196)",
                      }}
                      onClick={handleLike}
                      className='followers'>
                      {!theUser?.followers?.includes(user?.uid)
                        ? "follow"
                        : "unfollow"}
                    </button>
                  </div>
                  {/* this is profile navbar */}

                  <div class='profile-bio'>
                    <span class='profile-real-name'>{theUser?.userName}</span>{" "}
                    <p>
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

export default UserProfile;
