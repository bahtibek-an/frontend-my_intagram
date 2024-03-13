import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../../tools/viewImage";
import useEditProfile from "../../tools/editProfile";
import useShowToast from "../../tools/showNotifications";

const EditProfile = ({ isOpen, onClose }) => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
	});
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { editProfile } = useEditProfile();
	const showToast = useShowToast();

	const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			showToast("Error", "Issue!", "error");
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={"gray.700"} boxShadow={"xl"}  mx={3}>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						<Flex bg={"gray"}>
							<Stack spacing={4} w={"full"} maxW={"md"} color="white" bg={"gray.700"} p={6} my={0}>
								<FormControl>
									<Stack spacing={4}>
										<Center>
											<Avatar
												size='xl'
												src={selectedFile}
												border={"2px solid white "}
											/>
										</Center>
										<Center w='full'>
											<Button w='full' onClick={() => fileRef.current.click()}>
												Select profile picture
											</Button>
										</Center>
										<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
									</Stack>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Your Name</FormLabel>
									<Input
										placeholder={"Mr Beast"}
										size={"sm"}
										type={"text"}
										onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Your Username</FormLabel>
									<Input
										placeholder={"mrbeast"}
										size={"sm"}
										type={"text"}
										value={inputs.username}
										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
									/>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Description</FormLabel>
									<Input
										placeholder={"Student of Astrum"}
										size={"sm"}
										type={"text"}
										value={inputs.bio}
										onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
									/>
								</FormControl>

								<Stack spacing={6} direction={["column", "row"]}>
									<Button
										bg={"red.400"}
										color={"white"}
										w='full'
										size='sm'
										onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										bg={"blue.400"}
										color={"white"}
										size='sm'
										w='full'
										onClick={handleEditProfile}
									>
										Apply
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditProfile;

