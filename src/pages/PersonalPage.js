import Sidebar from "components/itemsHomePage/Sidebar";
import ImageItem from "components/personalIMG/ImageItem";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PersonalPage = () => {
  const { userInfo } = useAuth();
  const [params] = useSearchParams();
  const userName = params.get("userName");
  const [post, setPost] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const docRef = collection(db, "posts");
      const qs = query(docRef, where("PostNameId", "==", userName));
      onSnapshot(qs, (snapshot) => {
        const results = [];
        snapshot.forEach((item) => {
          results.push({
            id: item.id,
            ...item.data(),
          });
        });
        setPost(results);
      });
    }
    fetchData();
  }, [userName]);

  const [user, setUser] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    const qs = query(colRef, where("username", "==", userName));
    onSnapshot(qs, (snapshot) => {
      const results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      setUser(results);
    });
  }, [userName]);
  const navigate = useNavigate();
  return (
    <div className="per">
      <Sidebar></Sidebar>
      <div className="per-one"></div>
      <div className="per-two">
        {user.map((index) => (
          <div
            key={index.id}
            className="person-con"
          >
            <div className="per-three">
              <img
                src={
                  index.avatar ||
                  "https://w7.pngwing.com/pngs/86/421/png-transparent-computer-icons-user-profile-set-of-abstract-icon-miscellaneous-monochrome-computer-wallpaper.png"
                }
                alt=""
                className="per-avar"
              />
            </div>
            <div className="per-four ss:pl-20">
              {userInfo.email === index.email && (
                <div
                  onClick={() => navigate(`/Personal/EditUser?id=${index.id}`)}
                >
                  <p className="edit-pro">Editprofile</p>
                </div>
              )}
              <div className="per-txt">
                {index.status === 2 ? (
                  <p>
                    {index?.username || index.fullname}{" "}
                    <i></i>{" "}
                  </p>
                ) : (
                  <p className="per-name">
                    {index?.username || index.fullname}
                  </p>
                )}
              </div>
              <p>{post.length} Messages</p>
            </div>
          </div>
        ))}

        <div className="person-iten item-insta flex flex-wrap justify-center w-full h-auto mt-5 border-t-2 border-black sm:justify-start sm:w-4/5">
          {post.map((item) => (
            <ImageItem key={item.id} data={item}></ImageItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
