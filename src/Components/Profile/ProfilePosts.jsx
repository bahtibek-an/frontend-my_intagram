import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();

  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPostsFound />;

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h="300px">contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found🤔</Text>
    </Flex>
  );
};

// import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import ProfilePost from "./ProfilePost";

// const ProfilePosts = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   }, []);
//   return (
//     <Grid
//       templateColumns={{
//         sm: "repeat(1,  1fr)",
//         md: "repeat(3,  1fr)",
//       }}
//       gap={1}
//       columnGap={1}
//     >
//       {isLoading &&
//         [0, 1, 2, 3, 4, 5].map((_, idx) => (
//           <VStack key={idx} alignItems={"flex-start"} gap={4}>
//             <Skeleton w={"full"}>
//               <Box h="300px">contents wrapped</Box>
//             </Skeleton>
//           </VStack>
//         ))}

//       {!isLoading && (
//         <>
//           <ProfilePost img="/myface.png" />
//           <ProfilePost img="/women.png" />
//           <ProfilePost img="/image.png" />
//           <ProfilePost img="/im.png" />
//         </>
//       )}
//     </Grid>
//   );
// };
// export default ProfilePosts;
