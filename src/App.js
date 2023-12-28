import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Profile from "./Pages/Profile";
import AllPost from "./Pages/AllPost";
import EditProfile from "./Pages/EditProfile";
import UserProfile from "./Pages/UserProfile";

class App extends Component {
  static contextType = AuthContext;

  render() {
    const { currentUser } = this.context;

    const ProtectedRoute = ({ children }) => {
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
      return children;
    };

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/explore" element={<ProtectedRoute><AllPost /></ProtectedRoute>} />
            <Route path="/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="profile/:uid" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
