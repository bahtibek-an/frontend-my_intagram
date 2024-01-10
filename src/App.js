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

    // ProtectedRoute component to handle protected routes
    const ProtectedRoute = ({ children }) => {
      // Redirect to login if user is not authenticated
      if (!currentUser) {
        return <Navigate to="/login" />;
      }
      // Render the protected content if user is authenticated
      return children;
    };

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* Home route with ProtectedRoute wrapper */}
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            {/* Profile route with ProtectedRoute wrapper */}
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* Explore route with ProtectedRoute wrapper */}
            <Route path="/explore" element={<ProtectedRoute><AllPost /></ProtectedRoute>} />
            {/* Edit Profile route with ProtectedRoute wrapper */}
            <Route path="/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            {/* Login route */}
            <Route path="login" element={<Login />} />
            {/* Register route */}
            <Route path="register" element={<Register />} />
            {/* Forgot Password route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* UserProfile route with ProtectedRoute wrapper */}
            <Route path="profile/:uid" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
