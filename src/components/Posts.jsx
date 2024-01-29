import React, { useContext, useState } from 'react';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import Comments from './Comments';

const Posts = ({ post, setPost }) => {
  const { currentUser } = useContext(AuthContext);
  const { id, imageUrl, comments: postComments, userName, likes, description } = post;
  const liked = likes?.find((l) => l.userId == currentUser.uid)?.isLiked;
  const [isLiked, setIsLiked] = useState(liked ? liked : false);
  const [newComment, setNewComment] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLikeClick = async () => {
    const postRef = doc(db, 'posts', id);

    try {
      setIsLiked((prevIsLiked) => !prevIsLiked);
      await updateDoc(postRef, {
        likes: isLiked
          ? arrayRemove({ userId: currentUser.uid, userName: currentUser.displayName, isLiked: true })
          : arrayUnion({ userId: currentUser.uid, userName: currentUser.displayName, isLiked: true }),
      });
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment) {
      return;
    }
    const postRef = doc(db, 'posts', id);
    console.log(currentUser.uid);
    try {
      await updateDoc(postRef, {
        comments: arrayUnion({
          user_id: currentUser.uid,
          username: currentUser.displayName,
          comment: newComment,
        }),
      });

      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className='card post mb-2 shadow'>
      <Comments comments={post?.comments} show={show} handleClose={handleClose} handleShow={handleShow} />

      <div className='card-header'>{userName}</div>
      <div className='d-flex align-items-center justify-content-center p-4 '>
        <img src={imageUrl} className='card-img-top' alt='post image' style={{ maxWidth: '400px' }} />
      </div>
      <div className='card-body'>
        <div className='card-title d-flex'>
          <div className='d-flex align-items-center'>
            <button
              onClick={handleLikeClick}
              className='fs-3 p-2 ps-0 text-dark bg-transparent'
              style={{
                width: '40px !important',
                height: '40px !important',
                minHeight: '40px',
                minWidth: '40px',
                maxWidth: '40px',
                maxHeight: '40px',
              }}
            >
              <ion-icon name={isLiked ? 'heart' : 'heart-outline'} style={{ color: 'red' }}></ion-icon>
            </button>
            <button
              onClick={handleShow}
              className='fs-3 text-dark bg-transparent p-2'
              style={{
                width: '40px !important',
                height: '40px !important',
                minHeight: '40px',
                minWidth: '40px',
                maxWidth: '40px',
                maxHeight: '40px',
              }}
            >
              <ion-icon name='chatbubble-ellipses-outline'></ion-icon>
            </button>
          </div>
        </div>
        <p className='card-text fw-medium'>{likes?.length ?? 0} отметок "Нравится"</p>
        <p className='card-text fw-medium'>
          {userName} <span className='fw-normal'>{description}</span>
        </p>
        <p className='card-text mb-1'>
          comment:{' '}
          {postComments?.length ? (
            postComments?.slice(0, 1).map((c, index) => (
              <p key={index} className='m-0'>
                <span className='fw-medium'>{c.username} </span>
                {c.comment}
              </p>
            ))
          ) : (
            <span className='text-danger'>not comments</span>
          )}
        </p>
        {postComments?.length && (
          <button
            className='bg-transparent my-2'
            onClick={() => {
              setPost(post);
              handleShow();
            }}
          >
            Посмотреть все комментарии {postComments.length}
          </button>
        )}
        <div className='input-group mb-3'>
          <span className='input-group-text' id='basic-addon1'>
            😊
          </span>
          <input
            type='text'
            className='form-control'
            placeholder='write comment...'
            aria-label='Username'
            aria-describedby='basic-addon1'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className='btn btn-outline-secondary mt-2' type='button' onClick={handlePostComment}>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
