import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Datebase/Datebase";
import { AuthContext } from "../Datebase/Auth";
import Sidebar from "../Sidebar/Sidebar";
import {
    getFirestore,
    doc,
    where,
    collection,
    query,
    onSnapshot,
} from "firebase/firestore";

const Profile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const db = getFirestore();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const userRef = doc(db, "Users", currentUser.uid);
        
        const unsubscribe = onSnapshot(userRef, (userDoc) => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setFollowersCount(userData.followers ? userData.followers.length : 0);
                setFollowingCount(userData.following ? userData.following.length : 0);

                const userPostsRef = collection(db, "Posts");
                const userPostsQuery = query(userPostsRef, where("userUID", "==", currentUser.uid));

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
    }, [currentUser?.uid, db]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 bg-gray-100">
                <div className="w-full p-8 mx-auto my-4">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center w-full">
                            {currentUser && (
                                <>
                                    <img
                                        src={currentUser.photoURL}
                                        alt={`avatar`}
                                        className="w-20 h-20 mr-4 rounded-full"
                                    />
                                    <div className="w-96">
                                        <div className="flex items-center justify-around w-full space-x-4 text-xl font-semibold">
                                            {currentUser.displayName}
                                            <Link
                                                to={'/edit'}
                                                className="p-1 text-blue-500 border border-blue-500 rounded"
                                            >
                                                Edit Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="p-1 text-red-500 border border-red-500 rounded"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                        <div className="flex justify-around mt-2 space-x-4 text-gray-600">
                                            <span>{postsCount} posts</span>
                                            <span>{followersCount} followers</span>
                                            <span>{followingCount} following</span>
                                        </div>
                                    </div>
                                </>
                            )}
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
    );
};

export default Profile;
