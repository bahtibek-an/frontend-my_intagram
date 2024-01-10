import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import Sidebar from "../components/Sidebar";

const UserProfile = () => {
  // Get user ID from the route parameters
  const { uid } = useParams();
  // State to store user information
  const [user, setUser] = useState({});
  // State to store user posts
  const [userPosts, setUserPosts] = useState([]);
  // Firestore instance
  const db = getFirestore();

  // Fetch user information and posts on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("uid", "==", uid));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUser(userData);
        }

        // Fetch user posts
        const postsRef = collection(db, "posts");
        const userPostsQuery = query(postsRef, where("userId", "==", uid));
        const userPostsSnapshot = await getDocs(userPostsQuery);

        const postsData = userPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserPosts(postsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [uid, db]);

  // Render the UserProfile component
  return (
    <div className="bg-white d-flex ">
      <div className='p-0 position-relative col-md-4'>
        {/* Sidebar component for navigation */}
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
            {/* Display user display name and provide options to follow */}
            <h4 className="d-flex justify-content-between">
              <b>{user.displayName}</b>
              <div className="">
                <Link className="btn-secondary btn m-1 mt-0 mb-0">
                  Follow
                </Link>
              </div>
            </h4>
            {/* Display user email */}
            <p className="text-dark">
              <b>{user.email}</b>
            </p>
          </div>
        </div>

        {/* Section displaying user's posts */}
        <center className="mt-5">
          <b>User Posts</b>
        </center>
        <hr className="w-100" />
        <div className="container-fluid text-center">
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            {/* Render user's posts in a grid */}
            {userPosts.map((post) => (
              <div className="col" key={post.id}>
                <div className="p-3">
                  {/* Display user post images */}
                  <img src={post.imageUrl} alt="" width="200px" height="200px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
