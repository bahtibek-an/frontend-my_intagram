import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { URL, UserContext } from '../../App';

const Profile = () => {
    const [userProfile, setUserProfile] = useState();
    const { state, dispatch } = useContext(UserContext);
    const { userid } = useParams();
    const [showFollow, setShowFollow] = useState(state && !state.followers.includes(userid));

    useEffect(() => {
        fetch(`${URL}/user/${userid}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setUserProfile(result);
            });
    }, []);

    const followUser = () => {
        fetch(`${URL}/follow`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                followId: userid,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: 'UPDATE',
                    payload: { followers: data.followers, following: data.following },
                });
                localStorage.setItem('user', JSON.stringify(data));
                setUserProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id],
                        },
                    };
                });
                setShowFollow(false);
            });
    };

    const unfollowUser = () => {
        fetch(`${URL}/unfollow`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                unfollowId: userid,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: 'UPDATE',
                    payload: { followers: data.followers, following: data.following },
                });
                localStorage.setItem('user', JSON.stringify(data));
                setUserProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(
                        (item) => item !== data._id
                    );
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower,
                        },
                    };
                });
                setShowFollow(true);
            });
    };

    return (
        <div className='sections'>
            {userProfile && (
                <div className='profile-block-outer'>
                    <div className='profile-block'>
                        <div className='profile-pic'>
                            <img src={userProfile.user.pic} alt='' />
                        </div>
                        <div className='profile-description'>
                            <h3 className='username'>{userProfile.user.name}</h3>
                            <div className='follow-desc'>
                                <div className='posts'>
                                    <b>{userProfile.posts.length}</b> Posts
                                </div>
                                <div className='followers'>
                                    <b>{userProfile.user.followers.length}</b> Followers
                                </div>
                                <div className='following'>
                                    <b>{userProfile.user.following.length}</b> Following
                                </div>
                            </div>
                            {showFollow ? (
                                <button
                                    className='common-btn follow-btn'
                                    onClick={() => followUser()}
                                >
                                    Follow
                                </button>
                            ) : (
                                <button
                                    className='common-btn unfollow-btn'
                                    onClick={() => unfollowUser()}
                                >
                                    Unfollow
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='posts-block'>
                        {userProfile.posts.map((item) => {
                            return <img src={item.photo} alt='' key={item._id} />;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
