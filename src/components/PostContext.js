import React, { createContext, useReducer, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
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
          chatId:
            currentUser.uid > action.payload.uid
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
