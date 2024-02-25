import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Authentication';
import { auth } from '../firebase';
import Navbar from '../Component/Navbar';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import Post from '../Component/Post';

export default function Home() {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const firestore = getFirestore();

    useEffect(() => {
        if (currentUser) {
            const unsubscribePosts = onSnapshot(
                collection(firestore, "Posts"),
                (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setPosts(data);
                }
            );

            return () => {
                unsubscribePosts();
            };
        }
    }, [firestore, currentUser]);



    const logout = async () => {
        auth.signOut();
    }

    if (!currentUser) {
        return <Navigate to="/register" />;
    }
    return (
        <>
            <div className="container">
                <Navbar></Navbar>
                <br />
                <br />
                <div className="Postcomponent">
                    <div className="posts">
                        {posts?.map(post => (
                            <>
                                <Post post={post}></Post>
                            </>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}
