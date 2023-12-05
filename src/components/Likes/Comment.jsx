import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { firestore } from "../../Api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../Api/firebase";
import "./Comment.scss";

export default function Comment({
  id,
  commentp,
  postImg,
  createdUserPhoto,
  setCommentModal,
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const [showEmojis, setShowEmojis] = useState(false);
  const [newComment, setNewComment] = useState("");
  const commentRef = doc(firestore, "Articles", id);
  const [selectedEmoji, setSelectedEmoji] = useState(null); // New state to store the selected emoji
  useEffect(() => {
    const docRef = doc(firestore, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const closeModal = () => {
    setCommentModal(null); // Set the state to null or false based on your implementation
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojis(false);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    const lastChar = inputText.slice(-1);

    if (lastChar === " " && selectedEmoji) {
      setComment(`${comment}${selectedEmoji} `);
      setSelectedEmoji(null);
    } else {
      setComment(inputText);
    }
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      const finalComment = `${comment}${selectedEmoji || ""}`; // Include selected emoji in the comment
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: finalComment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
        setSelectedEmoji(null); // Clear selected emoji after posting the comment
      });
    }
  };

  const emojis = [
    "😀",
    "😍",
    "😎",
    "🔥",
    "👍",
    "❤️",
    "👏",
    "🙌",
    "🎉",
    "🥳",
    "🤩",
    "🤗",
  ];

  // delete comment function
  const handleDeleteComment = (comment) => {
    // console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        // console.log(e);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <>
    
      <div className="comment_container">
        <div className="posts_con">
          
          <div className="post__image">
            <img src={postImg} alt="" />
          </div>
        </div>
        
        <div className="container">
        <button onClick={closeModal} style={{border:'none', marginLeft: '475px', fontSize: '20px', backgroundColor: 'white', padding: '4px'}}>X</button>
          {currentlyLoggedinUser && (
            <>
              <div className="emoji-input-container">
                <input
                  type="text"
                  className="form-control mt-4 mb-5 w-100 inp-comment"
                  value={comment}
                  onChange={handleInputChange}
                  placeholder="Add a comment"
                  onKeyUp={handleChangeComment}
                />
                {selectedEmoji && (
                  <span className="selected-emoji">{selectedEmoji}</span>
                )}
                <span
                  className=""
                  style={{ cursor: "pointer", fontSize: "22px" }}
                  onClick={() => setShowEmojis(!showEmojis)}
                  id="basic-addon1"
                >
                  😀
                </span>
                {showEmojis && (
                  <div className="emoji-list">
                    {emojis.map((emoji, index) => (
                      <span
                        key={index}
                        className="emoji p-1 m-1 pb-0 mb-0"
                        onClick={() => handleEmojiClick(emoji)}
                        style={{ cursor: "pointer" }}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {comments !== null &&
            comments.map(
              ({ commentId, user, comment, userName, createdAt }) => (
                <div key={commentId}>
                  <div className="border p-2 mt-2 row">
                    <div className="col-11">
                      <span
                        className={`badge ${
                          user === currentlyLoggedinUser.uid
                            ? "bg-success"
                            : "bg-primary"
                        }`}
                      >
                        <div className="header-img-container " >
                          <img
                            className="card-header-img"
                            src={createdUserPhoto}
                            alt=""
                            style={{ width: '25px', height: '25px', }}
                          />
                          <h3 style={{ marginRight: '390px'}}>{userName}</h3>
                        </div>

                      </span>
                      <div style={{ display: 'flex'}}>
                      <p style={{ marginLeft: '8px', margin: '3px'}}>{comment} </p>
                      <p style={{ marginTop: '4px', marginLeft: '430px'}}>{user === currentlyLoggedinUser.uid && (
                        <i
                          className="fa fa-times"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleDeleteComment({
                              commentId,
                              user,
                              comment,
                              userName,
                              createdAt,
                            })
                          }
                        ></i>
                      )}</p>
                      </div>
                      <hr />
                    </div>
                    <div className="col-1">
                      
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <div className="w-screen"></div>
    </>
  );
}