import { Box, Container, Flex } from "@chakra-ui/react";
import FaceStory from "../../components/FaceStory/FaceStory";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedUsers/SuggestedUsers";


const HomePage = () => {

	return (
		<Container maxW={"container.lg"}>
			<Flex gap={20}>
				<Box flex={2} py={10}>
					<FaceStory />
					<FeedPosts />
				</Box>
				<Box display={{ base: 'none', lg: 'block' }} flex={3} mr={20} maxW={"300px"}>
					<SuggestedUsers />
				</Box>
			</Flex>
		</Container>
	);
};

export default HomePage;
