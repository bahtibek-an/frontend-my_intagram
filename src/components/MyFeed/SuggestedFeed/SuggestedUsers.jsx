import { Flex,  Text, VStack } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedPeople";
import useGetSuggestedUsers from "../../../tools/renderSuggestedUsers";
import useSearchUser from "../../../tools/search";

const SuggestedUsers = () => {
	const { isLoading, suggestedUsers } = useGetSuggestedUsers();
	const { setUser } = useSearchUser();

	if (isLoading) return null;

	return (
		<VStack py={8} px={6} gap={4}>
			{suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
					<Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
						See All
					</Text>
				</Flex>
			)}

			{suggestedUsers.map((user) => (
				<SuggestedUser user={user} key={user.id} setUser={setUser}/>
			))}
		</VStack>
	);
};

export default SuggestedUsers;