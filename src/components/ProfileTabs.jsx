// import { Box, Flex, Text } from "@chakra-ui/react";
// import { MdGridOn } from "react-icons/md";
// // import { FaBookmark } from "react-icons/fa";
// // import { GrLike } from "react-icons/gr";


// // must change the tags
// const ProfileTabs = () => {
//   return (
//     <Flex
//       w={"full"}
//       justifyContent={"center"}
//       gap={{ base: 4, sm: 10 }}
//       textTransform={"uppercase"}
//       fontWeight={"bold"}
//     >
//       <Flex
//         borderTop={"1px solid white"}
//         alignItems={"center"}
//         p={3}
//         gap={1}
//         cursor={"pointer"}
//       >
//         <Box fontSize={20}>
//           <MdGridOn />
//         </Box>
//         <Text fontSize={12} display={{base:'none',sm:'block'}}>Posts</Text>
//       </Flex>
//     </Flex> 
//   );
// };

// export default ProfileTabs;




import { MdGridOn } from "react-icons/md";

const ProfileTabs = () => {
  return (
    <div className="flex w-full justify-center gap-4 sm:gap-10 uppercase font-bold">
      <div className="flex border-t border-white items-center p-3 gap-1 cursor-pointer">
        <div className="text-2xl">
          <MdGridOn />
        </div>
        <span className="text-sm hidden sm:block">Posts</span>
      </div>
    </div>
  );
};

export default ProfileTabs;

