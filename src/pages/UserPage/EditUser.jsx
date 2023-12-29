import { v4 as uuidv4 } from "uuid";
import useUser from "../../hooks/useUser";
import UserContext from "../../context/user";
import { storage } from "../../lib/firebase";
import { updateUser } from "../../services/firebase";
import { updateAvatarUser } from "../../services/firebase";
import { getAuth, updatePassword, updateEmail } from "firebase/auth";
import React, { useContext, useEffect, useRef, useState } from "react";

const EditUserPage = () => {
  const imageRef = useRef();
  const [email, setEmail] = useState("");
  const { user } = useContext(UserContext);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user: currentUser, updateProfile: updateProfileUser } = useUser();

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      setFullname(currentUser.fullName);
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const openChangeAvatarInput = () => {
    const avatarImageURL = currentUser.avatarSrc;
    if (avatarImageURL === "/images/avatars/default.png") {
      return imageRef.current.click();
    }
    setModalOpen(true);
  };

  const updateProfile = async () => {
    setLoading(true);
    const auth = getAuth();
    await updateEmail(auth.currentUser, email);

    if (password.trim()) {
      await updatePassword(auth.currentUser, password);
    }

    await updateUser(email, username, fullname, currentUser.docId);
    setLoading(false);
    alert("Profile was sucessfully uploaded!");
  };

  const uploadImage = async (e) => {
    setLoading(true);
    const avatar = e.target.files[0];
    const avatarId = uuidv4();
    const pathAvatar = `images/avatars/${avatarId}.jpg`;
    if (modalOpen) setModalOpen(false);
    const uploadImage = storage.ref(pathAvatar).put(avatar);

    uploadImage.on( 
      "state-changed", 
      (snapshot) => { 
      },
      () => {
        alert("Error");
        setLoading(false);
      },
      async () => {
        const imageUrl = await uploadImage.snapshot.ref
          .getDownloadURL()
          .then(async (url) => {
            const avatar = await updateAvatarUser(url, user.uid);
            updateProfileUser();
            setLoading(false);
            alert("Succesfully changed avatar!");
            console.clear(avatar);
          });
          console.clear(imageUrl);
      }
    );

    e.target.value = null;
  };

  return (
    <>
      <div className="container w-100 h-100">
        <div className="update-img p-5">
          <div className="d-flex justify-content-start align-items-center ">
            <div className="img">
              <img style={{width: "200px", height: "200px"}} src={currentUser.avatarSrc}  alt="..." className="img-fluid rounded-circle" />
            </div>
            <div className="ms-3 mt-1" onClick={openChangeAvatarInput}>
              <button className="btn btn-primary"> <input type="file" className="" ref={imageRef} onChange={uploadImage} /> Edit Profile Picture</button>
            </div>
          </div>
        </div>
        <div className="update-form">
          <h3 className="text-center">Edit Profile</h3>
          <div className="d-flex justify-content-around m-4">
            <div class="form-floating w-50 m-2">
              <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" class="form-control bg-transparent text-light w-100" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">User Name</label>
            </div>
            <div class="form-floating w-50 m-2">
              <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" class="form-control bg-transparent text-light w-100" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Full Name</label>
            </div>
          </div>
          <div className="d-flex justify-content-around m-4">
            <div class="form-floating w-50 m-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control bg-transparent text-light w-100" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating w-50 m-2">
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control bg-transparent text-light w-100" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">New Password</label>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-4">
            {!loading ? (
              <button type="submit" className="btn btn-primary w-50" onClick={updateProfile}>Update Profile</button>
            ) : (                
              <button class="btn btn-primary w-50" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span class="visually-hidden" role="status">Loading...</span>
              </button>    
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserPage;