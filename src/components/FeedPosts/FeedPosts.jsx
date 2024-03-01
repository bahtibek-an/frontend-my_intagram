import { Container} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";


const FeedPosts = () => {
	const { isLoading, posts } = useGetFeedPosts();


	return (
		<Container  background={'transparent'}   maxW={"container.sm"} py={10} px={2}>
			{!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
		</Container>
	);
};

export default FeedPosts;
