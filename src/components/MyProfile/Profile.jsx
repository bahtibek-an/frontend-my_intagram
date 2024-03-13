import { Avatar, AvatarGroup, Button, Link, Box, Flex, Text, VStack, useDisclosure } from "@chakra-ui/react";
import useUserProfileStore from "../../dataManager/profileCollector";
import useAuthStore from "../../dataManager/authCollector";
import useLogout from "../../tools/logout";
import EditProfile from "./EditProfileInfo";
import { Link as RouterLink } from "react-router-dom";
import useFollowUser from "../../tools/followUser";

const ProfileHeader = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const { userProfile } = useUserProfileStore();
	const authUser = useAuthStore((state) => state.user);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(userProfile?.uid);
	const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
	const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;
	if (!authUser) return null;

	return (
		<Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
			<AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
				<Avatar src={userProfile.profilePicURL} />
			</AvatarGroup>

			<VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
				<Flex
					gap={4}
					direction={{ base: "column", sm: "row" }}
					justifyContent={{ base: "center", sm: "flex-start" }}
					alignItems={"center"}
					w={"full"}
				>
					<Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>
					{visitingOwnProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"white"}
								color={"black"}
								_hover={{ bg: "whiteAlpha.800" }}
								size={{ base: "xs", md: "sm" }}
								onClick={onOpen}
							>
								Edit Profile
							</Button>
							<Link
								bg={"red"}
								color={"black"}
								_hover={{ bg: "red.400" }}
								size={{ base: "xs", md: "sm" }}
								to={"/auth"}
								as={RouterLink}
								borderRadius={6}
								p={2}
								onClick={handleLogout}
								isLoading={isLoggingOut}
								cursor={"pointer"}
								
							>
								<Box display={{ base: "none", md: "block" }}>Log out</Box>
							</Link>
						</Flex>
					)}
					{visitingAnotherProfileAndAuth && (
						<Flex gap={4} alignItems={"center"} justifyContent={"center"}>
							<Button
								bg={"blue.500"}
								color={"white"}
								_hover={{ bg: "blue.600" }}
								size={{ base: "xs", md: "sm" }}
								onClick={handleFollowUser}
								isLoading={isUpdating}
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</Button>
						</Flex>
					)}
				</Flex>

				<Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile.posts.length}
						</Text>
						Posts
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile.followers.length}
						</Text>
						Followers
					</Text>
					<Text fontSize={{ base: "xs", md: "sm" }}>
						<Text as='span' fontWeight={"bold"} mr={1}>
							{userProfile.following.length}
						</Text>
						Following
					</Text>
				</Flex>
				<Flex alignItems={"center"} gap={4}>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{userProfile.fullName}
					</Text>
				</Flex>
				<Text fontSize={"sm"}>{userProfile.bio}</Text>
				
			</VStack>
			{isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
		</Flex>
	);
};

export default ProfileHeader;