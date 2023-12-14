import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { SIGNIN_POST } from '../../api/apiConst';
import { callPostApiWithoutAuth } from '../../api/apiCaller';
import Loader from './Loader';

const Signin = () => {
    const { dispatch } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const PostData = (e) => {
        e.preventDefault();
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            M.toast({ html: 'Invalid Email', classes: '#b71c1c red darken-4' });
            return;
        }
        setLoading(true);
        const siginInObj = {
            email,
            password,
        };
        callPostApiWithoutAuth(
            SIGNIN_POST,
            siginInObj,
            (response) => {
                if (response.data.error) {
                    setLoading(false);
                    M.toast({ html: response.data.error, classes: '#b71c1c red darken-4' });
                } else {
                    setLoading(false);
                    localStorage.setItem('jwt', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    dispatch({ type: 'USER', payload: response.data.user });
                    M.toast({ html: 'Signed in Successfully', classes: '#00e676 green accent-3' });
                    navigate('/');
                }
            },
            (error) => {
                setLoading(false);
                M.toast({ html: error.response.data.error, classes: '#b71c1c red darken-4' });
            }
        );
    };

    return loading ? (
        <Loader />
    ) : (
        <div className='sections'>
            <div className='login-block'>
                <h2>Chit Chat</h2>
                <form className='login-form common-form' onSubmit={(e) => PostData(e)}>
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
                    <button type='submit'>Signin</button>
                </form>
                <div className='extra-info'>
                    <Link to='/signup'>
                        Don't have an account <b>Create One</b>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signin;
