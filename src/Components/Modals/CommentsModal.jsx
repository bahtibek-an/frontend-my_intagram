/* eslint-disable array-callback-return */
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef, useState } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const emoji = [
    {
      emoj:"👍",
    },
    {
      emoj:"😉",
    },
    {
      emoj:"😀",
    },
    {
      emoj:"😠",
    },
    {
      emoj:"😢",
    },
    {
      emoj:"😋",
    },
    {
      emoj:"🤣",
    },
    {
      emoj:"😲",
    },
    {
      emoj:"😳",
    },
    {
      emoj:"😊",
    },
    {
      emoj:"😞",
    },
    {
      emoj:"🤔",
    },
  ];
  const { handlePostComment, isCommenting } = usePostComment();
  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);
  const [setedEmoji,SetsetedEmoji] = useState("");
  const handleSubmitComment = async (e) => {
    // do not refresh the page, prevent it
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  };
  const [value,setValue] = useState("");
  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  const handleEmojiClick = (selectedEmoji) => {
    SetsetedEmoji(selectedEmoji);
    setValue((prevValue) => prevValue + selectedEmoji);
  };

  // const backspace = (event) => {
  //   if(event.key === 'Backspace'){
  //     console.log("clicked backspace");
  //     let str = value;
  //     setValue(str.slice(0,-1));
  //   }
  // }
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
          <div className="emoji-wrape" style={{display:"flex", padding:'15px', gap:'5px'}}>
              {emoji.map((item,index) => 
                <div className="emoji" key={index}>
                    <span style={{cursor:'pointer'}} onClick={() => handleEmojiClick(item.emoj)}>{item.emoj}</span>
                </div>
              )}
          </div>
          {/* {console.log(commentRef)} */}
            <Input placeholder="Comment" size={"sm"} ref={commentRef} onChange={(e) => setValue(e.target.value)} value={value}/>
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;

// COPY AND PASTE AS THE STARTER CODE FOR THE COMMENTS MODAL COMPONENT
// import {
// 	Button,
// 	Flex,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalHeader,
// 	ModalOverlay,
// } from "@chakra-ui/react";

// const CommentsModal = ({ isOpen, onClose }) => {
// 	return (
// 		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
// 			<ModalOverlay />
// 			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
// 				<ModalHeader>Comments</ModalHeader>
// 				<ModalCloseButton />
// 				<ModalBody pb={6}>
// 					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}></Flex>
// 					<form style={{ marginTop: "2rem" }}>
// 						<Input placeholder='Comment' size={"sm"} />
// 						<Flex w={"full"} justifyContent={"flex-end"}>
// 							<Button type='submit' ml={"auto"} size={"sm"} my={4}>
// 								Post
// 							</Button>
// 						</Flex>
// 					</form>
// 				</ModalBody>
// 			</ModalContent>
// 		</Modal>
// 	);
// };

// export default CommentsModal;
