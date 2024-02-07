import { useState } from 'react';
import TermContext from '../term';

export default function TermProvider( { children } ) {

    const [term, setTerm] = useState('');
    const [focused, setFocused] = useState(false);

    const value = { 
        term: term,
        setTerm: setTerm,
        focused: focused,
        setFocused: setFocused
    }

    return (
        <TermContext.Provider value={value}>{children}</TermContext.Provider>
    );
}