import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./authentication/login.tsx";
import Register from "./authentication/register.tsx";
import { NotFound } from "./components/notFount/notFount.tsx";
import { auth, usersCollection } from "./firebase/firebase-config.ts";
import Index from './components/profile/index.tsx'
import Home from "./components/context/home.tsx";
import UserProfile from "./components/profile/userProfile/userProfile.tsx";
import Post from "./components/context/post.tsx";
import Settings from "./components/context/settings/settings.tsx";
import PostTabs from "./components/profile/userProfile/others/tabs/postTabs.tsx";
import ViewPostTabs from "./components/profile/viwesProfile/tabs/postTab.tsx";
import { doc, getDoc } from "firebase/firestore";
import Search from "./components/context/search.tsx";
import ViewProfile from "./components/profile/viwesProfile/viewsProfile.tsx";

const App: React.FC = () => {
    const [authentication, setAuthentication] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                handleUserSuccess();

                try {
                    const userRef = doc(usersCollection, user.uid);
                    const userDoc = await getDoc(userRef)
                    if (userDoc.exists()) {
                        const userdata = userDoc.data();
                        if (userdata) {
                            const usernameCall = userdata.username;
                            setUsername(usernameCall)
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUserId('');
            }
        });

        return () => unsubscribe();
    }, [userId]);

    const handleUserSuccess = () => {
        setAuthentication(true);
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={authentication ? <Index /> : <Login />}>
                    <Route index element={<Home />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/search" element={<Search />} />
                    <Route path={`/${username}/settings`} element={<Settings />} />
                    <Route path={`/${username}`} element={<UserProfile />}>
                        <Route index element={<PostTabs />} />
                    </Route>
                    <Route path="profile/:userUId/3" element={<ViewProfile />}>
                        <Route index element={<ViewPostTabs />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
