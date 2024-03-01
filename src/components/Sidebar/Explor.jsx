import {
    Box,
    Flex,
    Grid,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Tooltip,
    useDisclosure,
  } from "@chakra-ui/react";
  import useGetUserPosts from "../../hooks/useGetUserPosts";
  import ProfilePost from "../Profile/ProfilePost";
  
  const Explor = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoading, posts } = useGetUserPosts();
  
    return (
      <>
        <Tooltip
          hasArrow
          label={"Explor"}
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            alignItems={"center"}
            gap={4}
            _hover={{ boxShadow: "0 0 10px" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            onClick={onOpen}
            cursor="pointer"
          >
            <Image src="./img/exp.png" w={33} />
            <Box display={{ base: "none", md: "block" }}>Explor</Box>
          </Flex>
        </Tooltip>
  
        <Modal
          isCentered
          isOpen={isOpen}
          size={"xl"}
          onClose={onClose}
          motionPreset="slideInLeft"
        >
          <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
          <ModalContent
            bg={"transparent"}
            style={{ backdropFilter: "blur(20px)" }}
            border={"1px solid gray"}
            maxW={"1000px"}
          >
            <ModalHeader>Explor</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Box p={2} background={"transparent"} backdropFilter={"blur(5px)"}>
                <Grid
                  templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={1}
                  columnGap={1}
                >
                  {!isLoading ? (
                    <>
                      {posts.length > 0 ? (
                        posts.map((post) => (
                          <ProfilePost post={post} key={post.id} />
                        ))
                      ) : (
                        <Box  fontSize="lg">
                          No posts found
                        </Box>
                      )}
                    </>
                  ) : (
                    <Box >
                        <Spinner />
                    </Box>
                  )}
                </Grid>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Explor;