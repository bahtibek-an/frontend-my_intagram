import { createContext, useEffect, useState } from "react";
import { auth } from "../Database/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create a context for managing authentication state
export const AuthContext = createContext();

// Authentication context provider component
export const AuthContextProvider = ({ children }) => {
    // State to hold the current user information
    const [currentUser, setUser] = useState(null);

    // Effect to subscribe to changes in authentication state
    useEffect(() => {
        // Subscribe to the authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Update the user state when authentication state changes
            setUser(user || null);
        });

        // Unsubscribe when the component unmounts or when the effect is re-executed
        return () => {
            unsubscribe();
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    // Provide the current user state to the components in the context
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
