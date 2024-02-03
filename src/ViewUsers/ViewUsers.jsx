import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { arrayRemove, arrayUnion, collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Datebase/Auth';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';

const ViewUsers = () => {
    const { uid } = useParams();
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const db = getFirestore();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const userRef = doc(db, "Users", uid);

        const unsubscribe = onSnapshot(userRef, (userDoc) => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser(userData);
                setFollowersCount(userData.followers ? userData.followers.length : 0);
                setIsFollowing(userData.followers?.includes(currentUser?.uid) || false);
                setFollowingCount(userData.following ? userData.following.length : 0);

                const userPostsRef = collection(db, "Posts");
                const userPostsQuery = query(userPostsRef, where("userUID", "==", uid));

                const postsUnsubscribe = onSnapshot(userPostsQuery, (userPostsSnapshot) => {
                    const postsData = userPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setUserPosts(postsData);
                    setPostsCount(postsData.length);
                });

                return () => {
                    postsUnsubscribe();
                };
            }
        });

        return () => {
            unsubscribe();
        };
    }, [uid, currentUser?.uid, db]);

    const handleFollowClick = async () => {
        try {
            if (currentUser) {
                const followingUser = doc(db, "Users", currentUser.uid);
                const userRef = doc(db, "Users", uid);

                await updateDoc(userRef, {
                    followers: arrayUnion(currentUser.uid),
                });

                await updateDoc(followingUser, {
                    following: arrayUnion(uid),
                });

                setIsFollowing(true);
            }
        } catch (error) {

        }
    };

    const handleUnfollowClick = async () => {
        try {
            if (currentUser) {
                const followingUser = doc(db, "Users", currentUser.uid);
                const userRef = doc(db, "Users", uid);

                await updateDoc(userRef, {
                    followers: arrayRemove(currentUser.uid),
                });

                await updateDoc(followingUser, {
                    following: arrayRemove(uid),
                });

                setIsFollowing(false);
            }
        } catch (error) {}
    };

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 bg-gray-100">
                    <div className="w-full p-8 mx-auto my-4">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center w-full">
                                <img
                                    src={user.photoURL}
                                    alt={`avatar`}
                                    className="w-20 h-20 mr-4 rounded-full"
                                />
                                <div className="w-96">
                                    <div className="flex items-center justify-between w-full space-x-4 text-xl font-semibold">
                                        {user.displayName}

                                        <button>
                                            {isFollowing ? (
                                                <div className="flex text-red-500" onClick={handleUnfollowClick}>
                                                    <MinusCircleIcon className="w-6 h-6" /> Unfollow
                                                </div>
                                            ) : (
                                                <div className="flex text-blue-500" onClick={handleFollowClick}>
                                                    <PlusCircleIcon className="w-6 h-6" /> Follow
                                                </div>
                                            )
                                            }
                                        </button>
                                    </div>
                                    <div className="flex justify-around mt-2 space-x-4 text-gray-600">
                                        <span>{postsCount} posts</span>
                                        <span>{followersCount} followers</span>
                                        <span>{followingCount} following</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-[calc(100vh-4rem)] w-full mt-5">
                            <div className="grid grid-cols-3 gap-2">
                                {userPosts.map((post) => (
                                    <img
                                        key={post.id}
                                        src={post.imageUrl}
                                        alt="Post"
                                        className="object-cover rounded w-52 h-52"
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewUsers;
