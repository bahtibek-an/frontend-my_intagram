import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<>
			<Box mt={5} border={'1px solid'} borderRadius={10} paddingLeft={5} paddingRight={5} >
				<PostHeader post={post} creatorProfile={userProfile} />
				<Box display={'flex'} justifyContent={'center'}  my={2} borderRadius={4} overflow={"hidden"}>
					<Image src={post.imageURL} alt={"img"} />
				</Box>
				<PostFooter post={post} creatorProfile={userProfile} />
			</Box>
		</>
	);
};

export default FeedPost;
