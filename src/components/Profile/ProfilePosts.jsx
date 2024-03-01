import { Grid,Box } from "@chakra-ui/react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
	const { isLoading, posts } = useGetUserPosts();

	const noPostsFound = !isLoading && posts.length === 0;
	if (noPostsFound);

	return (
		<Box p={2} background={'transparent'} backdropFilter={'blur(5px)'} >
			<Grid
				templateColumns={{
					sm: "repeat(1, 1fr)",
					md: "repeat(3, 1fr)",
				}}
				gap={1}
				columnGap={1}

			>


				{!isLoading && (
					<>
						{posts.map((post) => (
							<ProfilePost post={post} key={post.id} />
						))}
					</>
				)}
			</Grid>
		</Box>
	);
};

export default ProfilePosts;

