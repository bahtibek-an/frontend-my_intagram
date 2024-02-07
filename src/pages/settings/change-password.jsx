import { useState, useContext } from 'react';
import SettingsTemplate from '../../templates/settings-template';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import Skeleton from 'react-loading-skeleton';
import { changePassword, constructMediaUrl } from '../../services/firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePassword() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    let filled = oldPass !== '' && newPass !== '' && confirmPass !== '';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!filled) return;
        if (newPass !== confirmPass) return;

        const data = new FormData(e.target);

        const updateData = async () => {
            (await changePassword(user.emailAddress, data.get('old-password'), data.get('new-password'))) ? toast('Success!') : toast('Failed to change password!');
        };

        updateData();
    };

    return (
        <SettingsTemplate>
            <ToastContainer />
            <div className="edit-profile">
                <div className="edit-profile__photo-container">
                    {user ? (
                        <img
                            src={constructMediaUrl(user.username)}
                            alt="User"
                            className="edit-profile__img"
                            onError={(e) => {
                                e.target.src = `images/avatars/default.png`;
                            }}
                        />
                    ) : (
                        <Skeleton />
                    )}
                    {user ? <div className="edit-profile__name">{user.username}</div> : <Skeleton />}
                </div>

                <form className="edit-profile__form" onSubmit={handleSubmit}>
                    <div className="edit-profile__form-item">
                        <div className="edit-profile__input-group">
                            <input type="text" className="edit-profile__input" name="old-password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
                            <label className="edit-profile__title">Old Password</label>
                        </div>

                        <div className="edit-profile__input-group">
                            <input type="text" className="edit-profile__input" name="new-password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                            <label className="edit-profile__title">New Password</label>
                        </div>

                        <div className="edit-profile__input-group">
                            <input type="text" className="edit-profile__input" name="confirm-new-password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                            <label className="edit-profile__title">Confirm New Password</label>
                        </div>
                    </div>

                    <div className="edit-profile__form-item">
                        <button className={`btn edit-profile__submit ${!filled && 'btn--off'}`}>Submit</button>
                    </div>
                </form>

                <div className="edit-profile__photo-container">
                    <button className="btn-simple">Forgot Password?</button>
                </div>
            </div>
        </SettingsTemplate>
    );
}
