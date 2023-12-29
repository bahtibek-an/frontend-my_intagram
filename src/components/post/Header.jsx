import React from "react";
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ username, avatarSrc, posted }) => {
    const portal = useNavigate();
    
    return (
        <div className="user-profile d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-around">
                <div className="img">
                    <img style={{width: "50px", height: "50px"}} src={avatarSrc} alt="..." className="img-fluid rounded-circle" />
                </div>
                <div className="ms-2 mt-1">
                    <p>{ username } <span className="text-muted ms-1">{ formatDistance(posted, Date.now()) } ago</span></p>
                </div>
            </div>
            <div className="unfollow">
                <button onClick={() => portal(`/${username}`)} className="btn btn-outline-primary">Profile</button>
            </div>
        </div>
    );
};

export default Header;