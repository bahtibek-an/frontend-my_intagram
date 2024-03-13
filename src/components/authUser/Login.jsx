import { Text, Alert, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../tools/login";

const Login = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { error, login } = useLogin();
	return (
		<>
			<Text textAlign="left" color="gray.300">Your Email</Text>
			<Input
				placeholder='example@mail.com'
				fontSize={14}
				type='email'
				size={"sm"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Text textAlign="left" color="gray.300">Your password</Text>
			<Input
				placeholder='coding1234'
				fontSize={14}
				size={"sm"}
				type='password'
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
			{error && (
				<Alert status="error" fontSize={14} p={2} textAlign="center" borderRadius={3}>
					User not found...
				</Alert>
			)}
			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				onClick={() => login(inputs)}
			>
				Log in
			</Button>
		</>
	);
};

export default Login;