import { formatDistance } from "date-fns";
import UserContext from "../../context/user";
import { EMOJISCHAR } from "../../helpers/Emojis";
import FirebaseContext from "../../context/firebase";
import React, { useContext, useState, useRef } from "react";

const FooterModal = ({ post, setPost }) => {
    const commentInput = useRef(null);
    const { user } = useContext(UserContext);
    const [ comment, setComment ] = useState('');
    const [ likes, setLikes ] = useState(post?.likes?.length);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const [ toggleLiked, setToggleLiked ] = useState(post.userLikedPhoto);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection("photos")
            .doc(post.docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(user.uid) : FieldValue.arrayUnion(user.uid)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    };

    const addComment = async () => {
        const comments = [...post.comments, { comment, displayName: user.displayName}];

        setPost({ ...post, comments });
        await firebase
            .firestore()
            .collection("photos")
            .doc(post.docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName: user.displayName, comment })
            });

        return setComment('');
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="likes">
                    <h3 onClick={handleToggleLiked} className="d-flex align-items-center justify-content-center">
                        {!toggleLiked ? (<h4 role="button"><ion-icon name="heart-outline"></ion-icon></h4>) : (<h4 role="button" style={{color: "#fd1d1d"}}><ion-icon name="heart"></ion-icon></h4>)}  
                        <i style={{fontSize: "20px"}} className="ms-2 mb-3">{likes === 1 ? `${likes} like` : `${likes} likes`}</i>
                    </h3>
                    <span className="text-muted position-absolute" style={{marginTop: "-25px"}}>{ formatDistance(post.dateCreated, Date.now()) } ago</span>
                </div>
            </div>
            <div className="forms">
                <div className="btn-group dropup d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-primary dropdown-toggle h-25 mt-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <ion-icon name="happy-outline"></ion-icon>
                    </button>
                    <ul className="dropdown-menu container-fluid text-center">
                        <div className="row row-cols-12 p-2">
                            {EMOJISCHAR.map(emoji => (
                                <div className="col" onClick={() => setComment(`${comment}${emoji}`)}>
                                    <span role="button">{ emoji }</span>
                                </div>
                            ))}
                        </div>
                    </ul>
                    <div className="input-group mt-3 m-0"> 
                        <input value={comment} onChange={e => setComment(e.target.value)} ref={commentInput} type="text" className="form-control bg-transparent text-light" placeholder="Add a comment" aria-describedby="post" required />
                        <button className="btn btn-outline-primary" type="button" onClick={addComment} id="post">Post</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterModal;