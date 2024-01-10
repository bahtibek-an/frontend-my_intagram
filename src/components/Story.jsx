import React, { useEffect, useState, useContext } from "react";
import {
    getFirestore,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    getDocs,
    getDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Story() {
    const [users, setUsers] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const firestore = getFirestore();
    const [followedUsers, setFollowedUsers] = useState([]);

    useEffect(() => {
        const fetchRandomUsers = async () => {
            try {
                const usersCollection = collection(firestore, "users");
                const querySnapshot = await getDocs(usersCollection);

                const usersData = [];
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.uid !== currentUser.uid) {
                        usersData.push({ uid: doc.id, ...userData });
                    }
                });

                const shuffledUsers = shuffleArray(usersData);
                const randomUsers = shuffledUsers.slice(0, 10);

                setUsers(randomUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchFollowedUsers = async () => {
            try {
                if (currentUser) {
                    const userRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setFollowedUsers(userData.following || []);
                    }
                }
            } catch (error) {
                console.error("Error fetching followed users:", error);
            }
        };

        fetchRandomUsers();
        fetchFollowedUsers();
    }, [currentUser, firestore]);

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };


    return (
        <>
            <section className="main">
                <div className="Story">
                    <div className="left-col">
                        <div className="status-wrapper">
                            <div className="status-card">
                                <div className="profile-pic"><img src={currentUser.photoURL} alt="" /></div>
                                <p className="username"><Link to={`/profile/${currentUser.uid}`}>{currentUser.displayName}</Link></p>
                            </div>
                            {users.map((user) => (
                                <>
                                    <div key={user.uid} className="status-card">
                                        <div className="profile-pic"><img src={user.photoURL} alt="" /></div>
                                        <p className="username"><Link to={`/profile/${user.uid}`}>{user.displayName}</Link></p>
                                    </div>
                                </>
                            ))}
                        
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Story;