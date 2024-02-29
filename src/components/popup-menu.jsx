import { useContext } from 'react';
import LoggedInUserContext from '../context/logged-in-user';
import { getUserByUsername, toggleFollow } from '../services/firebase';
import { toast } from 'react-toastify';

export default function PopupMenu({ content }) {
    const { user } = useContext(LoggedInUserContext);

    const unfollow = async () => {
        const target = await getUserByUsername(content.username);
        await toggleFollow(true, user.docId, target[0].docId, target[0].userId, user.userId);
        toast.success('Unfollowed ' + target[0].username);
    };

    return (
        <div className="popup-menu">
            <div className="popup-menu__container mx-5">
                <div className="popup-menu__item popup-menu__item-red noselect">Report</div>
                <div className="popup-menu__item popup-menu__item-red noselect" onClick={() => unfollow()}>
                    Unfollow
                </div>
                <div className="popup-menu__item noselect">Go to post</div>
                <div className="popup-menu__item noselect">Share to...</div>
                <div className="popup-menu__item noselect">Copy Link</div>
                <div className="popup-menu__close noselect">Close</div>
            </div>
        </div>
    );
}
