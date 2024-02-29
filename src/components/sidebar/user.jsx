import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { constructMediaUrl } from '../../services/firebase';

export default function User({ username, fullName }) {
    return !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${username}`} className="user">
            <img
                className="user__img"
                src={constructMediaUrl(username)}
                alt=""
                onError={(e) => {
                    e.target.src = DEFAULT_IMAGE_PATH;
                }}
            />
            <div className="user__info">
                <span className="user__name">{username}</span>
                <span className="user__fullname">{fullName}</span>
            </div>
        </Link>
    );
}

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
};
