import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tooltip,
	useDisclosure,
  } from "@chakra-ui/react";
  import useSearchUser from "../../hooks/useSearchUser";
  import { useRef } from "react";
  import SuggestedUser from "../SuggestedUsers/SuggestedUser";
  
  const Search = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const searchRef = useRef(null);
	const { user, isLoading, getUserProfile, setUser, error } = useSearchUser();
  
	const handleSearchUser = (e) => {
	  e.preventDefault();
	  getUserProfile(searchRef.current.value);
	};
  
	return (
	  <>
		<Tooltip
		  hasArrow
		  label={"Search"}
		  placement='right'
		  ml={1}
		  openDelay={500}
		  display={{ base: "block", md: "none" }}
		>
		  <Flex
			alignItems={"center"}
			gap={4}
			_hover={{boxShadow: '0 0 10px'}} 
			borderRadius={6}
			p={2}
			w={{ base: 10, md: "full" }}
			justifyContent={{ base: "center", md: "flex-start" }}
			onClick={onOpen}
			cursor="pointer"
		  >
			<Image src="./img/search.png" w={35} />
			<Box display={{ base: "none", md: "block" }}>Search</Box>
		  </Flex>
		</Tooltip>
  
		<Modal isCentered isOpen={isOpen} size={'sm'} onClose={onClose} motionPreset='slideInLeft'>
		  <ModalOverlay
			bg='blackAlpha.300'
			backdropFilter='blur(10px)'
		  />
		  <ModalContent bg={'transparent'} style={{ backdropFilter: 'blur(20px)' }} border={"1px solid gray"} maxW={"400px"}>
			<ModalHeader>Search user</ModalHeader>
			<ModalCloseButton />
			<ModalBody pb={6}>
			  <form onSubmit={handleSearchUser}>
				<FormControl>
				  <FormLabel>Username</FormLabel>
				  <Input placeholder='BekaDev' ref={searchRef} />
				</FormControl>
  
				<Flex w={"full"} justifyContent={"flex-end"} mt={4}>
				  <Button type='submit' size={"sm"} isLoading={isLoading}>
					Search
				  </Button>
				</Flex>
			  </form>
  
			  {error && (
				<Box mt={4} color="red.500">
				  Error: {error.message}
				</Box>
			  )}
  
			  {user && <SuggestedUser user={user} setUser={setUser} />}
			</ModalBody>
		  </ModalContent>
		</Modal>
	  </>
	);
  };
  
  export default Search;