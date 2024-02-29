import PageTemplate from './page-template';
import {NavLink} from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function SettingsTemplate({children}) {
    return (
        <PageTemplate>
            <div className="settings">
                <div className="settings__container">
                    <div className="settings__sidebar">
                        <NavLink to={ROUTES.EDIT_PROFILE} activeClassName="settings__m-item--active" className="settings__m-item"><p>Edit Profile</p></NavLink>
                        <NavLink to={ROUTES.CHANGE_PASSWORD} activeClassName="settings__m-item--active" className="settings__m-item"><p>Change Password</p></NavLink>
                        <NavLink to={ROUTES.PUSH_NOTIFICATIONS} activeClassName="settings__m-item--active" className="settings__m-item"><p>Push Notifications</p></NavLink>
                        <NavLink to={ROUTES.PRIVACY_AND_SECURITY} activeClassName="settings__m-item--active" className="settings__m-item"><p>Privacy and Security</p></NavLink>
                        <NavLink to={ROUTES.LOGIN_ACTIVITY} activeClassName="settings__m-item--active" className="settings__m-item"><p>Login Activity</p></NavLink>
                    </div>
                    <div className="settings__main">
                        {children}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
}