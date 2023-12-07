import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../Database/firebase";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(firestore, "posts"),
          where("userId", "==", currentUser.uid)
        );
        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPosts(data);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [currentUser.uid, firestore]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const chunkPosts = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  return (
    <div className="bg-white d-flex ">
      <div className='p-0 position-relative col-md-4'>
        <Sidebar />
      </div>
      <div className="p-0 col-md-6 bg-white overflow-auto none-scroll">
        <div className="d-flex">
          <div className="col-md-2 p-5">
            <img
              src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
              alt=""
              width="100px"
            />
          </div>
          <div className="col-md-8 p-5">
            <h4 className="d-flex justify-content-between">
              <b>{currentUser.displayName}</b>
              <div className="">
                <Link to="/edit" className="btn-secondary btn m-1 mt-0 mb-0">
                  Edit Profile
                </Link>
                <button className="btn-secondary btn m-1 mt-0 mb-0" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </h4>
            <p className="text-dark">
              <b>{currentUser.email}</b>
            </p>
          </div>

        </div>

        <center className="mt-5">
          <b>Your Posts</b>
        </center>
        <hr className="w-100" />
          <div className="p-0 col-md-12 mt-5 bg-white overflow-auto none-scroll">
            {chunkPosts(posts, 3).map((row, rowIndex) => (
              <div className="row mb-3 d-flex justify-content-between" key={rowIndex}>
                {row.map((post) => (
                  <div
                    className="w-25 m-0 p-0 hoverPost"
                    key={post.id}
                    style={{
                      backgroundImage: `url(${post.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <p>
                      <ion-icon name="heart"></ion-icon> {post.like}
                    </p>
                  </div>
                ))}

              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Profile;
