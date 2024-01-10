import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import Post from "../components/Post";
import Navbar from "../components/Navbar"
import Story from "../components/Story";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const firestore = getFirestore();


  useEffect(() => {
    const unsubscribePosts = onSnapshot(
      collection(firestore, "Posts"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
      }
    );

    const usersQuery = query(
      collection(firestore, "users"),
      orderBy("createdAt"),
      limit(10)
    );

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    });

    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, []);
  return (
    <>
      <div className="home">
        <div className='nav'>
          <Navbar />
        </div>
        <div className="posts">
          <div className="components">
            <Story />
            {posts.map((post) => (
              <Post key={post.id} post={post} currentUserID={currentUser.uid} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;