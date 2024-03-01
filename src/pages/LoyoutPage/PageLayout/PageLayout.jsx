import { Box, Flex, Image } from "@chakra-ui/react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase.config";
import Navbar from "../../../components/Navbar/Navbar";




const PageLayout = ({ children }) => {
	const { pathname } = useLocation();
	const [user, loading] = useAuthState(auth);
	const canRenderSidebar = pathname !== "/auth" && user;
	const canRenderNavbar = !user && !loading && pathname !== "/auth";

	const checkingUserIsAuth = !user && loading;
	if (checkingUserIsAuth) return <PageLayoutSpinner />;
  
	

	return (
		<Flex  background={'url(./img/black.jpg)'}    flexDir={canRenderNavbar ? "column" : "row"}>
			{canRenderSidebar ? (
				<Box background={'transparent'} backdropFilter={'blur(5px)'} w={{ base: "70px", md: "240px" }}>
					<Sidebar />
				</Box>
			) : null}
			{canRenderNavbar ? <Navbar /> : null}
			<Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx={"auto"}>
				{children}
			</Box>
		</Flex>
	);
};

export default PageLayout;

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Image src='./img/bars.svg' />
		</Flex>
	);
};
