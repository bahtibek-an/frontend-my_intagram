import { Flex, Tooltip } from "@chakra-ui/react";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={4}
      px={4}
      color="white"
    >
      <Flex alignItems="space-between">
        <SidebarItems />
      </Flex>

      <Tooltip
        hasArrow
        label="Logout"
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems="center"
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          justifyContent="flex-end"
          cursor="pointer"
        >
        </Flex>
      </Tooltip>
    </Flex>
  );
};

export default Sidebar;
