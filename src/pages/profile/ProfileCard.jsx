import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import './ProfileCard.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../context/FirebaseConfig';

const ProfileCard = ({isOpen, onClose, children, modalInfo, deletePost}) => {
    const localUser = JSON.parse(localStorage.getItem('authUser'))
    const [postData, setPostData] = useState({});

    const fetchData = async () => {
      const docRef = doc(db, "posts", modalInfo?.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPostData(docSnap.data());
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // console.log("localUser", localUser)
    // console.log("local", localUser);
    

    return (
        <div className='modal'>
            <div className='modal-wrapper'>
                <div className='modal-content'>
                    <button className='modal-close-button' onClick={()=> onClose()} >
                    <ClearIcon/>
                    {postData.userId === localUser.uid && (
                        <DeleteIcon onClick={() => deletePost(modalInfo)}/>
                    )}
                    </button>
                    {
                        postData.userId !== localUser.uid && (
                            <img src={postData.imageUrl} alt="post" style={{width: "100%"}} />
                        )
                    }
                    <span>Delete Post</span>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;