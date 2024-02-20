import React, { useState, useEffect, ChangeEvent } from 'react';
import { storage, auth, uploadBytes, ref, deleteObject, postCollection, usersCollection } from '../../firebase/firebase-config';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { FaSmile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const EmojiComponent: React.FC<{ onEmojiClick: (emoji: string) => void }> = ({ onEmojiClick }) => (
    <div className="emoji-container">
        <span onClick={() => onEmojiClick('😀')} className='rounded-sm m-1'>😀</span>
        <span onClick={() => onEmojiClick('😃')} className='rounded-sm m-1'>😃</span>
        <span onClick={() => onEmojiClick('🥹')} className='rounded-sm m-1'>🥹</span>
        <span onClick={() => onEmojiClick('😅')} className='rounded-sm m-1'>😅</span>
        <span onClick={() => onEmojiClick('😂')} className='rounded-sm m-1'>😂</span>
        <span onClick={() => onEmojiClick('🤣')} className='rounded-sm m-1'>🤣</span>
        <span onClick={() => onEmojiClick('😡')} className='rounded-sm m-1'>😡</span>
        <span onClick={() => onEmojiClick('😊')} className='rounded-sm m-1'>😊</span>
        <span onClick={() => onEmojiClick('👍')} className='rounded-sm m-1'>👍</span>
        <span onClick={() => onEmojiClick('👎')} className='rounded-sm m-1'>👎</span>
        <span onClick={() => onEmojiClick('👏')} className='rounded-sm m-1'>👏</span>
        <span onClick={() => onEmojiClick('❤️‍🔥')} className='rounded-sm m-1'>❤️‍🔥</span>
        <span onClick={() => onEmojiClick('🔥')} className='rounded-sm m-1'>🔥</span>
        <span onClick={() => onEmojiClick('🎉')} className='rounded-sm m-1'>🎉</span>
    </div>
);

const Post: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [postId, setPostId] = useState<string | null>(null);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false)
    const [showEmojis, setShowEmojis] = useState(false);
    const [caption, setCaption] = useState('');
    const [username, setUsername] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const usernameRef = doc(usersCollection, userId);
                    const userDoc = await getDoc(usernameRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData.username)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        fetchData();
    }, [userId])

    useEffect(() => {
        if (userId) {
            const newPostId = uuidv4();
            setPostId(newPostId);
        }
    }, [userId]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };


    const handleSave = async () => {
        if (!image || !userId) {
            return;
        }

        try {
            setIsLoading(true);

            const storageRef = ref(storage, `post/${userId}/${postId}/${image.name}`);
            await uploadBytes(storageRef, image);

            const url = await getDownloadURL(storageRef);
            setDownloadURL(url);

            setIsLoading(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    };

    const handleChangeImage = async () => {
        try {
            if (downloadURL && userId && postId) {
                const img = image?.name
                const storageRef = ref(storage, `post/${userId}/${postId}/${img}`);
                await deleteObject(storageRef);
            }

            setImage(null);
            setDownloadURL(null);
            setCaption('');

            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }

        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleFormSubmit = async () => {
        try {
            setPostLoading(true);
            if (!downloadURL || !userId || !postId || !caption) {
                console.error("Incomplete data for submission");
                return;
            }
            const userCollectionRef = collection(postCollection, userId, "posts");
            const postDocRef = doc(userCollectionRef, postId);

            await setDoc(postDocRef, {
                username,
                userId,
                postId,
                caption,
                downloadURL,
            });

            console.log('Post submitted successfully');
            navigator('/');
        } catch (error) {
            console.error('Error submitting post:', error);
            setPostLoading(false);
        }
    };

    const handleMouseEnter = () => {
        setShowEmojis(true);
    };

    const handleMouseLeave = () => {
        setShowEmojis(false);
    };

    const handleEmojiClick = (emoji: string) => {
        setCaption((prevCaption) => prevCaption + emoji);
    };

    return (
        <div className='p-4'>
            <div className='text-center'>
                <h1 className='text-4xl mt-1 mb-1 font-bold'>Create new post</h1><hr />
            </div>
            <p className="block mb-2 mt-2 text-sm font-medium text-gray-900">Drag photos and videos here</p>
            <div className='flex'>
                <div className='w-full'>
                    <input
                        id="fileInput"
                        onChange={handleFileChange}
                        className="block w-full text-sm p-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        type="file"
                        accept="image/png,image/jpeg"
                    />
                </div>
                <button
                    type="button"
                    className="w-40 ml-2 h-11 text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-50 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={handleSave}
                >
                    {isLoading ? "Loading..." : "Upload"}
                </button>
            </div>

            {downloadURL && (
                <div className="mt-4">
                    <div className='flex justify-between'>
                        <h2 className="text-xl font-bold mb-2">Uploaded Image:</h2>
                        <button
                            type="button"
                            className="w-[139px] h-11 text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-50 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={handleChangeImage}
                        >
                            Change Image
                        </button>
                    </div>
                    <div className='flex p-2'>
                        <div>
                            <img
                                src={downloadURL}
                                alt="Uploaded"
                                className="w-[500px] h-[500px] object-cover rounded-lg border-2 border-gray-500"
                            />
                        </div>
                        <div className='pl-4'>
                            <form className='w-[500px] h-[500px]'
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleFormSubmit();
                                }}>
                                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                        <input
                                            id="comment"
                                            className="w-full px-0 p-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                            placeholder="Write a caption..."
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center py-2.5 px-4 text-xs text-center w-42 text-white bg-gray-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-gray-800"
                                        >
                                            {postLoading ? "Loading..." : "Post"}
                                        </button>
                                        <div
                                            className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2"
                                        >
                                            <button
                                                type="button"
                                                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                                onMouseEnter={handleMouseLeave}
                                                onMouseLeave={handleMouseEnter}
                                            >
                                                {showEmojis ? <FaSmile /> : <EmojiComponent onEmojiClick={handleEmojiClick} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='pt-6'>
                                    <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
                                        <li>
                                            List item one
                                            <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                                                <li>You might feel like you are being really "organized" o</li>
                                                <li>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li>
                                                <li>Nesting tons of folders in your source code is also not helpful.</li>
                                            </ol>
                                        </li>
                                        <li>
                                            List item two
                                            <ul className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                                                <li>I'm not sure if we'll bother styling more than two levels deep.</li>
                                                <li>Two is already too much, three is guaranteed to be a bad idea.</li>
                                                <li>If you nest four levels deep you belong in prison.</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
