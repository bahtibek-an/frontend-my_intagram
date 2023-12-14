import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [showNav, setShowNav] = useState(false);

    return (
        <div>
            <nav>
                <div className='nav-wrapper'>
                    <Link to={state ? '/' : '/signin'} className='brand-logo'>
                        <img src='images/logo.svg' alt='Chit Chat' />
                    </Link>
                    <div className='bars' onClick={() => setShowNav(!showNav)}>
                        <i class='material-icons'>menu</i>
                    </div>
                    <ul
                        id='nav-mobile'
                        className={`right hide-on-med-and-down ${showNav ? 'showNav' : ''}`}
                    >
                        {state ? (
                            <>
                                <li onClick={() => setShowNav(!showNav)}>
                                    <Link to='/profile'>Profile</Link>
                                </li>
                                <li onClick={() => setShowNav(!showNav)}>
                                    <Link to='/createpost'>Create Post</Link>
                                </li>
                                <li onClick={() => setShowNav(!showNav)}>
                                    <Link to='/myFollowingPosts'>Followings</Link>
                                </li>
                                <li onClick={() => setShowNav(!showNav)}>
                                    <button
                                        className='common-btn'
                                        onClick={() => {
                                            localStorage.clear();
                                            dispatch({ type: 'CLEAR' });
                                            navigate('/signin');
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li onClick={() => setShowNav(!showNav)}>
                                    <Link to='/signin'>Signin</Link>
                                </li>
                                <li onClick={() => setShowNav(!showNav)}>
                                    <Link to='/signup'>Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
