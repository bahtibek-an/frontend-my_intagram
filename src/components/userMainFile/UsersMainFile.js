import React, { useEffect, useState } from "react";
import { UserAddIcon, ChevronDownIcon, BookOpenIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { SelectProfile } from "../../Slice";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import "../userMainFile/UserMainFile.css"

function Profile() {
  const profile = useSelector(SelectProfile);
  const [posts, setPosts] = useState([]);
  const colRef = collection(db, "posts");
  const q = query(colRef, where("userId", "==", `${profile.userId}`));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs);
    });
  }, [q]);
  return (
    <div className="ProfileWrapper">
      <div className="HeaderWrap">
        <img src={profile.userProfile} alt="Profile_photo" />
        <div className="HeaderInfoWrap">
          <section>
            <h1>{profile.username}</h1>
            <div className="ButtonsContainer">
              <ChevronDownIcon className="Profile__BUtton" />
              <UserAddIcon className="Profile__BUtton" />
            </div>
          </section>
          <div className="StatisticsWrap">
            <p>
              <strong>{posts?.length}</strong> posts
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <BookOpenIcon style={{ height: 20 }} /> POSTS
      </div>
      <div className="Gallery">
        {posts?.map((post, index) => (
          <img src={post.data().image} alt="" key={index} />
        ))}
      </div>
    </div>
  );
}

export default Profile;