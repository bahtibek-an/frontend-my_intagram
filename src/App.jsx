import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactLoader from './components/loader';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import useUser from './hooks/use-user';
import LoggedInUserContext from './context/logged-in-user';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './helpers/protected-route';
import TermProvider from './context/providers/term-provider';
import ChangePassword from './pages/settings/change-password';
import Publish from './pages/publish';
import ContentContext from './context/content';
import Popup from './components/popup';
import ProfilePicture from './pages/profile-picture';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));
const EditProfile = lazy(() => import('./pages/settings/edit-profile'));


export default function App() {

    const { user } = useAuthListener();
    const [popupContent, setPopupContent] = useState(null);
    const close = () => {
        setPopupContent(null);
    };
    //Popup event handler
    useEffect(() => {
        const closePopup = () => {
            setPopupContent(null);
        };
        const handleClick = (event) => {
            if (popupContent && (event.target.matches('.popup__close') || !event.target.closest('.popup__container'))) {
                closePopup();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [popupContent, setPopupContent]);
    const { user: activeUser, setActiveUser } = useUser(user?.uid);
    return (
        <LoggedInUserContext.Provider value={{ user: activeUser, setActiveUser }}>
            <ContentContext.Provider value={{ setPopupContent }}>
                <UserContext.Provider value={{ user }}>
                    <TermProvider>
                        <Router basename="/instagram/">
                            <Suspense fallback={<ReactLoader />}>
                                <Switch>
                                    <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                                        <Dashboard />
                                    </ProtectedRoute>
                                    <ProtectedRoute user={user} path={ROUTES.EDIT_PROFILE} exact>
                                        <EditProfile />
                                    </ProtectedRoute>
                                    <ProtectedRoute user={user} path={ROUTES.CHANGE_PASSWORD} exact>
                                        <ChangePassword />
                                    </ProtectedRoute>
                                    <ProtectedRoute user={user} path={ROUTES.PUSH_NOTIFICATIONS} exact>
                                        <EditProfile />
                                    </ProtectedRoute>
                                    <ProtectedRoute user={user} path={ROUTES.PRIVACY_AND_SECURITY} exact>
                                        <EditProfile />
                                    </ProtectedRoute>
                                    <ProtectedRoute user={user} path={ROUTES.LOGIN_ACTIVITY} exact>
                                        <EditProfile />
                                    </ProtectedRoute>
                                    <Route path={ROUTES.LOGIN} component={Login} />
                                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                                    <Route path={ROUTES.POST} component={Publish} />
                                    <Route path={ROUTES.PROFILE_PICTURE} component={ProfilePicture} />
                                    <Route path={ROUTES.PROFILE} component={Profile} />
                                    <Route component={NotFound} />
                                </Switch>
                            </Suspense>
                            {popupContent && (
                                <>
                                    <button onClick={close} className="popup__close">
                                        &times;
                                    </button>
                                    <Popup username={popupContent.username} caption={popupContent.content.docId} content={popupContent.content} onClick={close} user={activeUser} />
                                </>
                            )}
                            <ToastContainer />
                        </Router>
                    </TermProvider>
                </UserContext.Provider>
            </ContentContext.Provider>
        </LoggedInUserContext.Provider>
    );
}
