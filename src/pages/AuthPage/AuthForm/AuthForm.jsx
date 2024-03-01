import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";


const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			<Box border={"1px solid gray"} borderRadius={4} padding={5} w={700} boxShadow={'inset 0 0 10px'} >
				<VStack spacing={4}>
					<Image src='/img/bekagram.svg' h={24} cursor={"pointer"} alt='Instagram' />

					{isLogin ? <Login /> : <Signup />}
				</VStack>
				<Box borderRadius={4} padding={5}>
					<Flex alignItems={"center"} justifyContent={"center"}>
						<Box mx={2} fontSize={14}>
						</Box>
						<Button  onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
							{isLogin ? "Sign up" : "Log in"}
						</Button>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default AuthForm;
