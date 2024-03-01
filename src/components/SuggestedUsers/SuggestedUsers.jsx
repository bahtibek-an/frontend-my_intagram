import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
	const { isLoading, suggestedUsers } = useGetSuggestedUsers();
	if (isLoading) return null;

	return (
		<VStack  background={'transparent'}  backdropFilter={'blur(5px)'} boxShadow={'0 0 10px inset'} borderRadius={10} position={'fixed'} top={'0px'} py={8} px={6} gap={4}>
			<SuggestedHeader />
			{suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested
					</Text>
				</Flex>
			)}
			{suggestedUsers.map((user) => (
				<>
				<SuggestedUser user={user} key={user.id} />
				</>
			))}

		</VStack>
	);
};

export default SuggestedUsers;
