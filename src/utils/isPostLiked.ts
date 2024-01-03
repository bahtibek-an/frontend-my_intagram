const isPostLiked: (arg: { likes: string[]; userId: string }) => boolean = ({
  likes,
  userId,
}) => {
  return likes.includes(userId) || false;
};

export default isPostLiked;
