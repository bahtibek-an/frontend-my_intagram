import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import useSearchUser from "../../../tools/search";
import { useRef } from "react";
import SuggestedUser from "../SuggestedFeed/SuggestedPeople";

const Search = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const searchRef = useRef(null);
	const { user, isLoading, getUserProfile, setUser } = useSearchUser();

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
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<Box display={{ base: "none", md: "block" }}>SEARCH</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
				<ModalOverlay />
				<ModalContent color="white" bg={"gray.700"} border={"1px solid gray"} pt={9} maxW={"400px"}>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSearchUser}>
							<FormControl>
								<FormLabel>Enter username</FormLabel>
								<Input placeholder="tester" ref={searchRef} />
							</FormControl>

							<Flex w={"full"} justifyContent={"flex-end"}>
								<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
									Search
								</Button>
							</Flex>
						</form>
						{user && <SuggestedUser user={user} setUser={setUser} />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Search;

