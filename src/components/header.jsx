import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import { DEFAULT_IMAGE_PATH } from '../constants/paths';
import useUser from '../hooks/use-user';
import Search from './search';
import SearchResult from './search-result';
import { constructMediaUrl } from '../services/firebase';

export default function Header() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();

    return (
        <>
            <SearchResult />
            <header className="navigation">
                <div className="navigation__container w-11/12 sm:w-10/12 md:w-10/12">
                    <div className="navigation__logo">
                        <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                            <img src={import.meta.env.BASE_URL + "images/logo.png"} alt="Instagram" className="navigation__logo-img" />
                        </Link>
                    </div>
                    <Search className="navigation__search" />

                    {loggedInUser ? (
                        <div className="navigation__right">
                            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                <svg className="navigation__home" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            </Link>

                            <Link to={ROUTES.POST} aria-label="Post">
                                <svg
                                    className="navigation__home"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <g transform="translate(2 3)">
                                        <path d="M20 16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2v11z" />
                                        <circle cx="10" cy="10" r="4" />
                                    </g>
                                </svg>
                            </Link>

                            <button
                                type="button"
                                title="Sign Out"
                                className="navigation__out-btn"
                                onClick={() => {
                                    firebase.auth().signOut();
                                    history.push(ROUTES.LOGIN);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        firebase.auth().signOut();
                                        history.push(ROUTES.LOGIN);
                                    }
                                }}
                            >
                                <svg className="navigation__out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                            {user && (
                                <div className="navigation__profile">
                                    <Link to={`/p/${user?.username}`}>
                                        <img
                                            className="navigation__pic"
                                            src={constructMediaUrl(user?.username)}
                                            alt={`${user?.username} profile`}
                                            onError={(e) => {
                                                e.target.src = DEFAULT_IMAGE_PATH;
                                            }}
                                        />
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="navigation__right">
                            <Link to={ROUTES.LOGIN}>
                                <button type="button" className="btn">
                                    Log In
                                </button>
                            </Link>
                            <Link to={ROUTES.SIGN_UP}>
                                <button type="button" className="btn">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}
