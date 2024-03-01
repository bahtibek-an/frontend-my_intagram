import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user, setUser }) => {
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
	const authUser = useAuthStore((state) => state.user);

	const onFollowUser = async () => {
		await handleFollowUser();
		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower.uid !== authUser.uid)
				: [...user.followers, authUser],
		});
	};

	return (
		<Flex _hover={{boxShadow: '0 0 10px'}} background={'transparent'} backdropFilter={'blur(1px)'} borderRadius={10} p={1} justifyContent={"space-between"} alignItems={"center"} w={"full"}>
			<Flex alignItems={"center"} gap={2}>
				<Link to={`/${user.username}`}>
					<Avatar src={user.profilePicURL} size={"md"} />
				</Link>
				<VStack spacing={2} alignItems={"flex-start"}>
					<Link to={`/${user.username}`}>
						<Box fontSize={12} fontWeight={"bold"}>
							{user.fullName}
						</Box>
					</Link>
					<Box fontSize={11} color={"gray.500"}>
						{user.followers.length} followers
					</Box>
				</VStack>
			</Flex>
			{authUser.uid !== user.uid && (
				<Button
					fontSize={13}
					bg={"transparent"}
					p={1}
					h={"max-content"}
					fontWeight={"medium"}
					color={"blue.400"}
					cursor={"pointer"}
					_hover={{ color: "white" }}
					onClick={onFollowUser}
					isLoading={isUpdating}

				>
					{isFollowing ? <Text  background={'cyan.200'} p={1} borderRadius={5} >Unfollow</Text> : <Text background={'cyan.200'} p={1} borderRadius={5}>Follow</Text>}
				</Button>
			)}
		</Flex>
	);
};

export default SuggestedUser;
