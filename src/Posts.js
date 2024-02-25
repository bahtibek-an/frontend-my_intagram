import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./Authentication";

export const PostContext = createContext();

export const Posts = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    const postReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid,
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);

    return (
        <PostContext.Provider value={{ data: state, dispatch }}>
            {children}
        </PostContext.Provider>
    );
};
