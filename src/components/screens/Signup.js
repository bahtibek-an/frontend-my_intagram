import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../App';
import { SIGNUP_POST } from '../../api/apiConst';
import { callPostApiWithoutAuth } from '../../api/apiCaller';
import Loader from './Loader';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const uploadProfile = () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'insta-clone');
        data.append('cloud_name', 'duriiuajr');
        setLoading(true);
        callPostApiWithoutAuth(
            'https://api.cloudinary.com/v1_1/duriiuajr/image/upload',
            data,
            (response) => {
                uploadFields(response.data.url);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const uploadFields = (url = '') => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            M.toast({ html: 'Invalid Email', classes: '#b71c1c red darken-4' });
            return;
        }
        const obj = {
            name,
            email,
            password,
            pic: url,
        };
        callPostApiWithoutAuth(
            SIGNUP_POST,
            obj,
            (response) => {
                if (response.error) {
                    M.toast({ html: response.data.error, classes: '#b71c1c red darken-4' });
                    setLoading(false);
                } else {
                    M.toast({ html: response.data.message, classes: '#00e676 green accent-3' });
                    navigate('/signin');
                    setLoading(false);
                }
            },
            (error) => {
                M.toast({ html: error.response.data.error, classes: '#b71c1c red darken-4' });
                setLoading(false);
            }
        );
    };

    const PostData = (e) => {
        e.preventDefault();
        if (image) {
            uploadProfile();
        } else {
            uploadFields();
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <div className='sections'>
            <div className='login-block'>
                <h2>Chit Chat</h2>
                <form action='' className='login-form common-form'>
                    <input
                        type='text'
                        placeholder='Name'
                        autoComplete='false'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Email'
                        autoComplete='false'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        autoComplete='false'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='file-field input-field'>
                        <div className='btn'>
                            <span>Upload Profile</span>
                            <input type='file' onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className='file-path-wrapper'>
                            <input type='text' className='file-path validate' />
                        </div>
                    </div>
                    <button onClick={(e) => PostData(e)}>Signup</button>
                </form>
                <div className='extra-info'>
                    <Link to='/signin'>
                        Already have an account <b>Signin</b>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
