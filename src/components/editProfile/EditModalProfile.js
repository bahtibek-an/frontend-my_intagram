import React from 'react';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from './../../lib/firebase';
import { updateAvatarUser } from '../../services/firebase';
import { updateProfile } from 'firebase/auth';

const EditModalProfile = ({ modalOpen ,setModalOpen, avatarSrc, openInput, userId }) => {

    const deleteAvatar = async () => {
        const storageRef = storage.refFromURL(avatarSrc);
        const fullPath = storageRef.fullPath;

        const storageImage = getStorage();
        const desertRef = ref(storageImage, fullPath);

        deleteObject(desertRef).then(() => {
            alert("Success");
        }).catch((error) => {
            alert(error.message);
        });

        const avatar = await updateAvatarUser("/images/avatars/default.png", userId);
        setModalOpen(false);
        updateProfile();
    }

    if(!modalOpen) return;

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between px-10 py-4 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-lg font-semibold">
                                Change profile photo
                            </h3>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-center px-4 py-2 text-blue-inst font-semibold border-b">
                                <button
                                    onClick={openInput}
                                >
                                    Upload photo
                                </button>
                            </div>
                            <div className="text-red-500 font-semibold flex justify-center px-4 py-2 border-b">
                                <button
                                    onClick={deleteAvatar}
                                >
                                    Delete current photo
                                </button>
                            </div>
                            <div className="flex justify-center px-4 py-2 border-b">
                                <button
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default EditModalProfile;
