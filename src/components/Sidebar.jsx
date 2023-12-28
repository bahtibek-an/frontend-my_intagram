import React, { useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../Database/firebase";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Sidebar.css"
import "./Navbar.css"
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
  const [showLogout, setShowLogout] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const performSearch = async () => {
    if (!currentUser || !searchQuery) {
      setSearchResults([]);
      setShowSearchModal(false);
      return;
    }

    const usersCollection = collection(db, "users");

    const q = query(usersCollection, where("displayName", "==", searchQuery));

    try {
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        results.push(user);
      });

      setSearchResults(results);
      setShowSearchModal(true);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery, currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  // const { currentUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const storage = getStorage();
  const firestore = getFirestore();
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const unsubscribePosts = onSnapshot(
      collection(firestore, "posts"),
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
            await addDoc(collection(firestore, "posts"), {
              imageUrl: downloadURL,
              comment: comment,
              userId: currentUser.uid,
              userName: currentUser.displayName,
              like: 0,
              timestamp: serverTimestamp(),
            });
            setSuccess(true);

            window.location.reload(false);
          }


        );



      } catch (error) {
        console.error(error);
      }

    }
  };


  return (
    <>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control mb-3" id="inputGroupFile02"
                />
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Enter a comment"
                  className="form-control mb-3" id="exampleFormControlTextarea1" rows="3"
                ></textarea>
                <button type="submit" className="btn btn-primary">
                  {success ? "Upload successful" : "Upload"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-white position-absolute top-0 border-end text-dark border-secondary" style={{ width: "280px", height: "100vh" }}>
        <a href="/" class="d-flex align-items-center mb-2 mb-md-0 me-md-auto text-white text-decoration-none">
          <span class="">
            <svg aria-label="Instagram" class="_ab6-" color="rgb(0, 0, 0)" fill="rgb(245, 245, 245)" height="39" role="img" viewBox="32 4 113 32" width="113"><path clip-rule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fill-rule="evenodd"></path></svg>
          </span>
        </a>
        <hr className="text-dark" />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/" class="nav-link text-dark fs-5" aria-current="page">
              <ion-icon class="bi me-2" name="home"></ion-icon>
              Home
            </a>
          </li>
          <li>
            <a class="nav-link text-dark fs-5" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              <ion-icon class="bi me-2" name="search"></ion-icon>
              Search
            </a>
          </li>
          <li>
            <a href="/explore" class="nav-link text-dark fs-5">
              <ion-icon class="bi me-2" name="compass"></ion-icon>
              Explore
            </a>
          </li>
          <li>
            <a class="nav-link text-dark fs-5" type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              <ion-icon class="bi me-2" name="add-circle-outline"></ion-icon>
              Create
            </a>
          </li>
          <li>
            <a href="/profile" class="nav-link text-dark fs-5">
              <ion-icon class="bi me-2" name="contact"></ion-icon>
              Profile
            </a>
          </li>
        </ul>

        <div class="offcanvas offcanvas-start text-dark" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Search</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">

            <form className="d-flex w-100">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by username"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
              />
            </form>

            <div className="">
              <p className="mt-3">Search Results</p>

              <div class="list-group list-group-flush border-bottom scrollarea">
                {searchResults.map((result) => (
                  <div key={result.id} class="list-group-item list-group-item-action text-dark py-3 lh-tight" aria-current="true">
                    <Link to={`/profile/${result.uid}`} className="text-decoration-none">
                      <div class="d-flex w-100 align-items-center justify-content-between text-dark">
                        <strong class="mb-1 ">{result.displayName}</strong>
                        <small>New</small>
                      </div>
                      <div class="col-10 mb-1 small text-dark text-decoration-none">{result.email}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>


    </>
  )
}
export default Sidebar;