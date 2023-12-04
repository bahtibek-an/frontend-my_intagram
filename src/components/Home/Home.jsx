/** @format */

import React, { useEffect, useState } from "react";
import "./Home.scss";
import TelegramIcon from "@mui/icons-material/Telegram";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreatePost from "../Post/CreatePost/CreatePost";
import Likes from "../Likes/Likes";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../Api/firebase";
import { useSelector } from "react-redux";
import Comment from "../Likes/Comment";
import SearchedUser from "./SearchedUser";
import { auth } from "../../Api/firebase";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  const { postLoading } = useSelector((state) => state.posts);
  const [modalState, setModalState] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [article, setArticles] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);

  const handleLogOut = () => {
    auth.signOut();
    alert("SUccsess");
  };

  const filteredUsers = users.filter((el) => el.id !== user.uid);

  useEffect(() => {
    const articleRef = collection(firestore, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);
  useEffect(() => {
    const userRef = collection(firestore, "Users");
    const q = query(userRef, orderBy("userPhoto", "asc"));

    onSnapshot(q, (snapshot) => {
      const usersR = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((userData) => userData.id !== user.uid);

      setUsers(usersR);
    });
  }, [user]);
  // console.log(typeof searchTerm);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Filter the data based on the search term
    const filteredResults = users.filter((item) =>
      item.userName.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };
  return (
    <>
      <div className='home'>
        <header class='grid main-header'>
          <div class='flex-container header-container'>
            <span class='logo logo-nav header-item'><a href="/home">Instagram</a></span>

            <div class='header-item searchbar '>
              <label for='searchbar '>
                <div class='flex-container position-relative'>
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
                    onChange={handleInputChange}
                  />
                  {searchTerm ? <SearchedUser data={filteredData}/> : null}
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
                <li
                  class='navbar-item'
                  onClick={() => setModalState(!modalState)}>
                  <AddBoxIcon sx={{ fontSize: 30 }} />
                </li>
                <li class='navbar-item no-hover'>
                  <a href='/profile' >
                    <img style={{ marginBottom: "8px"}} src={user?.photoURL} alt='' />
                  </a>
                </li>
                <li class='navbar-item'>
                <LogoutIcon sx={{ fontSize: 30 }} onClick={handleLogOut} />
              </li>
              </ul>
            </nav>
          </div>
        </header>

        <section class='main-content grid'>
          <div class='main-gallery-wrapper flex-container'>
            {article?.map((el) => (
              <div key={el.id} class='card-wrapper flex-container'>
                <div class='card-header grid'>
                  <div class='header-img-container flex-container'>
                    <img
                      class='card-header-img'
                      src={el.createdUserPhoto}
                      alt=''
                    />
                  </div>
                  <span class='card-title'>{el.createdBy}</span>

                  <span class='card-subtitle'>{el.title}</span>
                  <div class='card-opt-btn flex-container'>
                    <i class='bi bi-three-dots'></i>
                  </div>
                </div>
                <div class='card-img-container'>
                  <img src={el.imageUrl} class='card-img' alt='' />
                </div>
                <div class='card-data flex-container'>
                  <div class='card-icons flex-container'>
                    <span class='card-icon card-icon-left'>
                      <Likes id={el.id} likes={el.likes} />
                    </span>
                    <span class='card-icon card-icon-left'>
                      <i class='bi bi-chat'></i>
                    </span>
                    <span class='card-icon card-icon-left'>
                      <i class='bi bi-send'></i>
                    </span>
                    <span class='card-icon card-icon-right'>
                      <i class='bi bi-bookmark'></i>
                    </span>
                  </div>
                  <span class='bold card-text'>{} Likes</span>
                  <span class='card-text'>
                    <span class='bold title-margin'>{el.createdBy}</span>
                    {el.description}
                  </span>
                  <span
                    class='card-text comments-btn'
                    onClick={() => setCommentModal(el.id)}>
                    See more comments
                  </span>
                  {commentModal == el.id ? (
                    <Comment
                      id={el.id}
                      postImg={el.imageUrl}
                      setCommentModal={setCommentModal}
                      createdUserPhoto={el.createdUserPhoto}
                    />
                  ) : null}
                  <span class='card-time'></span>
                  <div class='add-comment-container flex-container'>
                    <span class='card-icon'>
                      <i class='bi bi-emoji-smile'></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class='sidebar'>
            <div class='sidebar-menu-container'>
              <div class='sidebar-card sidebar-header grid'>
                <img
                  src={user?.photoURL}
                  alt=''
                  class='sidebar-img sidebar-hd-img'
                />
                <span class='sidebar-title card-title'>
                  {user ? user?.displayName : null}
                </span>
                <span class='card-subtitle sidebar-subtitle'>
                  {" "}
                  {user ? user?.email : null}
                </span>
                <span class='sidebar-btn'><a href="/profile">Change</a></span>
              </div>
              <div class='suggestions-header grid'>
                <span class='suggestions-text'>Suggestions for you</span>
                <span class='sidebar-btn-alt'>See all</span>
              </div>
              {users
          .filter((el) => el.id !== user.uid)
          .map((el) => (
            <div class='sidebar-card sidebar-card-alt grid' key={el.id}>
              <img
                src={el.userPhoto}
                alt=''
                class='sidebar-img side-bar-img-alt'
              />
              <span class='sidebar-title card-title'>{el.userName}</span>
              <Link to={`/${el.userName}`} class='sidebar-btn'>
                Follow
              </Link>
            </div>
          ))}
            </div>
          </div>
        </section>
      </div>
      {modalState ? (
        <CreatePost user={user} setModalState={setModalState} />
      ) : null}
    </>
  );
};

export default Home;
