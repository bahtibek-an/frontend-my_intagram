import React, { useEffect, useState, useContext } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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

    fetchRandomUsers();
  }, [currentUser, firestore]);


  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleFollowToggle = async (user) => {
    if (followedUsers.includes(user)) {

      const updatedFollowedUsers = followedUsers.filter((user) => user !== user);
      setFollowedUsers(updatedFollowedUsers);

    } else {
      const updatedFollowedUsers = [...followedUsers, user];
      setFollowedUsers(updatedFollowedUsers);
    }
  };

  return (
    <div>
      <ul>
        <div className="w-100 h-100 m-1 d-flex justify-content-start align-items-center">
          <img
            src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
            alt=""
            width="50px"
          />
          <h6 className="m-3">
            <b>{currentUser.displayName}</b>
          </h6>
          <Link to={`/profile/`} className="btn btn-secondary" style={{ borderRadius: "10px" }}>
            Profile
          </Link>
        </div>
        <hr />
        {users.map((user) => (
          <div key={user.uid} className="w-100 h-100 m-1 d-flex justify-content-start align-items-center">
            <img
              src="https://pic.rutubelist.ru/user/ff/53/ff531a32bd216cd873562b0c16d6a266.jpg"
              alt=""
              width="50px"
            />
            <h6 className="m-3">
              <Link to={`/profile/${user.uid}`}>{user.displayName}</Link>
            </h6>
            <button
              className="btn btn-primary"
              style={{ borderRadius: "10px" }}
              onClick={() => handleFollowToggle(user)}
            >
              {followedUsers.includes(user) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Users;
