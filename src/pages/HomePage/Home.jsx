import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../SidebarComponent/Sidebar";
import Post from "../PostComponent/Post";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const firestore = getFirestore();

  useEffect(() => {
    if (currentUser) {
      const unsubscribePosts = onSnapshot(
        collection(firestore, "Posts"),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(data);
        }
      );

      return () => {
        unsubscribePosts();
      };
    }
  }, [firestore, currentUser]);

  const logout = async () => {
    auth.signOut();
  };

  if (!currentUser) {
    return <Navigate to="/signup" />;
  }

  return (
    <Flex  bg={'gray.700'} minHeight="100vh">
      <Sidebar />
      <Box flex="1">
        <Flex flexDir="column" p="4">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              userUID={post.userUID}
              username={post.username}
              avatarUrl={post.avatarUrl}
              likes={post.likes}
              caption={post.caption}
              imageUrl={post.imageUrl}
              comments={post.comments}
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
