import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Firestoredb, auth } from '../firebase';
import { AuthContext } from '../Authentication';
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, updateDoc, where } from 'firebase/firestore';
import Navbar from '../Component/Navbar';
import { query } from '@firebase/database';

export default function Profiles() {
    const { uid } = useParams();
    const [user, setUser] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        const userRef = doc(Firestoredb, "Users", uid);
        const unsubscribeUser = onSnapshot(userRef, (userDoc) => {
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUser(userData);
                setIsFollowing(userData.followers?.includes(currentUser?.uid) || false);

                const userPostsRef = collection(Firestoredb, "Posts");
                const userPostsQuery = query(userPostsRef, where("userId", "==", uid));

                const postsUnsubscribe = onSnapshot(userPostsQuery, (userPostsSnapshot) => {
                    const postsData = userPostsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setUserPosts(postsData);
                });


                return () => {
                    postsUnsubscribe();
                };
            }
        });

        return () => {
            unsubscribeUser();
        };
    }, [uid, currentUser?.uid]);

    const toggleFollow = async () => {
        try {
            const followingUser = doc(Firestoredb, "Users", currentUser.uid);
            const userRef = doc(Firestoredb, "Users", uid);

            if (isFollowing) {
                await Promise.all([
                    updateDoc(userRef, { followers: arrayRemove(currentUser.uid) }),
                    updateDoc(followingUser, { following: arrayRemove(uid) })
                ]);
                setIsFollowing(false);
            } else {
                await Promise.all([
                    updateDoc(userRef, { followers: arrayUnion(currentUser.uid) }),
                    updateDoc(followingUser, { following: arrayUnion(uid) })
                ]);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error("Error toggling follow:", error);
        }
    };

    const LogOut = () => {
        auth.signOut();
        navigate(`/register`);
    }

    return (
        <div className="container">
            <Navbar />
            <br />
            <br />
            <div className="container-profile">
                <header>
                    <div className="profile">
                        <div className="profile-image">
                            <img src={user.photoURL || "https://img.freepik.com/free-vector/instagram-vector-social-media-icon-7-june-2021-bangkok-thailand_53876-136728.jpg?w=740&t=st=1708760871~exp=1708761471~hmac=832cfa51e0d4102b22dc8ee05dcf136ca540306c8044e1059fef673e84cb4e72"} alt="" />
                        </div>
                        <div className="info-profile">
                            <div className="profile-user-settings">
                                <span className="profile-user-name">{user.displayName}</span>
                                {currentUser && currentUser.uid === user.uid ? (
                                    <>
                                        <Link className="btn profile-edit-btn" to={'/profile-editor'}>Edit Profile</Link>
                                        <button onClick={LogOut}>Log out</button>
                                    </>
                                ) : (
                                    <button onClick={toggleFollow}>{isFollowing ? "Unfollow" : "Follow"}</button>
                                )}
                            </div>
                            <div className="profile-stats">
                                <ul>
                                    <li><span className="profile-stat-count">{userPosts.length}</span> posts</li>
                                    <li><span className="profile-stat-count">{user.followers ? Object.keys(user.followers).length : 0}</span> followers</li>
                                    <li><span className="profile-stat-count">{user.following ? Object.keys(user.following).length : 0}</span> following</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="profile-posts">
                        {userPosts.map(post => (
                            <div key={post.id} className="gallery">
                                <div className="gallery-item">
                                    <img src={post.imageUrl} alt="Post" className="gallery-image" />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
