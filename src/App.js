import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';
import SubscribedUser from './components/screens/SubscribedUser';
import { initialState, reducer } from './reducers/userReducer';

export const URL = 'https://chit-chat-server-xi.vercel.app';

export const UserContext = createContext();

const Routing = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'USER', payload: user });
        } else {
            navigate('/signin');
        }
    }, []);
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/Signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/profile/:userid' element={<UserProfile />} />
            <Route path='/myFollowingPosts' element={<SubscribedUser />} />
        </Routes>
    );
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Navbar />
                <Routing />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
