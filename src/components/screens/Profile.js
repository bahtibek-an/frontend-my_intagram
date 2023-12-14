import React, { useContext, useEffect, useState } from 'react';
import { URL, UserContext } from '../../App';

const Profile = () => {
    const [photos, setPhotos] = useState([]);
    const [image, setImage] = useState('');
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
        fetch(`${URL}/myPosts`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setPhotos(result.myPosts);
            });
    }, []);

    useEffect(() => {
        if (image) {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'insta-clone');
            data.append('cloud_name', 'duriiuajr');
            fetch('https://api.cloudinary.com/v1_1/duriiuajr/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    fetch(`${URL}/updateProfilePic`, {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                        },
                        body: JSON.stringify({
                            pic: data.url,
                        }),
                    })
                        .then((res) => res.json())
                        .then((result) => {
                            localStorage.setItem(
                                'user',
                                JSON.stringify({ ...state, pic: result.pic })
                            );
                            dispatch({ type: 'UPDATE_PROFILE_PIC', payload: result.pic });
                        });
                })
                .catch((err) => console.log(err));
        }
    }, [image]);

    const updatePhoto = (file) => {
        setImage(file);
    };

    return (
        <div className='sections'>
            <div className='profile-block-outer'>
                <div className='profile-block'>
                    <div className='profile-pic'>
                        <img src={state && state.pic} alt='' />
                    </div>
                    <div className='profile-description'>
                        <div className='file-field input-field'>
                            <div className='btn'>
                                <span>Upload Profile</span>
                                <input
                                    type='file'
                                    onChange={(e) => updatePhoto(e.target.files[0])}
                                />
                            </div>
                            <div className='file-path-wrapper'>
                                <input type='text' className='file-path validate' />
                            </div>
                        </div>
                        <h3 className='username'>{state && state.name}</h3>
                        <div className='follow-desc'>
                            <div className='posts'>
                                <b>{photos.length}</b> Posts
                            </div>
                            <div className='followers'>
                                <b>{state ? state.followers.length : '0'}</b> Followers
                            </div>
                            <div className='following'>
                                <b>{state ? state.following.length : '0'}</b> Following
                            </div>
                        </div>
                    </div>
                </div>
                <div className='posts-block'>
                    {photos &&
                        photos.map((item) => {
                            return <img src={item.photo} alt='' key={item._id} />;
                        })}
                </div>
            </div>
        </div>
    );
};

export default Profile;
