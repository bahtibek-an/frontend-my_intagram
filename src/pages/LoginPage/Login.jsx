import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Navigate, Link } from "react-router-dom";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { auth } from "../../firebase/firebase";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const email = e.target[0].value;
      const password = e.target[1].value;
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
    } catch (error) {
      setError("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={"gray.900"}
      color={"white"}
    >
      <Box p="10" bg="gray.700" borderRadius={"10px"} w="96">
        <Text
          fontSize="2xl"
          mb="6"
          textAlign={"center"}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <img src="logo1.png" alt="Instagram" style={{ margin: "-1rem" }} />
          <div>Login</div>
        </Text>

        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel htmlFor="email" mb="2" fontWeight={"0px"} fontSize="md">
              Email
            </FormLabel>
            <Input
              borderColor={"gray.500"}
              type="text"
              id="email"
              name="email"
              p="2"
              borderWidth="1px"
              rounded="md"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel
              fontWeight={"0px"}
              htmlFor="password"
              mb="2"
              fontSize="md"
              marginTop={"20px"}
            >
              Password
            </FormLabel>
            <Input
              borderColor={"gray.500"}
              type="password"
              id="password"
              name="password"
              p="2"
              borderWidth="1px"
              rounded="md"
            />
          </FormControl>

          <Button
            marginTop={"10px"}
            type="submit"
            fontSize={"lg"}
            w="full"
            p="22px"
            bg="blue.500"
            color="white"
            rounded="md"
            _hover={{ bg: "blue.600" }}
            _focus={{ ring: "1px", borderColor: "blue.300" }}
            disabled={loading}
          >
            Login
          </Button>
          {error && (
            <Alert status="error" mt="4">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </form>

        <Flex alignItems="center" justifyContent="center">
          <Text marginTop={6} textAlign="center">
            Don't have an account?
          </Text>
          <Box
            textAlign="center"
            marginTop={3}
            marginBottom={-2.5}
            color="blue.500"
            marginLeft={3}
          >
            <Link to="/signup">Signup here.</Link>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default LoginForm;
