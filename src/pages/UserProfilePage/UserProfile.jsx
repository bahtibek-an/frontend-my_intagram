// import React, { useContext, useEffect, useState } from "react";
// import SidePanel from "../SidebarComponent/Sidebar";
// import {
//   arrayRemove,
//   arrayUnion,
//   collection,
//   doc,
//   getFirestore,
//   onSnapshot,
//   query,
//   updateDoc,
//   where,
// } from "firebase/firestore";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../../components/AuthContext";
// import { MinusIcon, AddIcon } from "@chakra-ui/icons";
// import {
//   Box as Container,
//   Button,
//   Flex,
//   Image,
//   Stack,
//   Text,
//   Box,
// } from "@chakra-ui/react";

// const UserProfile = () => {
//   const { userId } = useParams();
//   const [profile, setProfile] = useState({});
//   const [userPosts, setUserPosts] = useState([]);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followersCount, setFollowersCount] = useState(0);
//   const [followingCount, setFollowingCount] = useState(0);
//   const [postsCount, setPostsCount] = useState(0);
//   const firestore = getFirestore();
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const profileRef = doc(firestore, "Users", userId);
//       const unsubscribeProfile = onSnapshot(profileRef, (profileDoc) => {
//         if (profileDoc.exists()) {
//           const profileData = profileDoc.data();
//           setProfile(profileData);
//           setFollowersCount(
//             profileData.followers ? profileData.followers.length : 0
//           );
//           setIsFollowing(
//             currentUser &&
//               profileData.followers &&
//               profileData.followers.includes(currentUser.uid)
//           );
//           setFollowingCount(
//             profileData.following ? profileData.following.length : 0
//           );

//           const userPostsRef = collection(firestore, "Posts");
//           const userPostsQuery = query(
//             userPostsRef,
//             where("user_id", "==", userId)
//           );

//           const unsubscribePosts = onSnapshot(
//             userPostsQuery,
//             (userPostsSnapshot) => {
//               const postsData = userPostsSnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//               }));
//               setUserPosts(postsData);
//               setPostsCount(postsData.length);
//             }
//           );

//           return () => {
//             unsubscribePosts();
//           };
//         }
//       });

//       return () => {
//         unsubscribeProfile();
//       };
//     };

//     fetchUserProfile();
//   }, [userId, currentUser?.uid, firestore]);

//   const handleFollowClick = async () => {
//     try {
//       if (!currentUser) return;

//       const followingUserRef = doc(firestore, "Users", currentUser.uid);
//       const profileRef = doc(firestore, "Users", userId);

//       await updateDoc(profileRef, {
//         followers: arrayUnion(currentUser.uid),
//       });

//       await updateDoc(followingUserRef, {
//         following: arrayUnion(userId),
//       });

//       setIsFollowing(true);
//     } catch (error) {
//       console.error("Error following user:", error);
//     }
//   };

//   const handleUnfollowClick = async () => {
//     try {
//       if (!currentUser) return;

//       const followingUserRef = doc(firestore, "Users", currentUser.uid);
//       const profileRef = doc(firestore, "Users", userId);

//       await updateDoc(profileRef, {
//         followers: arrayRemove(currentUser.uid),
//       });

//       await updateDoc(followingUserRef, {
//         following: arrayRemove(userId),
//       });

//       setIsFollowing(false);
//     } catch (error) {
//       console.error("Error unfollowing user:", error);
//     }
//   };

//   return (
//     <Flex height="100vh" overflow="hidden">
//       <SidePanel />
//       <Flex flexDirection="column" flex="1" bg="gray.100">
//         <Container width="full" p="8" mx="auto" my="4">
//           <Flex align="center" justify="space-between" p="4">
//             <Flex align="center" width="full">
//               <Image
//                 src={profile.photo}
//                 alt={`avatar`}
//                 boxSize="20"
//                 mr="4"
//                 borderRadius="full"
//               />
//               <Box width="96">
//                 <Flex
//                   justify="space-between"
//                   align="center"
//                   text="xl"
//                   fontWeight="semibold"
//                 >
//                   <Text>{profile.name}</Text>
//                   <Button
//                     onClick={
//                       isFollowing ? handleUnfollowClick : handleFollowClick
//                     }
//                   >
//                     {isFollowing ? (
//                       <Stack
//                         direction="row"
//                         spacing={1}
//                         alignItems="center"
//                         color="red"
//                       >
//                         <MinusIcon />
//                         <Text>Unfollow</Text>
//                       </Stack>
//                     ) : (
//                       <Stack
//                         direction="row"
//                         spacing={1}
//                         alignItems="center"
//                         color="blue"
//                       >
//                         <AddIcon />
//                         <Text>Follow</Text>
//                       </Stack>
//                     )}
//                   </Button>
//                 </Flex>
//                 <Flex justify="space-around" mt="2" color="gray.600">
//                   <Text>{postsCount} posts</Text>
//                   <Text>{followersCount} followers</Text>
//                   <Text>{followingCount} following</Text>
//                 </Flex>
//               </Box>
//             </Flex>
//           </Flex>

//           <Box overflowY="auto" maxH="calc(100vh - 4rem)" width="full" mt="5">
//             <Stack direction="row" spacing="2">
//               {userPosts.map((post) => (
//                 <Image
//                   key={post.id}
//                   src={post.imageUrl}
//                   alt="Post"
//                   objectFit="cover"
//                   boxSize="52"
//                   borderRadius="md"
//                 />
//               ))}
//             </Stack>
//           </Box>
//         </Container>
//       </Flex>
//     </Flex>
//   );
// };

// export default UserProfile;
