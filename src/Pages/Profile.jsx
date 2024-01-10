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
import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar"
import { auth } from "../firebase";

const UserProfile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
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

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);

    }
  };


  return (
    <>
      <Navbar />
      <header>
        <div class="container">
          <div class="profile">
            <div class="profile-image">
              <img src={user.photoURL} alt="" />
            </div>
            <div class="profile-user-settings">
              <h1 class="profile-user-name">{user.displayName}</h1>
              {currentUser.uid != user.uid ? (
                isFollowing ? (
                  <button className="unfollow-btn" onClick={handleUnfollowClick}>
                    Unfollow
                  </button>
                ) : (
                  <button className="follow-btn" onClick={handleFollowClick}>
                    Follow
                  </button>
                )
              ) : (
                <>
                  <Link class="btn profile-edit-btn" to={'/edit'}>Edit Profile</Link>
                  <Link class="btn profile-settings-btn" onClick={handleLogout} aria-label="profile settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#f00" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                      <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
            <div class="profile-stats">
              <ul>
                <li><span class="profile-stat-count">{postsCount}</span> posts</li>
                <li><span class="profile-stat-count">{followersCount}</span> followers</li>
                <li><span class="profile-stat-count">{followingCount}</span> following</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div class="container">
          <div class="gallery">
            {userPosts.map((post) => (
              <>
                <div class="gallery-item" key={post.id} tabindex="0">
                  <img src={post.imageUrl} class="gallery-image" alt="" />
                  <div class="gallery-item-info">
                    <ul>
                      <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="bi bi-heart-fill"></i> {post.likes?.length || 0}</li>
                      <li class="gallery-item-comments"><span class="visually-hidden">Comments:</span><i class="bi bi-chat-left-fill"></i> {post.comments?.length || 0}</li>
                    </ul>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default UserProfile;