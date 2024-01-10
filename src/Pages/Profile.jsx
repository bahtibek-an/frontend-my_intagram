import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../Database/firebase";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Profile component represents the user profile page
const Profile = () => {
  // Access user information from the AuthContext
  const { currentUser } = useContext(AuthContext);
  // State to store user's posts
  const [posts, setPosts] = useState([]);
  // Firestore instance
  const firestore = getFirestore();

  // Fetch user's posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Create a query for user's posts
        const postsQuery = query(
          collection(firestore, "posts"),
          where("userId", "==", currentUser.uid)
        );
        // Set up snapshot listener for real-time updates
        const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPosts(data);
        });
        return () => unsubscribe(); // Unsubscribe when the component unmounts
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [currentUser.uid, firestore]);

  // Function to handle user logout
  const logoutHandler = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Function to chunk an array into smaller arrays
  const chunkPosts = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  // Render the Profile component
  return (
    <div className="bg-white d-flex">
      <div className='p-0 position-relative col-md-4'>
        {/* Sidebar component for navigation and user information */}
        <Sidebar />
      </div>
      <div className="p-0 col-md-6 bg-white overflow-auto none-scroll">
        {/* User information section */}
        <div className="d-flex">
          <div className="col-md-2 p-5">
            {/* Display user profile picture */}
            <img
              src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
              alt=""
              width="100px"
            />
          </div>
          <div className="col-md-8 p-5">
            {/* Display user display name and provide options to edit profile or logout */}
            <h4 className="d-flex justify-content-between">
              <b>{currentUser.displayName}</b>
              <div className="">
                <Link to="/edit" className="btn-secondary btn m-1 mt-0 mb-0">
                  Edit Profile
                </Link>
                <button className="btn-secondary btn m-1 mt-0 mb-0" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            </h4>
            {/* Display user email */}
            <p className="text-dark">
              <b>{currentUser.email}</b>
            </p>
          </div>
        </div>

        {/* Section displaying user's posts */}
        <center className="mt-5">
          <b>Your Posts</b>
        </center>
        <hr className="w-100" />
        <div className="p-0 col-md-12 mt-5 bg-white overflow-auto none-scroll">
          {/* Render user's posts in a grid */}
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
                  {/* Display post likes */}
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
