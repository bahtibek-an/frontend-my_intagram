import { Container, Flex, VStack, Box, Image } from "@chakra-ui/react";
import AuthForm from "./AuthForm/AuthForm";

const AuthPage = () => {
	return (
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4} style={{background: 'url(./img/log-in-girl.svg)', backgroundPosition:'center', backgroundSize: 'cover'}} >
			<Container maxW={"container.md"} padding={0}  >
				<Flex background={'transparent'} backdropBlur={'50px'} justifyContent={"center"} alignItems={"center"} gap={10}>
					<VStack spacing={4} align={"stretch"}>
						<AuthForm />
						<Flex gap={5} justifyContent={"center"}>
						</Flex>
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;
