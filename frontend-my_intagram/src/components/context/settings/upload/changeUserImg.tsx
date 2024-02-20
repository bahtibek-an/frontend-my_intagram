import React, { useEffect, useRef, useState } from 'react';
import { Cropper, CircleStencil, CropperRef } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { auth, app } from '../../../../firebase/firebase-config';
import { FirebaseStorage, getStorage, ref, uploadBytes } from 'firebase/storage';

const ChangeUserImg: React.FC = () => {
    const [modal, setModal] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [userId, setUserId] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false)
    const cropperRef = useRef<CropperRef>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId('');
            }
        })
        return () => unsubscribe();
    }, [userId])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setModal(true);
        }
    };

    const closeModal = () => {
        setModal(false);
        setSelectedFile(null);
    };

    const storage: FirebaseStorage = getStorage(app);

    const uploadImage = async () => {
        try {
            if (!selectedFile) {
                console.error('No file selected');
                return;
            }
            setLoading(true);
            const fileName = `userImage.png`;
            const storageRef = ref(storage, `users/${userId}/${fileName}`);
            await uploadBytes(storageRef, selectedFile);
            closeModal();
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center m-auto mr-10">
            <label htmlFor="dropzone-file" className="w-56">
                <div className="flex items-center justify-center w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex items-center justify-center pt-5 pb-6">
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <svg
                            className="w-8 h-8 mr-2 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="text-white font-bold">Change photo</p>
                    </div>
                </div>
            </label>

            {modal && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-md">
                        <Cropper
                            src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                            ref={cropperRef}
                            stencilComponent={CircleStencil}
                            className="w-full h-64 object-cover mb-4 rounded"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Close
                            </button>
                            <button
                                onClick={uploadImage}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {isLoading ? 'Loading...' : 'Change'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeUserImg;
