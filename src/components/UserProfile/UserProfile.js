import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../Api/firebase";

const UserProfile = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfileUser = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, "Users"),
      );

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.username === username) {
          setProfileUser(userData);
        }
      });
    };

    fetchProfileUser();
  }, [username]);

  const handleFollowToggle = () => {
    // Your follow/unfollow logic here
    // Example: update the following array in the current user's document
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Check if the profile user is already in the following list
      if (currentUser.following.includes(profileUser.id)) {
        setIsFollowing(false);
        // Remove the profile user from the following list
        // Update firestore accordingly
      } else {
        setIsFollowing(true);
        // Add the profile user to the following list
        // Update firestore accordingly
      }
    }
  };

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{profileUser.username}'s Profile</h1>
      <p>{profileUser.bio}</p>
      <button onClick={handleFollowToggle}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      {/* Display other profile details and posts as needed */}
    </div>
  );
};

export default UserProfile;
