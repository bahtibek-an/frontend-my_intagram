import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ModalComments = React.lazy(() => import("./ModalComments"));

const UserPhotoModalComments = ({ photo, setOpen }) => {
    const portal = useNavigate();
    const [ comments, setComments ] = useState(photo.comments);

    const redirectToUserProfile = (username) => {
        setOpen(false);
        portal(`/${username}`);
    };

    useEffect(() => {
        setComments(photo.comments);
    }, [photo.comments]);

    return (
        <div className="ms-3">
            {comments.map((comment, index) => (
                <ModalComments
                    key={index}
                    comment={comment}
                    setComments={setComments}
                    redirect={redirectToUserProfile}
                />
            ))}
        </div>
    );
};

export default UserPhotoModalComments;