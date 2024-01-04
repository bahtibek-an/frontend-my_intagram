/** @format */

import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../Api/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
const Likes = ({ likes, id }) => {
  const [user, setUser] = useState();
  const likesRef = doc(firestore, "Posts", id);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      // this is funtion
    });
  }, []);
  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      // this is funtion
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
          // this is funtion
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        });
    } else {
      // this is funtion
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {})
        .catch((e) => {
          // this is funtion
          alert(e);
        });
    }
  };
  return (
    <div>
      <i
        className={`fa fa-heart${
          !likes?.includes(user?.uid) ? "-o" : ""
          // this is good day
        } fa-lg`}
        style={{
          // this is good day
          cursor: "pointer",
          color: likes?.includes(user?.uid) ? "red" : null,
        }}
        onClick={handleLike}
        // this is good day
      />

      {/* this is good day */}
      <span style={{ marginLeft: "10px" }}>{likes?.length}</span>
    </div>
  );
};

export default Likes;
