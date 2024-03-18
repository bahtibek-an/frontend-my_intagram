import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Avatar,
} from "@chakra-ui/react";

const ModifyProfileForm = ({
  newName,
  setNewName,
  savingChanges,
  handleImageChange,
  applyUserChanges,
  selectedImage,
}) => {
  return (
    <Flex
      color={"white"}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg="gray.700"
    >
      <Flex
        as="form"
        onSubmit={applyUserChanges}
        direction="column"
        alignItems="center"
        p={4}
        boxShadow="md"
        rounded="md"
        bg="gray.800"
        maxW="400px"
        w="100%"
      >
        <Flex alignItems="center" spacing={2}>
          <Avatar src={selectedImage} size="md" margin={5} />
          <FormLabel htmlFor="avatar" cursor="pointer" fontSize="sm">
            Change Profile Image
          </FormLabel>
          <Input
            type="file"
            id="avatar"
            onChange={handleImageChange}
            display="none"
          />
        </Flex>
        <Flex direction="column" w="100%" spacing={2}>
          <FormControl id="username">
            <FormLabel fontSize="sm">Username</FormLabel>
            <Input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              borderColor="gray.500"
              fontSize="sm"
            />
          </FormControl>
        </Flex>
        <Button
        color={'white'}
          type="submit"
          bgColor="gray.600"
          isLoading={savingChanges}
          loadingText="Saving..."
          mt={4}
          alignSelf="flex-end"
          w="100%"
          fontSize="sm"
          _hover={{ bg: "gray.700" }}
        >
          Save Changes
        </Button>
      </Flex>
    </Flex>
  );
};

export default ModifyProfileForm;
