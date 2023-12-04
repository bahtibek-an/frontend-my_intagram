/** @format */

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
export default function Comment({ id, commentp, postImg, createdUserPhoto , setCommentModal}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(firestore, "Articles", id);
  useEffect(() => {
    const docRef = doc(firestore, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

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
      <div className='comment_container'>
    <div className="close-con" onClick={()=>setCommentModal(false)}>
        <img src="https://t3.ftcdn.net/jpg/03/64/30/82/360_F_364308273_cV9OrZrqUpZ8En9rC8KxBqaxkVg95ZTY.jpg" />
    </div>
        <div className='posts_con'>
          <div className='post__image'>
            <img src={postImg} alt='' />
          </div>
        </div>
        <div className='container'>
          {comments !== null &&
            comments.map(
              ({ commentId, user, comment, userName, createdAt }) => (
                <div key={commentId}>
                  <div className='border p-2 mt-2 row'>
                    <div className='col-11'>
                      <span
                        className={`badge ${
                          user === currentlyLoggedinUser.uid
                            ? "bg-success"
                            : "bg-primary"
                        }`}>
                        <div class='header-img-container '>
                          <img
                            class='card-header-img'
                            src={createdUserPhoto}
                            alt=''
                          />
                        <h3>{userName}</h3>
                        </div>

                        <br />
                      </span>
                      {comment}
                      <hr />
                    </div>
                    <div className='col-1'>
                      {user === currentlyLoggedinUser.uid && (
                        <i
                          className='fa fa-times'
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleDeleteComment({
                              commentId,
                              user,
                              comment,
                              userName,
                              createdAt,
                            })
                          }></i>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          {currentlyLoggedinUser && (
            <input
              type='text'
              className='form-control mt-4 mb-5 w-100 inp-comment'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder='Add a comment'
              onKeyUp={(e) => {
                handleChangeComment(e);
              }}
            />
          )}
        </div>
      </div>
      <div className='w-screen'></div>
    </>
  );
}
