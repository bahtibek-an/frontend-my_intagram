import { Avatar, Box, Flex, Skeleton, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {
	const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);

	return (
		<>
		<Box w={'full'} mt={2} border={'1px solid'} p={2} borderRadius={10} >
			<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
				<Flex alignItems={"center"} gap={2}>
					{creatorProfile && (
						<Link to={`/${creatorProfile.username}`}>
							<Avatar src={creatorProfile.profilePicURL} alt='user profile pic' size={"sm"} />
						</Link>
					)}

					<Flex fontSize={12} fontWeight={"bold"} gap='2'>
						{creatorProfile && (
							<Link to={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
						)}

						<Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
							<Image src={'./img/check.png'} w={5} />
						</Box>
					</Flex>
				</Flex>
				<Box fontSize={11} fontWeight={'bold'} color={"gray.500"}>
					{timeAgo(post.createdAt)}
				</Box>
			</Flex>
		</Box>
		</>
	);
};

export default PostHeader;
