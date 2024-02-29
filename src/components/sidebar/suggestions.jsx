/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

export default function Suggestions({ userId, following, loggedInUserDocId }) {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if (userId) {
            suggestedProfiles();
        }
    }, [userId, following]);
    // hint: use the firebase service (call using userId)
    // getSuggestedProfiles
    // call the async function ^^^^ within useEffect
    // store it in state
    // go ahead and render (wait on the profiles as in 'skeleton')

    return !profiles ? (
        <Skeleton count={1} height={150} />
    ) : profiles.length > 0 ? (
        <div className="suggestions">
            <p className="suggestions__text">Suggestions For You</p>
            <div className="suggestions__container">
                {profiles.map((profile) => (
                    <SuggestedProfile key={profile.docId} profileDocId={profile.docId} username={profile.username} profileId={profile.userId} userId={userId} loggedInUserDocId={loggedInUserDocId} />
                ))}
            </div>
        </div>
    ) : null;
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
};
