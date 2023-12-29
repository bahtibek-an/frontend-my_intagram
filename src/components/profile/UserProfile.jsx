import { getUserPhotosByUsername } from "../../services/firebase";
import React, { useReducer, useEffect, createContext } from "react";

const Header = React.lazy(() => import("./Header"));
const Photos = React.lazy(() => import("./Photos"));

export const UserProfileContext = createContext();

const UserProfile = ({ user }) => {
    const reducer = (state, newState) => ({ ...state, ...newState });

    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    };

    const getProfileInfoAndPhotos = async () => {
        const photos = await getUserPhotosByUsername(user.username);
        dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length});
    };

    const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        getProfileInfoAndPhotos();
    }, [user]);


    return (
        <UserProfileContext.Provider value={{ getProfileInfoAndPhotos }}>
            <Header 
                user={user}
                profile={profile}
                setFollowerCount={dispatch} 
                followerCount={followerCount}
                photosCount={photosCollection ? photosCollection.length : 0} 
            />
            <h3 className="text-center">Posts</h3>
            <hr />
            <Photos photos={photosCollection}/>
        </UserProfileContext.Provider>
    );
};

export default UserProfile;