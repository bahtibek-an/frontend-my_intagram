import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import LoggedInUserContext from '../../context/logged-in-user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { username: displayName } = {} } = useContext(LoggedInUserContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([...comments, { displayName, comment }]);
        setComment('');

        return firebase
            .firestore()
            .collection('photos')
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    };

    return (
        <div className="add-comment">
            <form className="add-comment__form" method="POST" onSubmit={(event) => (comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault())}>
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="add-comment__input"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button className={`btn-simple add-comment__btn ${!comment && 'add-comment__btn--off'}`} type="button" disabled={comment.length < 1} onClick={handleSubmitComment}>
                    Post
                </button>
            </form>
        </div>
    );
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    commentInput: PropTypes.object
};
