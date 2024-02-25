import React, { useContext, useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Firestoredb } from "../firebase";
import { AuthContext } from "../Authentication";

export default function Post({ post }) {
  const [likeCount, setLikeCount] = useState(post.likes);
  const [newComment, setNewComment] = useState("");
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [unlike, setUnlike] = useState(false);

  useEffect(() => {
    setUnlike(
      Array.isArray(post.likes) && post.likes.includes(currentUser.uid)
    );
    setComments(post.comments || []);
  }, [post.likes, post.comments, currentUser.uid]);

  const handleDeletePost = async () => {
    const postRef = doc(Firestoredb, "Posts", post.id);

    try {
      await deleteDoc(postRef);
    } catch (error) {}
  };

  const handleLikeClick = async () => {
    const postRef = doc(Firestoredb, "Posts", post.id);

    try {
      if (unlike) {
        await updateDoc(postRef, {
          likes: post.likes.filter((uid) => uid !== currentUser.uid),
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
    const postRef = doc(Firestoredb, "Posts", post.id);

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
      setComment([...post.comments, commentData]);
    } catch (error) {}
  };

  return (
    <>
      <section className="main">
        <div className="wrapper">
          <div className="left-col">
            <div className="post">
              <div className="info">
                <div className="user">
                  <div className="profile-pic">
                    <img
                      src={
                        post.userUrl ||
                        "https://img.freepik.com/free-vector/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.jpg?w=740&t=st=1708760871~exp=1708761471~hmac=832cfa51e0d4102b22dc8ee05dcf136ca540306c8044e1059fef673e84cb4e72"
                      }
                      alt="Profile Pic"
                    />
                  </div>
                  <p className="username">{post.userName}</p>
                </div>
                {currentUser.uid == post.userId && (
                  <a onClick={handleDeletePost}>
                    <div className="remove-btn">&times;</div>
                  </a>
                )}
              </div>
              <img
                src={post.imageUrl}
                className="post-image"
                alt="Post Image"
              />
              <div className="post-content">
                <div className="reaction-wrapper">
                  {unlike ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleLikeClick}
                      className="icon"
                      viewBox="0 0 512 512"
                      fill="red"
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleLikeClick}
                      className="icon"
                      viewBox="0 0 512 512"
                      fill="gray"
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  )}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="save icon"
                  >
                    <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                  </svg>
                </div>
                <p className="likes">{post?.likes?.length || 0} like</p>
                <p className="description">
                  <span>{post.userName} </span> {post.caption}
                </p>
                <p className="post-time">{post?.date?.toString()}</p>
                <h4>Comments</h4>
                <p className="post-time">
                  {comments.slice(-3).map((comment, index) => (
                    <span style={{ display: 'block' }} key={index}>
                      <span> {comment.username} : {comment.text}</span>
                    </span>
                  ))}
                  {post?.comments?.length || 0} Comments
                </p>
              </div>
              <div className="comment-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="icon"
                  onClick={(e) => setNewComment((text) => text + "😂")}
                >
                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
                <input
                  type="text"
                  className="comment-box"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="comment-btn" onClick={handlePostComment}>
                  post
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
