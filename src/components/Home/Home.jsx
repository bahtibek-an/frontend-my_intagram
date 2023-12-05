import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../../Api/firebase";
import TelegramIcon from "@mui/icons-material/Telegram";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import CreatePost from "../Post/CreatePost/CreatePost";
import Likes from "../Likes/Likes";
import Comment from "../Likes/Comment";
import SearchedUser from "./SearchedUser";
import { useSelector } from "react-redux";

const Home = ({ user }) => {
  const { postLoading } = useSelector((state) => state.posts);
  const [modalState, setModalState] = useState(false);
  const [commentModal, setCommentModal] = useState(true);
  const [article, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);

  useEffect(() => {
    const fetchArticles = async () => {
      const articleRef = collection(firestore, "Articles");
      const q = query(articleRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const articlesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setArticles(articlesData);
      });
    };

    const fetchUsers = async () => {
      const userRef = collection(firestore, "Users");
      const q = query(userRef, orderBy("userPhoto", "asc"));
      onSnapshot(q, (snapshot) => {
        const usersData = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((userData) => userData.id !== user.uid);
        setUsers(usersData);
      });
    };

    fetchArticles();
    fetchUsers();
  }, [user]);

  const handleLogOut = () => {
    auth.signOut();
    alert("Success");
  };

  const handleDeletePost = async (postId) => {
    const postRef = doc(firestore, "Articles", postId);

    try {
      await deleteDoc(postRef);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

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
      <div className="home">
        <header className="grid main-header">
          <div className="flex-container header-container">
            <span className="logo logo-nav header-item">
              <a href="/home">Instagram</a>
            </span>

            <div className="header-item searchbar ">
              <label for="searchbar ">
                <div className="flex-container position-relative">
                  <div className="search-icon-container">
                    <svg
                      className="search-nav-icon"
                      viewBox="0 0 512 512"
                      width="100"
                      title="search"
                    >
                      <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                    </svg>
                  </div>

                  <input
                    id="searchbar"
                    type="text"
                    className="searchbar-input"
                    placeholder="Search..."
                    onChange={handleInputChange}
                  />
                 {searchTerm ? <SearchedUser data={filteredData} /> : null} 
                </div>
              </label>
            </div>
            <nav className="header-item main-nav">
              <ul className="navbar flex-container">
                <li className="navbar-item">
                  <a href="/home">
                    <HomeIcon sx={{ fontSize: 30 }} />
                  </a>
                </li>
                <li
                  className="navbar-item"
                  onClick={() => setModalState(!modalState)}
                >
                  <AddBoxIcon sx={{ fontSize: 30 }} />
                </li>
                <li className="navbar-item no-hover">
                  <a href="/profile">
                    <img
                      style={{ marginBottom: "8px" }}
                      src={user?.photoURL}
                      alt=""
                    />
                  </a>
                </li>
                <li className="navbar-item">
                  <LogoutIcon sx={{ fontSize: 30 }} onClick={handleLogOut} />
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <section className="main-content grid">
          <div className="main-gallery-wrapper flex-container">
            {article?.map((el) => (
              <div key={el.id} className="card-wrapper flex-container">
                <div className="card-header grid">
                  <div className="header-img-container flex-container">
                    <img
                      className="card-header-img"
                      src={el.createdUserPhoto}
                      alt=""
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "120px"}} >
                      <span className="card-title" >{el.createdBy}</span>
                      <br />
                      <span className="card-subtitle">{el.title}</span>
                    </div>
                    <div style={{ marginLeft: '240px', color: 'red', fontSize: '14px', cursor: 'pointer', marginBottom: "3px"}}>
                      {el.createdBy === user.displayName && (
                        <a
                          className="card-icon card-icon-right"
                          onClick={() => handleDeletePost(el.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="card-opt-btn flex-container">
                    <i className="bi bi-three-dots"></i>
                  </div>
                </div>
                <div className="card-img-container">
                  <img src={el.imageUrl} className="card-img" alt="" />
                </div>
                <span
                  className=""
                  style={{ marginLeft: '320px' }}
                >
                  {el.createdAt.toDate().toLocaleString()}
                </span>
                <div className="card-data flex-container">
                  <div className="card-icons flex-container">
                    <span className="card-icon card-icon-left">
                      <Likes id={el.id} likes={el.likes} />
                    </span>
                    <span className="card-icon card-icon-left">
                      <i className="bi bi-chat"></i>
                    </span>
                    <span className="card-icon card-icon-left">
                      <i className="bi bi-send"></i>
                    </span>
                    <span className="card-icon card-icon-right">
                      <i className="bi bi-bookmark"></i>
                    </span>
                  </div>
                  <span className="bold card-text">{} Likes</span>
                  <span className="card-text">
                    <span className="bold title-margin">{el.createdBy}</span>
                    {el.description}
                  </span>
                  <span
                    className="card-text comments-btn"
                    onClick={() => setCommentModal(el.id)}
                  >
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
                  <span className="card-time"></span>
                  <div className="add-comment-container flex-container">
                    <span className="card-icon">
                      <i className="bi bi-emoji-smile"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sidebar">
            <div className="sidebar-menu-container">
              <div className="sidebar-card sidebar-header grid">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="sidebar-img sidebar-hd-img"
                />
                <span className="sidebar-title card-title">
                  {user ? user?.displayName : null}
                </span>
                <span className="card-subtitle sidebar-subtitle">
                  {" "}
                  {user ? user?.email : null}
                </span>
                <span className="sidebar-btn">
                  <a href="/profile">Change</a>
                </span>
              </div>
              <div className="suggestions-header grid">
                <span className="suggestions-text">Suggestions for you</span>
                <span className="sidebar-btn-alt">See all</span>
              </div>
              {users
                .filter((el) => el.id !== user.uid)
                .map((el) => (
                  <div className="sidebar-card sidebar-card-alt grid" key={el.id}>
                    <img
                      src={el.userPhoto}
                      alt=""
                      className="sidebar-img side-bar-img-alt"
                    />
                    <span className="sidebar-title card-title">{el.userName}</span>
                    <Link to={`/${el.userName}`} className="sidebar-btn">
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
