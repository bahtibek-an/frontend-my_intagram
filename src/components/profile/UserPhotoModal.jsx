import "./style.css";
import FooterModal from "./FooterModal";
import { storage } from "../../lib/firebase";
import UserContext from "../../context/user";
import Skeleton from "react-loading-skeleton";
import { UserProfileContext } from "./UserProfile";
import UserPhotoModalComments from "./UserPhotoModalComments";
import React, { useEffect, useState, useContext } from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deletePhotoByDocId, getPhotosByPhotoId, getUserByUserId } from "../../services/firebase";

const style = {
  position: 'absolute',
  width: '90%',
  height:'35rem',
  borderRadius: '40px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const UserPhotoModal = ({ setOpen, photo }) => {
  const [post, setPost] = useState();
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(UserContext);
  const { getProfileInfoAndPhotos } = useContext(UserProfileContext);

  const getPhotoInformation = async () => {
    const result = await getPhotosByPhotoId(currentUser.uid, photo.photoId);
    setPost(result);
  };

  const getCurrentUser = async () => {
    if (photo.userId) {
      const [result] = await getUserByUserId(photo.userId);
      setUser(result);
    }
  };

  const deletePost = async () => {
    alert("Are you delete this picture");
    await deletePhotoByDocId(photo.docId);
    const storageRef = storage.refFromURL(photo.imageSrc);
    const fullPath = storageRef.fullPath;

    const storageImage = getStorage();
    const desertRef = ref(storageImage, fullPath);

    deleteObject(desertRef)
      .then(() => {
        alert("Success");
      })
      .catch((error) => {
        alert(error.message);
      });
    setOpen(false);
    getProfileInfoAndPhotos();
  };

  useEffect(() => {
    getCurrentUser();
    if (photo.photoId) {
      getPhotoInformation();
    }
  }, [photo.userId]);

  return ( 
    <div>
      <div className="d-flex justify-content-between align-items-center position-absolute bg-dark" style={style}>
        <div className="post-img w-50 h-100">
          {photo.imageSrc ? (
              <img className="img-fluid" src={photo.imageSrc} style={{width: "100%", height: "100%", borderRadius: "40px"}} />
            ) : (
            <Skeleton count={1} height={695} width={'full'} borderRadius={40} />
          )}
        </div>
        <div className="post-comment w-50 h-100 p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="user">
              <h3>{user.username}</h3>
            </div>
            <div className="close d-flex">
              <button className="btn btn-danger me-2" onClick={deletePost}><ion-icon name="trash-outline"></ion-icon></button>
              <button className="btn btn-primary d-flex align-items-center fs-3" onClick={() => setOpen(false)}><ion-icon name="close-outline"></ion-icon></button>
            </div>
          </div>
          <hr />
          <div className="post-comment overflow-auto" style={{height: "60%"}}>
            {post && (
              <UserPhotoModalComments 
                photo={post}
              />
            )}
          </div>
          <hr />
          <div className="post-footer">
            {post && <FooterModal post={post} setPost={setPost} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPhotoModal;