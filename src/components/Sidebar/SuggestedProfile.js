import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing } from '../../services/firebase';
import { updateFollowedUserFollowers } from './../../services/firebase';

const SuggestedProfile = ({ profileDocId, username, profileId, userId, loggedInUserDocId, profileImage }) => {
    const [ followed, setFollowed ] = useState(false);

    const handleFollowUser = async () => {
        setFollowed(true);

        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

        await updateFollowedUserFollowers(profileDocId, userId, false);
    }
    console.log(profileImage)
    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <div className="w-8 h-8">
                    <img
                        className="rounded-full w-full h-full"
                        src={profileImage}
                        alt=""
                    />
                </div>
                <Link className="ml-2" to={`/${username}`}>
                    <p className="font-bold text-sm">{ username }</p>
                </Link>
            </div>
            <div>
                <button
                    className="text-xs font-bold text-blue-medium"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        </div>
    ) : (
        null
    )
};

export default SuggestedProfile;
