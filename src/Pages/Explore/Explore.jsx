import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../context/Firebase/firebase";
import "./Explore.css"
import Sidebar from "../../components/Sidebar/Sidebar";

function Explore() {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const firestore = getFirestore();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsQuery = query(
                    collection(firestore, "Posts")
                );
                const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setPosts(data);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error(error);
            }

        };

        fetchPosts();
    }, [currentUser.uid, firestore]);

    const chunkPosts = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    return (
        <>
            <div className="explore">
                <div className="sidebar-explore">
                    <Sidebar />
                </div>
                <div className="posts-explore">
                    <div className="posts-explore-post">
                        {/* <div className="mt-4 container"> */}
                        {chunkPosts(posts, 3).map((row, rowIndex) => (
                            <div className="posts-explore-post-row" key={rowIndex}>
                                {row.map((post) => (
                                    <div
                                        className="posts-explore-post-row-post"
                                        key={post.id}
                                        style={{ backgroundImage: `url(${post.imageUrl})` }}
                                    >
                                        <div className="posts-explore-post-info">
                                            <p>
                                                <i class="bi bi-heart"></i> {post.like}
                                            </p>
                                            <p>
                                                <i class="bi bi-chat"></i>{" "}
                                                {post.comments?.length > 0 ? (post.comments.length) : (" 0")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>


    );
}

export default Explore;
