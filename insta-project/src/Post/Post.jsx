import React, { useContext, useEffect, useState } from "react";
import { HeartIcon, ChatIcon, DotsVerticalIcon, EmojiHappyIcon, PaperAirplaneIcon, BookmarkIcon, TrashIcon, PlusCircleIcon, MinusIcon, MinusCircleIcon } from "@heroicons/react/solid";
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../Datebase/Datebase";
import { AuthContext } from "../Datebase/Auth";

const Post = ({ id, userUID, username, avatarUrl, imageUrl, likes, caption, comments }) => {
    const [likeCount, setLikeCount] = useState(likes);
    const [newComment, setNewComment] = useState("");
    const [comment, setComment] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [showEmojis, setShowEmojis] = useState(false);
    const [unlike, setUnlike] = useState(false);
    const [showComment, setshowComment] = useState(false);
    const [user, setUser] = useState({});
    const uid = userUID;
    const [isFollowing, setIsFollowing] = useState(false);
    const [CommentmodalVisible, setCommentModalVisible] = useState(false);

    // console.log(userUID);

    useEffect(() => {

        setUnlike(Array.isArray(likes) && likes.includes(currentUser.uid));
        setLikeCount(Array.isArray(likes) ? likes.length : 0)
        // setshowComment(post.sentCommentUserUid?.includes(currentUser?.uid) || false);

        const userRef = doc(db, "Users", uid);

        const unsubscribe = onSnapshot(userRef, (userDoc) => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser(userData);
                setIsFollowing(userData.followers?.includes(currentUser?.displayName) || false);

                const userPostsRef = collection(db, "Posts");
                const userPostsQuery = query(userPostsRef, where("userId", "==", uid));

            }
        });

        return () => {
            unsubscribe();
        };

    }, [likes, currentUser.uid, db, uid,]); //  post.sentCommentUserUid

    const handleLikeClick = async () => {
        const postRef = doc(db, "Posts", id);

        try {
            if (unlike) {
                await updateDoc(postRef, {
                    likes: likes.filter((uid) => uid !== currentUser.uid),
                });
                setUnlike(false);
            } else {
                await updateDoc(postRef, {
                    likes: arrayUnion(currentUser.uid),
                });
                setUnlike(true);
            }
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    const handlePostComment = async () => {
        const postRef = doc(db, "Posts", id);
        setShowEmojis(false);

        try {
            const commentData = {
                text: newComment,
                username: currentUser.displayName,
            };

            setNewComment("");

            await updateDoc(postRef, {
                comments: arrayUnion(commentData),
                sentCommentUserUid: currentUser.uid,

            });
            setComment([...comments, commentData]);

        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleDeleteClick = async () => {
        const postRef = doc(db, "Posts", id);

        try {
            await deleteDoc(postRef);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleFollowClick = async () => {
        try {
            if (currentUser) {
                const followingUser = doc(db, "Users", currentUser.uid);
                const userRef = doc(db, "Users", uid);

                await updateDoc(userRef, {
                    followers: arrayUnion(currentUser.uid),
                });

                await updateDoc(followingUser, {
                    following: arrayUnion(uid),
                });

                setIsFollowing(true);
            } else {
                console.error("User not authenticated");
            }
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const handleUnfollowClick = async () => {
        try {
            if (currentUser) {
                const followingUser = doc(db, "Users", currentUser.uid);
                const userRef = doc(db, "Users", uid);

                await updateDoc(userRef, {
                    followers: arrayRemove(currentUser.uid),
                });

                await updateDoc(followingUser, {
                    following: arrayRemove(uid),
                });

                setIsFollowing(false);
            } else {
                console.error("User not authenticated");
            }
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };

    const ShowEmojis = async () => {
        if (showEmojis) {
            setShowEmojis(false)
        } else {
            setShowEmojis(true)
        }
    }

    const emojis = [
        "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😇", "😈",
        "😉", "😊", "😋", "😌", "😍", "😎", "😏", "😐", "😑", "😒",
        "😓", "😔", "😕", "😖", "😗", "😘", "😙", "😚", "😛", "😜",
        "😝", "😞", "😟", "😠", "😡", "😢", "😣", "😤", "😥", "😦",
        "😧", "😨", "😩", "😪", "😫", "😬", "😭", "😮", "😯", "😰",
        "😱", "😲", "😳", "😴", "😵", "😶", "😷", "😸", "😹", "😺",
        "😻", "😼", "😽", "😾", "😿", "🙀", "🙁", "🙂", "🙃", "🙄",
        "🙅", "🙆", "🙇", "🙈", "🙉", "🙊", "🙋", "🙌", "🙍", "🙎",
        "🙏", "👍", "👎", "👌", "👊", "👋", "👏", "👐", "👑", "👒",
        "👓", "👔", "👕", "👖", "👗", "👘", "👙", "👚", "👛", "👜",
        "👝", "👞", "👟", "👠", "👡", "👢", "👣", "👤", "👥", "👦",
        "👧", "👨", "👩", "👪", "👫", "👬", "👭", "👮", "👯", "👰",
        "👱", "👲", "👳", "👴", "👵", "👶", "👷", "👸", "👹", "👺",
        "👻", "👼", "👽", "👾", "👿", "💀", "💁", "💂", "💃", "💄",
        "💅", "💆", "💇", "💈", "💉", "💊", "💋", "💌", "💍", "💎",
        "💏", "💐", "💑", "💒", "💓", "💔", "💕", "💖", "💗", "💘",
        "💙", "💚", "💛", "💜", "💝", "💞", "💟", "💠", "💡", "💢",
        "💣", "💤", "💥", "💦", "💧", "💨", "💩", "💪", "💫", "💬",
        "💭", "💮", "💯", "💰", "💱", "💲", "💳", "💴", "💵", "💶",
        "💷", "💸", "💹", "💺", "💻", "💼", "💽", "💾", "💿", "📀",
        "📁", "📂", "📃", "📄", "📅", "📆", "📇", "📈", "📉", "📊",
        "📋", "📌", "📍", "📎", "📏", "📐", "📑", "📒", "📓", "📔",
        "📕", "📖", "📗", "📘", "📙", "📚", "📛", "📜", "📝", "📞",
        "📟", "📠", "📡", "📢", "📣", "📤", "📥", "📦", "📧", "📨",
        "📩", "📪", "📫", "📬", "📭", "📮", "📯", "📰", "📱", "📲",
        "📳", "📴", "📵", "📶", "📷", "📸", "📹", "📺", "📻", "📼",
        "📽️", "📾", "📿", "🔀", "🔁", "🔂", "🔃", "🔄", "🔅", "🔆",
        "🔇", "🔈", "🔉", "🔊", "🔋", "🔌", "🔍", "🔎", "🔏", "🔐",
        "🔑", "🔒", "🔓", "🔔", "🔕", "🔖", "🔗", "🔘", "🔙", "🔚",
        "🔛", "🔜", "🔝", "🔞", "🔟", "🔠", "🔡", "🔢", "🔣", "🔤",
        "🔥", "🔦", "🔧", "🔨", "🔩", "🔪", "🔫", "🔬", "🔭", "🔮",
        "🔯", "🔰", "🔱", "🔲", "🔳", "🔴", "🔵", "🔶", "🔷", "🔸",
        "🔹", "🔺", "🔻", "🔼", "🔽", "🕐", "🕑", "🕒", "🕓", "🕔"
      ];
      
    return (
        <div className="w-2/4 h-full max-w-md mx-auto my-4 overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img src={avatarUrl} alt={`${username} avatar`} className="w-8 h-8 mr-2 rounded-full" />
                    <span className="font-semibold">{username} </span>
                </div>
                <div>
                    <button className="flex">
                        {currentUser.uid !== userUID && (
                            isFollowing ? (
                                <div className="flex text-red-500" onClick={handleUnfollowClick}>
                                    <MinusCircleIcon className="w-6 h-6" /> Unfollow
                                </div>
                            ) : (
                                <div className="flex text-blue-500" onClick={handleFollowClick}>
                                    <PlusCircleIcon className="w-6 h-6" /> Follow
                                </div>
                            )
                        )}
                    </button>

                </div>
            </div>

            <img src={imageUrl} alt="Post" className="w-full h-96" />

            <div className="flex items-center justify-between p-3">
                <div className="flex space-x-4">
                    <button className={unlike ? 'text-red-600' : 'text-gray-700'} onClick={handleLikeClick}>
                        <HeartIcon className="w-6 h-6" />
                    </button>
                    <button className="text-gray-700">
                        <ChatIcon className="w-6 h-6" />
                    </button>
                    <button className="text-gray-700">
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </div>
                <div>
                    {currentUser.uid === userUID &&
                        <button className="text-red-500" onClick={handleDeleteClick}>
                            <TrashIcon className="w-6 h-6" />
                        </button>
                    }
                    <button className="text-gray-700">
                        <BookmarkIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="p-3 pt-0 pb-0">
                <span className="font-semibold">{likeCount} likes</span>
            </div>

            <div className="p-3 pt-0 pb-0">
                <span className="font-semibold">{username}</span> {caption}
            </div>

            <div className="p-3 space-y-2 shadow-inner">
                {comments?.slice(-5).map((comment, index) => (
                    <div key={index}>
                        <span className="font-semibold">{comment?.username}</span> {comment?.text}
                    </div>
                ))}
            </div>

            <div className="flex items-center p-4">
                <button className="mr-2 text-blue-500" onClick={ShowEmojis}>
                    <EmojiHappyIcon className="w-6 h-6" />
                </button>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none focus:outline-none"
                    value={newComment} onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="font-bold text-blue-500" style={newComment == "" ? { opacity: "0.6" } : { opacity: "" }} onClick={handlePostComment}>
                    Post
                </button>
            </div>
            {showEmojis && (
                <div className="flex w-full h-40 p-3 overflow-scroll">
                    <div>
                        {emojis.map((emoji, index) => (
                            <span
                                key={index}
                                className="m-1 cursor-pointer"
                                onClick={() => setNewComment(newComment + emoji)}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
};

export default Post;
