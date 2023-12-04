import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Comment = ({ post }) => {
  const timePost = {
    ...post.createAt,
  };
  let timeString = moment(timePost.seconds * 1000).fromNow();
  if (moment().diff(moment(timePost.seconds * 1000), "days") > 7) {
    timeString = moment(post.createAt.seconds * 1000).format(
      "DD/MM/YYYY HH:mm:ss"
    );
  }
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUser() {
      const docRef = doc(db, "users", post.userId);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    }
    fetchUser();
  }, [post.userId]);

  return (
    <div className=" flex flex-wrap items-center w-auto mb-3">
      <img
        src={
          user.avatar ||
          "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
        }
        alt=""
        className="object-cover rounded-full w-7 h-7"
      />
      <p className="px-2 font-bold">{post.commentNameUser} : </p>
      <p className="w-auto break-all">{post.commentPost}</p>{" "}
      <p className="mb-2 ml-2 text-xs text-gray-500">{timeString}</p>
    </div>
  );
};

export default Comment;
