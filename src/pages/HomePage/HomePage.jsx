import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/MyFeed/FeedPosts";
import SuggestedUsers from "../../components/MyFeed/SuggestedFeed/SuggestedUsers";

const HomePage = () => {
	return (
		<Container maxW={"container.lg"} color="white">
			<Flex gap={20}>
				<Box flex={2} mt={20} py={10} color="white">
					<FeedPosts  />
				</Box>
				<Box flex={3} mr={20} mt={20} color="white" display={{ base: "none", lg: "block" }} maxW={"300px"}>
					<SuggestedUsers />
				</Box>
			</Flex>
		</Container>
	);
};

export default HomePage;