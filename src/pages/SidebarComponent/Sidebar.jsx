import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Create,
  Search,
  AccountCircle,
  AddCircleOutline,
  Logout,
} from "@mui/icons-material";
import { Flex, Box, Text, Link as ChakraLink, Image } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Box
      flexShrink="0"
      w="64"
      color="white"
      bg="gray.900"
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      zIndex="10"
    >
      <Box p="5">
        <Text fontSize="2xl">
          <Image src="logo2.png" alt="Instagram" marginTop={"30"} />
        </Text>
      </Box>
      <Box mt="30">
        <Flex flexDir="column" spacing="4">
          <ChakraLink
            as={Link}
            to="/"
            display="flex"
            alignItems="center"
            p="3"
            _hover={{
              bg: "gray.700",
              borderRadius: "5",
              marginLeft: "3",
              marginRight: "3",
            }}
          >
            <Home
              sx={{ width: 30, height: 30, marginRight: 2, marginLeft: 2 }}
            />
            <Text fontSize={"lg"}>Home</Text>
          </ChakraLink>

          <ChakraLink
            marginTop={"1"}
            as={Link}
            to="/search-users"
            display="flex"
            alignItems="center"
            p="3"
            _hover={{
              bg: "gray.700",
              borderRadius: "5",
              marginLeft: "3",
              marginRight: "3",
            }}
          >
            <Search
              sx={{ width: 30, height: 30, marginRight: 2, marginLeft: 2 }}
            />
            <Text fontSize={"lg"}>Search</Text>
          </ChakraLink>
          <ChakraLink
            marginTop={"1"}
            as={Link}
            to="/addpost"
            display="flex"
            alignItems="center"
            p="3"
            _hover={{
              bg: "gray.700",
              borderRadius: "5",
              marginLeft: "3",
              marginRight: "3",
            }}
          >
            <AddCircleOutline
              sx={{ width: 30, height: 30, marginRight: 2, marginLeft: 2 }}
            />
            <Text fontSize={"lg"}>Create</Text>
          </ChakraLink>
          <ChakraLink
            marginTop={"1"}
            as={Link}
            to="/profile"
            display="flex"
            alignItems="center"
            p="3"
            _hover={{
              bg: "gray.700",
              borderRadius: "5",
              marginLeft: "3",
              marginRight: "3",
            }}
          >
            <AccountCircle
              sx={{ width: 30, height: 30, marginRight: 2, marginLeft: 2 }}
            />
            <Text fontSize={"lg"}>Profile</Text>
          </ChakraLink>
        </Flex>
        <ChakraLink
          mt="170"
          p="3"
          _hover={{
            bg: "gray.700",
            borderRadius: "5",
            marginLeft: "3",
            marginRight: "3",
          }}
          as={Link}
          to="/login"
          display="flex"
          alignItems="center"
        >
          <Logout
            sx={{ width: 30, height: 25, marginRight: 1.6, marginLeft: 2 }}
          />
          <Text fontSize={"lg"}>Logout</Text>
        </ChakraLink>
      </Box>
    </Box>
  );
};

export default Sidebar;
