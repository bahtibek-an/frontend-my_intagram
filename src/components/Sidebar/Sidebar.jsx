import React, { useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../context/Firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Sidebar.css"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  getDocs
} from "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const storage = getStorage();
  const firestore = getFirestore();
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const unsubscribePosts = onSnapshot(
      collection(firestore, "Posts"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      }
    );

    const usersQuery = query(
      collection(firestore, "users"),
      orderBy("createdAt"),
      limit(10)
    );

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    });

    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageFile) {
      try {
        const storageRef = ref(storage, `posts/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {

          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(firestore, "Posts"), {
              imageUrl: downloadURL,
              comment: comment,
              userId: currentUser.uid,
              userName: currentUser.displayName,
              postUserPhoto: currentUser.photoURL,
              like: 0,
              timestamp: serverTimestamp(),
            });
            setSuccess(true);

            closeModal();
          }
        );



      } catch (error) {
        console.error(error);
      }

    }
  };

  const openNav = () => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');

    if (mediaQuery.matches) {
      document.getElementById("mySidenav").style.width = "100%";
    } else {
      document.getElementById("mySidenav").style.width = "300px";
    }

    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  };


  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "black";
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const performSearch = async () => {
    if (!currentUser || !searchQuery) {
      setSearchResults([]);
      setShowSearchModal(false);
      return;
    }

    const usersCollection = collection(db, "users");

    const querySnapshot = await getDocs(usersCollection);

    const results = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.uid !== currentUser.uid) {
        const displayNameLower = user.displayName.toLowerCase();
        const searchQueryLower = searchQuery.toLowerCase();

        // Check if displayNameLower contains any part of searchQueryLower
        if (displayNameLower.includes(searchQueryLower)) {
          results.push(user);
        }
      }
    });

    setSearchResults(results);
    setShowSearchModal(true);
  };


  useEffect(() => {
    performSearch();
  }, [searchQuery, currentUser]);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    console.log(modalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
    console.log(modalVisible);

  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <>
      {modalVisible && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
         <div className="modal-head-upload">
         <p>Create new post</p>
            <span className="close" onClick={closeModal}>&times;</span>
         </div>
            
            <form className="modal-form" onSubmit={handleSubmit}>
              <label htmlFor="imageInput" className="form-label w-100">
                <i class="bi bi-file-earmark-plus-fill"></i>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="imageInput"
                hidden
              />
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Enter a comment"
              ></textarea>
              <button type="submit">
                {success ? "Upload successful" : "Upload"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div id="mySidenav" class="sidenav">
        <div className="search-head">
          Search

          <a class="closebtn" onClick={closeNav}>&times;</a>
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Enter Username"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {showSearchModal && (
          <div className="search-results" style={{ width: "300px" }}>
            <p style={{ margin: "13px" }}>Searching...</p>
            <ul>
              {searchResults.map((result) => (
                <li key={result.uid} className="search-profile" style={{ display: "flex", alignItems: "center" }}>
                  <Link className="search-result" to={`/profile/${result.uid}`}>
                    <img src={result.photoURL} alt="" className="post-user-img" />
                    {result.displayName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="sidebar">
        <Link to="/" class="Instagram-home-link">
          <span class="">
            <svg aria-label="Instagram" class="_ab6-" color="rgb(255, 255, 255)" fill="rgb(245, 245, 245)" height="39" role="img" viewBox="32 4 113 32" width="113"><path clip-rule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fill-rule="evenodd"></path></svg>
          </span>
        </Link>
        <Link to="/" class="Instagram-home-link-mobile" >
          <span class="">
            <i class="bi bi-instagram"></i>
          </span>
        </Link>
        <div className="sidebar-menu">
          <div className="sidebar-menu-items">
            <Link to="/"><i class="bi bi-house"></i> <div className="com-none">Home</div> </Link>
          </div>
          <div className="sidebar-menu-items" >
            <Link onClick={openNav}><i class="bi bi-search"></i> <div className="com-none"> Search</div> </Link>
          </div>
          <div className="sidebar-menu-items">
            <Link to="/explore"><i class="bi bi-compass"></i> <div className="com-none">Explore</div> </Link>
          </div>
          <div className="sidebar-menu-items">
            <Link onClick={openModal}><i class="bi bi-plus-square"></i> <div className="com-none">Create</div> </Link>
          </div>
          <div className="sidebar-menu-items">
            <Link to="/profile"><i class="bi bi-person-circle"></i> <div className="com-none">Profile</div> </Link>
          </div>
        </div>
        <div className="sidebar-more">
          <div className="instagram-more-menu">
            <div className="instagram-more-items">
              <Link to="https://www.threads.net/" target="blank">
                <i class="bi bi-threads"></i>  <div className="com-none">Threads</div>
              </Link>
            </div>
            <div className="instagram-more-items dropdown-more">
              <Link className="dropbtn-more">
                <i class="bi bi-list"></i>  <div className="com-none">More</div>
              </Link>
              <div class="dropdown-content-more">
                <Link to="/profile">Profile</Link>
                <Link onClick={handleLogout}>Sign out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Sidebar;