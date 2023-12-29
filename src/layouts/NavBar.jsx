import "./style/style.css";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import React, { useContext, useState } from "react";
import { EDIT_PROFILE, HOME, SEARCH, CREATE } from "../constants/routes";

const NavBar = () => {
  const portal = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { firebase } = useContext(FirebaseContext);
  const {
    user: { avatarSrc, username, fullName },
  } = useUser();
  
  const btnToggle = () => setIsOpen (!isOpen);

  return (
    <>
        <div className="container-fluids">
            <nav className="navbar-box d-flex align-items-center">
                <div style={{width: isOpen ? "16rem" : "100px"}} className="sidebar d-flex justify-content-center flex-column">
                    <div className="profile-box d-flex justify-content-between fixed-top p-4">
                        <div className="img d-flex justify-content-around align-items-center">
                            <div className="imges">
                                <img style={{width: isOpen ? "100px" : "100px", height: isOpen ? "100px" : "40px"}} src={avatarSrc} alt="..." className="img-fluid rounded-circle mt-4" />
                            </div>
                            <div className="d-flex position-absolute mt-4">
                                <h5 style={{display: isOpen ? "block" : "none", marginLeft: "190px"}}>{username} <span className="text-muted mt-2" style={{fontSize: "20px"}}>{fullName}</span></h5>
                            </div>
                        </div>
                        <div style={{left: isOpen ? "90%" : "70px"}} role="button" onClick={btnToggle} className="menu-icon d-flex align-items-end position-absolute">
                            <ion-icon name="menu-outline"></ion-icon>
                        </div>
                    </div>
                    <div className="nav-list d-flex flex-column">
                        <div className="list d-flex flex-column">
                            <p onClick={() => portal(HOME)} className="d-flex" role="button"><span><ion-icon name="home-outline"></ion-icon></span> <span className="ms-3 span" style={{display: isOpen ? "block" : "none"}}>Home</span></p>
                            <p onClick={() => portal(SEARCH)} className="d-flex" role="button"><span><ion-icon name="search-outline"></ion-icon></span> <span className="ms-3 span" style={{display: isOpen ? "block" : "none"}}>Search</span></p>
                            <p onClick={() => portal(CREATE)} className="d-flex" role="button"><span><ion-icon name="add-circle-outline"></ion-icon></span> <span className="ms-3 span" style={{display: isOpen ? "block" : "none"}}>Create</span></p>
                            <p onClick={() => portal(`/${username}`)} className="d-flex" role="button"><span><ion-icon name="person-circle-outline"></ion-icon></span> <span className="ms-3 span" style={{display: isOpen ? "block" : "none"}}>Profile</span></p> 
                            <p onClick={() => portal(EDIT_PROFILE)} className="d-flex" role="button"><span><ion-icon name="settings-outline"></ion-icon></span> <span className="ms-3 span" style={{display: isOpen ? "block" : "none"}}>Settings</span></p>
                        </div>
                        <div className="list fixed-bottom">
                            <hr />
                            <p onClick={() => firebase.auth().signOut()} className="d-flex" role="button"><span className="ms-3 mt-1"><ion-icon name="log-out-outline"></ion-icon></span> <span className="ms-3 span" style={{display: isOpen ? "block" : "none"}}>Log Out</span></p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </>
  );
};

export default NavBar;
