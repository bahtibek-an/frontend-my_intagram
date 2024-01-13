import React, { useState, useContext, useEffect } from "react";
import { updateDoc, deleteDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { storage, db } from "../Database/firebase";
import { AuthContext } from "../context/AuthContext";



const Post = ({ post }) => {
    const { id, imageUrl, comment, userName, like, userID } = post;
    const [likeCount, setLikeCount] = useState(like);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [showEmojis, setShowEmojis] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setIsLiked(currentUser.likedPosts && currentUser.likedPosts.includes(id));
        }
    }, [currentUser, id]);

    const handleLikeClick = async () => {
        if (currentUser) {
            const postRef = doc(db, "posts", id);
            const userRef = doc(db, "users", currentUser.uid);

            try {
                if (isLiked) {
                    await updateDoc(postRef, {
                        likes: arrayRemove(currentUser.uid),
                        like: likeCount - 1,
                    });
                    setLikeCount(likeCount - 1);
                } else {
                    await updateDoc(postRef, {
                        likes: arrayUnion(currentUser.uid),
                        like: likeCount + 1,
                    });
                    setLikeCount(likeCount + 1);
                }

                setIsLiked(!isLiked);

                if (isLiked) {
                    currentUser.likedPosts = currentUser.likedPosts.filter(postId => postId !== id);
                } else {
                    currentUser.likedPosts = [...(currentUser.likedPosts || []), id];
                }

                await updateDoc(userRef, {
                    likedPosts: currentUser.likedPosts,
                });

            } catch (error) {
                console.error("Error updating like:", error);
            }
        }
    };


    const postTime = post.timestamp ? post.timestamp.toDate() : null;
    const formattedTime = postTime
      ? postTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false,month: "2-digit", day: "2-digit", year: "2-digit" }): "";

  

    const handlePostComment = async () => {
        const postRef = doc(db, "posts", id);
        setShowEmojis(false);

        try {
            await updateDoc(postRef, {
                comments: arrayUnion(newComment),
            });

            setComments([...comments, newComment]);

            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }

    };

    const handleDeleteClick = async () => {
        const postRef = doc(db, "posts", id);

        try {
            await deleteDoc(postRef);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const emojis = ["😀", "😍", "😎", "🔥", "👍", "❤️", "👏", "🙌", "🎉", "🥳", "🤩", "🤗"];

    return (
        <div className="col-md-7 m-5">
            <div className="card shadow w3-card">
                <div className="card-header text-capitalize d-flex justify-content-between">
                    {userName}
                    {currentUser.uid === post.userId && (
                        <div class="dropdown">
                        <button class="btn d-flex fs-5 z-index-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <ion-icon name="more"></ion-icon>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li><a class="dropdown-item" onClick={handleDeleteClick}>Delete Post</a></li>
                        </ul>
                      </div>
                    ) || (<small className="float-end text-secondary">{ formattedTime }</small>) }
                </div>
                <img src={imageUrl} className="card-img-top h-75" alt="..." />
                <div className="card-body">
                <div onClick={handleLikeClick} className="likes text-dark fs-5">
                        {isLiked ? (
                            <span>❤️ {likeCount}</span>
                        ) : (
                            <span>
                                <ion-icon name="heart-empty"></ion-icon> {likeCount}
                            </span>
                        )}
                    </div>
                    <h6 className="card-title">{comment}</h6>
                    <p className="card-text">
                        {post.comments > "" && post.comments.slice(Math.max(post.comments.length - 2, 0)).map((c, index) => (
                            <div className="d-flex align-items-center">
                                <p key={index}><ion-icon name="send"></ion-icon> {c}</p>
                            </div>
                        ))}
                    </p>
                    <div className="input-group mb-3">
                        <span className="input-group-text btn-insta" style={{cursor:"pointer"}} onClick={() => setShowEmojis(!showEmojis)} id="basic-addon1">😀</span>
                        <input type="text" className="form-control" placeholder="Comments" aria-label="Comments" aria-describedby="basic-addon1" value={newComment}
                            onChange={(e) => setNewComment(e.target.value)} />
                        <a className="input-group-text" type="submit" id="button-addon2" onClick={handlePostComment}><ion-icon name="send"></ion-icon></a>
                        {showEmojis && (
                            <div className="emoji-list mt-3 border">
                                {emojis.map((emoji, index) => (
                                    <span
                                        key={index}
                                        className="emoji p-1 m-1 pb-0 mb-0"
                                        onClick={() => setNewComment(newComment + emoji)}
                                        style={{cursor:"pointer"}}
                                    >
                                        {emoji}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Post;