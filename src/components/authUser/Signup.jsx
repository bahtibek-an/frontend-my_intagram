import { Text, Alert, AlertIcon, Button, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../tools/registerTool";

const Signup = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const { loading, error, signup } = useSignUpWithEmailAndPassword();

	return (
		<>
			<Text textAlign="left" color="gray.300">Your Email</Text>
			<Input
				fontSize={14}
				type='email'
				size={"sm"}
				placeholder='example@mail.com'
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Text textAlign="left" color="gray.300">Set Username</Text>
			<Input
				fontSize={14}
				type='text'
				size={"sm"}
				placeholder='michaeljackson'
				value={inputs.username}
				onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
			/>
			<Text textAlign="left" color="gray.300">Write your name</Text>
			<Input
				fontSize={14}
				type='text'
				size={"sm"}
				placeholder='Michael Jackson'
				value={inputs.fullName}
				onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
			/>
			<Text textAlign="left" color="gray.300">Set password</Text>
			<InputGroup>
				<Input
					placeholder='iampopking'
					fontSize={14}
					type="password"
					value={inputs.password}
					size={"sm"}
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
				/>
			</InputGroup>

			{error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					Whoops! Error on your part...<br /> Retry!
				</Alert>
			)}

			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={() => signup(inputs)}
			>
				Sign Up
			</Button>
		</>
	);
};

export default Signup;