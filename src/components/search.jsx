import { useContext, useEffect } from 'react';
import TermContext from '../context/term';

export default function Search() {
    const { term, setTerm, focused, setFocused } = useContext(TermContext);

    useEffect(() => {
        const handleClick = (event) => {
            if (focused && !event.target.closest('.search') && !event.target.closest('.search-result')) {
                setFocused(false);
            }
        };
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [focused, setFocused]);

    return (
        <form action="" className="search hidden md:flex">
            <input
                type="text"
                className={`search__input ${focused && 'search__input--focused'}`}
                placeholder={term || 'Search'}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onFocus={() => setFocused(true)}
            />
            <svg
                className="search__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </form>
    );
}
