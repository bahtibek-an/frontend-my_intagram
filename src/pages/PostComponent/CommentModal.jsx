import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Input,
} from "@chakra-ui/react";

const CommentModal = ({
  isOpen,
  onClose,
  postId,
  comments,
  onSubmitComment,
  onUpdateComments,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = async () => {
    await onSubmitComment(postId, newComment);
    setNewComment("");
    onClose();
    onUpdateComments();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {comments &&
            comments.map((comment, index) => (
              <Box key={index} mb={2}>
                <Text>
                  <Text fontWeight="bold" display="inline">
                    {comment.username}{" "}
                  </Text>
                  <Text display="inline">{comment.text}</Text>
                </Text>
              </Box>
            ))}
          <Input
            placeholder="Enter your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </ModalBody>
        <Box textAlign="right" p={2}>
          <Button colorScheme="blue" onClick={handleSubmitComment}>
            Submit
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
