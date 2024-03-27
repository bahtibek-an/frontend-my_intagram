import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../context/Firebase/firebase";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css"

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userRef = doc(firestore, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();

          setFollowersCount(userData.followers ? userData.followers.length : 0);

          setFollowingCount(userData.following ? userData.following.length : 0);
        }

        const postsQuery = query(
          collection(firestore, "Posts"),
          where("userId", "==", currentUser.uid)
        );
        const unsubscribePosts = onSnapshot(postsQuery, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setPosts(data);
          setPostsCount(data.length);
          setLoading(false);
        });

        return () => unsubscribePosts();
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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
    <div className="profile">
      <div className='sidebar-profile'>
        <Sidebar />
      </div>
      <div className="posts-profile">
        <div className="profile-user">
          <div className="user">
            <img
              src={currentUser.photoURL}
              className="user-img"
            />
            <div className="user-info">
              <h4 className="user-info-1">
                <b>{currentUser.displayName}</b>
                <div className="profile-edit">
                  <Link to="/edit" className="EditProfile-button">
                    Edit Profile
                  </Link>

                  <Link onClick={handleLogout} className="signOut-button">
                    Sign out
                  </Link>
                </div>
              </h4>
              <p className="user-info-2">
                <p>{postsCount} {postsCount === 1 ? "post" : "posts"}</p>  <p>{followersCount} {followersCount === 1 ? "follower" : "followers"}</p> <p> {followingCount} following </p>
              </p>
            </div>
          </div>
        </div>

        <center>
          <b>Posts</b>
        </center>
        <div className="profile-post-container">
          {loading ? (
            <p className="loading-message">Loading...</p>
          ) : (
            chunkPosts(posts, 3).map((row, rowIndex) => (
              <div className="post-container" key={rowIndex}>
                {row.map((post) => (
                  <div className="post-item" key={post.id}>
                    <div className="post-image" style={{ backgroundImage: `url(${post.imageUrl})` }} />
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
