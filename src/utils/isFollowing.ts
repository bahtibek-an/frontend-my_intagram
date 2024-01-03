const isFollowing: (arg: {
  followers: string[];
  userId: string;
}) => boolean = ({ followers, userId }) => {
  return followers.includes(userId) || false;
};

export default isFollowing;
