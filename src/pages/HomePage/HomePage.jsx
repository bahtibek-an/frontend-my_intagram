/** @format */

import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestore } from "../../comonents/redux/api";
import CreatePost from "../../comonents/CreatePost/CreatePost";
import Loader from "../../comonents/Loader/Loader";
import Likes from "../../comonents/Likes/Likes";
import Comments from "../../comonents/Comments/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import { MessageOutlined, PlusCircleOutlined, SendOutlined } from "@ant-design/icons";
import Header from "../../comonents/Header/Header";

const Home = ({ user }) => {
  const { postLoading } = useSelector((state) => state.base);
  const [modalState, setModalState] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [article, setArticles] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleCreateFolderModal, setVisibleCreateFolderModal] =
    useState(false);
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
      const usersR = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersR);
    });
  }, []);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Filter the data based on the search term
    const filteredResults = users.filter((item) =>
      item.userName.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };
  const filtredUsers = users.filter((x) => x.userId !== user?.uid);
  console.log(article)
  return (
    <>
      {postLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            handleInputChange={handleInputChange}
            searchTerm={searchTerm}
            SearchBar={SearchBar}
            filteredData={filteredData}
            setVisibleUploadModal={setVisibleUploadModal}
            visibleUploadModal={visibleUploadModal}
            user={user}
          />
          <div className='homepage'>
            <section class='non-main-cont grid'>
              <div class='main-gallery-wrapper conta-flex'>
                <div class='mop-wrapper conta-flex'>
                  <span class='mop conta-flex'>
                    <div class='mop-img-container'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU'
                        alt=''
                        class='mop-img'
                      />
                    </div>
                    <p class='mop-text'>User</p>
                  </span>

                  <span class='mop conta-flex'>
                    <div class='mop-img-container'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU'
                        alt=''
                        class='mop-img'
                      />
                    </div>
                    <p class='mop-text'>User.</p>
                  </span>
                  <span class='mop conta-flex'>
                    <div class='mop-img-container'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU'
                        alt=''
                        class='mop-img'
                      />
                    </div>
                    <p class='mop-text'>User.</p>
                    {/* this is Home and this do everiy think */}
                  </span>
                  <span class='mop conta-flex'>
                    <div class='mop-img-container'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU'
                        alt=''
                        class='mop-img'
                      />
                    </div>
                    <p class='mop-text'>User.</p>
                  </span>
                  <span class='mop conta-flex'>
                    {/* this is Home and this do everiy think */}
                    <div class='mop-img-container'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU'
                        alt=''
                        // this is Home and this do everiy think
                        class='mop-img'
                      />
                    </div>
                    <p class='mop-text'>User.</p>
                    {/* this is Home and this do everiy think */}
                  </span>
                  <span class='mop conta-flex'>
                    <div class='mop-img-container'>
                      <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNj2neyxX6xCcoiQLdU8IzlbZNT6PQ2nsQab0-MzEwgTllwCCrosZ8IrEmjXd9-923wLg&usqp=CAU'
                        alt=''
                        class='mop-img'
                      />
                    </div>
                    <p class='mop-text'>User.</p>
                  </span>
                </div>
                {article?.map((el) => (
                  <div key={el.id} class='card-wrapper conta-flex'>
                    <div class='card-header grid'>
                      <div class='header-img-container conta-flex'>
                        {/* this is Home and this do everiy think */}
                        <img
                          class='card-header-img'
                          src={el.createdUserPhoto}
                          alt=''
                        />
                      </div>
                      <span class='card-title'>{el.createdBy}</span>

                      {/* this is Home and this do everiy think */}
                      <span class='card-subtitle'>{el.title}</span>
                      <div class='card-opt-btn conta-flex'>
                        <i class='bi bi-three-dots'></i>
                      </div>
                    </div>
                    <div class='card-img-container'>
                      <img src={el.imageUrl} class='card-img' alt='' />
                      {/* this is Home and this do everiy think */}
                    </div>
                    <div class='card-data conta-flex'>
                      <div class='card-icons conta-flex'>
                        <span class='card-icon card-icon-left'>
                          <Likes id={el.id} likes={el.likes} />
                          <MessageOutlined 
                            onClick={() => setCommentModal(el.id)}
                            className='comment__icon'
                            style={{ fontSize: "23px" }}
                          />
                        </span>
                        {/* this is Home and this do everiy think */}
                        <span class='card-icon card-icon-left'>
                          <i class='bi bi-chat'></i>
                        </span>
                        {/* this is Home and this do everiy think */}
                        <span class='card-icon card-icon-left'>
                          <i class='bi bi-send'></i>
                        </span>
                        <span class='card-icon card-icon-right'>
                          <i class='bi bi-bookmark'></i>
                          {/* this is Home and this do everiy think */}
                        </span>
                      </div>
                      <span class='bold card-text'>{} Likes</span>
                      <span class='card-text'>
                        <span class='bold title-margin'>{el.createdBy}</span>
                      </span>
                      {/* <span
                        // this is Home and this do everiy think
                        class='card-text comments-btn'
                        onClick={() => setCommentModal(el.id)}>
                        See more comments
                      </span> */}
                      {/* this is Home and this do everiy think */}
                      {commentModal == el.id ? (
                        <Comments
                          id={el.id}
                          postImg={el.imageUrl}
                          setCommentModal={setCommentModal}
                          createdUserPhoto={el.createdUserPhoto}
                        />
                      ) : null}
                      <span class='card-time'></span>
                      <div class='add-comment-container conta-flex'>
                        <span class='card-icon'>
                          <i class='bi bi-emoji-smile'></i>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* this is Home and this do everiy think */}
              </div>
              <div class='sidebar'>
                <div class='sidebar-menu-container'>
                  <div class='sidebar-card sidebar-header grid'>
                    <img
                      // this is Home and this do everiy think
                      src={user?.photoURL}
                      alt=''
                      class='sidebar-img sidebar-hd-img'
                    />
                    <span class='sidebar-title card-title'>
                      {user ? user?.displayName : null}
                      {/* this is Home and this do everiy think */}
                    </span>
                    <span class='card-subtitle sidebar-subtitle'>
                      {" "}
                      {user ? user?.email : null}
                    </span>
                    <span class='sidebar-btn'>Change</span>
                    {/* this is Home and this do everiy think */}
                  </div>
                  <div class='suggestions-header grid'>
                    <span class='suggestions-text'>Suggestions for you</span>
                    <span class='sidebar-btn-alt'>See all</span>
                  </div>
                  {filtredUsers.map((el) => (
                    <div class='sidebar-card sidebar-card-alt grid'>
                      <img
                        src={el.userPhoto}
                        // this is Home and this do everiy think
                        alt=''
                        class='sidebar-img side-bar-img-alt'
                      />
                      <a href={`/profile/${el.id}`}>
                        <span class='sidebar-title card-title'>
                          {el.userName}
                        </span>
                      </a>
                      <span class='card-subtitle sidebar-subtitle sidebar-subtitle-alt'>
                        {/* this is Home and this do everiy think */}
                        Lorem.
                      </span>
                      <span class='sidebar-btn'>
                        <a href={`/profile/${el.id}`}>see</a>
                      </span>
                      {/* this is Home and this do everiy think */}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          {visibleUploadModal ? (
            <CreatePost
              user={user}
              visibleUploadModal={visibleUploadModal}
              setVisibleUploadModal={setVisibleUploadModal}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default Home;
