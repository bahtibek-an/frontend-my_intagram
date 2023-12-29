import Skeleton from "react-loading-skeleton";
import React, { useState, useEffect } from "react";
import { getSuggestedProfiles } from "../../services/firebase";

const SuggestedProfile = React.lazy(() => import("./SuggestedProfile"));

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
    const [ profiles, setProfiles ] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if(userId) {
            suggestedProfiles();
        }
    }, [userId]);
    
    return !profiles ? (
        <Skeleton count={1} height={150}/>
    ) : profiles.length ? (
        <div className="sugest-post">
            {profiles.map((profile) =>
                <SuggestedProfile key={profile.docId}
                    profileImage={profile.avatarSrc}
                    profileDocId={profile.docId}
                    username={profile.username}
                    profileId={profile.userId}
                    userId={userId}
                    loggedInUserDocId={loggedInUserDocId}/>
            )}
        </div>
    ) : null
};

export default Suggestions;