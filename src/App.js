import React, { useContext } from "react";
import Register from "./Pages/Register";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"
import Home from "./Pages/Home";
import Profiles from "./Pages/Profiles";
import Profile_Editor from "./Pages/Profile-Editor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/:uid" element={<Profiles />} />
          <Route path="/profile-editor" element={<Profile_Editor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
