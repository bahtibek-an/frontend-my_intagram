import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/AuthContext";
import { CameraAlt, CollectionsOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import Sidebar from "../SidebarComponent/Sidebar";
import { Textarea, Button, Flex, Box, Text, Input, Image } from "@chakra-ui/react";

const UploadPost = () => {
  const { currentUser } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [comment, setComment] = useState("");
  const storage = getStorage();
  const firestore = getFirestore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (imageFile) {
      try {
        const storageRef = ref(storage, `posts/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(firestore, "Posts"), {
              imageUrl: downloadURL,
              caption: comment,
              userUID: currentUser.uid,
              username: currentUser.displayName,
              avatarUrl: currentUser.photoURL,
              likes: 0,
              timestamp: serverTimestamp(),
            });

            setImageFile(null);
            setComment("");
            navigate("/");
          }
        );
      } catch (error) {
        console.error("Error during post creation:", error);
      }
    }
  };

  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />
      <Flex flexDir="column" flex="1" bg={"gray.700"} ml="64">
        <Box
          bg="gray.800"
          mx="auto"
          my="100"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.600"
          rounded="md"
          shadow="lg"
          w="500px"
        >
          <form onSubmit={handleSubmit}>
            <Flex
              flexDirection="column"
              p="8"
              spacing="5"
              display="flex"
            >
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Post caption..."
                p="3"
                borderWidth="1px"
                borderColor="gray.500"
                borderRadius="md"
                resize="none"
                color={"gray.300"}
                _focus={{ outline: "none" }}
              />

              <Flex
                align="center"
                justify="space-between"
                p="4"
                marginTop={"20px"}
                marginBottom={"-15px"}
              >
                <label htmlFor="image-upload" style={{ cursor: "pointer", color:'white'}} flex="1" color="white">
                  <CollectionsOutlined
                    sx={{ fontSize: 24, marginRight: 1, marginBottom: -0.4 }}
                  />
                  Upload Photo
                  <Input
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
                <Button
                  type="submit"
                  isLoading={loading}
                  bgColor={"gray.600"}
                  color={"white"}
                  rounded="full"
                  _hover={{ bg: "gray.700" }}
                  flexShrink="0"
                >
                  {loading ? "Posting..." : "Post"}
                </Button>
              </Flex>
            </Flex>
          </form>
          {/* {imageFile && (
            <Box>
              <Image src={URL.createObjectURL(imageFile)} alt="Uploaded image" />
            </Box>
          )} */}
        </Box>
      </Flex>
    </Flex>
  );
};

export default UploadPost;
