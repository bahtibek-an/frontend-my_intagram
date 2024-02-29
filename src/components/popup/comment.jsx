import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { constructMediaUrl } from '../../services/firebase';

export default function Comment({ comment, displayName }) {
    return (
        <div className="comment">
            <img
                src={constructMediaUrl(displayName)}
                alt="User"
                className="comment__img"
                onError={(e) => {
                    e.target.src = DEFAULT_IMAGE_PATH;
                }}
            />
            <div className="comment__txt">
                <Link to={`/p/${displayName}`} className="comment__link">
                    <span className="comment__name">{displayName}</span>
                </Link>
                {comment}
            </div>
        </div>
    );
}
