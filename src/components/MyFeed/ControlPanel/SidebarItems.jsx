import { Flex } from "@chakra-ui/react";
import CreatePost from "./NewPost";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
  return (
    <Flex alignItems="center" gap={4} >
      <Home />
      <Search />
      {/* <Notifications /> */}
      <CreatePost />
      <ProfileLink />
    </Flex>
  );
};

export default SidebarItems;
