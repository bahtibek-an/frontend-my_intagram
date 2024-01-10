import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/LogIn";
import ResetPassword from "../Pages/ResetPassword";
import EditProfile from "../Pages/Edit";
import Profile from "../Pages/Profile";
import CreatePost from "../Pages/CreatePost";

const RoutesPage = () => {
  const { currentUser } = useContext(AuthContext);

  const CurrentUser = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile/:uid" element={<CurrentUser><Profile /></CurrentUser>} />
          <Route index element={<CurrentUser><Home /></CurrentUser>} />
          <Route path="/edit" element={<CurrentUser><EditProfile /></CurrentUser>} />
          <Route path="/add-post" element={<CurrentUser><CreatePost /></CurrentUser>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
