/** @format */

import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../Api/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
const Likes = ({ likes, id }) => {
  const [user, setUser] = useState();
  const likesRef =  doc(firestore, "Articles", id);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          // console.log("unliked");
        })
        .catch((e) => {
          // console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
  
        })
        .catch((e) => {
          // console.log(e);
        });
    }
  };
  return (
    <div>
      <i
        className={`fa fa-heart${
          !likes?.includes(user?.uid) ? "-o" : ""
        } fa-lg`}
        style={{
          cursor: "pointer",
          color: likes?.includes(user?.uid) ? "red" : null,
        }}
        onClick={handleLike}
      />

      <span style={{ marginLeft: "10px" }}>{likes?.length}</span>
    </div>
  );
};

export default Likes;
