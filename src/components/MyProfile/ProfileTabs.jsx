import { Flex, Text } from "@chakra-ui/react";

const ProfileTabs = () => {
	return (
		<Flex
			w={"full"}
			justifyContent={"center"}
			gap={{ base: 4, sm: 10 }}
		>
			<Flex alignItems={"center"} p='3'>
				<Text fontSize={17} display={{ base: "none", sm: "block" }}>
					P O S T S
				</Text>
			</Flex>
		</Flex>
	);
};

export default ProfileTabs;