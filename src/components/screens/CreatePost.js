import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../App';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (url) {
            fetch(`${URL}/createpost`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: '#b71c1c red darken-4' });
                    } else {
                        M.toast({
                            html: 'Created Post Successfully',
                            classes: '#00e676 green accent-3',
                        });
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [url]);

    const postDetails = (e) => {
        e.preventDefault();
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
                setUrl(data.url);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='sections'>
            <div className='create-post-section'>
                <div>
                    <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Body'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <div className='file-field input-field'>
                        <div className='btn'>
                            <span>Upload Image</span>
                            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className='file-path-wrapper'>
                            <input type='text' className='file-path validate' />
                        </div>
                    </div>
                    <div className='right'>
                        <button onClick={(e) => postDetails(e)} className='createPostButton'>
                            Create Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
