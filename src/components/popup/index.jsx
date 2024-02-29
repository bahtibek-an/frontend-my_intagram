//Post popup
import { useState, useRef, useEffect, useContext } from 'react';
import Comment from './comment';
import Actions from './actions';
import Header from '../post/header';
import 'firebase/storage';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import FirebaseContext from '../../context/firebase';
import { constructMediaUrl } from '../../services/firebase';

//User name is the username of the user that posted, content is the content of the post
export default function Popup({ username, content, user }) {
    const [imgUrl, setImageUrl] = useState('');
    const commentInput = useRef(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(content.comments);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    //Focus to comment input when comment svg is clicked
    const handleFocus = () => commentInput.current.focus();
    console.log(content);

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const image = storageRef.child(content.imageSrc);
        image.getDownloadURL().then((url) => setImageUrl(url));
    }, [content.imageSrc, firebase]);

    const onSend = (e) => {
        e.preventDefault();
        const newComment = { displayName: user.username, comment };
        setComments([...comments, newComment]);
        setComment('');
        return firebase
            .firestore()
            .collection('photos')
            .doc(content.docId)
            .update({
                comments: FieldValue.arrayUnion(newComment)
            });
    };

    return (
        <div className="popup">
            <div className="popup__container" onClick={() => {}}>
                <div className="imgContainer">
                    {imgUrl ? (
                        <img
                            src={imgUrl}
                            alt={content.caption}
                            className="popup__img"
                            onError={(e) => {
                                e.target.src = DEFAULT_IMAGE_PATH;
                            }}
                        />
                    ) : (
                        <Skeleton height="600px" width="600px" className="popup__img" />
                    )}
                </div>

                <div className="popup__sidebar">
                    <div className="popup__header">
                        {/*<Link to={`/p/${username}`} className="popup__header-link">
                            <img
                                src={`images/avatars/${username}.jpg`}
                                alt={`${username} profile picture`}
                                className="popup__header-img"
                            />
                            <p className="popup__header-text">{username}</p>
                        </Link>
                        */}
                        <Header username={username} className="popup__header-link" />
                    </div>

                    <div className="popup__comments">
                        <div className="comment popup__caption">
                            <img
                                src={constructMediaUrl(username)}
                                alt="User"
                                className="comment__img"
                                onError={(e) => {
                                    e.target.src = DEFAULT_IMAGE_PATH;
                                }}
                            />
                            <p className="comment__txt">
                                <span className="comment__name">{username}</span>
                                {content.caption}
                            </p>
                        </div>
                        {comments.map((comment) => (
                            <Comment comment={comment.comment} displayName={comment.displayName} />
                        ))}
                    </div>

                    <div className="popup__actions">
                        <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} datePosted={content.dateCreated} />
                    </div>

                    <form className="popup__add" onSubmit={(event) => (comment.length >= 1 ? onSend(event) : event.preventDefault())}>
                        <input
                            type="text"
                            className="add-comment__input popup__input"
                            value={comment}
                            onChange={({ target }) => setComment(target.value)}
                            placeholder="Add a comment..."
                            aria-label="Add a comment"
                            autoComplete="off"
                            ref={commentInput}
                        />
                        <button className={`btn-simple add-comment__btn popup__btn ${!comment && 'add-comment__btn--off'}`}>Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
