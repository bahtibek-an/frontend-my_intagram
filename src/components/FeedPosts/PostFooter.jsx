import { Tooltip, Box, Button, Flex, Image, Input, InputGroup, InputRightElement, Text, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const emojiList = [
	"😀", "❤️", "😍", "🔥", "👍", "👏", "🙌", "🎉", "🌟", "💯",
	"😊", "😂", "😎", "💪", "🙏", "🤩", "🥳", "👌", "👋", "🤗",
	"😇", "😜", "😋", "😅", "🤔", "😌", "🤭", "🤫", "🤐", "🥺",
	"🥰", "😘", "🤪", "😉", "😆", "😃", "😄", "😁", "😏", "😖",
	"😬", "😐", "😕", "🥴", "😶", "😮", "😯", "😲", "😳", "🥱",
	"😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴",
	"🌈", "🎈", "🎨", "🎉", "🎁", "🎊", "🎆", "🎇", "🧨", "🥳",
	"👨‍💻❤️👩‍💻"
];

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedEmoji, setSelectedEmoji] = useState("");
	const [save, setSave] = useState(false);

	const toggleSave = () => {
		setSave(!save);
	};

	const emojiSelect = (emoji) => {
		setSelectedEmoji(emoji);
		setComment((prevComment) => prevComment + emoji);
	};

	const submitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
		setSelectedEmoji("");
	};

	return (
		<>
		<Box mb={2} border={'1px solid'} borderRadius={10} paddingLeft={5} paddingRight={5} paddingBottom={'-5px'} >

			<Box mb={10} marginTop={"auto"}>
				<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
					<Box filter={'drop-shadow(0 0 1px)'} onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
						{!isLiked ? <Image src='./img/heart.png' w={7} ml={1.5} mt={1.5} /> : <Image src='./img/herts.png' w={7} ml={1.5} mt={1.5} />}
					</Box>

					<Box filter={'drop-shadow(0 0 1px)'} mt={0.5} cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
						<Image src='./img/chat.png' w={8} cursor={'pointer'} mt={1.8} />
					</Box>
					<Box filter={'drop-shadow(0 0 1px)'} onClick={toggleSave}>
						{save ? (
							<Image src='./img/bookmark.png' w={'25px'} mt={2} />
						) : (
							<Image src='./img/unsave.png' w={'25px'} mt={'4.5px'} />
						)}
					</Box>
				</Flex>
				<Text fontWeight={600} fontSize={"sm"}>
					{likes} likes
				</Text>

				{isProfilePage && (
					<Text fontSize='12' color={"gray"}>
						Posted {timeAgo(post.createdAt)}
					</Text>
				)}

				{!isProfilePage && (
					<>
						<Text fontSize='sm' fontWeight={700}>
							{creatorProfile?.username}{""}
							<Text as='span' fontWeight={400}>
								{post.caption}
							</Text>
						</Text>
						{post.comments.length > 0 && (
							<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
								View all {post.comments.length} comments
							</Text>
						)}
						{isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
					</>
				)}

				{authUser && (
					<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
						<InputGroup>
							<Input
								mt={1.5}
								placeholder={"Add a comment..."}
								fontSize={14}
								onChange={(e) => setComment(e.target.value)}
								value={comment}
								ref={commentRef}
								w={'92%'}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										submitComment();
									}
								}}
							/>
							<InputRightElement>
								<Popover>
									<PopoverTrigger>
										<Button mt={5} mr={5} style={{ height: "24px", marginBottom: "10px" }}>
											☺
										</Button>
									</PopoverTrigger>
									<PopoverContent
										style={{
											textAlign: "center",
											position: "fixed",
											right: "0px",
											marginTop: "10px",
										}}
										background={'transparent'}
										backdropFilter={'blur(20px)'}
										boxShadow={'0 0 10px '}
										w={'300px'}
									>
										<PopoverBody  >
											{emojiList.map((emoji) => (
												<Button
													key={emoji}
													onClick={() => emojiSelect(emoji)}
													style={{ margin: "5px", height: "24px", width: "24px", padding: "0" }}
													_hover={{ boxShadow: "0 0 5px inset" }}
													boxShadow={'0 0 5px'}
												>
													{emoji}
												</Button>
											))}
										</PopoverBody>
									</PopoverContent>
								</Popover>
								<Tooltip
									hasArrow
									label={'Send'}
									placement='right'
									ml={1}
									openDelay={500}
								>
									<Button
										fontSize={14}
										color={"blue.500"}
										fontWeight={600}
										cursor={"pointer"}
										_hover={{ color: "white" }}
										bg={"transparent"}
										onClick={submitComment}
										isLoading={isCommenting}
										mt={5}
										mr={5}
										style={{ padding: "0" }}
									>
										<Image src='./img/mss.png' w={7} mb={2} cursor={'pointer'} />
									</Button>
								</Tooltip>
							</InputRightElement>
						</InputGroup>
					</Flex>
				)}
			</Box>
		</Box>
		</>
	);
};

export default PostFooter;
