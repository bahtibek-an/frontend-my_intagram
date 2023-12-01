import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";
import EmojiPicker from 'emoji-picker-react';

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addEmoji = (emojiObject) => {
    setComment((prevComment) => prevComment + emojiObject.emoji);
  };

  const handleSubmitComment = async () => {
    if (comment.length === 0) {
      return;
    }

    await handlePostComment(post.id, comment);
    setComment("");
    setShowEmojiPicker(false);
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Button
          cursor={"pointer"}
          fontSize={18}
          onClick={() => {
            commentRef.current.focus();
            setShowEmojiPicker(!showEmojiPicker);
          }}
        >
          <CommentLogo />
        </Button>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize='12' color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize='sm' fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as='span' fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
              View all {post.comments.length} comments
            </Text>
          )}
          {/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
          {isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />}
        </>
      )}

      {authUser && (
        <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
          <InputGroup position="relative">
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            {showEmojiPicker && (
              <EmojiPicker
                onEmojiClick={addEmoji}
                pickerStyle={{
                  position: "absolute",
                  top: commentRef.current.offsetTop + commentRef.current.offsetHeight + 5 + "px", // Adjust the offset as needed
                  right: "0",
                  zIndex: "1",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              />
            )}
            <InputRightElement>
              <Button
                fontSize={14}
                marginRight={"70px"}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
                isDisabled={comment.length === 0}
              >
                Post
              </Button>
            </InputRightElement>
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                zIndex={"0"}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😊
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;