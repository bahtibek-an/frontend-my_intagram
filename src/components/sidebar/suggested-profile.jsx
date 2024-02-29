import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers, getUserByUserId, constructMediaUrl } from '../../services/firebase';
import LoggedInUserContext from '../../context/logged-in-user';

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId }) {
    const [followed, setFollowed] = useState(false);
    const { setActiveUser } = useContext(LoggedInUserContext);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);
        const [user] = await getUserByUserId(userId);
        setActiveUser(user);
    }

    return !followed ? (
        <div className="sug-profile">
            <div className="sug-profile__info">
                <img
                    className="sug-profile__img"
                    src={constructMediaUrl(username)}
                    alt=""
                    onError={(e) => {
                        e.target.src = `images/avatars/default.png`;
                    }}
                />
                <Link to={`/p/${username}`} className="sug-profile__link">
                    <p className="sug-profile__name">{username}</p>
                </Link>
            </div>
            <button className="btn-simple sug-profile__btn" type="button" onClick={handleFollowUser}>
                Follow
            </button>
        </div>
    ) : null;
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
};
