import React, { useCallback, useEffect, useState } from 'react';
import { auth, followerCollection, followingCollection, postCollection, usersCollection, storage } from '../../../firebase/firebase-config';
import { getDoc, doc, getDocs, collection, setDoc, updateDoc } from 'firebase/firestore';
import { Tab } from '../userProfile/others/tab';
import { useParams } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';

const ViewProfile: React.FC = () => {
    const { userUId } = useParams();
    const avatar = "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
    const [username, setUsername] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [fullName, setFullName] = useState<string | null>(null);
    const [postNumber, setPostNumber] = useState<number | null>(null);
    const [bio, setBio] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [garden, setGarden] = useState<string>('');
    const [userUsername, SetUserUsername] = useState<string>('');
    const [isFollow, setIsFollow] = useState<string>('Follow');
    const [followers, setFollowers] = useState<number>(0);
    const [followings, setFollowings] = useState<number>(0);
    const [userImage, setUserimage] = useState<string | null>('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                try {
                    const usernameRef = doc(usersCollection, user.uid);
                    const usernameDoc = await getDoc(usernameRef);
                    if (usernameDoc.exists()) {
                        const userdata = usernameDoc.data();
                        const UserusernameCall = userdata.username;
                        SetUserUsername(UserusernameCall);
                    }
                    const storageRef = ref(storage, `users/${userUId}/userImage.png`);
                    const url = await getDownloadURL(storageRef);
                    setUserimage(url || null);
                } catch (err) {
                    console.error(err);
                }
            } else {
                setUserId('');
            }
        })
        return () => unsubscribe();
    }, [userId, userUId])

    const fetchData = useCallback(async () => {
        if (userUId) {
            try {
                const userDocRef = doc(usersCollection, userUId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUsername(userData.username);
                    setFullName(userData.fullName);
                    setGarden(userData.garden);
                    setBio(userData.about);
                    setWebsite(userData.website);
                }
                const postsQuerySnapshot = await getDocs(collection(postCollection, userUId, 'posts'));
                setPostNumber(postsQuerySnapshot.size);

                const followersDocSnapshot = await getDoc(doc(followerCollection, userUId));
                const followersData = followersDocSnapshot.data();
                let followersCount = 0;
                if (followersData) {
                    Object.keys(followersData).forEach(key => {
                        if (followersData[key] === true) {
                            followersCount++;
                        }
                    });
                }
                setFollowers(followersCount);

                const followingsDocSnapshot = await getDoc(doc(followingCollection, userUId));
                const followingsData = followingsDocSnapshot.data();
                let followingsCount = 0;
                if (followingsData) {
                    Object.keys(followingsData).forEach(key => {
                        if (followingsData[key] === true) {
                            followingsCount++;
                        }
                    });
                }
                setFollowings(followingsCount);
            } catch (error) {
                console.error(error);
            }
        }
    }, [userUId, setUsername, setFullName, setGarden, setBio, setWebsite, setPostNumber, setFollowers, setFollowings])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handeFollow = async () => {
        try {
            setIsFollow("Loading...");
            const followRef = doc(followerCollection, userUId);
            await setDoc(followRef, {
                [`${userUsername}`]: true,
            }, { merge: true });


            const userFollowing = doc(followingCollection, userId);
            await setDoc(userFollowing, {
                [`${username}`]: true,
            }, { merge: true });
            setIsFollow('Unfollow')
        } catch (error) {
            console.error(error);
            setIsFollow('Error');
        } finally {
            fetchData();
        }
    }

    useEffect(() => {
        const handleViewUnFollow = async () => {
            const followingRef = doc(followingCollection, userId);
            const followingDoc = await getDoc(followingRef);

            if (followingDoc.exists()) {
                const data = followingDoc.data();
                if (data && data[username] === true) {
                    setIsFollow("Unfollow");
                } else {
                    setIsFollow("Follow");
                }
            } else {
                setIsFollow("Follow");
            }
        }

        handleViewUnFollow();
    }, [userId, username]);



    const handleUnfollow = async () => {
        try {
            setIsFollow("Loading...");

            const followingRef = doc(followingCollection, userId);
            await updateDoc(followingRef, {
                [`${username}`]: false
            });

            const followerRef = doc(followerCollection, userUId);
            await updateDoc(followerRef, {
                [`${userUsername}`]: false
            });

            setIsFollow("Follow");
        } catch (error) {
            console.error(error);
            setIsFollow("Error");
        } finally {
            fetchData();
        }
    }

    return (
        <div className='p-6'>
            <div className="bg-gray-100 px-32">
                <div className="flex md:flex-row-reverse">
                    <div className="w-full md:w-3/4 p-4 pl-6">
                        <div className="text-left pl-4 pt-3">
                            <span className="text-gray-700 font-bold text-2xl mr-2">{username}</span>
                            <span className="text-base font-semibold text-gray-700 mr-2">
                                <button
                                    className="bg-transparent hover:bg-gray-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded"
                                    onClick={() => {
                                        if (isFollow === "Follow") {
                                            handeFollow();
                                        } else if (isFollow === "Unfollow") {
                                            handleUnfollow();
                                        }
                                    }}

                                >
                                    {isFollow}
                                </button>
                            </span>
                        </div>
                        <div className="text-left pl-4 pt-3">
                            <span className="text-base font-semibold text-gray-700 mr-2">
                                <b>{postNumber || 0}</b> posts
                            </span>
                            <span className="text-base font-semibold text-gray-700 mr-2">
                                <b>{followers || 0}</b> followers
                            </span>
                            <span className="text-base font-semibold text-gray-700">
                                <b>{followings || 0}</b> following
                            </span>
                        </div>

                        <div className="flex text-left pl-4 pt-3">
                            <span className="text-lg text-black">{fullName}</span>
                            <span className="text-gray-600 text-lg ml-2">{garden}</span>
                        </div>

                        <div className="text-left pl-4 pt-0">
                            <p className="text-base font-medium text-gray-700 mr-2 hover:text-blue-600">{website}</p>
                            <p className="text-base font-medium text-gray-600 mr-2 mt-2">{bio}</p>
                        </div>
                    </div>
                    <div className="flex p-4">
                        <div className="relative mt-4">
                            <button
                                className=""
                                aria-label="User menu"
                                aria-haspopup="true"
                            >
                                <img
                                    className="rounded-full object-cover w-44 h-44"
                                    src={userImage || avatar}
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <hr className='py-4' />
                <Tab username={username || ""} />
            </div>
        </div>
    )
}

export default ViewProfile;
