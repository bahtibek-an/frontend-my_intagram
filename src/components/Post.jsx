import React, { useState, useEffect, useContext } from "react";
import {
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
import { db } from "../firebase";
import { AuthContext } from "../AuthContext";

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
    const [CommentmodalVisible, setCommentModalVisible] = useState(false);


    useEffect(() => {

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

    }, [post.likes, currentUser.uid, db, uid, post.sentCommentUserUid]);

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

    const currentTime = new Date();

    const postTime = post.timestamp ? post.timestamp.toDate() : null;

    let formattedTime = "";
    if (postTime) {
        const timeDifference = currentTime - postTime;

        const seconds = Math.floor(timeDifference / 1000);

        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = day * 365;

        if (seconds < minute) {
            formattedTime = seconds + " second ago";
        } else if (seconds < hour) {
            const minutes = Math.floor(seconds / minute);
            formattedTime = minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
        } else if (seconds < day) {
            const hours = Math.floor(seconds / hour);
            formattedTime = hours + " hour" + (hours > 1 ? "s" : "") + " ago";
        } else if (seconds < month) {
            const days = Math.floor(seconds / day);
            formattedTime = days + " day" + (days > 1 ? "s" : "") + " ago";
        } else if (seconds < year) {
            const months = Math.floor(seconds / month);
            formattedTime = months + " month" + (months > 1 ? "s" : "") + " ago";
        } else {
            const years = Math.floor(seconds / year);
            formattedTime = years + " year" + (years > 1 ? "s" : "") + " ago";
        }
    }

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



    const emoji = "🔥";

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




    return (
        <section className="main">
            <div className="wrapper">
                <div className="left-col">
                    <div className="post">
                        <div className="info">
                            <div className="user">
                                <div className="profile-pic"><img src={postUserPhoto} alt={postUserPhoto} /></div>
                                <p className="username">{userName}</p>
                            </div>
                            {currentUser.uid === post.userId && (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDeleteClick} width="20" height="20" fill="#f00" className="bi bi-trash-fill options" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                    </svg>
                                </>
                            )}
                            {currentUser.uid !== post.userId && (
                                <>
                                    {currentUser && (
                                        isFollowing ? (
                                            <a className="unfollow-btn" onClick={handleUnfollowClick}>Unfollow</a>
                                        ) : (
                                            <a className="follow-btn" onClick={handleFollowClick}>Follow</a>
                                        )
                                    )}
                                </>
                            )}

                        </div>
                        <img src={imageUrl} className="post-image" alt="" />
                        <div className="post-content">
                            <div className="reaction-wrapper">
                                {unlike ?
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLikeClick} width="26" height="26" fill="#f00" className="bi bi-heart-fill icon" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLikeClick} width="26" height="26" fill="#000" className="bi bi-heart icon" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                }


                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-chat-left" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                </svg>
                            </div>
                            <p className="likes"> {likeCount} likes</p>
                            <p className="description"><span>{userName} </span> {comment}</p>
                            <p className="post-time"> {formattedTime}</p>
                            <br />
                            {post.comments?.length > 0 && (
                                <>
                                    {post.comments.slice(-2).map((comment, index) => (
                                        <div key={index}>
                                            <p className="description"><span>{comment.displayName}</span> {comment.comment}</p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="comment-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg"  onClick={() => setNewComment(newComment + emoji)} width="26" height="26" style={{ marginLeft: "10px", marginRight: "10px" }} fill="currentColor" className="bi bi-fire icon" viewBox="0 0 16 16">
                                <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                            </svg>
                            
                            <input type="text" className="comment-box" placeholder="Add a comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                            <button className="comment-btn" style={newComment == "" ? {opacity:"0.6"} : {opacity:""}} onClick={handlePostComment}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Post;