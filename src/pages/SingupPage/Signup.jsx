import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { getDoc } from "firebase/firestore";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Alert,
  AlertIcon,
  Flex,
  Avatar,
} from "@chakra-ui/react";

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "Users", res.user.uid), {
        uid: res.user.uid,
        displayName: username,
        email,
        password,
        photoURL: "/avatar.png",
      });

      navigate("/");
    } catch (err) {
      setError("Sign-Up Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <Text fontSize="2xl" marginBottom="6" textAlign="center">
          Signup
        </Text>
        {error && (
          <Alert status="error" mb="4">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form ref={formRef} onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel
              htmlFor="username"
              mb="2"
              fontSize="md"
              fontWeight={"0px"}
            >
              Username
            </FormLabel>
            <Input
              borderColor={"gray.500"}
              type="text"
              id="username"
              name="username"
              p="2"
              borderWidth="1px"
              rounded="md"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel htmlFor="email" mb="2" fontSize="md" fontWeight={"0px"}>
              Email
            </FormLabel>
            <Input
              borderColor={"gray.500"}
              type="email"
              id="email"
              name="email"
              p="2"
              borderWidth="1px"
              rounded="md"
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel
              htmlFor="password"
              mb="2"
              fontSize="md"
              fontWeight={"0px"}
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
            w="full"
            p="22px"
            bg="blue.500"
            color="white"
            rounded="md"
            _hover={{ bg: "blue.600" }}
            _focus={{ ring: "1px", borderColor: "blue.300" }}
            disabled={loading}
          >
            Signup
          </Button>
        </form>
        <Flex alignItems="center" justifyContent="center">
          <Text marginTop={6}>Do you have an account?</Text>
          <Box
            textAlign="center"
            marginTop={3}
            marginBottom={-2.5}
            color="blue.500"
            marginLeft={3}
          >
            <Link to="/login">Login</Link>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Signup;
