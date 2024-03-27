import React, { useState, useEffect, useContext } from "react";
import {
    getFirestore,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    where,
    collection,
    query,
    onSnapshot,
    deleteDoc,
} from "firebase/firestore";
import { storage, db } from "../../context/Firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from "react-router-dom";
import "./Post.css"
import { faL } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post }) => {
    const { id, imageUrl, comment, userName, like, userID, postUserPhoto } = post;
    const [likeCount, setLikeCount] = useState(like);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [showEmojis, setShowEmojis] = useState(false);
    const [unlike, setUnlike] = useState(false);
    const [showComment, setshowComment] = useState(false);
    const [user, setUser] = useState({});
    const uid = post.userId;
    const [isFollowing, setIsFollowing] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const [isCopy, setIsCopy] = useState(false)


    useEffect(() => {

        if (isCopy) {
            setTimeout(() => {
                setIsCopy(false);
            }, 5000);
        }


        setUnlike(post.likes?.includes(currentUser.uid));
        setshowComment(post.sentCommentUserUid?.includes(currentUser?.uid) || false);


        const userRef = doc(db, "users", uid);

        const unsubscribe = onSnapshot(userRef, (userDoc) => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser(userData);
                setIsFollowing(userData.followers?.includes(currentUser?.uid) || false);

                const userPostsRef = collection(db, "Posts");
                const userPostsQuery = query(userPostsRef, where("userId", "==", uid));

            }
        });

        return () => {
            unsubscribe();
        };

    }, [post.likes, currentUser.uid, db, uid, post.sentCommentUserUid, isCopy]);

    const isSendPost = () => {
        if (isSend) {
            setIsSend(false);
        } else if (!isSend) {
            setIsSend(true)
        }
    }

    const handleLikeClick = async () => {
        const postRef = doc(db, "Posts", id);

        try {
            if (unlike) {
                await updateDoc(postRef, {
                    like: likeCount - 1,
                    likes: post.likes.filter((uid) => uid !== currentUser.uid),
                });
                setUnlike(false);
                setLikeCount(likeCount - 1);
            } else {
                await updateDoc(postRef, {
                    like: likeCount + 1,
                    likes: arrayUnion(currentUser.uid),
                });
                setUnlike(true);
                setLikeCount(likeCount + 1);
            }
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    // Assuming you have the current time as currentTime (you can use new Date() to get it)
    const currentTime = new Date();

    const postTime = post.timestamp ? post.timestamp.toDate() : null;

    let formattedTime = "";
    if (postTime) {
        const timeDifference = currentTime - postTime;

        // Convert the time difference to seconds
        const seconds = Math.floor(timeDifference / 1000);

        // Define time intervals
        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = day * 365;

        if (seconds < minute) {
            formattedTime = seconds + "s ago";
        } else if (seconds < hour) {
            const minutes = Math.floor(seconds / minute);
            formattedTime = minutes + "m" + (minutes > 1 ? "s" : "") + " ago";
        } else if (seconds < day) {
            const hours = Math.floor(seconds / hour);
            formattedTime = hours + "h" + (hours > 1 ? "s" : "") + " ago";
        } else if (seconds < month) {
            const days = Math.floor(seconds / day);
            formattedTime = days + "d" + (days > 1 ? "s" : "") + " ago";
        } else if (seconds < year) {
            const months = Math.floor(seconds / month);
            formattedTime = months + "m" + (months > 1 ? "s" : "") + " ago";
        } else {
            const years = Math.floor(seconds / year);
            formattedTime = years + "y" + (years > 1 ? "s" : "") + " ago";
        }
    }

    // Now, formattedTime contains a human-readable representation of how long ago the post was created




    const handlePostComment = async () => {
        const postRef = doc(db, "Posts", id);
        setShowEmojis(false);

        try {
            const commentData = {
                comment: newComment,
                displayName: currentUser.displayName,
            };

            await updateDoc(postRef, {
                comments: arrayUnion(commentData),
                sentCommentUserUid: currentUser.uid,

            });

            setComments([...comments, commentData]);

            setNewComment("");
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

    const handleShowCommentClick = async () => {
        openCommentModal();

    };

    const emojis = ["😀", "😍", "😎", "🔥", "👍", "❤️", "👏", "🙌", "🎉", "🥳", "🤩", "🤗"];

    const handleFollowClick = async () => {
        try {
            if (currentUser) {
                const followingUser = doc(db, "users", currentUser.uid);
                const userRef = doc(db, "users", uid);

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
                const followingUser = doc(db, "users", currentUser.uid);
                const userRef = doc(db, "users", uid);

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

    const [CommentmodalVisible, setCommentModalVisible] = useState(false);

    const openCommentModal = () => {
        setCommentModalVisible(true);
    };

    const closeCommentModal = () => {
        setCommentModalVisible(false);

    };

    const handlePostOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeCommentModal();
        }
    };


    return (
        <>
            {CommentmodalVisible && (
                <div className="comment-modal" onClick={handlePostOutsideClick}>
                    <div className="comment-modal-content">
                        <div className="modal-head">
                            <p>Comments</p>
                            <div onClick={closeCommentModal}>
                                <i class="bi bi-x-lg"></i>
                            </div>
                        </div>
                        <hr />
                        <div className="comment-modal-body">
                            {post.comments?.length > 0 ? (
                                <>
                                    {post.comments.map((comment, index) => (
                                        <div className="comment-text" key={index}>
                                            <i class="bi bi-chat-dots"></i>
                                            {comment.displayName}
                                            <small className="comment-user-text">
                                                <i>
                                                    {comment.comment}
                                                </i>
                                            </small>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="no-comment">
                                        <h3>No Comment</h3>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="post">
                <div className="post-head">
                    <Link className="post-user" to={`/profile/${post.userId}`}>
                        <img src={postUserPhoto} alt="" className="post-user-img" />

                        {userName}
                        <small className="post-format-date"> {formattedTime}</small>

                    </Link>

                    <div class="dropdown-post">
                        <button class="dropbtn-post"><i class="bi bi-three-dots-vertical"></i></button>
                        <div class="dropdown-content-post">
                            {currentUser.uid === post.userId && (
                                <>
                                    <a className="post-remove-btn-post" onClick={handleDeleteClick}>Delete Post</a>
                                </>
                            )}
                            {currentUser.uid !== post.userId && (
                                <>
                                    {currentUser && (
                                        isFollowing ? (
                                            <a className="follow-btn-post" onClick={handleUnfollowClick}>Unfollow</a>
                                        ) : (
                                            <a className="follow-btn-post" onClick={handleFollowClick}>Follow</a>
                                        )
                                    )}
                                </>
                            )}
                            <CopyToClipboard text={imageUrl} onCopy={() => setIsCopy(true)}>
                                <a>
                                    {isCopy ? (
                                        "Copied"
                                    ) : (
                                        "Copy link"
                                    )}
                                </a>
                            </CopyToClipboard>
                        </div>
                    </div>

                </div>
                <img src={imageUrl} className="post-img" alt={imageUrl} />
                <div className="post-result">
                    <div className="post-react">

                        <div className="post-like" onClick={handleLikeClick}>
                            <div className="like-emoji">
                                <i class={`like-emoji ${unlike ? 'bi-heart-fill like-true' : 'bi-heart'}`}></i>
                            </div>
                            <div className="like-count like-false">
                                {likeCount}
                            </div>
                        </div>
                        <div className="post-comment" onClick={handleShowCommentClick}>
                            <i className={`bi ${showComment ? 'comment-true bi-chat-fill' : 'bi-chat'}`}></i>
                        </div>

                        <div className="post-send" onClick={isSendPost}>
                            {isSend ? <>
                                <i class="bi bi-send-fill send-true"></i>
                            </> : <>
                                <i class="bi bi-send"></i>

                            </>}
                        </div>
                    </div>
                    <h6 className="post-user-text">{userName} <p>{comment}</p></h6>

                    <div className="post-comment-element">
                        <div className="comment-input-post">
                            <span className="smile-btn" onClick={() => setShowEmojis(!showEmojis)}>
                                <i class="bi bi-emoji-smile-fill"></i>
                            </span>
                            <input type="text" className="comment-input" placeholder="Comments" value={newComment}
                                onChange={(e) => setNewComment(e.target.value)} />
                            <a className="comment-submit-btn" type="submit" onClick={handlePostComment}>Post</a>
                        </div>
                        {showEmojis && (
                            <div className="emoji-list">
                                {emojis.map((emoji, index) => (
                                    <span
                                        key={index}
                                        className="emoji"
                                        onClick={() => setNewComment(newComment + emoji)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        )}

                    </div>
                </div >
            </div >
        </>
    );
};

export default Post;