import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getUserByUsername } from './../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { NOT_FOUND } from './../../constants/routes';
// import Header from './../../components/profile/Header';
import UserProfile from './../../components/profile/UserProfile';

const UserPage = () => {
    const { username } = useParams();
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserExists = async () => {
            const [user] = await getUserByUsername(username);
            if (user?.userId) {
                setUser(user);
            } else {
                navigate(NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, navigate]);

    return user ? (
        <div className="container w-100 h-100">
            <UserProfile user={user} />
        </div>
    ) : (
        null
    );
};

export default UserPage;
