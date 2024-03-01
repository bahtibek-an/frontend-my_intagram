import {
	Avatar,
	Button,
	Box,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Tooltip,
	Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		bio: "",
	});
	const authUser = useAuthStore((state) => state.user);
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();
	const showToast = useShowToast();

	const handleEditProfile = async () => {
		try {
			await editProfile(inputs, selectedFile);
			setSelectedFile(null);
			onClose();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Modal motionPreset='slideInBottom' isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay
					bg='blackAlpha.300'
					backdropFilter='blur(5px)'
				/>
				<ModalContent bg={'transparent'} style={{ backdropFilter: 'blur(20px)' }}  border={"1px solid gray"} mx={3}>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody pb={5} bg={'transparent'} style={{ backdropFilter: 'blur(20px)' }} >
						<Stack spacing={10} w={"full"} maxW={"md"} p={1} my={0}>
							<Flex display={'flex'} justifyContent={'space-between'} >
								<Box>

									<Heading textAlign={'center'} lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
										Edit Profile
									</Heading>
									<FormControl>
										<Center>
											<Avatar
												w={'150px'}
												h={'150px'}
												src={selectedFile || authUser.profilePicURL}
												border={"2px solid white "}
												mb={5}
											/>
										</Center>
										<Stack direction={["column", "row"]} spacing={6}>
											<Center w='full'>
												<Tooltip
													hasArrow
													label={'Add Picture'}
													placement='right'>
													<Box mt={'-10px'} onClick={() => fileRef.current.click()}>
														<Image src={'./img/gallery.png'} alt={'add'} w={59} h={50} />
													</Box>
												</Tooltip>
											</Center>
											<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
										</Stack>
									</FormControl>
								</Box>
								<Box>

									<FormControl>
										<FormLabel fontSize={"sm"}>Full Name</FormLabel>
										<Input
											placeholder={"Full Name"}
											size={"sm"}
											type={"text"}
											value={inputs.fullName || authUser.fullName}
											onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
										/>
									</FormControl>

									<FormControl>
										<FormLabel fontSize={"sm"}>Username</FormLabel>
										<Input
											placeholder={"Username"}
											size={"sm"}
											type={"text"}
											value={inputs.username || authUser.username}
											onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
										/>
									</FormControl>

									<FormControl>
										<FormLabel fontSize={"sm"}>Bio</FormLabel>
										<Input
											placeholder={"Bio"}
											size={"sm"}
											type={"text"}
											value={inputs.bio || authUser.bio}
											onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
										/>
									</FormControl>
								</Box>

							</Flex>
							<Stack display={'flex'} justifyContent={'space-between'} direction={["column", "row"]}>
								<Button
									color={"white"}
									variant={'outline'}
									size='sm'
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									bg={"blue.400"}
									color={"white"}
									size='sm'

									_hover={{ bg: "blue.500" }}
									onClick={handleEditProfile}
									isLoading={isUpdating}
								>
									Submit
								</Button>
							</Stack>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EditProfile;
