import React, { useState, useEffect, useRef  } from 'react';
import SmileSvg from "./SmileSvg";
import { EMOJISCHAR } from "../../helpers/Emojis";
import "./style.css";
import { storage } from './../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import useUser from './../../hooks/useUser';
import { addPostToFirestore } from './../../services/firebase';
import ReactLoading from 'react-loading';

const ConfirmCreatePost = ({ image, back }) => {
    const { user: { docId, fullName, username, userId, following } } = useUser();
    const emojiRef = useRef(null);
    const [ caption, setCaption ] = useState('');
    const [ emoji, setEmoji ] = useState(false);
    const [ loading, setLoading ] = useState(0);
    const imageSrc = URL.createObjectURL(image);

    const handleSubmit = () => {
        const imageId = uuidv4();
        const pathImage = `/images/users/${username}/${imageId}.jpg`;
        const uploadImage = storage
            .ref(pathImage)
            .put(image);

        uploadImage.on("state-changed", snapshot => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoading(prev => progress);
        },
        () => {

        },
        async () => {
            const imageUrl = await uploadImage.snapshot.ref.getDownloadURL().then(async url => {
                const photo = await addPostToFirestore(caption, url, userId, imageId);
                setLoading(0);
                alert("image succesfully uploaded");
                window.location.reload();
            })

        })
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmoji(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);


    return (
        <div className="flex">
            <div className="relative flex items-center" style={{height: 570, width: 456}}>
                <div>
                    <div className="flex justify-center">
                    <img
                        src={imageSrc}
                        alt=""
                        className="image"
                    />
                    </div>
                </div>
            </div>
            <div className="w-72 p-4 flex flex-col justify-between">
                <div className="">
                    <div className="flex items-center">
                        <div>
                            <img
                                className="rounded-full flex w-8"
                                src="/images/avatars/default.png"
                                alt=""
                            />
                        </div>
                        <span className="ml-3 font-bold">
                        </span>
                    </div>
                    <div className="border-b relative">
                        <div
                            className="absolute bottom-2 cursor-pointer"
                            onClick={() => setEmoji(prev => !prev)}
                        >
                            <SmileSvg/>
                        </div>
                        {emoji && (
                            <div className="absolute bg-white max-h-sm border rounded"
                                style={{top: "180px"}}
                                ref={emojiRef}
                            >
                                <div className="grid max-h-40 overflow-auto grid-cols-6 p-3">
                                    {EMOJISCHAR.map(emoji => (
                                        <div
                                            className="hover:bg-slate-300 p-1 cursor-pointer"
                                            onClick={() => setCaption(`${caption}${emoji}`)}
                                        >
                                            <span>{ emoji }</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <textarea
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            className="caption-textarea h-40 w-full mt-4 text-black"
                            placeholder="Add a caption..."
                        >
                        </textarea>
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-end">
                        <button className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8 opacity-70">
                            <div className="flex items-center justify-center">
                                <ReactLoading
                                    className="mr-2"
                                    type="spin"
                                    color={"black"}
                                    height={'25%'}
                                    width={'25%'}
                                    />
                                <span>{`${loading}%`}</span>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end" onClick={handleSubmit}>
                        <button className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8">Share</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmCreatePost;
