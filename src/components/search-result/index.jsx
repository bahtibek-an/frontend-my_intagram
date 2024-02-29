import { useState, useEffect, useContext } from 'react';
import TermContext from '../../context/term';
import SearchUser from './search-user';
import { searchForTerm } from '../../services/firebase';

export default function SearchResult() {
    const [result, setResult] = useState();
    const { term, focused } = useContext(TermContext);

    useEffect(() => {
        const getSearchResults = async () => {
            setResult(await searchForTerm(term));
        };
        if (term) {
            getSearchResults();
        } else {
            setResult();
        }
    }, [term]);

    return (
        <>
            {focused && (
                <div className="search-result">
                    <div className="search-result__relative">
                        <div className="search-result__mask"></div>
                        <div className="search-result__triangle" />
                        <div className="search-result__container">
                            {result?.map((user) => (
                                <>
                                    <SearchUser username={user.username} fullName={user.fullName} />
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
