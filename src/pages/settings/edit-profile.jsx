import { useEffect, useContext } from 'react';
import SettingsTemplate from '../../templates/settings-template';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import Skeleton from 'react-loading-skeleton';
import { constructMediaUrl, updateUserDetails } from '../../services/firebase';
import { toast } from 'react-toastify';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function EditProfile() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);

    useEffect(() => {
        if (user) {
            document.querySelector('input[name="fullName"]').value = user.fullName;
            document.querySelector('input[name="username"]').value = user.username;
            document.querySelector('input[name="website"]').value = user.website;
            document.querySelector('textarea[name="bio"]').value = user.bio;
            document.querySelector('input[name="phoneNumber"]').value = user.phoneNumber;
            document.querySelector('input[name="gender"]').value = user.gender;
        }
    }, [user]);

    /*
    const [name,setName] = useState();
    const [username,setUsername] = useState();
    const [website,setWebsite] = useState();
    const [bio,setBio] = useState();
    const [phone,setPhone] = useState();
    const [phone,setPhone] = useState();*/

    //console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const updateData = async () => {
            (await updateUserDetails(user.docId, data.get('fullName'), data.get('username'), data.get('website'), data.get('bio'), data.get('phoneNumber'), data.get('gender')))
                ? toast('Success!')
                : toast('Failed to change password!');
        };

        updateData();
    };

    return (
        <SettingsTemplate>
            <div className="edit-profile">
                <div className="edit-profile__photo-container">
                    {user ? (
                        <img
                            src={constructMediaUrl(user.username)}
                            alt="User"
                            className="edit-profile__img"
                            onError={(e) => {
                                e.target.src = DEFAULT_IMAGE_PATH;
                            }}
                        />
                    ) : (
                        <Skeleton />
                    )}
                    {user ? <div className="edit-profile__name">{user.username}</div> : <Skeleton />}
                    <Link to={ROUTES.PROFILE_PICTURE}>
                        <button className="btn-simple edit-profile__photo-btn">Change Profile Photo</button>
                    </Link>
                </div>

                {user && (
                    <form className="edit-profile__form" onSubmit={handleSubmit}>
                        <div className="edit-profile__form-item">
                            <div className="edit-profile__input-group">
                                <input type="text" className="edit-profile__input" placeholder="Name" name="fullName" />
                                <label className="edit-profile__title">Name</label>
                            </div>
                            <div className="edit-profile__info">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</div>
                            <div className="edit-profile__info">You can only change your name twice within 14 days.</div>
                        </div>
                        <div className="edit-profile__form-item">
                            <div className="edit-profile__input-group">
                                <input type="text" className="edit-profile__input" placeholder="Username" name="username" />
                                <label className="edit-profile__title">Username</label>
                            </div>
                            <div className="edit-profile__info">In most cases, you'll be able to change your username back to afolabi_niger for another 14 days.</div>
                        </div>
                        <div className="edit-profile__form-item">
                            <div className="edit-profile__input-group">
                                <input type="text" className="edit-profile__input" placeholder="Website" name="website" />
                                <label className="edit-profile__title">Website</label>
                            </div>
                            <div className="edit-profile__input-group">
                                <textarea className="edit-profile__input" name="bio" />
                                <label className="edit-profile__title">Bio</label>
                            </div>
                        </div>
                        <div className="edit-profile__form-item">
                            <div className="edit-profile__info-h">Personal information</div>
                            <div className="edit-profile__info">
                                Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.
                            </div>
                        </div>
                        {/*<div className="edit-profile__form-item">
                    <div className="edit-profile__input-group">
                        <input type="email" className="edit-profile__input" placeholder="Email"/>
                        <label className="edit-profile__title">Email</label>
                    </div>
                </div>*/}
                        <div className="edit-profile__form-item">
                            <div className="edit-profile__input-group">
                                <input type="text" className="edit-profile__input" placeholder="Phone" name="phoneNumber" />
                                <label className="edit-profile__title">Phone</label>
                            </div>
                        </div>
                        <div className="edit-profile__form-item">
                            <div className="edit-profile__input-group">
                                <input type="text" className="edit-profile__input" placeholder="Gender" name="gender" />
                                <label className="edit-profile__title">Gender</label>
                            </div>
                        </div>
                        <div className="edit-profile__form-item">
                            <button className="btn edit-profile__submit">Submit</button>
                        </div>
                    </form>
                )}
            </div>
        </SettingsTemplate>
    );
}
