import { Box, Container, VStack, Flex } from "@chakra-ui/react";
import AuthForm from "../../components/authUser/AuthForm";

const AuthPage = () => {
	return (
		<Box
		minH={"100vh"}
		bgSize="cover"
		bgPosition="center"
		px={4}
		color="white"
		display="flex"
        justifyContent="center"
        alignItems="center"
    >
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					<VStack spacing={4} align={"stretch"}>
						<AuthForm />
					</VStack>
				</Flex>
			</Container>
		</Flex>
		</Box>
	);
};

export default AuthPage;