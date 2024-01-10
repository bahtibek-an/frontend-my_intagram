import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

// Creating a context for managing post-related state
export const PostContext = createContext();

// Post context provider component
export const PostContextProvider = ({ children }) => {
    // Accessing the current user from the authentication context
    const { currentUser } = useContext(AuthContext);

    // Initial state for the post context
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    // Reducer function to handle state changes based on actions
    const chatReducer = (state, { type, payload }) => {
        switch (type) {
            case "CHANGE_USER":
                // Generating a unique chatId based on user IDs
                const chatId =
                    currentUser.uid > payload.uid
                        ? `${currentUser.uid}${payload.uid}`
                        : `${payload.uid}${currentUser.uid}`;

                // Returning the updated state with changed user and chatId
                return {
                    user: payload,
                    chatId,
                };

            default:
                return state;
        }
    };

    // Using useReducer hook to manage state with the chatReducer
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    // Providing the state and dispatch function to components through the context
    return (
        <PostContext.Provider value={{ data: state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
};
