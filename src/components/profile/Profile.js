import { useState } from 'react'
import './Profile.css'
import userr from "../images/user.png"
import save from "../images/save.png"
import publ from "../images/publ.jpeg"
import marks from "../images/marks.png"
import { NavLink, Outlet } from 'react-router-dom'
import { db, imageDb } from '../../firebase'
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

const Profile = ({ currentUser, getUsers, userName, dark }) => {



    const [uploadWindow, setuploadWindow] = useState(false)

    const download = (files) => {
        const imgRef = ref(imageDb, `files/${currentUser.id}/${uuidv4()}`)
        uploadBytes(imgRef, files).then((value) => {
            getDownloadURL(value.ref)
                .then((url) => {
                    upDateUser(url, currentUser )
                    getUsers()
                })
        })
    }

    const upDateUser = async (url, user) => {
        await setDoc(doc(db, "users", `${currentUser.id}`), { ...user, profile: url });
    }

    const removePhoto = async () => {
      
        await setDoc(doc(db, "users", `${currentUser.id}`), { ...currentUser, profile: "" });
        getUsers()
    }

    const importdata = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png, image/jpeg"
        input.onchange = () => {
            let files = input.files[0];
            download(files)
        };
        input.click();
    }

    const importData = () => {
        if (currentUser.profile.length === 0) {
            importdata()
        } else {
            setuploadWindow(true)
        }
    }


    return (
        <div className='profile'>
            <div className='profile_user'>
                <div className='p_user-img'>
                    <button onClick={importData}>
                        <img src={currentUser.profile ? currentUser.profile : userr} className="user_round" alt="user" />
                    </button>
                </div>
                <div className='p_user-desc'>
                    <p>{currentUser && currentUser.username}</p>
                    <div>
                        <NavLink className="fon" to={`/${userName}/edit`}>Edit profile</NavLink>
                        <NavLink className="fon">Show archive</NavLink>
                    </div>
                </div>
                <div className='p_info'>
                    <div>
                        {currentUser && <p><b>{currentUser.publications.length}</b></p>}
                        <p>posts</p>
                    </div>
                    <NavLink to="followers"
                    style={{color: dark ? "#fff" : ""}}>
                        {currentUser && <p><b>{currentUser.followers.length}</b></p>}
                        <p>followers</p>
                    </NavLink>
                    <NavLink to= "following"
                    style={{color: dark ? "#fff" : ""}}>
                        {currentUser && <p><b>{currentUser.following.length}</b></p>}
                        <p>following</p>
                    </NavLink>

                </div>
                <div className='p_name'>
                    <h4>{currentUser && currentUser.fullname}</h4>
                </div>
            </div>
            <div className='line' style={{ width: "120%" }}></div>
            <nav className='p_nav'>
                <NavLink to={`/${userName}`}>
                    <img src={publ} alt="publ" />
                    <p>POSTS</p>
                </NavLink>
                <NavLink to="saved">
                    <img src={save} alt="save" />
                    <p>SAVED</p>
                </NavLink>
                <NavLink to="marks">
                    <img src={marks} alt="marks" />
                    <p>TAGGED</p>
                </NavLink>
            </nav>
            <div className='p_main'>
                <Outlet />
            </div>

            {uploadWindow &&
                <div className='upload' onClick={() => { setuploadWindow(false) }}>
                    <div  style={{backgroundColor: dark ? "#222" : ""}}>
                        <h2>Change Profile Photo</h2>
                        <button style={{ color: "#0095f6" }}
                            onClick={importdata}>upload Photo</button>
                        <button
                            onClick={removePhoto}>
                            Remowe Current Photo
                        </button>
                        <button onClick={() => { setuploadWindow(false) }}
                         style={{color: dark ? "#fff" : ""}}>cancel</button>
                    </div>
                </div>}


        </div>
    )
}
export default Profile
