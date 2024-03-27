import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./UserProfile.css"

const UserProfile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const userRef = doc(db, "users", uid);

    const unsubscribe = onSnapshot(userRef, (userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        setFollowersCount(userData.followers ? userData.followers.length : 0);
        setIsFollowing(userData.followers?.includes(currentUser?.uid) || false);
        setFollowingCount(userData.following ? userData.following.length : 0);

        const userPostsRef = collection(db, "Posts");
        const userPostsQuery = query(userPostsRef, where("userId", "==", uid));

        const postsUnsubscribe = onSnapshot(userPostsQuery, (userPostsSnapshot) => {
          const postsData = userPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setUserPosts(postsData);
          setPostsCount(postsData.length);
          setLoading(false);
        });

        return () => {
          postsUnsubscribe();
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, [uid, currentUser?.uid, db]);

  const handleFollowClick = async () => {
    try {
      if (currentUser) {
        const followingUser = doc(db, "users", currentUser.uid);
        const userRef = doc(db, "users", uid);

        await updateDoc(userRef, {
          followers: arrayUnion(currentUser.uid),
        });

        await updateDoc(followingUser, {
          following: arrayUnion(uid),
        });

        setIsFollowing(true);
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollowClick = async () => {
    try {
      if (currentUser) {
        const followingUser = doc(db, "users", currentUser.uid);
        const userRef = doc(db, "users", uid);

        await updateDoc(userRef, {
          followers: arrayRemove(currentUser.uid),
        });

        await updateDoc(followingUser, {
          following: arrayRemove(uid),
        });

        setIsFollowing(false);
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
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
            src={user.photoURL}
            className="user-img"
          />
          <div className="user-info">
            <h4 className="user-info-1">
              <b>{user.displayName}</b>
              <div className="profile-edit">
              {currentUser ? (
                    isFollowing ? (
                      <button className="Unfollow-button" onClick={handleUnfollowClick}>
                        Unfollow
                      </button>
                    ) : (
                      <button className="Follow-button" onClick={handleFollowClick}>
                        Follow
                      </button>
                    )
                  ) : (
                    <span>Login to follow</span>
                  )}
              </div>
            </h4>
            <p className="user-info-2">
              <p>{postsCount} {postsCount === 1 ? "post" : "posts"}</p>  <p>{followersCount} {followersCount === 1 ? "follower" : "followers"}</p> <p> {followingCount} following </p>
            </p>
          </div>
        </div>
      </div>

      <center className="mt-5">
        <b>Posts</b>
      </center>
      <div className="profile-post-container">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          chunkPosts(userPosts, 3).map((row, rowIndex) => (
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
    // <div className="bg-white d-flex">
    //   <div className="p-0 position-relative w-25">
    //     <Sidebar />
    //   </div>
    //   <div className="w-75">
    //     <div className="p-0 w-100 bg-white overflow-auto none-scroll">
    //       <div className="d-flex">
    //         <div className="col-md-2 p-5">
    //           <img
    //             src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
    //             alt=""
    //             width="100px"
    //           />
    //         </div>
    //         <div className="col-md-8 p-5">
    //           <h4 className="d-flex justify-content-between">
    //             <b>{user.displayName}</b>
    //             <div className="">
    //               
    //             </div>
    //           </h4>
    //           <p className="text-dark fw-bold">
    //             {followersCount} {followersCount === 1 ? "follower" : "followers"} | {postsCount} {postsCount === 1 ? "post" : "posts"}
    //             |{followingCount} {followingCount === 1 ? "following" : "following"}
    //           </p>
    //         </div>
    //       </div>

    //       <center className="mt-5">
    //         <b>User Posts</b>
    //       </center>
    //       <hr className="w-100" />
    //       <div className="container-fluid text-center">
    //         <div className="row row-cols-2 mb-3 p-5 row-cols-lg-5 g-2 g-lg-3">
    //           {userPosts.map((post) => (
    //             <div key={post.id} className="col">
    //               <img
    //                 src={post.imageUrl}
    //                 alt={`Post by ${user.displayName}`}
    //                 style={{ width: "270px", height: "260px", border: "1px solid black", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    //               />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserProfile;
