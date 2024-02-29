/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PopupMenu from '../popup-menu';
import { useEffect, useState } from 'react';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';
import { constructMediaUrl } from '../../services/firebase';

export default function Header({ username, content }) {
    const [open, setOpen] = useState(false);
    //Popup event handler
    useEffect(() => {
        const handleClick = (event) => {
            // if (open && !event.target.closest('.popup-menu__container')) {
            if (open) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [open]);

    return (
        <>
            <div className="p-header">
                <Link to={`/p/${username}`} className="p-header__link">
                    <img
                        src={constructMediaUrl(username)}
                        alt={`${username} profile picture`}
                        className="p-header__img"
                        onError={(e) => {
                            e.target.src = DEFAULT_IMAGE_PATH;
                        }}
                    />
                    <p className="p-header__text">{username}</p>
                </Link>
                <svg
                    className="p-header__more noselect"
                    onClick={() => setOpen(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </div>
            {open && <PopupMenu content={content} />}
        </>
    );
}

Header.propTypes = {
    username: PropTypes.string.isRequired
};
