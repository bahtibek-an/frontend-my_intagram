import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage, usersCollection } from "../../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

const Dashboard: React.FC = () => {
    const [userId, setUserId] = useState<string | null>(null)
    const [username, setUserName] = useState<string>("")
    const navigate = useNavigate();
    const [userImage, setUserimage] = useState<string | null>(null)

    const avater = "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const userDocRef = doc(usersCollection, userId);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserName(userData.username);
                    }
                    const storageRef = ref(storage, `users/${userId}/userImage.png`);
                    const url = await getDownloadURL(storageRef);
                    setUserimage(url || null);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [userId]);

    const handleLogout = () => {
        auth.signOut();
        console.log("user logout");
        navigate("/")
        window.location.reload();
    }

    const navigation = [
        {
            href: '/',
            name: 'Home',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            ,
        },
        {
            href: '/search',
            name: 'Search',
            icon: <svg className="w-5 h-5 text-gray" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            ,
        },
        {
            href: '/post',
            name: 'Post',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        },
        {
            href: '',
            name: 'Message',
            icon: <svg fill="gray" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z" />
            </svg>,
        }
    ]

    const logout = [
        {
            name: 'Logout',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
        }
    ]

    return (
        <>
            <nav
                className="fixed top-0 left-0 w-full h-full border-r bg-gray-900 space-y-8 sm:w-80">
                <div className="flex flex-col h-full">
                    <div className='h-20 flex items-center px-8'>
                        <Link to={"/"} className='flex-none'>
                            <h1 className="text-4xl text-center text-white">𝕀𝕟𝕤𝕥𝕒𝕘𝕣𝕒𝕞</h1>
                        </Link>
                    </div>
                    <div className="py-4 px-4 bg-gray-800">
                        <div className="flex items-center gap-x-4">
                            <Link to={`/${username}`}>
                                <img src={userImage || avater} alt="" className="w-12 h-12 object-cover rounded-full" />
                            </Link>
                            <div>
                                <Link to={`/${username}`}>
                                    <span className="block text-gray-50 text-sm font-bold">{username || "NotFound username"}</span>
                                </Link>
                                <Link
                                    to={`/${username}`}
                                    className="block mt-px text-gray-400 hover:text-indigo-600 text-xs"
                                >
                                    View profile
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <ul className="px-4 text-sm font-medium flex-1 pt-2">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx}>
                                        <Link to={item.href} className="flex items-center gap-x-2 text-gray-300 p-2 rounded-lg  hover:text-black hover:bg-gray-50 active:bg-gray-100 duration-150">
                                            <div className="text-gray-500">{item.icon}</div>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            <ul className="px-4 pb-4 text-sm font-medium">
                                {
                                    logout.map((item, idx) => (
                                        <li key={idx}>
                                            <button onClick={handleLogout} className="flex items-center w-full gap-x-2 text-gray-300 p-2 rounded-lg hover:text-black hover:bg-gray-50 active:bg-gray-100 duration-150">
                                                <div className="text-gray-500">{item.icon}</div>
                                                {item.name}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div >
                </div>
            </nav>
        </>
    );
};

export default Dashboard;
