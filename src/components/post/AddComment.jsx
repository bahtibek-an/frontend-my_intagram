import UserContext from "../../context/user";
import { EMOJISCHAR } from "../../helpers/Emojis";
import React, { useState, useContext } from "react";
import FirebaseContext from "../../context/firebase";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
    const [ comment, setComment ] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {
        user: { displayName }
    } = useContext(UserContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([{ displayName, comment }, ...comments]);
        setComment('');

        return firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    };

    return (
        <>
            <form onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}>
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
                        <button className="btn btn-outline-primary" type="submit" id="post">Post</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddComment;