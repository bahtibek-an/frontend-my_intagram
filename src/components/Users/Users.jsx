import React, { useEffect, useState, useContext } from "react";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  getDoc
} from "firebase/firestore";
import { db } from "../../context/Firebase/firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const firestore = getFirestore();
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const fetchRandomUsers = async () => {
      try {
        const usersCollection = collection(firestore, "users");
        const querySnapshot = await getDocs(usersCollection);

        const usersData = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.uid !== currentUser.uid) {
            usersData.push({ uid: doc.id, ...userData });
          }
        });

        const shuffledUsers = shuffleArray(usersData);
        const randomUsers = shuffledUsers.slice(0, 6);

        setUsers(randomUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchFollowedUsers = async () => {
      try {
        if (currentUser) {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFollowedUsers(userData.following || []);
          }
        }
      } catch (error) {
        console.error("Error fetching followed users:", error);
      }
    };

    fetchRandomUsers();
    fetchFollowedUsers();
  }, [currentUser, firestore]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleFollowToggle = (user) => {
    if (followedUsers.includes(user.uid)) {
      const updatedFollowedUsers = followedUsers.filter((uid) => uid !== user.uid);
      setFollowedUsers(updatedFollowedUsers);
    } else {
      const updatedFollowedUsers = [...followedUsers, user.uid];
      setFollowedUsers(updatedFollowedUsers);
    }
  };

  const handleFollowClick = async (uid) => {
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
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollowClick = async (uid) => {
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
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="users-div-home">
      <div className="user-profile-home">
        <img
          src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
          alt=""
          className="profile-img"
        />
        <h6 className="">
          <b>{currentUser.displayName}</b>
        </h6>
        <Link to={`/profile/`} className="profile-page-link">
          Profile
        </Link>
      </div>
      <h5 className="for-you-text">Suggested for you</h5>
      <div className="users-profile-div-home">
        {users.map((user) => (
          <div key={user.uid} className="users-profile-home">
            <img
              src={user.photoURL}
              alt=""
              className="profile-img"
            />
            <h6 className="">
              <Link to={`/profile/${user.uid}`}>{user.displayName}</Link>
            </h6>
            {currentUser && (
              <button
                className="follow-btn-post"
                onClick={(e) => {
                  e.preventDefault();
                  handleFollowToggle(user);
                  if (followedUsers.includes(user.uid)) {
                    handleUnfollowClick(user.uid);
                  } else {
                    handleFollowClick(user.uid);
                  }
                }}
              >
                {followedUsers.includes(user.uid) ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
