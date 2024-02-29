import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';
import ContentContext from '../../context/content';

export default function Comments({ docId, comments: allComments, posted, commentInput, content }) {
    const [comments, setComments] = useState(allComments);
    const [commentsSlice] = useState(3);
    const { setPopupContent } = useContext(ContentContext);

    const showNextComments = () => {
        // setCommentsSlice(commentsSlice + 3);
        setPopupContent({ content: content, username: content.username });
    };

    return (
        <div className="comments">
            <div className="comments__container">
                {comments.length >= 3 && commentsSlice < comments.length && (
                    <p
                        className="comments__more"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                showNextComments();
                            }
                        }}
                    >
                        View all {comments.length} comments
                    </p>
                )}
                {comments.slice(0, commentsSlice).map((item) => (
                    <p key={`${item.comment}-${item.displayName}`} className="comments__comment">
                        <Link to={`/p/${item.displayName}`} className="comments__link">
                            <span className="comments__name">{item.displayName}</span>
                        </Link>
                        <span className="comments__comment-txt">{item.comment}</span>
                    </p>
                ))}
                <p className="comments__date">{formatDistance(posted, new Date())} ago</p>
            </div>
            <AddComment docId={docId} comments={comments} setComments={setComments} commentInput={commentInput} />
        </div>
    );
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired
};
