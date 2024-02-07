import { useState, useContext, useRef } from 'react';
import FileInput from '../components/file-input';
import PageTemplate from '../templates/page-template';
import UserContext from '../context/user';
import useUser from '../hooks/use-user';
import { useHistory } from 'react-router-dom';
import { firebase } from '../lib/firebase';
import Firebase from 'firebase/app';
import { addPhoto } from '../services/firebase';
import 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Publish() {
    //0 - 100
    const [isUploading, setIsUploading] = useState(false);

    const history = useHistory();
    //Get the user
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);

    const [img, setImg] = useState();

    const toastId = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!img) return;

        const formData = new FormData(e.target);

        setIsUploading(true);

        const storage = firebase.storage();
        const storageRef = storage.ref();

        const photoId = uuidv4();
        const imageSrc = user.userId + '/' + photoId;
        const uploadTask = storageRef.child(imageSrc).put(img);

        uploadTask.on(
            Firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                //Toast showing progress
                if (toastId.current === null) {
                    toastId.current = toast('Upload in Progress', {
                        progress: progress
                    });
                } else {
                    toast.update(toastId.current, {
                        progress: progress
                    });
                }
            },
            (error) => {
                throw error;
            },
            () => {
                toast.update(toastId.current, {
                    render: 'Post published',
                    progress: 0,
                    type: 'success'
                });
                addPhoto(user, photoId, imageSrc, formData.get('caption'));
                //Finished
                history.push('/p/' + user.username);
            }
        );
    };

    return (
        <PageTemplate>
            <ToastContainer />
            <div className="publish">
                <div className="publish__initial">
                    {/*<div className="publish__drop-container noselect">
                        Drop your picture here
                    </div>*/}
                    <div className="publish__file-input">
                        <FileInput setImg={setImg} isUploading={isUploading} />
                    </div>
                    <>
                        {img && <img src={URL.createObjectURL(img)} className="publish__img" alt="uploaded" />}
                        <form className="edit-profile__form" onSubmit={handleSubmit}>
                            <div className="edit-profile__form-item">
                                <div className="edit-profile__input-group">
                                    <input type="text" className="edit-profile__input" placeholder="Caption" name="caption" />
                                    <label className="edit-profile__title">Caption</label>
                                </div>
                            </div>
                            <div className="edit-profile__form-item">
                                <button className="btn edit-profile__submit">Post</button>
                            </div>
                        </form>
                    </>
                </div>
            </div>
        </PageTemplate>
    );
}
