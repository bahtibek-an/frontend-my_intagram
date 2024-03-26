import React, { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// pages

import "react-lazy-load-image-component/src/effects/blur.css";
import Explore from "../pages/Explore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../profile/Profile";
import Register from "../pages/Register";
import Post from "../pages/Post";
import Reels from "../pages/Reels";
 import EditProfil from "../profile/EditProfil";

const RequireAuth = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <Router>
      
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequireAuth>
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="/reels"
            element={
              <RequireAuth>
                <Reels />
              </RequireAuth>
            }
          />
       
          <Route path="/login" element={<Login />} />
           <Route path="/edit" element={<EditProfil />}/> 
          <Route path="/p/:id" element={<Post />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </Router>
    </>
  );
};

export default App;
