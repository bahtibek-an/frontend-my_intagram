import { useRef, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import { firebase } from '../../lib/firebase';
import 'firebase/storage';
import Skeleton from 'react-loading-skeleton';
import ContentContext from '../../context/content';

export default function Post({ content }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    const [imgUrl, setImageUrl] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const image = storageRef.child(content.imageSrc);
        image.getDownloadURL().then((url) => setImageUrl(url));
    }, [content.imageSrc]);

    const { setPopupContent } = useContext(ContentContext);

    const handlePhotoClick = () => {
        setPopupContent({ content: content, username: content.username });
    };

    const image = <img style={{ cursor: 'pointer', display: loaded ? 'inline-block' : 'none' }} src={imgUrl} alt={content.caption} className="post__img" onLoad={() => setLoaded(true)} onClick={handlePhotoClick} />;

    // components
    // -> header, image, actions (like & comment icons), footer, comments
    return (
        <div className="post">
            <Header username={content.username} content={content} />
            {image}
            {!(imgUrl && loaded) && <Skeleton height="600px" />}
            <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} />
            <Footer caption={content.caption} username={content.username} />
            <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentInput} content={content} />
        </div>
    );
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
};
