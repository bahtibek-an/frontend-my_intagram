import { useNavigate } from "react-router-dom";
import React, { memo, useContext } from "react";
import FirebaseContext from "../../context/firebase";

const User = ({ username, avatarSrc, fullName }) => {
  const portal = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  return(
    <>
      <div className="user-profile d-flex justify-content-around align-items-center mt-3">
        <div onClick={() => portal(`/${username}`)} className="d-flex justify-content-around align-items-center mt-1">
          <div className="img">
            <img src={avatarSrc} alt={username} onError={(e) => { e.target.src = "/images/avatars/default/.jpg"; }} className="img-fluid rounded-circle" />
          </div>
          <div className="ms-2 mt-2">
            <p>{username} <br /> <span className="text-muted" style={{fontSize: "20px"}}>{fullName}</span></p>
          </div>
        </div>
        <div className="log-out">
          <button onClick={() => firebase.auth().signOut()} className="btn btn-outline-primary">Log Out</button>
        </div>
      </div>
    </>
  );
};

export default memo(User);