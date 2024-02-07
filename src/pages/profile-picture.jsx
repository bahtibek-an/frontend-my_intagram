import { useState, useContext, useRef } from 'react';
import FileInput from '../components/file-input';
import PageTemplate from '../templates/page-template';
import UserContext from '../context/user';
import useUser from '../hooks/use-user';
import { useHistory } from 'react-router-dom';
import { firebase } from '../lib/firebase';
import Firebase from 'firebase/app';
import 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePicture() {
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

        setIsUploading(true);

        const storage = firebase.storage();
        const storageRef = storage.ref();

        const imageSrc = `avatars/${user.username}.jpg`;
        console.log(imageSrc);
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
                    render: 'Profile picture updated.',
                    progress: 0,
                    type: 'success'
                });
                //Finished
                history.push('/p/' + user.username);
                window.location.reload(false);
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
                            <p style={{ fontSize: '1.4rem' }}>Click update to use your new profile picture.</p>
                            <button className="btn" style={{ padding: '0 .5rem', marginTop: '1rem' }}>
                                Update
                            </button>
                        </form>
                    </>
                </div>
            </div>
        </PageTemplate>
    );
}
