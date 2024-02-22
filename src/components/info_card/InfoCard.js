import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetSelectedProfile } from "../../Slice";
import "../info_card/InfoCard.css"

function PersonalInfoCard({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const visitProfile = () => {
    dispatch(
      SetSelectedProfile({
        selectedProfile: {
          userProfile: user.photoURL,
          userId: user.uid,
          username: user.displayName,
        },
      })
    );
    navigate("/profile");
  };
  return (
    <div className="CardWrapper">
      <div className="UserInfoWrap">
        <img src={user?.photoURL} alt="" onClick={visitProfile} />
        <div className="section">
          <h5 onClick={visitProfile}>
            <strong>{user?.displayName}</strong>
          </h5>
          <p>Welcome to the Instagram</p>
        </div>
      </div>
      <h4 onClick={() => auth.signOut()}>SignOut</h4>
    </div>
  );
}

export default PersonalInfoCard;
