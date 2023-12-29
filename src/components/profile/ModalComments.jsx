import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserByUsername } from "../../services/firebase";

const ModalComments = ({ comment }) => {
    const portal = useNavigate();
    const [ user, setUser ] = useState({});

    const getUser = async () => {
        const [ result ] = await getUserByUsername(comment.displayName.toLowerCase());
        setUser(result);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-start p-2">
                <div className="avatar-img">
                    {user && (
                        <>
                            <img
                                style={{width: "80px", height: "80px"}}
                                className="rounded-circle img-fluid"
                                src={user?.avatarSrc} 
                                alt="..."
                            />
                        </>
                    )}
                </div>
                <div className="user-text ms-3" onClick={() => portal(comment.displayName)}>
                    <p>
                        {comment.displayName} <br />
                        <i>{" "} {comment.comment}</i>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ModalComments;