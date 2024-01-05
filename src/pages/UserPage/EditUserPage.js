import React, { useContext, useEffect, useRef, useState } from "react";
import { getAuth, updatePassword, updateEmail } from "firebase/auth";
import UserContext from "../../context/user";
import { v4 as uuidv4 } from 'uuid';
import { storage } from "../../lib/firebase";
import { updateAvatarUser } from "../../services/firebase";
import ReactLoading from 'react-loading';
import useUser from "../../hooks/useUser";
import { updateUser } from './../../services/firebase';
import EditModalProfile from "../../components/editProfile/EditModalProfile";

const EditUserPage = () => {
    const [ loading, setLoading ] = useState(false);
    const [ fullname, setFullname ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ aboutme, setAboutme] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ modalOpen, setModalOpen ] = useState(false);
    const { user } = useContext(UserContext);
    const { user: currentUser, updateProfile: updateProfileUser } = useUser();
    const imageRef = useRef();

    useEffect(() => {
        if(Object.keys(currentUser).length > 0) {
            setFullname(currentUser.fullName);
            setUsername(currentUser.username);
            setEmail(currentUser.email);
        }
    }, [currentUser])

    const openChangeAvatarInput = () => {
        const avatarImageURL = currentUser.avatarSrc;
        if(avatarImageURL === "/images/avatars/default.png") {
            return imageRef.current.click();
        }
        setModalOpen(true);
    }

    const updateProfile = async () => {
        setLoading(true);
        const auth = getAuth();
        await updateEmail(auth.currentUser, email);

        if(password.trim()) {
            await updatePassword(auth.currentUser, password);
        }

        await updateUser(email, username, aboutme, fullname, currentUser.docId);
        setLoading(false);
        alert("Profile was sucessfully uploaded!");
    }

    const openInput = () => {
        setModalOpen(prev => !prev);
        imageRef.current.click();
    }

    const uploadImage = async (e) => {
        setLoading(true);
        const avatar = e.target.files[0];
        const avatarId = uuidv4();
        const pathAvatar = `images/avatars/${avatarId}.jpg`;
        if(modalOpen) setModalOpen(false);
        const uploadImage = storage
            .ref(pathAvatar)
            .put(avatar);

        uploadImage.on("state-changed", snapshot => {
            // const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        },
        () => {
            alert("Error");
            setLoading(false);
        },
        async () => {
            const imageUrl = await uploadImage.snapshot.ref.getDownloadURL().then(async url => {
                const avatar = await updateAvatarUser(url, user.uid);
                updateProfileUser();
                setLoading(false);
                alert("Succesfully changed avatar!");
            })

        })

        e.target.value = null;
    }


    return (
        <div className="mt-6 flex justify-center">
            <EditModalProfile
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                avatarSrc={currentUser.avatarSrc}
                openInput={openInput}
                userId={user.uid}
            />
            <div className="border flex flex-col p-4 rounded">
                <div className="flex items-center mt-4 mb-4 justify-end">
                    <div className="flex-auto flex w-32 cursor-pointer flex justify-end">
                        <div className="w-14 h-14 flex mr-2">
                            <img
                                className="rounded-full w-full h-full flex"
                                src={currentUser.avatarSrc}
                                alt={""}
                            />
                        </div>
                    </div>
                    <div className="flex-auto w-60 ml-4">
                        <div>
                            <span className="text-xl">
                                { user.displayName }
                            </span>
                        </div>
                        <div
                            onClick={openChangeAvatarInput}
                            className="cursor-pointer"
                        >
                            <span className="text-base font-semibold text-blue-inst">
                                Upload image
                            </span>
                            <input
                                ref={imageRef}
                                onChange={uploadImage}
                                type="file"
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-auto w-32 flex justify-end pr-6">
                        <label htmlFor="fullname">Full Name</label>
                    </div>
                    <div className="flex-auto w-60 ">
                        <input
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                            className="border rounded w-full px-1"
                            type="text"
                            id="fullname"
                        />
                    </div>
                </div>
                <div className="flex mt-6">
                    <div className="flex-auto w-32 flex justify-end pr-6">
                        <label htmlFor="username">User Name</label>
                    </div>
                    <div className="flex-auto w-60 ...">
                        <input
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="border rounded w-full px-1"
                            type="text"
                            id="username"
                        />
                    </div>
                </div>
                <div className="flex mt-6">
                    <div className="flex-auto w-32 flex justify-end pr-6">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="flex-auto w-60 ...">
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="border rounded w-full px-1"
                            type="text"
                            id="email"
                        />
                    </div>
                </div>
                <div className="flex mt-6">
                    <div className="flex-auto w-32 flex justify-end pr-6">
                        <label htmlFor="newpassword">New Password</label>
                    </div>
                    <div className="flex-auto w-60 ...">
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="border rounded w-full px-1"
                            autoComplete="off"
                            type="password"
                            id="newpassword"
                        />
                    </div>
                </div>
                <div className="flex mt-6">
                    <div className="flex-auto w-32 flex justify-end pr-6">
                    </div>
                    <div className="flex-auto w-60 ...">
                        { !loading ? (
                            <button
                                className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                                onClick={updateProfile}
                            >
                                Submit
                            </button>
                        ) : (
                            <button className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8 opacity-70">
                                <div className="flex items-center justify-center">
                                    <ReactLoading type="spin" color={"black"} height={'30%'} width={'30%'}/>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserPage;
