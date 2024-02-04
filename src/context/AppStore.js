import React, { useState, useContext, createContext } from 'react';
const userState = {};
export const Context = createContext();
function AppStore({ children }) {
    const [user, setUser] = useState(userState);

    return (
        <Context.Provider value={[user, setUser]}>
            {children}
        </Context.Provider>
    );
}
export default AppStore;
