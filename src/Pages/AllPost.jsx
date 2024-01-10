import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../Database/firebase";
import "../style.css";
import Sidebar from "../components/Sidebar";

function AllPost() {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const firestore = getFirestore();

  const fetchPosts = async () => {
    try {
      const postsQuery = query(collection(firestore, "posts"));
      const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentUser.uid, firestore]);

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const renderPosts = () => {
    return chunkArray(posts, 3).map((row, rowIndex) => (
      <div className="row mb-3 d-flex justify-content-between" key={rowIndex}>
        {row.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    ));
  };

  const PostItem = ({ post }) => (
    <div
      className="w-25 m-0 p-0 hoverPost"
      style={{
        backgroundImage: `url(${post.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p>
        <ion-icon name="heart"></ion-icon> {post.like}
      </p>
    </div>
  );

  return (
    <>
      <div className="bg-white d-flex">
        <div className="p-0 position-relative col-md-3">
          <Sidebar />
        </div>
        <div className="p-0 col-md-8 mt-5 bg-white overflow-auto none-scroll">
          {renderPosts()}
        </div>
      </div>
    </>
  );
}

export default AllPost;
