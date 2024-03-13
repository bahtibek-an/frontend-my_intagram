import { Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Tooltip
      hasArrow
      label={"Home"}
      placement='right'
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        to={"/"}
        as={RouterLink}
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        justifyContent="center"
      >
        <Box display={{ base: "none", md: "block" }} color="white">HOME</Box>
      </Link>
    </Tooltip>
  );
};

export default Home;
