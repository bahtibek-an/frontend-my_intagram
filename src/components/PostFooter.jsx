// import {
//   Box,
//   Button,
//   Flex,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Text,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useRef, useState } from "react";
// import { FcLike } from "react-icons/fc";
// import { FaRegHeart } from "react-icons/fa6";
// import { CommentLogo } from "../assets/constant";
// import usePostComment from "../hooks/usePostComment";
// import useAuthStore from "../store/authStore";
// import useLikePost from "../hooks/useLikePost";
// import { timeAgo } from "../utils/timeago";
// import CommentModal from "./CommentModal";

// const PostFooter = ({ post, username, isProfilePage, creator }) => {
//   const { isCommenting, handlePostComment } = usePostComment();
//   const [comment, setComment] = useState("");
//   const authUser = useAuthStore((state) => state.user);
//   const commentRef = useRef(null);
//   const { handleLikePost, isLiked, likes } = useLikePost(post);
//   const {isOpen,onClose,onOpen} = useDisclosure()

//   const handleSubmitComment = async () => {
//     await handlePostComment(post.id, comment);
//     setComment("");
//   };

//   return (
//     <Box mb={10} marginTop={"auto"}>
//       <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
//         <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
//           {!isLiked ? <FaRegHeart size={25} /> : <FcLike size={25} />}
//         </Box>
//         <Box
//           cursor={"pointer"}
//           fontSize={18}
//           onClick={() => commentRef.current.focus()}
//         >
//           <CommentLogo />
//         </Box>
//       </Flex>
//       <Text fontWeight={600} fontSize={"sm"}>
//         {likes} likes
//       </Text>
//       {isProfilePage && (
//         <Text fontSize={"12"} color={"gray"}>
//           Posted {timeAgo(post.createdAt)}
//         </Text>
//       )}
//       {!isProfilePage && (
//         <>
//           <Text fontSize="sm" fontWeight={700}>
//             {creator?.username}{" "}
//             <Text as="span" fontWeight={400}>
//               {post.caption}
//             </Text>
//           </Text>
//           {post.comments.length > 0 && (
//             <Text fontSize="sm" color={"gray"} cursor={"pointer"} onClick={onOpen}>
//               View all {post.comments.length} comments
//             </Text>
//           )}
//           {isOpen ? <CommentModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
//         </>
//       )}
//       {authUser && (
//         <Flex
//           alignItems={"center"}
//           gap={2}
//           justifyContent={"space-between"}
//           w={"full"}
//         >
//           <InputGroup>
//             <Input
//               variant={"flushed"}
//               placeholder="Add a comment..."
//               fontSize={14}
//               onChange={(e) => setComment(e.target.value)}
//               value={comment}
//               ref={commentRef}
//             />
//             <InputRightElement>
//               <Button
//                 fontSize={14}
//                 color={"blue.500"}
//                 fontWeight={600}
//                 cursor={"pointer"}
//                 _hover={{ color: "white" }}
//                 bg={"transparent"}
//                 onClick={handleSubmitComment}
//                 isLoading={isCommenting}
//               >
//                 Post
//               </Button>
//             </InputRightElement>
//           </InputGroup>
//         </Flex>
//       )}
//     </Box>
//   );
// };

// export default PostFooter;



import { useState, useRef } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
// import { CommentLogo } from "../assets/constant";
import usePostComment from "../hooks/usePostComment";
import useAuthStore from "../store/authStore";
import useLikePost from "../hooks/useLikePost";
import { timeAgo } from "../utils/timeago";
import CommentModal from "./CommentModal";

// eslint-disable-next-line
const PostFooter = ({ post, username, isProfilePage, creator }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitComment = async () => {
    
    // eslint-disable-next-line
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <div className="mb-3 mt-auto">
      <div className="flex items-center gap-4 pt-0 mb-2 mt-2">
        <div onClick={handleLikePost} className="cursor-pointer text-2xl">
          {!isLiked ? <FaRegHeart /> : <FcLike />}
        </div>
        <div className="cursor-pointer text-2xl" onClick={() => commentRef.current.focus()}>
          {/* <CommentLogo /> */}



        </div>
      </div>
      <p className="font-semibold text-sm">{likes} likes</p>
      {isProfilePage && (
        // eslint-disable-next-line
        <p className="text-gray-500 text-xs">Posted {timeAgo(post.createdAt)}</p>
      )}
      {!isProfilePage && (
        <>
          <p className="font-semibold text-sm">
          {/* eslint-disable-next-line */}
            {creator?.username}{" "}
            {/* eslint-disable-next-line */}
            <span className="font-normal">{post.caption}</span>
          </p>
          {/* eslint-disable-next-line */}
          {post.comments.length > 0 && (
            <p className="text-gray-500 text-sm cursor-pointer" onClick={() => setIsModalOpen(true)}>
            {/* eslint-disable-next-line */}
              View all {post.comments.length} comments
            </p>
          )}
          {isModalOpen && <CommentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} post={post} />}
        </>
      )}
      {authUser && (
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Add a comment..."
              className="border-b border-gray-300 focus:outline-none"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
          </div>
          <button
            className="text-blue-700 font-semibold cursor-pointer hover:text-red bg-transparent"
            onClick={handleSubmitComment}
            disabled={isCommenting}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostFooter;
