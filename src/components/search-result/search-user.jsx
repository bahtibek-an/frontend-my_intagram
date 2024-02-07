import { Link } from 'react-router-dom';
import { useContext } from 'react';
import TermContext from '../../context/term';
import { constructMediaUrl } from '../../services/firebase';

export default function SearchUser({ username, fullName }) {
    const { setTerm, setFocused } = useContext(TermContext);

    return (
        <div className="search-user">
            <Link
                to={`/p/${username}`}
                onClick={() => {
                    setTerm('');
                    setFocused(false);
                }}
                className="search-user__link"
            >
                <div className="search-user__container">
                    <img
                        src={constructMediaUrl(username)}
                        alt="User"
                        className="search-user__img"
                        onError={(e) => {
                            e.target.src = `images/avatars/default.png`;
                        }}
                    />
                    <div className="search-user__group">
                        <div className="search-user__title">{username}</div>
                        {fullName && <div className="search-user__name">{fullName}</div>}
                    </div>
                </div>
            </Link>
        </div>
    );
}
