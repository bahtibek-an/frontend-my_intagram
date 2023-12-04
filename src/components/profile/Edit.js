import "./Profile.css"
import usr from "../images/user.png"
import clear from "../images/cleare.png"
import { useState } from "react"
import { db, imageDb } from '../../firebase.js'
import { setDoc, doc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const Edit = ({ currentUser, dark, id, getUsers }) => {

    const [profile, setProfile] = useState()
    const [username, setUsername] = useState()
    const [about, setAbout] = useState()
    const [floor, setFloor] = useState()
    const [floorWin, setFloorWin] = useState()

    const download = (files) => {
        const imgRef = ref(imageDb, `files/${id}/${uuidv4()}`)
        uploadBytes(imgRef, files).then((value) => {
            getDownloadURL(value.ref)
                .then((url) => {
                    setProfile(url)
                })
        })
    }

    console.log(id)

    const importData = () => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png, image/jpeg"
        input.onchange = () => {
            let files = input.files[0];
            download(files)
        };
        input.click();
    }

    const upDateUser = async () => {

        await setDoc(doc(db, "users", `${id}`), {
            ...currentUser,
            username: username ? username : currentUser.username,
            floor: floor ? floor : currentUser.floor ? currentUser.floor : "",
            about: about ? about : currentUser.about ? currentUser.about : "",
            profile: profile ? profile : currentUser.profile[0] ? currentUser.profile[0] : ""
        })

        getUsers()
    }

    const edit = () => {
        upDateUser()
        setUsername("")
        setAbout("")
        setFloor("")
        setProfile("")

    }





    return (
        <div className="edit">
            {currentUser && <>
                <h2> Edit profile </h2>
                <div className="edit_profile">
                    {currentUser.profile && <img src={currentUser.profile ? currentUser.profile : usr} className="user_round" width="50" height="50" />}
                    <div>
                        <p>{currentUser.fullname}</p>
                        <button onClick={importData}>Change profile photo</button>
                    </div>
                </div>

                <div className="edit_div">
                    <p>Username</p>
                    <input type="text" placeholder="Change username"
                        style={{ color: dark ? "#fff" : "#000" }}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                </div>

                <div className="edit_div">
                    <p>About me</p>
                    <textarea style={{ color: dark ? "#fff" : "#000" }}
                        onChange={(e) => {
                            setAbout(e.target.value)
                        }}
                        value={about}>{currentUser.about && currentUser.about}</textarea>
                </div>

                <div className="edit_div">
                    <p>Floor</p>
                    <button onClick={() => setFloorWin(true)}
                        style={{ color: dark ? "#fff" : "#000" }}>{currentUser.floor && currentUser.floor}</button>
                </div>

                <div className="sending">
                    <button
                        style={{ opacity: username || about || profile || floor ? "1.0" : "0.3" }}
                        disabled={username || about || profile || floor ? false : true}
                        onClick={() => {
                            edit()
                        }}>Send</button>
                </div>


            </>}

            {floorWin && <div className="upload">
                <img src={clear} width="15"
                    onClick={() => setFloorWin(false)} />
                <div style={{ backgroundColor: dark ? "#3f3f3f" : "#fff" }}
                    className="floor">
                    <input type="radio" id="own" value="Your own option" name="floor"
                        onClick={(e) => {
                            e.target.checked &&
                                setFloor(e.target.value)
                        }} />
                    <label for="own">Your own option</label>
                    <br />
                    <input type="radio" id="female" value="Female" name="floor"
                        onClick={(e) => {
                            e.target.checked &&
                                setFloor(e.target.value)
                        }} />
                    <label for="female">Female</label>
                    <br />
                    <input type="radio" id="male" value="Male" name="floor"
                        onClick={(e) => {
                            e.target.checked &&
                                setFloor(e.target.value)
                        }} />
                    <label for="male">Male</label>
                    <br />
                    <input type="radio" id="not" value="I prefer not to indicate" name="floor"
                        onClick={(e) => {
                            e.target.checked &&
                                setFloor(e.target.value)
                        }} />
                    <label for="note">I prefer not to indicate</label>
                </div>
            </div>}

        </div>
    )
}

export default Edit