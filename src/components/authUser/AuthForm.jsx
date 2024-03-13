import { Box, Center, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			<Box backgroundColor="gray.900"  borderRadius={4} padding={8}>
			<Center >I N S T A G R A M</Center>
				<Flex alignItems={"center"} justifyContent={"center"} mb={4} mt={2}>
					<Box mx={2} fontSize={14} >
						Log in or Sign up continue
					</Box>
					<Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
						{isLogin ? "Sign up" : "Log in"}
					</Box>
				</Flex>
				<VStack spacing={4}>
					{isLogin ? <Login /> : <Signup />}
				</VStack>
				
			</Box>
		</>
	);
};

export default AuthForm;