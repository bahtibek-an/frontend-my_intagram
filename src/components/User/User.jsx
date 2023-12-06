import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../Api/firebase";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import CreatePost from "../Post/CreatePost/CreatePost";
import Likes from "../Likes/Likes";
import Comment from "../Likes/Comment";
import { useSelector } from "react-redux";
import ModalItem from "../Post/ModalItem/ModalItem";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchedUser from "../Home/SearchedUser";
import "./User.scss";
import {
  getDocs,
  collection,
  where,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const User = ({ user }) => {
  const [userSetting, setUserSetting] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);

  useEffect(() => {
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

    const fetchUserPosts = async () => {
      try {
        const q = query(
          collection(firestore, "Articles"),
          where("createdBy", "==", user.displayName)
        );
        const snapshot = await getDocs(q);

        const userPostsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserPosts(userPostsData);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUsers();
    fetchUserPosts();
  }, [user.displayName, user]);

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      alert("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    const postRef = firestore.collection("Articles").doc(postId);

    try {
      await postRef.delete();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  //   console.log(user.uid)

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value.toLowerCase();
    setSearchTerm(newSearchTerm);
  
    // Filter the data based on the search term, excluding the current user
    const filteredResults = users.filter(
      (item) =>
        item.userName.toLowerCase().includes(newSearchTerm) &&
        item.userName !== user.displayName
    );

    
    setFilteredData(filteredResults);
  };
  

  return (
    <>
      <header className="grid main-header">
        <div className="flex-container header-container">
          <span className="logo logo-nav header-item">Instagram</span>

          <div className="header-item searchbar">
            <label htmlFor="searchbar">
              <div className="flex-container">
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
              <li className="navbar-item">
                <a href="/home">
                  <AddBoxIcon sx={{ fontSize: 30 }} />
                </a>
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
      <div className="userprofile">
        <header>
          <div className="container">
            <div className="profile">
              <div className="profile-image">
                <img src={user?.photoURL} alt="" />
              </div>

              <div className="profile-user-settings">
                <h1 className="profile-user-name">{user?.displayName}</h1>

                <button
                  className=" profile-edit-btn"
                  onClick={() => setUserSetting(!userSetting)}
                >
                  Edit Profile
                </button>

                <button
                  className=" profile-settings-btn"
                  aria-label="profile settings"
                  style={{ cursor: "pointer" }}
                >
                  <SettingsIcon />
                </button>
              </div>

              <div className="profile-stats">
                <ul>
                  <li>
                    <span className="profile-stat-count">
                      {userPosts.length}
                    </span>{" "}
                    posts
                  </li>
                  {/* Add logic to fetch and display followers and following counts */}
                </ul>
              </div>

              <div className="profile-bio">
                <p>
                  <span className="profile-real-name">{user?.displayName}</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="container">
            <div className="gallery">
              {userPosts.map((post) => (
                <div key={post.id} className="gallery-item">
                  <img
                    src={post.imageUrl}
                    className="gallery-image"
                    alt={`Post ${post.id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      {userSetting ? <ModalItem setUserSetting={setUserSetting} /> : null}
    </>
  );
};

export default User;
