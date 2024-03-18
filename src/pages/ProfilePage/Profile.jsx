import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import Sidebar from "../SidebarComponent/Sidebar";
import { Avatar, Button, Flex, Text, Spacer, Box } from "@chakra-ui/react";
import { Edit as EditIcon } from "@mui/icons-material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { HamburgerIcon } from "@chakra-ui/icons";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [dbInstance, setDbInstance] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser || !dbInstance || !currentUser.uid) return;

      const userRef = collection(dbInstance, "Users");
      const userQuery = query(userRef, where("uid", "==", currentUser.uid));

      const unsubscribeUser = onSnapshot(userQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setDisplayName(userData.displayName);
          setFollowersCount(userData.followers ? userData.followers.length : 0);
          setFollowingCount(userData.following ? userData.following.length : 0);
        });
      });

      const userPostsRef = collection(dbInstance, "Posts");
      const userPostsQuery = query(
        userPostsRef,
        where("userUID", "==", currentUser.uid)
      );

      const postsUnsubscribe = onSnapshot(
        userPostsQuery,
        (userPostsSnapshot) => {
          const postsData = userPostsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserPosts(postsData);
          setPostsCount(postsData.length);
        }
      );

      return () => {
        unsubscribeUser();
        postsUnsubscribe();
      };
    };

    fetchUserData();
  }, [currentUser, dbInstance]);

  useEffect(() => {
    setDbInstance(db);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Flex bg="gray.700" color={"white"} minHeight="100vh">
      <Sidebar />
      <Flex flexDir="column" flex="1" alignItems="center" pl="64px" ml="200px">
        <Flex p="10" mx="auto" my="6" flexDir="column" alignItems="center">
          {currentUser && (
            <>
              <Flex
                w="full"
                marginLeft={"-600"}
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex alignItems="center" marginBottom={"-5"}>
                  <Avatar
                    src={currentUser.photoURL || ""}
                    alt="avatar"
                    w="24"
                    h="24"
                    mr="4"
                  />

                  <Flex flexDir="column">
                    <Flex alignItems="center">
                      <Text fontSize="xl" fontWeight="semibold" mr="2">
                        {displayName}
                      </Text>
                      <Link to="/edit">
                        <Button
                          size="sm"
                          bg={"gray.200"}
                          marginLeft={"40"}
                          _hover={{ bg: "gray.500" }}
                        >
                          <EditIcon />
                          Edit Profile
                        </Button>
                      </Link>
                    </Flex>
                    <Text marginTop="4" marginBottom="2">
                      {postsCount} posts
                      <Spacer as="span" mx="1" />
                      {followersCount} followers <Spacer as="span" mx="1" />
                      {followingCount} following
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
        <Box w="90%" borderTop={"1px"} borderColor={"gray.500"} />
        <HamburgerIcon margin={"2"} />
        <Flex
          marginTop={"-3"}
          flexWrap="wrap"
          justifyContent="center"
          maxWidth="1000px"
          mx="auto"
          px="4"
          gap="4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {userPosts.map((post, index) => (
            <Box
              key={post.id}
              height="300px"
              marginTop={"3"}
              className="post-image-container"
            >
              <img
                src={post.imageUrl}
                alt="Post"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "fallback_image_url";
                }}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
