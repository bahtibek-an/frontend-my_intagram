import { Box, Button, Flex, Image, Link, Tooltip, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaInstagram, FaTelegram, FaGithub } from 'react-icons/fa';


import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	return (
		<Box
			height={"100vh"}
			borderRight={"1px solid"}
			borderColor={"whiteAlpha.300"}
			py={8}
			position={"sticky"}
			top={0}
			left={0}
			px={{ base: 2, md: 4 }}
		>
			<Flex direction={"column"} gap={10} w='full' height={"full"}>
				<Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor='pointer'>
					<Image src="./img/bekagram.svg" />
				</Link>
				<Link
					to={"/"}
					as={RouterLink}
					p={2}
					display={{ base: "block", md: "none" }}
					borderRadius={6}
					_hover={{
						bg: "whiteAlpha.200",
					}}
					w={10}
					cursor='pointer'
				>
					<Image src="./img/cpu.png" />
				</Link>
				<Flex direction={"column"} gap={5} cursor={"pointer"}>
					<SidebarItems />
				</Flex>
				<Tooltip
					hasArrow
					label={"Logout"}
					placement='right'
					ml={1}
					openDelay={500}
					display={{ base: "block", md: "none" }}
				>

					<Flex
						onClick={handleLogout}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "whiteAlpha.400" }}
						borderRadius={6}
						p={2}
						w={{ base: 10, md: "full" }}
						justifyContent={{ base: "center", md: "flex-start" }}
						mt={"-25px"}
						mr={7}
					>
						<Image src="./img/logout.png" w={35} />
						<Text
							display={{ base: "none", md: 'block' }}
							variant={"ghost"}
							_hover={{ bg: "transparent" }}
							isLoading={isLoggingOut}
							fontWeight={'bold'}
						>
							Logout
						</Text>
					</Flex>
				</Tooltip>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					alignItems={{ base: 'center', md: 'flex-start' }}
					justifyContent={{ base: 'center', md: 'space-around' }}
				>
					<Tooltip
						hasArrow
						label={'Instagram'}
						placement='right'
						ml={{ base: 0, md: 1 }}
						mb={{ base: 2, md: 0 }}
						openDelay={500}
						display={{ base: 'block', md: 'none' }}
					>
						<Link
							display={'flex'}
							href='https://www.instagram.com/_bek_27_04_/'
							target='_blank'
							color='blue.500'
							fontSize={14}
							alignItems={'center'}
							gap={4}
							_hover={{ bg: 'whiteAlpha.400' }}
							borderRadius={6}
							p={2}
							w={{ base: 'full', md: 'auto' }}
							justifyContent={'center'}
						>
							<FaInstagram />
						</Link>
					</Tooltip>

					<Tooltip
						hasArrow
						label={'Telegram'}
						placement='right'
						ml={{ base: 0, md: 1 }}
						mb={{ base: 2, md: 0 }}
						openDelay={500}
						display={{ base: 'block', md: 'none' }}
					>
						<Link
							display={'flex'}
							href='https://www.t.me/uspa_polo_717/'
							target='_blank'
							color='blue.500'
							fontSize={14}
							alignItems={'center'}
							gap={4}
							_hover={{ bg: 'whiteAlpha.400' }}
							borderRadius={6}
							p={2}
							w={{ base: 'full', md: 'auto' }}
							justifyContent={'center'}
						>
							<FaTelegram />
						</Link>
					</Tooltip>

					<Tooltip
						hasArrow
						label={'GitHub'}
						placement='right'
						ml={{ base: 0, md: 1 }}
						openDelay={500}
						display={{ base: 'block', md: 'none' }}
					>
						<Link
							display={'flex'}
							href='https://github.com/bekzatilyasov2004'
							target='_blank'
							color='blue.500'
							fontSize={14}
							alignItems={'center'}
							gap={4}
							_hover={{ bg: 'whiteAlpha.400' }}
							borderRadius={6}
							p={2}
							w={{ base: 'full', md: 'auto' }}
							justifyContent={'center'}
						>
							<FaGithub />
						</Link>
					</Tooltip>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Sidebar;
