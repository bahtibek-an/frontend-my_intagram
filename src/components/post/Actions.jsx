import UserContext from "../../context/user";
import React, { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
    const [ likes, setLikes ] = useState(totalLikes);
    const [ toggleLiked, setToggleLiked ] = useState(likedPhoto);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    };

    return (
        <>
            <div className="d-flex">
                <div onClick={handleToggleLiked} className="like">
                    {!toggleLiked ? (<h4 role="button"><ion-icon name="heart-outline"></ion-icon></h4>) : (<h4 role="button" style={{color: "#fd1d1d"}}><ion-icon name="heart"></ion-icon></h4>)}
                </div>
                <h4 onClick={handleFocus} role="button" className="ms-3"><ion-icon name="chatbubble-ellipses-outline"></ion-icon></h4>
            </div>
            <span>{likes} likes</span> <br />
        </>
    );
};

export default Actions;