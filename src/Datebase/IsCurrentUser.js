import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

const IsCurrentUser = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };

export default IsCurrentUser;