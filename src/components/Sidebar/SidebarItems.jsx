import { Box } from "@chakra-ui/react";
import CreatePost from "./CreatePost";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Explor from "./Explor"



const SidebarItems = () => {
	return (
		<>
		<Box>
			<Home />
			<Search />
			<CreatePost />
			<Explor />
			<ProfileLink />
		</Box>
		</>
	);
};

export default SidebarItems;
