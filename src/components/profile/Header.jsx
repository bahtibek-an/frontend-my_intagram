import useUser from "../../hooks/useUser";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { EDIT_PROFILE } from "../../constants/routes";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

const Header = ({
  user: currentUser,
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
    avatarSrc,
  },
}) => {
  const { user } = useUser();
  const portal = useNavigate();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <>
      <div className="profile p-5">
        <div className="user d-flex justify-content-start align-items-center">
          <div className="img ms-5">
            <img style={{width: "200px", height: "200px"}} src={avatarSrc} alt="Error" className="img-fluid rounded-circle" />
          </div>
          <div className="ms-4">
            <p className="fs-5">{profileUsername}</p>
            {followers === undefined || following === undefined ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p>
                  <span role="button">{photosCount} {` `} Posts</span>
                  <span className="ms-3" role="button">{followerCount} {` `} {followerCount === 1 ? `Follower` : `Followers`}</span>
                  <span className="ms-3" role="button">{following.length} {` `} Following</span>
                </p>
              </>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <p className="fs-5">{fullName}</p>
              {activeBtnFollow && (
                <button className="btn btn-primary mb-2"
                  type="button" onClick={handleToggleFollow}>
                  {isFollowingProfile ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
            <p className="bio">{currentUser.aboutMe}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;