import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateLoggedInUserFollowing } from "../../services/firebase";
import { updateFollowedUserFollowers } from "../../services/firebase";

const SuggestedProfile = ({
  profileDocId,
  username,
  fullName,
  profileId,
  userId,
  loggedInUserDocId,
  profileImage,
}) => {
  const portal = useNavigate();
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  };

  console.log(profileImage);
  
  return !followed ? (
    <div className="suggested-profile d-flex justify-content-around align-items-center mt-2">
      <div role="button" onClick={() => portal(`/${username}`)} className="d-flex justify-content-around align-items-center mt-1">
          <div className="img">
              <img src={profileImage} alt={username} className="img-fluid rounded-circle" />
          </div>
          <div className="ms-2 mt-1">
              <p>{username} <br /> <span className="text-muted">{fullName}</span></p>
          </div>
      </div>
      <div className="follow">
          <button onClick={handleFollowUser} className="btn btn-outline-primary">Follow</button>
      </div>
    </div>
  ) : null;
};

export default SuggestedProfile;