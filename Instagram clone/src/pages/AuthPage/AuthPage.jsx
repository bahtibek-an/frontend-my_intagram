import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left hand-side */}
        <Box display={{base:"none", md:"block"}}>
          <Image src="/img/auth.png"/>
        </Box>
        
        {/* Right hand-side */}
        <VStack spacing={4} align={"stretch"}>
          <AuthForm/>
          <Box textAlign={"center"}>Get the app.</Box>
          <Flex gap={5} justifyContent={"center"}>
          <Image src="/img/GooglePlay-Banned.png" h={10} alt="playstore logo"/>
          <Image src="/img/EHY6QnZYdNX.png" h={10} alt="microsoft logo"/>
          </Flex>
        </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};


export default AuthPage;
