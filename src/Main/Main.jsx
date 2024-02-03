import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Datebase/Auth';
import { getFirestore, collection, onSnapshot } from '@firebase/firestore';
import Sidebar from '../Sidebar/Sidebar';
import Post from '../Post/Post';

const Main = () => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const firestore = getFirestore();

    useEffect(() => {
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
    }, [firestore]);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="w-full overflow-scroll bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="flex flex-col flex-1 p-4">
                    {posts.map((post) => (
                        <Post key={post.id} 
                        id = {post.id}
                        userUID = {post.userUID}
                        username={post.username}
                        avatarUrl={post.avatarUrl}
                        likes={post.likes}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                        comments={post.comments}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Main;
