import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Text,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import {
  Favorite,
  FavoriteBorder,
  DeleteOutline,
  InsertEmoticon,
  Send,
} from "@mui/icons-material";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../components/AuthContext";
import CommentModal from "./CommentModal";
import { ChatIcon } from "@chakra-ui/icons";
import EmojiPicker from "emoji-picker-react";

const Post = ({
  id,
  userUID,
  username,
  avatarUrl,
  imageUrl,
  likes,
  caption,
  comments: initialComments,
}) => {
  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [unlike, setUnlike] = useState(
    !Array.isArray(likes) || !likes.includes(currentUser?.uid)
  );
  const [user, setUser] = useState({});
  const uid = userUID;
  const [isFollowing, setIsFollowing] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState(initialComments ?? []);

  useEffect(() => {
    if (!uid) return;

    const userRef = doc(db, "Users", uid);
    const unsubscribe = onSnapshot(userRef, (userDoc) => {
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser(userData);
        setIsFollowing(userData.followers?.includes(currentUser?.uid) || false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.uid, db, uid]);

  useEffect(() => {
    if (!username && uid) {
      const fetchUsername = async () => {
        const userRef = doc(db, "Users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(userData);
        }
      };
      fetchUsername();
    }
  }, [username, uid]);

  const handleLikeClick = async () => {
    const postRef = doc(db, "Posts", id);
    try {
      if (unlike) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser?.uid),
        });
        setLikeCount((prevCount) => prevCount + 1);
        setUnlike(false);
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser?.uid),
        });
        setLikeCount((prevCount) => prevCount - 1);
        setUnlike(true);
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const handleDeleteClick = async () => {
    const postRef = doc(db, "Posts", id);
    try {
      await deleteDoc(postRef);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleFollowClick = async () => {
    try {
      if (currentUser) {
        const followingUserRef = doc(db, "Users", currentUser.uid);
        const userToFollowRef = doc(db, "Users", userUID);

        await updateDoc(userToFollowRef, {
          followers: arrayUnion(currentUser.uid),
        });

        await updateDoc(followingUserRef, {
          following: arrayUnion(userUID),
        });

        setIsFollowing(true);
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollowClick = async () => {
    try {
      if (currentUser) {
        const followingUserRef = doc(db, "Users", currentUser.uid);
        const userToUnfollowRef = doc(db, "Users", userUID);

        await updateDoc(userToUnfollowRef, {
          followers: arrayRemove(currentUser.uid),
        });

        await updateDoc(followingUserRef, {
          following: arrayRemove(userUID),
        });

        setIsFollowing(false);
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handlePostComment = async () => {
    const postRef = doc(db, "Posts", id);
    const commentText = newComment.toString().trim();

    if (!commentText) {
      console.error("Empty comments cannot be posted");
      return;
    }

    try {
      const commentData = {
        text: commentText,
        username: currentUser?.displayName, // Include username with the comment
      };
      setNewComment("");
      await updateDoc(postRef, {
        comments: arrayUnion(commentData),
      });
      updateComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const updateComments = async () => {
    const postRef = doc(db, "Posts", id);
    const postSnapshot = await getDoc(postRef);
    const updatedComments = postSnapshot.data().comments;
    setComments(updatedComments);
  };

  const updateUsernameInPosts = async (newUsername) => {
    try {
      const postRef = doc(db, "Posts", id);
      await updateDoc(postRef, {
        username: newUsername,
      });
    } catch (error) {
      console.error("Error updating username in posts:", error);
    }
  };

  const displayUsername = username || (user && user.displayName) || "Anonymous";

  const handleEmojiClick = (emojiObject, event) => {
    if (emojiObject && emojiObject.hasOwnProperty("emoji")) {
      const emoji = emojiObject.emoji;
      setNewComment((prev) => prev + emoji);
    } else {
      console.error("Invalid emojiObject:", emojiObject);
    }
  };

  return (
    <Box
      width="100%"
      maxWidth="lg"
      mx="auto"
      my="3"
      overflow="hidden"
      bg="white"
      border="1px"
      borderColor="gray.300"
      rounded="md"
      boxShadow="md"
    >
      <Box
        p="3"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Avatar src={avatarUrl} alt={`${displayUsername} avatar`} mr="2" />
          <Text fontWeight="semibold">{displayUsername}</Text>
        </Box>
        <Box>
          {currentUser?.uid !== userUID &&
            (isFollowing ? (
              <Button
                bg={"white"}
                _hover={{ bg: "white" }}
                color={"blue.500"}
                onClick={handleUnfollowClick}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                bg={"white"}
                _hover={{ bg: "white" }}
                color={"blue.500"}
                onClick={handleFollowClick}
              >
                Follow
              </Button>
            ))}
        </Box>
      </Box>
      <Image
        objectFit="cover"
        src={imageUrl}
        alt="Post"
        boxSize="100%"
        height="408px"
        border={"none"}
        borderRadius={"5"}
      />
      <Box
        p="3"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" spaceX="4">
          <IconButton
            bg={"white"}
            _hover={{ bg: "white" }}
            color={"gray.700"}
            onClick={handleLikeClick}
          >
            {unlike ? <FavoriteBorder /> : <Favorite />}
          </IconButton>
          <IconButton
            bg={"white"}
            _hover={{ bg: "white" }}
            color="gray.700"
            onClick={() => setShowCommentModal(true)}
          >
            <ChatIcon w={"20px"} h={"18.35px"} />
          </IconButton>
        </Box>
        <Box>
          {currentUser?.uid === userUID && (
            <IconButton
              _hover={{ bg: "white" }}
              bg={"white"}
              onClick={handleDeleteClick}
            >
              <DeleteOutline />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box p="3" marginTop={"-6"}>
        <Text fontWeight="semibold">{likeCount} mark "Like"</Text>
      </Box>

      {showEmojis && (
        <Box p="4" display="flex" justifyContent="center" spaceX="2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </Box>
      )}
      <Box marginLeft={"3"} marginTop={"-2"} marginBottom={"-2"}>
        {comments.length > 0 && (
          <Box key={comments.length - 1} mb={2}>
            <Text>
              <Text fontWeight="bold" display="inline">
                {comments[comments.length - 1].username || displayUsername}
              </Text>
              <Text marginLeft={"2"} display="inline">
                {comments[comments.length - 1].text}
              </Text>
            </Text>
          </Box>
        )}
      </Box>
      <Box display="flex" alignItems="center" p="2">
        <IconButton
          bg={"white"}
          _hover={{ bg: "white" }}
          mr="2"
          onClick={() => setShowEmojis(!showEmojis)}
        >
          <InsertEmoticon />
        </IconButton>
        <InputGroup flex="1">
          <Input
            borderBottom="1px"
            borderColor={"gray.300"}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <InputRightElement width="auto"></InputRightElement>
          <IconButton
            bg={"white"}
            marginLeft={"2"}
            _hover={{ bg: "white" }}
            onClick={handlePostComment}
          >
            <Send />
          </IconButton>
        </InputGroup>
      </Box>
      <CommentModal
        isOpen={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        postId={id}
        comments={comments}
        onSubmitComment={handlePostComment}
        onUpdateComments={updateComments}
      />
    </Box>
  );
};

export default Post;
